import React, { useEffect, useRef, useState } from "react";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { capWagerDisplay, capWagerInText, isWagerCompliant } from "@/lib/wagerCap";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { usePageLastmod } from "@/hooks/usePageLastmod";
import { getRouteLastmod } from "@/lib/seoRoutes";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import heroImage from "@/assets/heroes/free-spins-i-dag-hero.jpg";
import { RelatedGuides } from "@/components/RelatedGuides";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { FreeSpinsMoneyPageLinks } from "@/components/FreeSpinsMoneyPageLinks";
import { FAQSection } from "@/components/FAQSection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { useCasinos } from "@/hooks/useCasinos";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Sparkles, Clock, ShieldCheck, AlertTriangle, Star, RefreshCw,
  Flame, Timer, CreditCard, RotateCcw, Award, CheckCircle2,
  Users, Zap, Gift, Filter, ArrowRight, ChevronDown, Info,
  Gamepad2, CalendarClock,
} from "lucide-react";
import { format, differenceInHours, differenceInMinutes } from "date-fns";
import { da } from "date-fns/locale";

const linkClass = "text-primary underline hover:text-primary/80";

const freeSpinsIDagFaqs = [
  {
    question: "Hvordan finder I de daglige free spins tilbud?",
    answer: "Vi scanner dagligt danske casinoers kampagnesider direkte samt aggregator-sites som Casinopenge.dk og Spilxperten.com. Direkte kilder prioriteres for højere datakvalitet. Tilbuddene opdateres automatisk hver morgen kl. 07:00.",
  },
  {
    question: "Er free spins tilbuddene kun for nye spillere?",
    answer: "Nej! Mange casinoer tilbyder free spins til både nye og eksisterende spillere. Vi markerer tydeligt om et tilbud er en velkomstbonus eller et dagligt/ugentligt tilbud til eksisterende spillere.",
  },
  {
    question: "Har free spins omsætningskrav?",
    answer: "Ja, de fleste free spins kommer med omsætningskrav. Vi angiver altid omsætningskravet ved hvert tilbud, så du kan vælge det bedste tilbud baseret på dine præferencer. Vi viser kun verificerede omsætningskrav.",
  },
  {
    question: "Kan jeg få free spins uden indbetaling?",
    answer: "Ja, nogle casinoer tilbyder free spins helt uden indbetaling. Brug filteret 'Uden indbetaling' øverst for at se alle aktuelle tilbud uden indbetalingskrav.",
  },
  {
    question: "Hvor ofte opdateres denne side?",
    answer: "Siden opdateres automatisk hver dag kl. 07:00 CET med fuld scraping, og igen kl. 18:00 med hurtig verificering. Udløbne kampagner fjernes automatisk.",
  },
  {
    question: "Hvad betyder 'confidence score'?",
    answer: "Hver kampagne får en confidence score baseret på datakomplethed (0-100). Kampagner med score under 60 vises ikke. Direkte kilder fra casinoernes egne sider giver højere score end aggregator-data.",
  },
];

interface CampaignOffer {
  id: string;
  casino_id: string | null;
  casino_name: string;
  casino_slug: string;
  title: string;
  description: string | null;
  spin_count: number;
  min_deposit: string | null;
  wagering_requirement: string | null;
  expiry_date: string | null;
  offer_type: string;
  last_checked: string;
  score: number;
  requires_deposit: boolean;
  for_new_players: boolean;
  for_existing_players: boolean;
  source_type: string;
  game_name: string | null;
  required_action: string | null;
  spin_value: string | null;
  short_terms_summary: string | null;
  confidence_score: number | null;
  last_verified_at: string | null;
  campaign_period_start: string | null;
  campaign_period_end: string | null;
  // New structured fields
  deposit_amount: number | null;
  eligible_players: string | null;
  campaign_type: string | null;
  summary: string | null;
  full_terms_clean: string | null;
}

type FilterType = "all" | "new" | "existing" | "no_deposit";

const filterConfig: { id: FilterType; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "Alle Tilbud", icon: <Sparkles className="h-3.5 w-3.5" /> },
  { id: "new", label: "Nye Spillere", icon: <Star className="h-3.5 w-3.5" /> },
  { id: "existing", label: "Eksisterende", icon: <Users className="h-3.5 w-3.5" /> },
  { id: "no_deposit", label: "Uden Indbetaling", icon: <Zap className="h-3.5 w-3.5" /> },
];

// ─── Hooks ───
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

function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "for nylig";

  const now = new Date();
  const hrs = differenceInHours(now, date);
  const mins = Math.max(0, differenceInMinutes(now, date) % 60);

  if (hrs < 1) {
    if (mins < 2) return "lige nu";
    return `${mins} min. siden`;
  }

  if (hrs < 48) return `${hrs} timer siden`;

  const days = Math.floor(hrs / 24);
  return `${days} ${days === 1 ? "dag" : "dage"} siden`;
}

function getUpdateBadgeLabel(dateStr: string | null | undefined): string {
  if (!dateStr) return "Løbende verificeret";
  return `Verificeret ${timeAgo(dateStr)}`;
}

function Countdown({ validUntil }: { validUntil: string }) {
  const [timeLeft, setTimeLeft] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  useEffect(() => {
    const update = () => {
      const end = new Date(validUntil);
      const now = new Date();
      if (end <= now) { setTimeLeft("Udløbet"); setIsUrgent(false); return; }
      const hrs = differenceInHours(end, now);
      const mins = differenceInMinutes(end, now) % 60;
      setIsUrgent(hrs < 48);
      setTimeLeft(hrs > 24 ? `${Math.floor(hrs / 24)}d ${hrs % 24}t` : `${hrs}t ${mins}m`);
    };
    update();
    const i = setInterval(update, 60000);
    return () => clearInterval(i);
  }, [validUntil]);
  if (timeLeft === "Udløbet") return null;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium ${isUrgent ? "text-destructive animate-pulse" : "text-muted-foreground"}`}>
      <Timer className="h-3 w-3" /> {timeLeft}
      {isUrgent && <span className="text-[10px] font-bold uppercase tracking-wide">Snart!</span>}
    </span>
  );
}

// ─── Badge config ───
const offerTypeBadgeConfig: Record<string, { label: string; icon: React.ReactNode; className: string }> = {
  no_deposit: { label: "Uden indbetaling", icon: <Zap className="h-3 w-3" />, className: "bg-green-500/20 text-green-400 border-green-500/30" },
  welcome: { label: "Nye spillere", icon: <Star className="h-3 w-3" />, className: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  daily: { label: "Dagligt", icon: <RefreshCw className="h-3 w-3" />, className: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  existing: { label: "Eksisterende", icon: <Users className="h-3 w-3" />, className: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  weekly: { label: "Ugentligt", icon: <RefreshCw className="h-3 w-3" />, className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  weekend: { label: "Weekend", icon: <Gift className="h-3 w-3" />, className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  vip: { label: "VIP", icon: <Award className="h-3 w-3" />, className: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  other: { label: "Tilbud", icon: <Sparkles className="h-3 w-3" />, className: "bg-primary/20 text-primary border-primary/30" },
};

// ─── Helpers ───
function getBestPerCasino(campaigns: CampaignOffer[]): CampaignOffer[] {
  const bestMap = new Map<string, CampaignOffer>();
  for (const c of campaigns) {
    const existing = bestMap.get(c.casino_slug);
    if (!existing || (c.score ?? 0) > (existing.score ?? 0)) bestMap.set(c.casino_slug, c);
  }
  return Array.from(bestMap.values()).sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
}

function applyFilter(campaigns: CampaignOffer[], filter: FilterType): CampaignOffer[] {
  switch (filter) {
    case "new": return campaigns.filter(c => c.for_new_players || c.offer_type === "welcome");
    case "existing": return campaigns.filter(c => c.for_existing_players || ["daily", "existing", "weekend", "weekly"].includes(c.offer_type));
    case "no_deposit": return campaigns.filter(c => !c.requires_deposit || c.offer_type === "no_deposit");
    default: return campaigns;
  }
}

function getEligibilityLabel(offer: CampaignOffer): string | null {
  if (offer.eligible_players === "new") return "Nye spillere";
  if (offer.eligible_players === "existing") return "Eksisterende spillere";
  if (offer.eligible_players === "all") return "Alle spillere";
  if (offer.for_new_players && offer.for_existing_players) return "Alle spillere";
  if (offer.for_new_players) return "Nye spillere";
  if (offer.for_existing_players) return "Eksisterende spillere";
  return null;
}

// ─── Main Page ───
const FreeSpinsIDag = () => {
  const todayFormatted = format(new Date(), "d. MMMM yyyy", { locale: da });
  const { data: casinos } = useCasinos();
  const { data: pageMeta } = usePageLastmod("/free-spins-i-dag");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const { ref: statsRef, revealed: statsRevealed } = useScrollReveal();
  // cardsRef removed – cards now always animate-fade-in immediately

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ["free-spin-campaigns"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("free_spin_campaigns")
        .select("id,casino_id,casino_name,casino_slug,title,description,spin_count,min_deposit,wagering_requirement,expiry_date,offer_type,last_checked,score,requires_deposit,for_new_players,for_existing_players,source_type,game_name,required_action,spin_value,short_terms_summary,confidence_score,last_verified_at,campaign_period_start,campaign_period_end,deposit_amount,eligible_players,campaign_type,summary,full_terms_clean")
        .eq("is_active", true)
        .gt("spin_count", 0)
        .gte("confidence_score", 60)
        .order("score", { ascending: false });
      if (error) throw error;
      const now = new Date();
      return ((data || []) as unknown as CampaignOffer[])
        .filter((c) => {
          if (c.expiry_date && new Date(c.expiry_date) < now) return false;
          return true;
        })
        .map((c) => ({
          ...c,
          wagering_requirement: capWagerDisplay(c.wagering_requirement),
          description: capWagerInText(c.description),
          short_terms_summary: capWagerInText(c.short_terms_summary),
          summary: capWagerInText(c.summary),
          full_terms_clean: capWagerInText(c.full_terms_clean),
        }));
    },
    staleTime: 5 * 60 * 1000,
  });

  const filteredCampaigns = campaigns ? applyFilter(campaigns, activeFilter) : [];
  const bestOffers = getBestPerCasino(filteredCampaigns);
  const allBest = campaigns ? getBestPerCasino(campaigns) : [];
  const featured = allBest.find((o) => isWagerCompliant(o.wagering_requirement)) || allBest[0] || null;

  const totalCount = allBest.length;
  const noDepCount = campaigns ? getBestPerCasino(campaigns.filter(o => o.offer_type === "no_deposit" || !o.requires_deposit)).length : 0;
  const existingCount = campaigns ? getBestPerCasino(campaigns.filter(o => ["daily", "existing", "weekend", "weekly"].includes(o.offer_type))).length : 0;

  const animatedTotal = useCountUp(statsRevealed ? totalCount : 0);
  const animatedNoDep = useCountUp(statsRevealed ? noDepCount : 0);
  const animatedExisting = useCountUp(statsRevealed ? existingCount : 0);

  const getCasinoLogo = (slug: string) => casinos?.find(c => c.slug === slug)?.logo_url || null;
  const getCasinoAffiliate = (slug: string) => casinos?.find(c => c.slug === slug)?.affiliate_url || null;
  const latestChecked = campaigns?.[0]?.last_checked;
  const seoDateModified = pageMeta?.updated_at ?? latestChecked ?? getRouteLastmod("/free-spins-i-dag");

  const schemaMarkup = [
    buildArticleSchema({
      headline: "Free Spins i Dag – Aktuelle tilbud fra danske casinoer",
      description: "Alle aktuelle free spins hos danske licenserede casinoer for nye og eksisterende spillere. Sammenlign spins, omsætningskrav og indbetalingskrav.",
      url: `${SITE_URL}/free-spins-i-dag`,
      datePublished: "2026-02-22",
      dateModified: seoDateModified,
      authorName: "Jonas",
    }),
    buildFaqSchema(freeSpinsIDagFaqs.map(f => ({ question: f.question, answer: f.answer }))),
    {
      "@type": "ItemList",
      name: "Free Spins Tilbud fra danske casinoer",
      numberOfItems: totalCount,
      itemListElement: allBest.slice(0, 10).map((o, i) => ({
        "@type": "ListItem", position: i + 1,
        item: {
          "@type": "Thing",
          name: `${o.casino_name} – ${o.spin_count} Free Spins`,
          url: `${SITE_URL}/casino-anmeldelser/${o.casino_slug}`,
        },
      })),
    },
  ];

  const displayOffers = bestOffers.filter(o => o.id !== featured?.id);

  return (
    <>
      <SEO
        title={`Free Spins i Dag (2026) – Gratis Spins Uden Indbetaling`}
        description={`Opdateret dagligt: ${totalCount} danske free spins tilbud – til nye og eksisterende spillere. Sammenlign omsætningskrav og find de bedste free spins uden indbetaling.`}
        jsonLd={schemaMarkup}
        breadcrumbLabel="Free Spins i Dag"
      />

      {/* ─── Hero ─── */}
      <section
        className="relative overflow-hidden py-10 md:py-16 text-white"
        style={{
          backgroundImage: `linear-gradient(135deg, hsl(260 70% 18% / 0.95), hsl(250 60% 12% / 0.93) 40%, hsl(210 80% 18% / 0.92)), url(${heroImage})`,
          backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="fs-orb fs-orb-1" />
          <div className="fs-orb fs-orb-2" />
          <div className="fs-orb fs-orb-3" />
        </div>

        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1.5 text-xs font-medium mb-4 animate-fade-in">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
              </span>
              {latestChecked ? <span>{getUpdateBadgeLabel(latestChecked)}</span> : <span>Opdateret i dag</span>}
            </div>

            <h1 className="mb-3 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl animate-fade-in [animation-delay:100ms]">
              <span className="text-white">Free Spins i Dag</span>{" – "}
              <span className="fs-hero-count bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {totalCount > 0 ? `${totalCount} Aktive Tilbud` : "Alle Aktuelle Tilbud"}
              </span>
            </h1>
            <p className="mb-5 text-sm md:text-base text-white/75 max-w-lg mx-auto animate-fade-in [animation-delay:200ms]">
              Verificerede kampagner fra danske licenserede casinoer – direkte fra kilderne.
            </p>
            <div className="flex flex-wrap justify-center gap-3 animate-fade-in [animation-delay:300ms]">
              <Button size="lg" asChild className="fs-cta-glow font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.03] transition-all duration-250">
                <a href="#free-spins-list"><Sparkles className="mr-2 h-5 w-5" />Se Alle Tilbud</a>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-white/10 border-white/25 text-white hover:bg-white/20 hover:scale-[1.03] transition-all duration-250 backdrop-blur-sm">
                <a href="#free-spins-list"><Zap className="mr-2 h-5 w-5" />Uden Indbetaling</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Meta + Trust bar ─── */}
      <div className="border-b border-border/30">
        <div className="container py-3">
          <div className="text-xs text-muted-foreground">
            <AuthorMetaBar author="jonas" readTime="3 min." />
          </div>
        </div>
      </div>

      <div className="container py-4 md:py-6">
        {/* ─── Statistics ─── */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <StatCard icon={<Sparkles className="h-5 w-5 text-primary" />} value={animatedTotal} label="Casinoer med free spins" revealed={statsRevealed} delay={0} />
          <StatCard icon={<Zap className="h-5 w-5 text-green-400" />} value={animatedNoDep} label="Uden indbetaling" revealed={statsRevealed} delay={100} />
          <StatCard icon={<Users className="h-5 w-5 text-amber-400" />} value={animatedExisting} label="For eksisterende spillere" revealed={statsRevealed} delay={200} />
          <Card className={`text-center border-border/50 group hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-250 ${statsRevealed ? 'animate-fade-in [animation-delay:300ms]' : 'opacity-0'}`}>
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <RefreshCw className="h-5 w-5 text-primary group-hover:animate-spin" style={{ animationDuration: '2s' }} />
                <span className="text-lg font-bold text-primary">07:00</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                </span>
                Opdateres dagligt
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ─── Filter Tabs ─── */}
        <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Filtrer free spins tilbud" id="free-spins-list">
          {filterConfig.map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              aria-pressed={activeFilter === f.id}
              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-250 ${
                activeFilter === f.id
                  ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "border-border bg-card text-foreground hover:border-primary/50 hover:shadow-sm"
              }`}
            >
              {f.icon} {f.label}
              {f.id === "all" && totalCount > 0 && <span className="ml-1 text-xs opacity-75">({totalCount})</span>}
            </button>
          ))}
        </div>

        {/* ─── Content ─── */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <Card key={i} className="animate-pulse border-border/50"><CardContent className="h-36" /></Card>
            ))}
          </div>
        ) : bestOffers.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 mb-6">
              <Clock className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-3">
              {activeFilter === "all" ? "Ingen aktive free spins i dag" : `Ingen tilbud matcher filteret "${filterConfig.find(f => f.id === activeFilter)?.label}"`}
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-4">
              {activeFilter === "all" ? "Vi opdaterer automatisk hver morgen kl. 07:00 CET." : "Prøv et andet filter eller tjek igen senere."}
            </p>
            {activeFilter !== "all" && <Button variant="outline" onClick={() => setActiveFilter("all")}>Vis alle tilbud</Button>}
          </div>
        ) : (
          <>
            {featured && activeFilter === "all" && (
              <FeaturedOfferCard offer={featured} logoUrl={getCasinoLogo(featured.casino_slug)} affiliateUrl={getCasinoAffiliate(featured.casino_slug)} />
            )}

            <section className="mb-8 py-6 rounded-xl bg-muted/15">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5 text-primary" />
                {activeFilter === "all" ? "Alle Free Spins Tilbud" : filterConfig.find(f => f.id === activeFilter)?.label} ({displayOffers.length})
              </h2>
              <div className="grid gap-3 md:grid-cols-2">
                {displayOffers.map((offer, idx) => (
                  <div key={offer.id} className="animate-fade-in" style={{ animationDelay: `${idx * 60}ms` }}>
                    <OfferCard offer={offer} logoUrl={getCasinoLogo(offer.casino_slug)} affiliateUrl={getCasinoAffiliate(offer.casino_slug)} />
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        <Separator className="my-8" />

        {/* Money-page routing: dofollow links to casino reviews */}
        {allBest.length >= 3 && (
          <FreeSpinsMoneyPageLinks campaigns={allBest} />
        )}

        {/* SEO content */}
        <div className="mt-4">
          <section className="mb-8">
            <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-3">
              <Sparkles className="h-5 w-5 text-primary" />Dagens Free Spins – {todayFormatted}
            </h2>
            <p className="text-sm leading-[1.75] text-muted-foreground">
              Opdateret oversigt over free spins hos danske casinoer pr. marts 2026. Vi scraper direkte fra casinoernes kampagnesider og bruger aggregator-data som supplement – kun kampagner med tilstrækkelig datakvalitet (confidence score ≥ 60) vises. Flere danske casinoer kører i øjeblikket forårs- og forårskampagner med ekstra free spins. Rangeret efter spins, <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> og indbetalingskrav.
            </p>
          </section>

          <section className="mb-8 rounded-xl border border-border/40 bg-card/50 p-5 md:p-6">
            <h3 className="flex items-center gap-2 text-base font-semibold text-foreground mb-4">
              <ShieldCheck className="h-5 w-5 text-primary" />Sådan vælger du det bedste tilbud
            </h3>
            <ul className="grid gap-2.5 text-sm leading-[1.7] text-muted-foreground">
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" /><span><span className="text-primary font-medium">Omsætningskrav</span> – under 10x er godt. Jo lavere, desto lettere at omsætte gevinster.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" /><span><span className="text-primary font-medium">Spinværdi</span> – en free spin på 1 kr. slår 0,10 kr. Tjek den faktiske værdi.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" /><span><span className="text-primary font-medium">Antal spins</span> – flere chancer, men tjek hvilke spil de gælder til.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" /><span><span className="text-primary font-medium">Tidsbegrænsning</span> – de fleste skal bruges inden for 7–30 dage.</span></li>
            </ul>
          </section>

          <section className="mb-8 rounded-xl border border-border/40 bg-card/50 p-5 md:p-6">
            <h3 className="flex items-center gap-2 text-base font-semibold text-foreground mb-3">
              <AlertTriangle className="h-5 w-5 text-primary" />Vigtigt at vide
            </h3>
            <p className="text-sm leading-[1.75] text-muted-foreground">
              Alle casinoer er licenserede af <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link>. Bonusser er maks. 1.000 kr. med maks. 10x omsætningskrav jf. dansk lovgivning. Pr. marts 2026 har Spillemyndigheden skærpet kravene til gennemsigtighed i bonusvilkår, hvilket gør det endnu vigtigere at sammenligne tilbud. Vi anbefaler altid <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="flex items-center gap-2 text-base font-semibold text-foreground mb-4">
              <Star className="h-5 w-5 text-primary" />Typer af free spins
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: Gift, title: "Velkomst free spins", desc: "Del af en velkomstpakke til nye spillere." },
                { icon: Zap, title: "Uden indbetaling", desc: <>Kræver ingen indbetaling – <Link to="/bonus-uden-indbetaling" className={linkClass}>spins ved registrering</Link>.</> },
                { icon: RefreshCw, title: "Daglige/ugentlige", desc: "Løbende tilbud til eksisterende spillere." },
                { icon: Award, title: "VIP free spins", desc: "Eksklusive tilbud til loyale spillere." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-xl border border-border/40 bg-card/50 p-4 flex gap-3 items-start">
                  <div className="rounded-lg bg-primary/10 p-2 flex-shrink-0"><Icon className="h-4 w-4 text-primary" /></div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-0.5">{title}</p>
                    <p className="text-xs leading-relaxed text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-6">
            <span className="inline-flex items-center gap-1"><Award className="h-3.5 w-3.5 text-primary" /> Redaktørens faktatjek</span>
            <span className="inline-flex items-center gap-1"><RefreshCw className="h-3.5 w-3.5 text-muted-foreground" /> Sidst opdateret: {todayFormatted}</span>
          </div>
        </div>

        <Separator className="my-8" />
        <LatestNewsByCategory pagePath="/free-spins-i-dag" />
        <RelatedGuides currentPath="/free-spins-i-dag" />
        <FAQSection title="Ofte Stillede Spørgsmål om Daglige Free Spins" faqs={freeSpinsIDagFaqs} />
        <AuthorBio author="jonas" />
      </div>

      <style>{`
        .fs-orb { position: absolute; border-radius: 9999px; filter: blur(60px); opacity: 0.18; will-change: transform; }
        .fs-orb-1 { width: 220px; height: 220px; background: hsl(260 70% 60%); top: 10%; left: 5%; animation: fs-float 8s ease-in-out infinite; }
        .fs-orb-2 { width: 300px; height: 300px; background: hsl(210 80% 55%); bottom: 5%; right: 5%; animation: fs-float 10s ease-in-out infinite 1.5s; }
        .fs-orb-3 { width: 160px; height: 160px; background: hsl(230 70% 50%); top: 50%; left: 40%; animation: fs-float 7s ease-in-out infinite 0.8s; }
        @keyframes fs-float {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); }
          25% { transform: translateY(-18px) translateX(8px) scale(1.03); }
          50% { transform: translateY(-6px) translateX(-10px) scale(0.98); }
          75% { transform: translateY(-22px) translateX(5px) scale(1.02); }
        }
        .fs-cta-glow { position: relative; overflow: hidden; }
        .fs-cta-glow::after {
          content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
          background: linear-gradient(115deg, transparent 20%, hsl(0 0% 100% / 0.15) 40%, hsl(0 0% 100% / 0.25) 50%, hsl(0 0% 100% / 0.15) 60%, transparent 80%);
          animation: fs-shimmer 3s ease-in-out infinite;
        }
        @keyframes fs-shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .fs-featured-glow { position: relative; }
        .fs-featured-glow::before {
          content: ''; position: absolute; inset: -2px; border-radius: 1rem;
          background: linear-gradient(135deg, hsl(260 70% 50% / 0.3), hsl(210 80% 50% / 0.2));
          z-index: -1; filter: blur(12px); opacity: 0; transition: opacity 0.3s ease;
        }
        .fs-featured-glow:hover::before { opacity: 1; }
        .fs-hero-count { text-shadow: 0 0 40px hsl(260 70% 60% / 0.4), 0 0 80px hsl(210 80% 55% / 0.2); }
        .animate-fade-in { animation: fs-fade-in 0.5s ease-out both; }
        @keyframes fs-fade-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <StickyCtaBySlug slug="spilleautomaten" />
    </>
  );
};

// ─── Stat Card ───
function StatCard({ icon, value, label, revealed, delay }: { icon: React.ReactNode; value: number; label: string; revealed: boolean; delay: number }) {
  return (
    <Card className={`text-center border-border/50 group hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 ${revealed ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: `${delay}ms` }}>
      <CardContent className="pt-5 pb-4">
        <div className="flex items-center justify-center gap-1.5 mb-1">
          <span className="group-hover:scale-110 transition-transform duration-300">{icon}</span>
          <span className="text-2xl font-bold text-foreground">{value}</span>
        </div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  );
}

// ─── Featured Offer (structured data only) ───
function FeaturedOfferCard({ offer, logoUrl, affiliateUrl }: { offer: CampaignOffer; logoUrl: string | null; affiliateUrl: string | null }) {
  const badge = offerTypeBadgeConfig[offer.offer_type] || offerTypeBadgeConfig.welcome;
  const freshnessLabel = getUpdateBadgeLabel(offer.last_verified_at || offer.last_checked);
  const eligibility = getEligibilityLabel(offer);

  return (
    <div
      className="fs-featured-glow relative mb-10 rounded-2xl overflow-hidden group hover:-translate-y-1.5 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
      style={{ backgroundImage: 'linear-gradient(135deg, hsl(260 50% 18%), hsl(250 40% 14%) 50%, hsl(210 60% 18%))' }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/10 blur-[80px] pointer-events-none" />

      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <Badge className="bg-orange-500/90 text-white border-0 text-sm font-bold px-3 py-1 shadow-lg shadow-orange-500/30">
          <Flame className="h-3.5 w-3.5 mr-1" /> Dagens Bedste
        </Badge>
        {freshnessLabel && (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs px-2 py-1">
            <ShieldCheck className="h-3 w-3 mr-1" /> {freshnessLabel}
          </Badge>
        )}
      </div>

      <div className="relative p-6 pt-14 md:p-8 md:pt-16 flex flex-col md:flex-row items-center gap-6">
        {logoUrl && (
          <div className="flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
            <img src={logoUrl} alt={offer.casino_name} width={80} height={80} className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-white/20 shadow-lg" loading="lazy" />
          </div>
        )}
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <Link to={`/casino-anmeldelser/${offer.casino_slug}`} className="text-xl font-bold text-white hover:text-primary transition-colors">
              {offer.casino_name}
            </Link>
            <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${badge.className}`}>
              {badge.icon} {badge.label}
            </span>
          </div>

          <div className="text-4xl md:text-5xl font-extrabold text-white mb-3">
            <span>{offer.spin_count}</span> <span className="text-primary">Free Spins</span>
          </div>

          {/* Structured metadata tags */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-1.5 text-xs text-white/60">
            {offer.game_name && (
              <span className="flex items-center gap-1"><Gamepad2 className="h-3 w-3" /> {offer.game_name}</span>
            )}
            {capWagerDisplay(offer.wagering_requirement) && (
              <span className="flex items-center gap-1"><RotateCcw className="h-3 w-3" /> {capWagerDisplay(offer.wagering_requirement)}</span>
            )}
            {!offer.requires_deposit ? (
              <span className="flex items-center gap-1 text-green-400 font-medium"><Zap className="h-3 w-3" /> Ingen indbetaling</span>
            ) : offer.min_deposit && (
              <span className="flex items-center gap-1"><CreditCard className="h-3 w-3" /> Min. {offer.min_deposit}</span>
            )}
            {eligibility && (
              <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {eligibility}</span>
            )}
            {offer.spin_value && (
              <span className="flex items-center gap-1"><Award className="h-3 w-3" /> {offer.spin_value}/spin</span>
            )}
            {offer.expiry_date && (
              <span className="flex items-center gap-1"><CalendarClock className="h-3 w-3" /> <Countdown validUntil={offer.expiry_date} /></span>
            )}
          </div>

          {/* Summary from structured data */}
          {(offer.summary || offer.description) && (
            <p className="mt-2 text-xs text-white/40 line-clamp-2">{capWagerInText(offer.summary || offer.description)}</p>
          )}
        </div>

        <div className="flex-shrink-0">
          {affiliateUrl ? (
            <a href={affiliateUrl} target="_blank" rel="noopener noreferrer nofollow">
              <Button variant="cta" size="lg" className="text-base group-hover:scale-105 transition-all duration-300">
                <Sparkles className="h-4 w-4 mr-2" /> Få Free Spins <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </a>
          ) : (
            <Link to={`/casino-anmeldelser/${offer.casino_slug}`}>
              <Button variant="cta" size="lg" className="text-base group-hover:scale-105 transition-all duration-300">
                <Sparkles className="h-4 w-4 mr-2" /> Se Tilbud <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Offer Card (structured data only – no frontend text parsing) ───
function OfferCard({ offer, logoUrl, affiliateUrl }: { offer: CampaignOffer; logoUrl: string | null; affiliateUrl: string | null }) {
  const badge = offerTypeBadgeConfig[offer.offer_type] || offerTypeBadgeConfig.welcome;
  const isExpiringSoon = offer.expiry_date && differenceInHours(new Date(offer.expiry_date), new Date()) < 48;
  const eligibility = getEligibilityLabel(offer);
  const freshnessLabel = getUpdateBadgeLabel(offer.last_verified_at || offer.last_checked);

  return (
    <Card className="group hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 border-border/50 hover:shadow-lg hover:shadow-primary/10">
      <CardContent className="p-4 md:p-5">
        {/* Top: Casino + Title + Badges */}
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
            {logoUrl ? (
              <img src={logoUrl} alt={offer.casino_name} width={44} height={44} className="w-11 h-11 rounded-full object-cover border border-border/50" loading="lazy" />
            ) : (
              <div className="w-11 h-11 rounded-full bg-muted flex items-center justify-center text-lg font-bold text-muted-foreground">
                {offer.casino_name.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Link to={`/casino-anmeldelser/${offer.casino_slug}`} className="font-bold text-sm text-foreground hover:text-primary transition-colors truncate">
                {offer.casino_name}
              </Link>
              <span className={`inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-full border ${badge.className}`}>
                {badge.icon} {badge.label}
              </span>
              {freshnessLabel && (
                <TooltipProvider><Tooltip><TooltipTrigger>
                  <span className="inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-full border bg-green-500/10 text-green-400 border-green-500/20">
                    <ShieldCheck className="h-2.5 w-2.5" /> {freshnessLabel}
                  </span>
                </TooltipTrigger><TooltipContent><p className="text-xs">Sidst verificeret: {offer.last_verified_at ? timeAgo(offer.last_verified_at) : "Ukendt"}</p></TooltipContent></Tooltip></TooltipProvider>
              )}
              {isExpiringSoon && (
                <span className="inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-full border bg-destructive/10 text-destructive border-destructive/20 animate-pulse">
                  <Timer className="h-2.5 w-2.5" /> Snart!
                </span>
              )}
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-2xl font-extrabold text-primary leading-tight">{offer.spin_count}</div>
            <div className="text-[10px] text-muted-foreground font-medium">Free Spins</div>
          </div>
        </div>

        {/* Structured metadata tags – directly from DB fields, NO text parsing */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-muted-foreground mb-3">
          {offer.game_name && (
            <div className="flex items-center gap-1.5">
              <Gamepad2 className="h-3 w-3 text-primary/60 flex-shrink-0" />
              <span className="truncate">{offer.game_name}</span>
            </div>
          )}
          {!offer.requires_deposit ? (
            <div className="flex items-center gap-1.5 text-green-400">
              <Zap className="h-3 w-3 flex-shrink-0" />
              <span className="font-medium">Ingen indbetaling</span>
            </div>
          ) : offer.min_deposit && (
            <div className="flex items-center gap-1.5">
              <CreditCard className="h-3 w-3 text-primary/60 flex-shrink-0" />
              <span>Min. {offer.min_deposit}</span>
            </div>
          )}
          {capWagerDisplay(offer.wagering_requirement) && (
            <div className="flex items-center gap-1.5">
              <RotateCcw className="h-3 w-3 text-primary/60 flex-shrink-0" />
              <span>Omsætning: {capWagerDisplay(offer.wagering_requirement)}</span>
            </div>
          )}
          {eligibility && (
            <div className="flex items-center gap-1.5">
              <Users className="h-3 w-3 text-primary/60 flex-shrink-0" />
              <span>{eligibility}</span>
            </div>
          )}
          {offer.spin_value && (
            <div className="flex items-center gap-1.5">
              <Award className="h-3 w-3 text-primary/60 flex-shrink-0" />
              <span>{offer.spin_value}/spin</span>
            </div>
          )}
          {offer.expiry_date && (
            <div className="flex items-center gap-1.5">
              <CalendarClock className="h-3 w-3 text-primary/60 flex-shrink-0" />
              <Countdown validUntil={offer.expiry_date} />
            </div>
          )}
        </div>

        {/* Expandable full terms – clean text from DB, not parsed */}
        {offer.full_terms_clean && (
          <Collapsible>
            <CollapsibleTrigger className="flex items-center gap-1 text-[11px] text-primary/70 hover:text-primary transition-colors mb-2">
              <ChevronDown className="h-3 w-3" /> Se alle vilkår
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="rounded-lg border border-border/30 bg-muted/20 p-4 text-xs text-muted-foreground mb-2 max-w-[650px]" style={{ lineHeight: '1.7', fontSize: '14px' }}>
                {(capWagerInText(offer.full_terms_clean) || "").split("\n").map((line, i) => (
                  <p key={i} className="mb-1">{line}</p>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground/50">
            {offer.last_verified_at && (
              <span className="flex items-center gap-0.5"><Clock className="h-2.5 w-2.5" /> {timeAgo(offer.last_verified_at)}</span>
            )}
            {offer.source_type === "direct" && (
              <TooltipProvider><Tooltip><TooltipTrigger>
                <span className="flex items-center gap-0.5 text-green-500/60"><Info className="h-2.5 w-2.5" /> Direkte kilde</span>
              </TooltipTrigger><TooltipContent><p className="text-xs">Data hentet direkte fra casinoets hjemmeside</p></TooltipContent></Tooltip></TooltipProvider>
            )}
          </div>
          {affiliateUrl ? (
            <a href={affiliateUrl} target="_blank" rel="noopener noreferrer nofollow">
              <Button variant="cta" size="sm" className="text-xs font-semibold group-hover:scale-105 transition-transform">
                Se Tilbud <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </a>
          ) : (
            <Link to={`/casino-anmeldelser/${offer.casino_slug}`}>
              <Button variant="cta" size="sm" className="text-xs font-semibold group-hover:scale-105 transition-transform">
                Se Tilbud <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default FreeSpinsIDag;
