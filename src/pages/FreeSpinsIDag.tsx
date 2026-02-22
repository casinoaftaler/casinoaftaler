import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { RelatedGuides } from "@/components/RelatedGuides";
import { FAQSection } from "@/components/FAQSection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Gift,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Star,
  RefreshCw,
  CalendarDays,
} from "lucide-react";
import { format } from "date-fns";
import { da } from "date-fns/locale";

const linkClass = "text-primary underline hover:text-primary/80";

const freeSpinsIDagFaqs = [
  {
    question: "Hvordan finder I de daglige free spins tilbud?",
    answer: "Vi scanner dagligt vores partner-casinoers bonussider for at finde de nyeste og bedste free spins tilbud til danske spillere. Tilbuddene opdateres automatisk hver morgen.",
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
    answer: (
      <>
        Ja, nogle casinoer tilbyder free spins helt uden indbetaling. Se vores dedikerede guide til{" "}
        <Link to="/bonus-uden-indbetaling" className={linkClass}>
          bonus uden indbetaling
        </Link>{" "}
        for alle aktuelle tilbud.
      </>
    ),
  },
  {
    question: "Hvor ofte opdateres denne side?",
    answer: "Siden opdateres automatisk hver dag kl. 07:00. Vi scanner casinoernes bonussider og præsenterer de nyeste tilbud, så du altid har adgang til de mest aktuelle free spins deals.",
  },
];

interface FreeSpinsOffer {
  id: string;
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

const offerTypeBadge: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  welcome: { label: "Velkomst", variant: "default" },
  daily: { label: "Dagligt", variant: "secondary" },
  weekend: { label: "Weekend", variant: "secondary" },
  vip: { label: "VIP", variant: "outline" },
  no_deposit: { label: "Uden indbetaling", variant: "destructive" },
};

const FreeSpinsIDag = () => {
  const todayFormatted = format(new Date(), "d. MMMM yyyy", { locale: da });

  const { data: offers, isLoading } = useQuery({
    queryKey: ["daily-free-spins-offers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("daily_free_spins_offers")
        .select("*")
        .eq("is_active", true)
        .order("free_spins_count", { ascending: false, nullsFirst: false });

      if (error) throw error;
      return data as FreeSpinsOffer[];
    },
    staleTime: 5 * 60 * 1000, // 5 min cache
  });

  const freeSpinsOffers = offers?.filter((o) => o.free_spins_count && o.free_spins_count > 0) || [];
  const bonusOffers = offers?.filter((o) => !o.free_spins_count || o.free_spins_count === 0) || [];
  const lastUpdated = offers?.[0]?.scraped_at ? format(new Date(offers[0].scraped_at), "d. MMMM yyyy 'kl.' HH:mm", { locale: da }) : todayFormatted;

  const schemaMarkup = [
    buildArticleSchema({
      headline: `Free Spins i Dag – ${todayFormatted} | Daglige Tilbud`,
      description: `Se dagens bedste free spins tilbud fra danske casinoer. Opdateret ${todayFormatted}. Find gratis spins med og uden indbetaling.`,
      url: `${SITE_URL}/free-spins-i-dag`,
      datePublished: "2026-02-22",
      dateModified: new Date().toISOString().split("T")[0],
      authorName: "Jonas",
    }),
    buildFaqSchema(freeSpinsIDagFaqs.map((f) => ({
      question: f.question,
      answer: typeof f.answer === "string" ? f.answer : "Se svaret på vores hjemmeside.",
    }))),
  ];

  return (
    <>
      <SEO
        title={`Free Spins i Dag – ${todayFormatted} | Bedste Tilbud`}
        description={`Opdateret dagligt: Se ${freeSpinsOffers.length}+ free spins tilbud fra danske casinoer. Find gratis spins med lave omsætningskrav – sidst opdateret ${todayFormatted}.`}
        jsonLd={schemaMarkup}
      />

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero */}
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Link to="/" className={linkClass}>Forside</Link>
            <span>/</span>
            <Link to="/casino-bonus" className={linkClass}>Casino Bonus</Link>
            <span>/</span>
            <Link to="/free-spins" className={linkClass}>Free Spins</Link>
            <span>/</span>
            <span className="text-foreground">I Dag</span>
          </div>

          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-2xl p-6 md:p-10 border border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-primary/20">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Free Spins i Dag
                </h1>
                <p className="text-muted-foreground flex items-center gap-2 mt-1">
                  <CalendarDays className="h-4 w-4" />
                  Opdateret: {lastUpdated}
                </p>
              </div>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Se dagens bedste free spins tilbud fra licenserede danske casinoer. Vi scanner
              automatisk casinoernes bonussider hver morgen, så du altid får de nyeste tilbud.
            </p>
          </div>
        </header>

        <AuthorMetaBar
          author="jonas"
          date={todayFormatted}
          readTime="3 min."
        />

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          <Card className="text-center">
            <CardContent className="pt-4 pb-3">
              <div className="text-2xl font-bold text-primary">{freeSpinsOffers.length}</div>
              <div className="text-xs text-muted-foreground">Free Spins Tilbud</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4 pb-3">
              <div className="text-2xl font-bold text-primary">{bonusOffers.length}</div>
              <div className="text-xs text-muted-foreground">Bonus Tilbud</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4 pb-3">
              <div className="text-2xl font-bold text-primary">
                {offers?.filter((o) => o.offer_type === "no_deposit").length || 0}
              </div>
              <div className="text-xs text-muted-foreground">Uden Indbetaling</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4 pb-3">
              <div className="flex items-center justify-center gap-1">
                <RefreshCw className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">07:00</span>
              </div>
              <div className="text-xs text-muted-foreground">Daglig Opdatering</div>
            </CardContent>
          </Card>
        </div>

        {/* Intro content for SEO */}
        <section className="prose prose-lg dark:prose-invert max-w-none mb-10">
          <h2 className="flex items-center gap-2">
            <Gift className="h-6 w-6 text-primary" />
            Dagens Free Spins Tilbud – {todayFormatted}
          </h2>
          <p>
            Velkommen til vores dagligt opdaterede oversigt over free spins tilbud hos danske
            licenserede casinoer. Denne side scanner automatisk casinoernes bonussider hver
            morgen kl. 07:00, så du altid har adgang til de mest aktuelle tilbud.
          </p>
          <p>
            Free spins er en af de mest populære bonustyper hos danske casinoer. De giver dig
            mulighed for at spille gratis på udvalgte spillemaskiner – ofte med chance for ægte
            gevinster. Vi anbefaler altid at læse{" "}
            <Link to="/omsaetningskrav" className={linkClass}>omsætningskravene</Link>{" "}
            grundigt, før du accepterer et tilbud.
          </p>
        </section>

        {/* Free Spins offers */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="h-32" />
              </Card>
            ))}
          </div>
        ) : (
          <>
            {freeSpinsOffers.length > 0 && (
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  Free Spins Tilbud ({freeSpinsOffers.length})
                </h2>
                <div className="space-y-4">
                  {freeSpinsOffers.map((offer) => (
                    <OfferCard key={offer.id} offer={offer} />
                  ))}
                </div>
              </section>
            )}

            {bonusOffers.length > 0 && (
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Gift className="h-6 w-6 text-primary" />
                  Bonus Tilbud ({bonusOffers.length})
                </h2>
                <div className="space-y-4">
                  {bonusOffers.map((offer) => (
                    <OfferCard key={offer.id} offer={offer} />
                  ))}
                </div>
              </section>
            )}

            {(!offers || offers.length === 0) && (
              <Card className="text-center py-12">
                <CardContent>
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Tilbud på vej</h3>
                  <p className="text-muted-foreground">
                    Vores daglige scanning kører kl. 07:00 hver morgen. Kom tilbage senere for at se
                    dagens tilbud!
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* SEO content sections */}
        <Separator className="my-10" />

        <section className="prose prose-lg dark:prose-invert max-w-none mb-10">
          <h2 className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            Sådan Vælger Du det Bedste Free Spins Tilbud
          </h2>
          <p>
            Ikke alle free spins er skabt lige. Her er de vigtigste faktorer at overveje, når du
            sammenligner tilbud:
          </p>
          <ul>
            <li>
              <strong>Omsætningskrav:</strong> Jo lavere omsætningskrav, desto lettere er det at
              omsætte dine gevinster. Tilbud med under 30x omsætning er generelt gode.
            </li>
            <li>
              <strong>Antal free spins:</strong> Flere spins giver flere chancer, men kvaliteten af
              tilbuddet afhænger også af spinværdien og hvilken spillemaskine de gælder til.
            </li>
            <li>
              <strong>Spinværdi:</strong> En free spin på 1 kr. er mere værd end en på 0,10 kr.
              Tjek altid den faktiske spinværdi.
            </li>
            <li>
              <strong>Tidsbegrænsning:</strong> De fleste free spins skal bruges inden for 7-30 dage.
              Sørg for at have tid til at udnytte dem.
            </li>
          </ul>

          <h2 className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-primary" />
            Vigtigt at Vide Om Free Spins
          </h2>
          <p>
            Alle casinoer på denne side er licenserede af{" "}
            <Link to="/spillemyndigheden" className={linkClass}>
              Spillemyndigheden
            </Link>{" "}
            og opererer lovligt i Danmark. Vi anbefaler altid{" "}
            <Link to="/ansvarligt-spil" className={linkClass}>
              ansvarligt spil
            </Link>{" "}
            – sæt altid grænser for dit forbrug, før du starter med at spille.
          </p>
          <p>
            Husk at free spins er en markedsføringsværktøj fra casinoerne. Selvom det er gratis
            at spille, medfører omsætningskrav at du typisk skal spille for et bestemt beløb, før
            du kan udbetale eventuelle gevinster. Læs altid de{" "}
            <Link to="/omsaetningskrav" className={linkClass}>
              fulde vilkår og betingelser
            </Link>
            .
          </p>

          <h2 className="flex items-center gap-2">
            <Star className="h-6 w-6 text-primary" />
            Typer af Free Spins Tilbud
          </h2>
          <p>
            Der findes flere typer free spins tilbud hos danske casinoer:
          </p>
          <ul>
            <li>
              <strong>Velkomst free spins:</strong> Gives som del af en velkomstpakke til nye
              spillere. Typisk det mest generøse tilbud.
            </li>
            <li>
              <strong>
                <Link to="/bonus-uden-indbetaling" className={linkClass}>
                  Free spins uden indbetaling
                </Link>
                :
              </strong>{" "}
              Kræver ingen indbetaling – du får spins blot ved registrering. Ofte med højere
              omsætningskrav.
            </li>
            <li>
              <strong>Daglige/ugentlige free spins:</strong> Løbende tilbud til eksisterende
              spillere. Ofte færre spins men med lavere krav.
            </li>
            <li>
              <strong>VIP free spins:</strong> Eksklusive tilbud til loyale spillere med bedre
              vilkår og flere spins.
            </li>
          </ul>
        </section>

        <Separator className="my-10" />

        <RelatedGuides currentPath="/free-spins-i-dag" />

        <FAQSection
          title="Ofte Stillede Spørgsmål om Daglige Free Spins"
          faqs={freeSpinsIDagFaqs}
        />

        <Separator className="my-10" />

        <AuthorBio author="jonas" />
      </article>
    </>
  );
};

const OfferCard = ({ offer }: { offer: FreeSpinsOffer }) => {
  const badge = offerTypeBadge[offer.offer_type] || offerTypeBadge.welcome;

  return (
    <Card className="hover:border-primary/30 transition-colors">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Left: Casino info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Link
                to={`/casino-anmeldelser/${offer.casino_slug}`}
                className="text-lg font-bold hover:text-primary transition-colors"
              >
                {offer.casino_name}
              </Link>
              <Badge variant={badge.variant}>{badge.label}</Badge>
            </div>
            <h3 className="font-semibold text-foreground mb-1">{offer.offer_title}</h3>
            {offer.offer_description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {offer.offer_description}
              </p>
            )}
          </div>

          {/* Right: Key details */}
          <div className="flex flex-wrap gap-3 md:flex-col md:items-end md:text-right">
            {offer.free_spins_count && (
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-bold text-primary">{offer.free_spins_count} Free Spins</span>
              </div>
            )}
            {offer.wagering_requirement && (
              <div className="text-sm text-muted-foreground">
                Omsætning: {offer.wagering_requirement}
              </div>
            )}
            {offer.min_deposit && (
              <div className="text-sm text-muted-foreground">
                Min. indbetaling: {offer.min_deposit}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FreeSpinsIDag;
