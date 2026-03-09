import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet-async";
import { SITE_URL } from "@/lib/seo";
import { slugifySlotName } from "@/lib/slugify";
import { PROVIDER_DISPLAY_NAMES } from "@/lib/slotProviderLinks";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, ArrowLeft, BarChart3, Zap, Trophy, Hash } from "lucide-react";

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

function useSlotBySlug(slug: string) {
  return useQuery({
    queryKey: ["slot-catalog-slug", slug],
    queryFn: async () => {
      // Fetch all slots and find by slugified name
      const { data, error } = await supabase
        .from("slot_catalog")
        .select("*")
        .order("slot_name");
      if (error) throw error;
      const match = (data || []).find(
        (s) => slugifySlotName(s.slot_name) === slug
      );
      return match || null;
    },
    staleTime: 300000,
  });
}

function useSlotBonusHuntData(slotName: string | null) {
  return useQuery({
    queryKey: ["slot-hunt-data", slotName],
    queryFn: async () => {
      if (!slotName) return null;
      // Get bonus hunt archives that contain this slot in api_data
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
      return appearances.slice(0, 10); // Latest 10
    },
    enabled: !!slotName,
    staleTime: 300000,
  });
}

export default function SlotCatalogPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: slot, isLoading } = useSlotBySlug(slug || "");
  const { data: huntData } = useSlotBonusHuntData(slot?.slot_name || null);

  const hasGuide = slug ? GUIDE_SLUGS.has(slug) : false;
  const providerSlug = slot?.provider ? PROVIDER_NAME_TO_SLUG[slot.provider] : null;

  const pageUrl = `${SITE_URL}/slot-katalog/${slug}`;
  const title = slot ? `${slot.slot_name} – Stats & Community Data` : "Spillemaskin";
  const description = slot
    ? `${slot.slot_name} fra ${slot.provider}: RTP ${slot.rtp || "N/A"}%, volatilitet ${slot.volatility || "N/A"}, testet i ${slot.bonus_count} bonus hunts. Se community-data og statistikker.`
    : "";

  // SoftwareApplication schema
  const hasRating = slot && slot.bonus_count > 0 && slot.highest_x && slot.highest_x > 0;
  const ratingValue = hasRating
    ? Math.min(5, 1 + ((slot.highest_x || 0) / 500) * 4).toFixed(1)
    : null;

  const jsonLd = slot
    ? {
        "@context": "https://schema.org",
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
      }
    : null;

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

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        {jsonLd && (
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        )}
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 flex-wrap">
            <li><Link to="/" className="hover:text-primary">Forside</Link></li>
            <li>/</li>
            <li><Link to="/casinospil/spillemaskiner" className="hover:text-primary">Spillemaskiner</Link></li>
            <li>/</li>
            <li><Link to="/slot-database" className="hover:text-primary">Slot Database</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">{slot.slot_name}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3 flex items-center gap-3">
            <Gamepad2 className="h-8 w-8 text-primary" />
            {slot.slot_name}
          </h1>
          <p className="text-lg text-muted-foreground">
            {slot.provider && slot.provider !== "Unknown" && slot.provider !== "Custom Slot" ? (
              <>
                Udviklet af{" "}
                {providerSlug ? (
                  <Link to={`/spiludviklere/${providerSlug}`} className="text-primary hover:underline">
                    {slot.provider}
                  </Link>
                ) : (
                  slot.provider
                )}
                {" · "}
              </>
            ) : null}
            Testet i {slot.bonus_count} bonus hunt{slot.bonus_count !== 1 ? "s" : ""} med ægte community-data.
          </p>
        </div>

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

        {/* About section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Om {slot.slot_name}</h2>
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
