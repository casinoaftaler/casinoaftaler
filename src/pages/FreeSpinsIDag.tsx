import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import heroImage from "@/assets/heroes/free-spins-i-dag-hero.jpg";
import { RelatedGuides } from "@/components/RelatedGuides";
import { FAQSection } from "@/components/FAQSection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useCasinos } from "@/hooks/useCasinos";
import {
  Sparkles, Clock, ShieldCheck, AlertTriangle, Star, RefreshCw,
  Flame, Timer, CreditCard, RotateCcw, Award, CheckCircle2,
  Users, Zap, Gift,
} from "lucide-react";
import { format, differenceInHours, differenceInMinutes } from "date-fns";
import { da } from "date-fns/locale";

const linkClass = "text-primary underline hover:text-primary/80";

const FREE_SPINS_KEYWORDS = [
  "free spins", "free spin", "gratis spins", "gratis spin",
  "fs", "freespin", "freespins", "spins uden indbetaling",
  "bonus spins", "ekstra spins",
];

function isFreeSpinsOffer(offer: RawOffer): boolean {
  // Must have free_spins_count > 0
  if (offer.free_spins_count && offer.free_spins_count > 0) return true;
  // Or keyword match in title/description
  const text = `${offer.offer_title} ${offer.offer_description || ""}`.toLowerCase();
  return FREE_SPINS_KEYWORDS.some((kw) => text.includes(kw));
}

const freeSpinsIDagFaqs = [
  {
    question: "Hvordan finder I de daglige free spins tilbud?",
    answer: "Vi scanner dagligt vores partner-casinoers bonussider for at finde de nyeste og bedste free spins tilbud til danske spillere. Tilbuddene opdateres automatisk hver morgen kl. 07:00.",
  },
  {
    question: "Er free spins tilbuddene kun for nye spillere?",
    answer: "Nej! Mange casinoer tilbyder free spins til både nye og eksisterende spillere. Vi markerer tydeligt om et tilbud er en velkomstbonus eller et dagligt/ugentligt tilbud.",
  },
  {
    question: "Har free spins omsætningskrav?",
    answer: "Ja, de fleste free spins kommer med omsætningskrav. Vi angiver altid omsætningskravet ved hvert tilbud, så du kan vælge det bedste tilbud baseret på dine præferencer.",
  },
  {
    question: "Kan jeg få free spins uden indbetaling?",
    answer: "Ja, nogle casinoer tilbyder free spins helt uden indbetaling. Se vores dedikerede guide til bonus uden indbetaling for alle aktuelle tilbud.",
  },
  {
    question: "Hvor ofte opdateres denne side?",
    answer: "Siden opdateres automatisk hver dag kl. 07:00 CET. Vi scanner casinoernes bonussider og præsenterer de nyeste tilbud, så du altid har adgang til de mest aktuelle free spins deals.",
  },
];

interface RawOffer {
  id: string;
  casino_id: string | null;
  casino_name: string;
  casino_slug: string;
  offer_title: string;
  offer_description: string | null;
  free_spins_count: number | null;
  min_deposit: string | null;
  wagering_requirement: string | null;
  valid_until: string | null;
  offer_type: string;
  scraped_at: string;
}

// ─── Count-up animation hook ───
function useCountUp(target: number, duration = 1200): number {
  const [count, setCount] = useState(0);
  const ref = useRef<number>(0);
  useEffect(() => {
    if (target === 0) { setCount(0); return; }
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) ref.current = requestAnimationFrame(step);
    };
    ref.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(ref.current);
  }, [target, duration]);
  return count;
}

// ─── Countdown component ───
function Countdown({ validUntil }: { validUntil: string }) {
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    const update = () => {
      const end = new Date(validUntil);
      const now = new Date();
      if (end <= now) { setTimeLeft("Udløbet"); return; }
      const hrs = differenceInHours(end, now);
      const mins = differenceInMinutes(end, now) % 60;
      setTimeLeft(hrs > 24 ? `${Math.floor(hrs / 24)}d ${hrs % 24}t` : `${hrs}t ${mins}m`);
    };
    update();
    const i = setInterval(update, 60000);
    return () => clearInterval(i);
  }, [validUntil]);
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-destructive">
      <Timer className="h-3 w-3" /> {timeLeft}
    </span>
  );
}

// ─── Badge config ───
const offerTypeBadgeConfig: Record<string, { label: string; icon: React.ReactNode; className: string }> = {
  no_deposit: { label: "Uden indbetaling", icon: <Zap className="h-3 w-3" />, className: "bg-green-500/20 text-green-400 border-green-500/30" },
  welcome: { label: "Nye spillere", icon: <Star className="h-3 w-3" />, className: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  daily: { label: "Eksisterende spiller", icon: <Users className="h-3 w-3" />, className: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  existing: { label: "Eksisterende spiller", icon: <Users className="h-3 w-3" />, className: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  weekend: { label: "Weekend", icon: <Gift className="h-3 w-3" />, className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  vip: { label: "VIP", icon: <Award className="h-3 w-3" />, className: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
};

const FreeSpinsIDag = () => {
  const todayFormatted = format(new Date(), "d. MMMM yyyy", { locale: da });
  const { data: casinos } = useCasinos();

  // Query the new free_spin_campaigns table (primary source)
  const { data: campaigns, isLoading: loadingCampaigns } = useQuery({
    queryKey: ["free-spin-campaigns"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("free_spin_campaigns")
        .select("*")
        .eq("is_active", true)
        .order("spin_count", { ascending: false });
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });

  // Fallback: also query legacy table
  const { data: rawOffers, isLoading: loadingLegacy } = useQuery({
    queryKey: ["daily-free-spins-offers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("daily_free_spins_offers")
        .select("*")
        .eq("is_active", true)
        .order("free_spins_count", { ascending: false, nullsFirst: false });
      if (error) throw error;
      return data as RawOffer[];
    },
    staleTime: 5 * 60 * 1000,
    enabled: !campaigns || campaigns.length === 0,
  });

  const isLoading = loadingCampaigns || ((!campaigns || campaigns.length === 0) && loadingLegacy);

  // Map campaigns to a unified format
  const allFreeSpins: RawOffer[] = (campaigns && campaigns.length > 0)
    ? campaigns.map((c) => ({
        id: c.id,
        casino_id: c.casino_id,
        casino_name: c.casino_name,
        casino_slug: c.casino_slug,
        offer_title: c.title,
        offer_description: c.description,
        free_spins_count: c.spin_count,
        min_deposit: c.min_deposit,
        wagering_requirement: c.wagering_requirement,
        valid_until: c.expiry_date,
        offer_type: c.offer_type,
        scraped_at: c.last_checked,
      }))
    : (rawOffers?.filter(isFreeSpinsOffer) || []);

  // Categorize
  const noDepositOffers = allFreeSpins.filter((o) => o.offer_type === "no_deposit");
  const welcomeOffers = allFreeSpins.filter((o) => o.offer_type === "welcome");
  const existingOffers = allFreeSpins.filter((o) => ["daily", "existing", "weekend", "vip"].includes(o.offer_type));

  // Featured = highest free spins count
  const featured = allFreeSpins.length > 0 ? allFreeSpins[0] : null;
  const remainingOffers = allFreeSpins.slice(1);

  // Stats
  const totalCount = allFreeSpins.length;
  const noDepCount = noDepositOffers.length;
  const existingCount = existingOffers.length;

  const animatedTotal = useCountUp(totalCount);
  const animatedNoDep = useCountUp(noDepCount);
  const animatedExisting = useCountUp(existingCount);

  // Casino lookup for logos
  const getCasinoLogo = (slug: string) => casinos?.find((c) => c.slug === slug)?.logo_url || null;
  const getCasinoAffiliate = (slug: string) => casinos?.find((c) => c.slug === slug)?.affiliate_url || null;

  const lastUpdated = rawOffers?.[0]?.scraped_at
    ? format(new Date(rawOffers[0].scraped_at), "d. MMMM yyyy 'kl.' HH:mm", { locale: da })
    : todayFormatted;

  const schemaMarkup = [
    buildArticleSchema({
      headline: `Free Spins i Dag – ${todayFormatted}`,
      description: `Alle aktuelle free spins hos danske licenserede casinoer – opdateret ${todayFormatted}. Nye og eksisterende spillere.`,
      url: `${SITE_URL}/free-spins-i-dag`,
      datePublished: "2026-02-22",
      dateModified: new Date().toISOString().split("T")[0],
      authorName: "Jonas",
    }),
    buildFaqSchema(freeSpinsIDagFaqs.map((f) => ({ question: f.question, answer: f.answer }))),
    // ItemList schema
    {
      "@type": "ItemList",
      name: `Free Spins Tilbud – ${todayFormatted}`,
      numberOfItems: totalCount,
      itemListElement: allFreeSpins.slice(0, 10).map((o, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: o.offer_title,
        url: `${SITE_URL}/casino-anmeldelser/${o.casino_slug}`,
      })),
    },
  ];

  return (
    <>
      <SEO
        title={`Free Spins i Dag – ${todayFormatted} | Alle Tilbud`}
        description={`Vi viser alle aktuelle free spins hos danske licenserede casinoer – opdateret ${todayFormatted}. Find ${totalCount} tilbud for nye og eksisterende spillere.`}
        jsonLd={schemaMarkup}
        breadcrumbLabel="Free Spins i Dag"
      />

      {/* ─── Hero ─── */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{ backgroundImage: 'linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))' }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Opdateret {todayFormatted}
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Free Spins i Dag – Alle Aktuelle Tilbud
            </h1>
            <p className="text-lg text-white/80">
              Vi viser alle aktuelle free spins hos danske licenserede casinoer – både for nye og eksisterende spillere. Opdateres automatisk hver morgen kl. 07:00.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date={todayFormatted} readTime="3 min." />

        <div className="mb-8 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Free Spins i Dag – alle aktuelle free spins tilbud" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* Affiliate disclaimer */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6 p-3 rounded-lg bg-muted/30 border border-border/50">
          <ShieldCheck className="h-4 w-4 flex-shrink-0" />
          <span>Denne side indeholder affiliate-links. Alle casinoer er licenseret af <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> og overholder dansk lovgivning. 18+ | <Link to="/ansvarligt-spil" className={linkClass}>Spil ansvarligt</Link></span>
        </div>

        {/* ─── Statistics ─── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard icon={<Sparkles className="h-5 w-5 text-primary" />} value={animatedTotal} label="Free spins tilbud i dag" />
          <StatCard icon={<Zap className="h-5 w-5 text-green-400" />} value={animatedNoDep} label="Uden indbetaling" />
          <StatCard icon={<Users className="h-5 w-5 text-amber-400" />} value={animatedExisting} label="For eksisterende spillere" />
          <Card className="text-center border-border/50">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <RefreshCw className="h-5 w-5 text-primary" />
                <span className="text-lg font-bold text-primary">07:00</span>
              </div>
              <div className="text-xs text-muted-foreground">Opdateres dagligt</div>
            </CardContent>
          </Card>
        </div>

        {/* ─── Intro SEO text ─── */}
        <section className="prose prose-lg dark:prose-invert max-w-none mb-10">
          <h2 className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Dagens Free Spins – {todayFormatted}
          </h2>
          <p>
            Velkommen til vores dagligt opdaterede oversigt over alle free spins tilbud hos danske licenserede casinoer.
            Vi scanner automatisk casinoernes bonussider hver morgen kl. 07:00, så du altid ser de nyeste tilbud.
            Her finder du free spins for nye spillere, eksisterende spillere og free spins uden indbetaling.
          </p>
          <p>
            Vi anbefaler altid at læse{" "}
            <Link to="/omsaetningskrav" className={linkClass}>omsætningskravene</Link>{" "}
            grundigt, før du accepterer et tilbud.
          </p>
        </section>

        {/* ─── Content ─── */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse border-border/50">
                <CardContent className="h-36" />
              </Card>
            ))}
          </div>
        ) : allFreeSpins.length === 0 ? (
          /* Empty state */
          <div className="text-center py-16 px-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 mb-6">
              <Clock className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-3">Der er ingen free spins i dag</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-4">
              Vi opdaterer automatisk hver morgen kl. 07:00 CET. Tjek igen i morgen for de nyeste free spins tilbud fra danske casinoer.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <RefreshCw className="h-4 w-4" />
              <span>Sidst tjekket: {lastUpdated}</span>
            </div>
          </div>
        ) : (
          <>
            {/* Featured "Dagens Bedste" */}
            {featured && (
              <FeaturedOfferCard
                offer={featured}
                logoUrl={getCasinoLogo(featured.casino_slug)}
                affiliateUrl={getCasinoAffiliate(featured.casino_slug)}
              />
            )}

            {/* Section: Free Spins for Nye Spillere */}
            {welcomeOffers.length > 0 && (
              <OfferSection
                title="Free Spins for Nye Spillere"
                icon={<Star className="h-5 w-5 text-purple-400" />}
                offers={welcomeOffers.filter((o) => o.id !== featured?.id)}
                getCasinoLogo={getCasinoLogo}
                getCasinoAffiliate={getCasinoAffiliate}
              />
            )}

            {/* Section: Free Spins for Eksisterende Spillere */}
            {existingOffers.length > 0 && (
              <OfferSection
                title="Free Spins for Eksisterende Spillere"
                icon={<Users className="h-5 w-5 text-amber-400" />}
                offers={existingOffers.filter((o) => o.id !== featured?.id)}
                getCasinoLogo={getCasinoLogo}
                getCasinoAffiliate={getCasinoAffiliate}
              />
            )}

            {/* Section: Uden Indbetaling */}
            {noDepositOffers.length > 0 && (
              <OfferSection
                title="Free Spins Uden Indbetaling"
                icon={<Zap className="h-5 w-5 text-green-400" />}
                offers={noDepositOffers.filter((o) => o.id !== featured?.id)}
                getCasinoLogo={getCasinoLogo}
                getCasinoAffiliate={getCasinoAffiliate}
              />
            )}

            {/* If everything was "featured", show remaining */}
            {welcomeOffers.length === 0 && existingOffers.length === 0 && noDepositOffers.length === 0 && remainingOffers.length > 0 && (
              <OfferSection
                title="Alle Free Spins Tilbud"
                icon={<Sparkles className="h-5 w-5 text-primary" />}
                offers={remainingOffers}
                getCasinoLogo={getCasinoLogo}
                getCasinoAffiliate={getCasinoAffiliate}
              />
            )}
          </>
        )}

        {/* ─── SEO content ─── */}
        <Separator className="my-10" />

        <section className="prose prose-lg dark:prose-invert max-w-none mb-10">
          <h2 className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            Sådan Vælger Du det Bedste Free Spins Tilbud
          </h2>
          <p>
            Ikke alle free spins er skabt lige. Her er de vigtigste faktorer at overveje:
          </p>
          <ul>
            <li><strong>Omsætningskrav:</strong> Jo lavere omsætningskrav, desto lettere er det at omsætte dine gevinster. Under 30x er generelt godt.</li>
            <li><strong>Antal free spins:</strong> Flere spins giver flere chancer, men tjek spinværdien og hvilke spil de gælder til.</li>
            <li><strong>Spinværdi:</strong> En free spin på 1 kr. er mere værd end 0,10 kr. – tjek altid den faktiske spinværdi.</li>
            <li><strong>Tidsbegrænsning:</strong> De fleste free spins skal bruges inden for 7-30 dage.</li>
          </ul>

          <h2 className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-primary" />
            Vigtigt at Vide Om Free Spins
          </h2>
          <p>
            Alle casinoer på denne side er licenserede af{" "}
            <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link>{" "}
            og opererer lovligt i Danmark. Vi anbefaler altid{" "}
            <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>.
          </p>

          <h2 className="flex items-center gap-2">
            <Star className="h-6 w-6 text-primary" />
            Typer af Free Spins
          </h2>
          <ul>
            <li><strong>Velkomst free spins:</strong> Del af en velkomstpakke til nye spillere.</li>
            <li><strong><Link to="/bonus-uden-indbetaling" className={linkClass}>Free spins uden indbetaling</Link>:</strong> Kræver ingen indbetaling – spins ved registrering.</li>
            <li><strong>Daglige/ugentlige free spins:</strong> Løbende tilbud til eksisterende spillere.</li>
            <li><strong>VIP free spins:</strong> Eksklusive tilbud til loyale spillere.</li>
          </ul>
        </section>

        {/* Trust signals */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-8">
          <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> MitID-verificeret</span>
          <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-blue-500" /> Spillemyndigheden</span>
          <span className="inline-flex items-center gap-1"><AlertTriangle className="h-3.5 w-3.5 text-amber-500" /> ROFUS-registreret</span>
          <span className="inline-flex items-center gap-1"><Award className="h-3.5 w-3.5 text-primary" /> Redaktørens faktatjek</span>
        </div>

        <Separator className="my-10" />
        <RelatedGuides currentPath="/free-spins-i-dag" />
        <FAQSection title="Ofte Stillede Spørgsmål om Daglige Free Spins" faqs={freeSpinsIDagFaqs} />
        <Separator className="my-10" />
        <AuthorBio author="jonas" />
      </div>
    </>
  );
};

// ─── Stat Card ───
function StatCard({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <Card className="text-center border-border/50 hover:border-primary/30 transition-colors">
      <CardContent className="pt-5 pb-4">
        <div className="flex items-center justify-center gap-1.5 mb-1">
          {icon}
          <span className="text-2xl font-bold text-foreground">{value}</span>
        </div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  );
}

// ─── Featured Offer ───
function FeaturedOfferCard({ offer, logoUrl, affiliateUrl }: { offer: RawOffer; logoUrl: string | null; affiliateUrl: string | null }) {
  const badge = offerTypeBadgeConfig[offer.offer_type] || offerTypeBadgeConfig.welcome;
  return (
    <div className="relative mb-10 rounded-2xl overflow-hidden"
      style={{ backgroundImage: 'linear-gradient(135deg, hsl(260 50% 18%), hsl(250 40% 14%) 50%, hsl(210 60% 18%))' }}
    >
      <div className="absolute top-4 left-4">
        <Badge className="bg-orange-500/90 text-white border-0 text-sm font-bold px-3 py-1">
          <Flame className="h-3.5 w-3.5 mr-1" /> Dagens Bedste
        </Badge>
      </div>
      <div className="p-6 pt-14 md:p-8 md:pt-16 flex flex-col md:flex-row items-center gap-6">
        {/* Logo */}
        {logoUrl && (
          <div className="flex-shrink-0">
            <img
              src={logoUrl}
              alt={offer.casino_name}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-white/20"
              loading="lazy"
            />
          </div>
        )}
        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <Link to={`/casino-anmeldelser/${offer.casino_slug}`} className="text-xl font-bold text-white hover:text-primary transition-colors">
              {offer.casino_name}
            </Link>
            <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${badge.className}`}>
              {badge.icon} {badge.label}
            </span>
          </div>
          <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">
            {offer.free_spins_count || "?"} <span className="text-primary">Free Spins</span>
          </div>
          {offer.offer_description && (
            <p className="text-sm text-white/70 max-w-lg line-clamp-2 mb-3">{offer.offer_description}</p>
          )}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-white/60">
            {offer.wagering_requirement && (
              <span className="flex items-center gap-1"><RotateCcw className="h-3 w-3" /> {offer.wagering_requirement}</span>
            )}
            {offer.min_deposit && (
              <span className="flex items-center gap-1"><CreditCard className="h-3 w-3" /> Min: {offer.min_deposit}</span>
            )}
            {offer.valid_until && <Countdown validUntil={offer.valid_until} />}
          </div>
        </div>
        {/* CTA */}
        <div className="flex-shrink-0">
          {affiliateUrl ? (
            <a href={affiliateUrl} target="_blank" rel="noopener noreferrer nofollow">
              <Button size="lg" className="text-base font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow">
                <Sparkles className="h-4 w-4 mr-2" /> Få Free Spins
              </Button>
            </a>
          ) : (
            <Link to={`/casino-anmeldelser/${offer.casino_slug}`}>
              <Button size="lg" className="text-base font-bold">
                <Sparkles className="h-4 w-4 mr-2" /> Se Tilbud
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Section component ───
function OfferSection({
  title, icon, offers, getCasinoLogo, getCasinoAffiliate,
}: {
  title: string; icon: React.ReactNode; offers: RawOffer[];
  getCasinoLogo: (slug: string) => string | null;
  getCasinoAffiliate: (slug: string) => string | null;
}) {
  if (offers.length === 0) return null;
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        {icon} {title} ({offers.length})
      </h2>
      <div className="space-y-3">
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            logoUrl={getCasinoLogo(offer.casino_slug)}
            affiliateUrl={getCasinoAffiliate(offer.casino_slug)}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Offer Card ───
function OfferCard({ offer, logoUrl, affiliateUrl }: { offer: RawOffer; logoUrl: string | null; affiliateUrl: string | null }) {
  const badge = offerTypeBadgeConfig[offer.offer_type] || offerTypeBadgeConfig.welcome;
  const isExpiringSoon = offer.valid_until && differenceInHours(new Date(offer.valid_until), new Date()) < 24;

  return (
    <Card className="group hover:border-primary/40 transition-all duration-300 border-border/50 hover:shadow-lg hover:shadow-primary/5">
      <CardContent className="p-4 md:p-5">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={offer.casino_name}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border border-border/50"
                loading="lazy"
              />
            ) : (
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-muted flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Middle */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <Link
                to={`/casino-anmeldelser/${offer.casino_slug}`}
                className="font-bold text-foreground hover:text-primary transition-colors truncate"
              >
                {offer.casino_name}
              </Link>
              <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full border ${badge.className}`}>
                {badge.icon} {badge.label}
              </span>
              {isExpiringSoon && (
                <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                  <Timer className="h-2.5 w-2.5 mr-0.5" /> Udløber i dag
                </Badge>
              )}
            </div>
            <div className="text-xl md:text-2xl font-extrabold text-primary mb-0.5">
              {offer.free_spins_count} Free Spins
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              {offer.wagering_requirement && (
                <span className="flex items-center gap-1"><RotateCcw className="h-3 w-3" /> {offer.wagering_requirement}</span>
              )}
              {offer.min_deposit && (
                <span className="flex items-center gap-1"><CreditCard className="h-3 w-3" /> {offer.min_deposit}</span>
              )}
              {offer.valid_until && <Countdown validUntil={offer.valid_until} />}
            </div>
          </div>

          {/* CTA */}
          <div className="flex-shrink-0 hidden sm:block">
            {affiliateUrl ? (
              <a href={affiliateUrl} target="_blank" rel="noopener noreferrer nofollow">
                <Button className="group-hover:shadow-md group-hover:shadow-primary/20 transition-shadow">
                  Få Free Spins
                </Button>
              </a>
            ) : (
              <Link to={`/casino-anmeldelser/${offer.casino_slug}`}>
                <Button variant="outline">Se Tilbud</Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="sm:hidden mt-3">
          {affiliateUrl ? (
            <a href={affiliateUrl} target="_blank" rel="noopener noreferrer nofollow" className="block">
              <Button className="w-full">Få Free Spins</Button>
            </a>
          ) : (
            <Link to={`/casino-anmeldelser/${offer.casino_slug}`} className="block">
              <Button variant="outline" className="w-full">Se Tilbud</Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default FreeSpinsIDag;
