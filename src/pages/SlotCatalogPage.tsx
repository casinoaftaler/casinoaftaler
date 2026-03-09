import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet-async";
import { SITE_URL } from "@/lib/seo";
import { slugifySlotName } from "@/lib/slugify";
import { PROVIDER_DISPLAY_NAMES } from "@/lib/slotProviderLinks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Gamepad2, ArrowLeft, BarChart3, Zap, Trophy, Hash, HelpCircle, Layers } from "lucide-react";

/** Reverse lookup: display name → provider slug */
const PROVIDER_NAME_TO_SLUG: Record<string, string> = {};
for (const [slug, name] of Object.entries(PROVIDER_DISPLAY_NAMES)) {
  PROVIDER_NAME_TO_SLUG[name] = slug;
}

/** Known guide slugs that have dedicated /casinospil/spillemaskiner/:slug pages */
const GUIDE_SLUGS = new Set([
  "sweet-bonanza", "gates-of-olympus", "the-dog-house", "wild-west-gold",
  "sugar-rush", "madame-destiny-megaways", "buffalo-king", "big-bass-bonanza",
  "wolf-gold", "starburst", "gonzos-quest", "dead-or-alive-2", "divine-fortune",
  "book-of-dead", "legacy-of-dead", "reactoonz", "fire-joker", "eye-of-horus",
  "joker-strike", "immortal-romance", "mega-moolah", "thunderstruck-ii",
  "bonanza", "extra-chilli-megaways", "chaos-crew", "wanted-dead-or-a-wild",
  "razor-shark", "jammin-jars", "money-train-3", "cleopatra",
]);

// ─── Data hooks ────────────────────────────────────────────

function useSlotBySlug(slug: string) {
  return useQuery({
    queryKey: ["slot-catalog-slug", slug],
    queryFn: async () => {
      const batchSize = 1000;
      let from = 0;
      while (true) {
        const { data, error } = await supabase
          .from("slot_catalog")
          .select("*")
          .order("slot_name")
          .range(from, from + batchSize - 1);
        if (error) throw error;
        const match = (data || []).find(
          (s) => slugifySlotName(s.slot_name) === slug
        );
        if (match) return match;
        if (!data || data.length < batchSize) break;
        from += batchSize;
      }
      return null;
    },
    staleTime: 300000,
  });
}

function useSlotBonusHuntData(slotName: string | null) {
  return useQuery({
    queryKey: ["slot-hunt-data", slotName],
    queryFn: async () => {
      if (!slotName) return null;
      const { data, error } = await supabase
        .from("bonus_hunt_archives")
        .select("hunt_number, vod_date, api_data")
        .order("hunt_number", { ascending: false })
        .limit(500);
      if (error) throw error;

      const appearances: { huntNumber: number; date: string | null }[] = [];
      for (const hunt of data || []) {
        const apiData = hunt.api_data as any;
        const slots = apiData?.data || apiData?.slots || [];
        if (Array.isArray(slots)) {
          const found = slots.some(
            (s: any) => s.name?.toLowerCase() === slotName.toLowerCase()
          );
          if (found) {
            appearances.push({ huntNumber: hunt.hunt_number, date: hunt.vod_date });
          }
        }
      }
      return appearances.slice(0, 10);
    },
    enabled: !!slotName,
    staleTime: 300000,
  });
}

function useSimilarSlots(provider: string | null, currentName: string | null, volatility: string | null) {
  return useQuery({
    queryKey: ["similar-slots", provider, currentName],
    queryFn: async () => {
      if (!provider || provider === "Unknown" || provider === "Custom Slot") return [];
      
      // Get slots from same provider
      const { data, error } = await supabase
        .from("slot_catalog")
        .select("slot_name, rtp, volatility, bonus_count, highest_x")
        .eq("provider", provider)
        .order("bonus_count", { ascending: false })
        .limit(20);
      if (error) throw error;
      
      // Filter out current slot, prefer same volatility, take top 6
      const filtered = (data || [])
        .filter((s) => s.slot_name !== currentName)
        .sort((a, b) => {
          // Prioritize same volatility
          const aMatch = a.volatility === volatility ? 1 : 0;
          const bMatch = b.volatility === volatility ? 1 : 0;
          if (aMatch !== bMatch) return bMatch - aMatch;
          return (b.bonus_count || 0) - (a.bonus_count || 0);
        })
        .slice(0, 6);
      
      return filtered;
    },
    enabled: !!provider && !!currentName,
    staleTime: 300000,
  });
}

// ─── FAQ Generator ─────────────────────────────────────────

function generateFAQ(slot: any) {
  const faqs: { question: string; answer: string }[] = [];

  faqs.push({
    question: `Hvad er RTP'en på ${slot.slot_name}?`,
    answer: slot.rtp
      ? `${slot.slot_name} har en Return to Player (RTP) på ${slot.rtp}%. Det betyder, at maskinen statistisk set betaler ${slot.rtp} kr. tilbage for hver 100 kr., der indsættes over lang tid.`
      : `RTP-værdien for ${slot.slot_name} er ikke tilgængelig i vores database endnu. RTP kan variere mellem casinoer, da nogle udbydere tilbyder justerbare RTP-niveauer.`,
  });

  faqs.push({
    question: `Hvor volatil er ${slot.slot_name}?`,
    answer: slot.volatility
      ? `${slot.slot_name} har ${slot.volatility.toLowerCase()} volatilitet. ${
          slot.volatility === "High" || slot.volatility === "Extreme"
            ? "Det betyder sjældnere, men potentielt større gevinster – ideelt for spillere med tålmodighed og et passende budget."
            : slot.volatility === "Low"
            ? "Det betyder hyppigere, men typisk mindre gevinster – velegnet til spillere der foretrækker stabil underholdning."
            : "Det giver en balanceret oplevelse med en blanding af små og store gevinster."
        }`
      : `Volatiliteten for ${slot.slot_name} er ikke registreret i vores database endnu.`,
  });

  if (slot.max_potential) {
    faqs.push({
      question: `Hvad er max win på ${slot.slot_name}?`,
      answer: `Det maksimale gevinstpotentiale på ${slot.slot_name} er ${slot.max_potential}. Denne værdi repræsenterer den teoretisk højeste gevinst, du kan opnå i en enkelt spin eller bonusrunde.`,
    });
  }

  faqs.push({
    question: `Er ${slot.slot_name} testet i bonus hunts?`,
    answer: slot.bonus_count > 0
      ? `Ja, ${slot.slot_name} er blevet testet i ${slot.bonus_count} bonus hunt${slot.bonus_count !== 1 ? "s" : ""} på vores Twitch-kanal.${
          slot.highest_x && slot.highest_x > 0
            ? ` Den højeste registrerede multiplikator er ${Number(slot.highest_x.toFixed(1))}x.`
            : ""
        } Alle resultater er verificeret af vores community i realtid.`
      : `${slot.slot_name} er endnu ikke blevet testet i vores bonus hunts, men den er registreret i vores database og kan blive inkluderet i fremtidige hunts.`,
  });

  if (slot.provider && slot.provider !== "Unknown" && slot.provider !== "Custom Slot") {
    faqs.push({
      question: `Hvem har udviklet ${slot.slot_name}?`,
      answer: `${slot.slot_name} er udviklet af ${slot.provider}, som er en af de anerkendte spiludviklere i online casino-industrien. Du kan se alle spillemaskiner fra ${slot.provider} i vores slot database.`,
    });
  }

  return faqs;
}

// ─── Hero description generator ────────────────────────────

function generateHeroDescription(slot: any): string {
  const parts: string[] = [];
  
  if (slot.provider && slot.provider !== "Unknown" && slot.provider !== "Custom Slot") {
    parts.push(`Komplet community-data og statistik for ${slot.slot_name} fra ${slot.provider}.`);
  } else {
    parts.push(`Komplet community-data og statistik for ${slot.slot_name}.`);
  }

  if (slot.rtp && slot.volatility) {
    parts.push(`Med en RTP på ${slot.rtp}% og ${slot.volatility.toLowerCase()} volatilitet`);
  } else if (slot.rtp) {
    parts.push(`Med en RTP på ${slot.rtp}%`);
  } else if (slot.volatility) {
    parts.push(`Med ${slot.volatility.toLowerCase()} volatilitet`);
  }

  if (slot.bonus_count > 0) {
    parts.push(
      `er denne spillemaskin testet i ${slot.bonus_count} bonus hunt${slot.bonus_count !== 1 ? "s" : ""} på vores Twitch-kanal${
        slot.highest_x && slot.highest_x > 0 ? ` med en top-multiplikator på ${Number(slot.highest_x.toFixed(1))}x` : ""
      }.`
    );
  } else {
    parts.push("– følg med når den bliver testet i kommende bonus hunts.");
  }

  return parts.join(" ");
}

// ─── Main Component ────────────────────────────────────────

export default function SlotCatalogPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: slot, isLoading } = useSlotBySlug(slug || "");
  const { data: huntData } = useSlotBonusHuntData(slot?.slot_name || null);
  const { data: similarSlots } = useSimilarSlots(
    slot?.provider || null,
    slot?.slot_name || null,
    slot?.volatility || null
  );

  const hasGuide = slug ? GUIDE_SLUGS.has(slug) : false;
  const providerSlug = slot?.provider ? PROVIDER_NAME_TO_SLUG[slot.provider] : null;

  const pageUrl = `${SITE_URL}/slot-katalog/${slug}`;
  const title = slot ? `${slot.slot_name} – Stats & Community Data` : "Spillemaskin";
  const description = slot
    ? `${slot.slot_name} fra ${slot.provider}: RTP ${slot.rtp || "N/A"}%, volatilitet ${slot.volatility || "N/A"}, testet i ${slot.bonus_count} bonus hunts. Se community-data og statistikker.`
    : "";

  const hasRating = slot && slot.bonus_count > 0 && slot.highest_x && slot.highest_x > 0;
  const ratingValue = hasRating
    ? Math.min(5, 1 + ((slot.highest_x || 0) / 500) * 4).toFixed(1)
    : null;

  const faqs = slot ? generateFAQ(slot) : [];

  const jsonLd = slot
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "SoftwareApplication",
            name: slot.slot_name,
            applicationCategory: "GameApplication",
            operatingSystem: "Web",
            url: pageUrl,
            ...(slot.provider && slot.provider !== "Custom Slot" && slot.provider !== "Unknown" && {
              author: { "@type": "Organization", name: slot.provider },
            }),
            ...(hasRating && {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue,
                ratingCount: String(slot.bonus_count),
                bestRating: "5",
                worstRating: "1",
              },
            }),
          },
          ...(faqs.length > 0
            ? [{
                "@type": "FAQPage",
                mainEntity: faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer,
                  },
                })),
              }]
            : []),
        ],
      }
    : null;

  // Noindex thin pages (< 3 bonus hunts AND no AI description)
  const slotDescription = slot ? (slot as any).description : null;
  const isThinContent = slot && slot.bonus_count < 3 && !slotDescription;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <p className="text-muted-foreground">Indlæser slot-data...</p>
      </div>
    );
  }

  if (!slot) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold mb-4">Slot ikke fundet</h1>
        <p className="text-muted-foreground mb-6">
          Vi kunne ikke finde en spillemaskin med dette navn i vores database.
        </p>
        <Link to="/slot-database" className="text-primary hover:underline flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Gå til Slot Database
        </Link>
      </div>
    );
  }

  const heroDescription = generateHeroDescription(slot);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />
        {isThinContent && <meta name="robots" content="noindex, follow" />}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        {jsonLd && (
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        )}
      </Helmet>

      <div className="container py-4">
        <Breadcrumbs dynamicLabel={slot.slot_name} />
      </div>

      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: 'linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))',
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Slot Data
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              {slot.slot_name}
            </h1>
            <p className="text-lg text-white/80">
              {heroDescription}
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="redaktionen" showAffiliateDisclaimer={false} />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-lg border border-border p-4 text-center">
            <BarChart3 className="h-5 w-5 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{slot.rtp ? `${slot.rtp}%` : "N/A"}</p>
            <p className="text-xs text-muted-foreground">RTP</p>
          </div>
          <div className="rounded-lg border border-border p-4 text-center">
            <Zap className="h-5 w-5 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{slot.volatility || "N/A"}</p>
            <p className="text-xs text-muted-foreground">Volatilitet</p>
          </div>
          <div className="rounded-lg border border-border p-4 text-center">
            <Trophy className="h-5 w-5 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">
              {slot.highest_x && slot.highest_x > 0
                ? `${Number(slot.highest_x.toFixed(1))}x`
                : "N/A"}
            </p>
            <p className="text-xs text-muted-foreground">Højeste X</p>
          </div>
          <div className="rounded-lg border border-border p-4 text-center">
            <Hash className="h-5 w-5 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{slot.bonus_count}</p>
            <p className="text-xs text-muted-foreground">Bonus Hunts</p>
          </div>
        </div>

        {/* Guide link if exists */}
        {hasGuide && (
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 mb-8">
            <p className="font-medium mb-2">📖 Komplet Spilguide Tilgængelig</p>
            <Link
              to={`/casinospil/spillemaskiner/${slug}`}
              className="text-primary hover:underline font-semibold"
            >
              Læs den dybdegående {slot.slot_name} guide med matematik, strategi og EV-analyse →
            </Link>
          </div>
        )}

        {/* AI-generated description OR fallback */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Om {slot.slot_name}</h2>
          {slotDescription ? (
            <div className="text-muted-foreground leading-relaxed space-y-4">
              {slotDescription.split("\n").filter(Boolean).map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          ) : (
            <>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {slot.slot_name} er en {slot.volatility ? slot.volatility.toLowerCase() + " volatilitet" : ""} spillemaskin
                {slot.provider && slot.provider !== "Unknown" && slot.provider !== "Custom Slot"
                  ? ` fra ${slot.provider}`
                  : ""}
                {slot.rtp ? ` med en Return to Player (RTP) på ${slot.rtp}%` : ""}.
                {slot.max_potential ? ` Max win potentiale er ${slot.max_potential}.` : ""}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Maskinen er blevet testet i {slot.bonus_count} bonus hunt{slot.bonus_count !== 1 ? "s" : ""} på vores Twitch-kanal,
                hvor community'et tracker resultater i realtid.
                {slot.highest_x && slot.highest_x > 0
                  ? ` Den højeste registrerede multiplikator er ${Number(slot.highest_x.toFixed(1))}x.`
                  : ""}
                {slot.highest_win && slot.highest_win > 0
                  ? ` Største gevinst: ${slot.highest_win.toLocaleString("da-DK")} kr.`
                  : ""}
              </p>
            </>
          )}
        </section>

        {/* Bonus hunt appearances */}
        {huntData && huntData.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Seneste Bonus Hunt Optrædener</h2>
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr className="border-b border-border">
                    <th className="px-4 py-2.5 text-left font-medium">Bonus Hunt</th>
                    <th className="px-4 py-2.5 text-left font-medium">Dato</th>
                  </tr>
                </thead>
                <tbody>
                  {huntData.map((h) => (
                    <tr key={h.huntNumber} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="px-4 py-2.5">
                        <Link to="/bonus-hunt/arkiv" className="text-primary hover:underline">
                          Bonus Hunt #{h.huntNumber}
                        </Link>
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">{h.date || "–"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Similar slots */}
        {similarSlots && similarSlots.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Layers className="h-6 w-6 text-primary" />
              Lignende Spillemaskiner
            </h2>
            <p className="text-muted-foreground mb-4">
              Andre populære slots fra {slot.provider} med lignende karakteristika.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {similarSlots.map((s) => {
                const simSlug = slugifySlotName(s.slot_name);
                return (
                  <Link
                    key={s.slot_name}
                    to={`/slot-katalog/${simSlug}`}
                    className="rounded-lg border border-border p-4 hover:border-primary/50 hover:bg-muted/30 transition-colors"
                  >
                    <p className="font-medium mb-1">{s.slot_name}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {s.rtp && <span>RTP {s.rtp}%</span>}
                      {s.volatility && <span>{s.volatility}</span>}
                      {s.highest_x && s.highest_x > 0 && (
                        <span>{Number(s.highest_x.toFixed(1))}x</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-primary" />
              Ofte Stillede Spørgsmål
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-lg border border-border p-4">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Provider link */}
        {providerSlug && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Mere fra {slot.provider}</h2>
            <p className="text-muted-foreground mb-3">
              Se alle spillemaskiner fra {slot.provider} og læs vores dybdegående provider-analyse.
            </p>
            <Link
              to={`/spiludviklere/${providerSlug}`}
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              Gå til {slot.provider} →
            </Link>
          </section>
        )}

        {/* Author bio */}
        <AuthorBio author="jonas" showCommunity={false} />

        {/* Cross-links */}
        <section className="mb-8 rounded-lg border border-border p-4 bg-muted/20">
          <h2 className="text-lg font-bold mb-3">Udforsk Mere</h2>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link to="/slot-database" className="text-primary hover:underline">Slot Database</Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/bonus-hunt/arkiv" className="text-primary hover:underline">Bonus Hunt Arkiv</Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">Spillemaskiner Guide</Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/casino-nyheder" className="text-primary hover:underline">Casino Nyheder</Link>
          </div>
        </section>

        {/* Back link */}
        <div className="pt-4 border-t border-border">
          <Link to="/slot-database" className="text-primary hover:underline flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Tilbage til Slot Database
          </Link>
        </div>
      </div>
    </>
  );
}
