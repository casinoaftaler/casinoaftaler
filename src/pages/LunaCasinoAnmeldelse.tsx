import { Link } from "react-router-dom";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { useCasinos } from "@/hooks/useCasinos";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { getAffiliateRedirect } from "@/lib/affiliateRedirect";
import { useAuth } from "@/hooks/useAuth";
import { QuickFactsProviders, QuickFactsLogo } from "@/components/QuickFactsProviders";
import type { ReactNode } from "react";
import lunaHero from "@/assets/heroes/luna-casino-hero.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ShieldCheck, Star, CreditCard, Gift, Trophy, Sparkles,
  HelpCircle, User, CalendarDays, BookOpen, Smartphone, Headphones,
  Gamepad2, Zap, RotateCcw, Check, X, Globe, Award,
} from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80";

const lunaFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Er Luna Casino et sikkert casino?",
    answer: (
      <>
        Ja. Luna Casino har gyldig dansk licens fra Spillemyndigheden (licensnr. 16-1066791) og drives af SkillOnNet Limited. Platformen benytter SSL-kryptering og er tilsluttet{" "}
        <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a>. Læs mere om{" "}
        <Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link>.
      </>
    ),
  },
  {
    question: "Hvad er velkomstbonussen hos Luna Casino?",
    answer: (
      <>
        Nye spillere får 100 % matchbonus op til 500 kr. ved første indbetaling. Omsætningskravet er 10x (d+b) med 60 dages gyldighed. Læs mere om{" "}
        <Link to="/velkomstbonus" className={linkClass}>velkomstbonusser</Link>.
      </>
    ),
  },
  {
    question: "Hvilke betalingsmetoder tilbyder Luna Casino?",
    answer: (
      <>
        Luna Casino tilbyder Visa, Mastercard, MobilePay, Skrill og Payz. Min. indbetaling er 100 kr. Se vores guide til{" "}
        <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>.
      </>
    ),
  },
  {
    question: "Har Luna Casino et loyalitetsprogram?",
    answer: "Ja. Luna Casino tilbyder et stigende loyalitetsprogram, hvor du akkumulerer points og stiger i level med løbende fordele og bonusser. Der er også regelmæssige turneringer.",
  },
  {
    question: "Hvad er omsætningskravet?",
    answer: (
      <>
        Velkomstbonussen har 10x omsætningskrav (d+b). Eksempel: Indbetal 300 kr., få 300 kr. bonus = 6.000 kr. i omsætning. Kun spillemaskiner bidrager. Læs om{" "}
        <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>.
      </>
    ),
  },
  {
    question: "Tilbyder Luna Casino live casino?",
    answer: (
      <>
        Ja. Luna Casino har et kvalitetsbevidst live casino med professionelle dealere, herunder blackjack, roulette og baccarat. Læs mere om{" "}
        <Link to="/live-casino" className={linkClass}>live casino</Link>.
      </>
    ),
  },
  {
    question: "Har Luna Casino sportsbetting?",
    answer: "Nej. Luna Casino fokuserer udelukkende på casino-spil og tilbyder ikke sportsbetting.",
  },
  {
    question: "Hvem står bag Luna Casino?",
    answer: "Luna Casino drives af SkillOnNet Limited, der har dansk spillelicens og driver flere andre anerkendte online casinoer i Danmark. Selskabet er veletableret i branchen.",
  },
  {
    question: "Hvad er den maksimale indsats med bonus?",
    answer: "Den maksimale indsats med bonusmidler er 50 kr. pr. spin. Overskrides denne grænse, medregnes spinnet ikke i omsætningskravet.",
  },
];

const LunaCasinoAnmeldelse = () => {
  const { data: casinos } = useCasinos();
  const { data: siteSettings } = useSiteSettings();
  const { user } = useAuth();
  const heroBackgroundImage = siteSettings?.hero_background_image;
  const casino = casinos?.find((c) => c.slug === "luna-casino");
  const handleBonusClick = () => { if (casino) getAffiliateRedirect(casino.slug, user?.id); };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: lunaFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: typeof faq.answer === "string" ? faq.answer : faq.question },
    })),
  };

  const reviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "Organization", name: "Luna Casino" },
    author: { "@type": "Organization", name: "Casinoaftaler" },
    reviewRating: { "@type": "Rating", ratingValue: "4.6", bestRating: "5" },
    reviewBody: "Luna Casino er et kvalitetsbevidst dansk casino med 100% bonus op til 500 kr., 10x omsætning, loyalitetsprogram, turneringer og daglige bonuskampagner.",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Forside", item: "https://casinoaftaler.dk/" },
      { "@type": "ListItem", position: 2, name: "Luna Casino Anmeldelse", item: "https://casinoaftaler.dk/luna-casino-anmeldelse" },
    ],
  };

  return (
    <>
      <SEO
        title="Luna Casino Anmeldelse 2026 – 100% Bonus, Loyalitetsprogram & Vilkår | Casinoaftaler"
        description="Komplet anmeldelse af Luna Casino. 100% bonus op til 500 kr., kun 10x omsætning, loyalitetsprogram, daglige bonusser, turneringer og kvalitetsbevidst spiludvalg. Læs vores vurdering."
        jsonLd={[faqJsonLd, reviewJsonLd, breadcrumbJsonLd]}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: heroBackgroundImage
            ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})`
            : "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))",
          backgroundSize: "cover", backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center gap-2 mb-4">
              <Badge variant="secondary"><Star className="mr-1.5 h-3.5 w-3.5" />4.6 / 5 – Anbefalet</Badge>
              <Badge variant="outline" className="border-white/40 text-white">Loyalitetsprogram</Badge>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Luna Casino Anmeldelse 2026</h1>
            <p className="mb-6 text-lg text-white/80">
              Komplet anmeldelse af Luna Casino – et kvalitetsbevidst dansk casino med 100 % bonus op til 500 kr., kun 10x omsætningskrav, loyalitetsprogram med stigende niveauer, daglige bonuskampagner og et kurateret spiludvalg.
            </p>
            <Button onClick={handleBonusClick} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base px-8">
              <Gift className="mr-2 h-5 w-5" />Hent Bonus hos Luna Casino
            </Button>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5"><User className="h-4 w-4" /><span>Skrevet af: <span className="font-medium text-foreground">Casinoaftaler</span></span></div>
          <div className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /><span>Opdateret: <span className="font-medium text-foreground">13-02-2026</span></span></div>
          <div className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /><span>Læsetid: <span className="font-medium text-foreground">16 Min.</span></span></div>
        </div>

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={lunaHero} alt="Luna Casino – kvalitetsbevidst dansk casino med loyalitetsprogram" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* Quick Facts */}
        <section className="mb-12">
          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xl"><Zap className="h-6 w-6 text-primary" />Hurtige Fakta – Luna Casino</CardTitle>
                <QuickFactsLogo logoUrl={casino?.logo_url} casinoName={casino?.name} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { label: "Velkomstbonus", value: "100% op til 500 kr." },
                  { label: "Bonustype", value: "Matchbonus" },
                  { label: "Omsætningskrav", value: "10x (d+b)" },
                  { label: "Licens", value: "Spillemyndigheden" },
                ].map((f) => (
                  <div key={f.label} className="rounded-lg border border-border p-3">
                    <p className="text-xs text-muted-foreground uppercase mb-1">{f.label}</p>
                    <p className="text-lg font-bold text-foreground">{f.value}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mt-4">
                {[
                  { label: "Min. indbetaling", value: "100 kr." },
                  { label: "Bonusgyldighed", value: "60 dage" },
                  { label: "Operatør", value: "SkillOnNet Ltd" },
                  { label: "Ekstra", value: "Loyalitetsprogram" },
                ].map((f) => (
                  <div key={f.label} className="rounded-lg border border-border p-3">
                    <p className="text-xs text-muted-foreground uppercase mb-1">{f.label}</p>
                    <p className="text-lg font-bold text-foreground">{f.value}</p>
                  </div>
                ))}
              </div>
              <QuickFactsProviders providers={["NetEnt", "Microgaming", "Evolution Gaming", "Pragmatic Play", "Red Tiger", "Play'n GO", "Yggdrasil", "Hacksaw Gaming", "Blueprint Gaming", "Push Gaming", "ELK Studios", "Big Time Gaming", "iSoftBet"]} />
            </CardContent>
          </Card>
        </section>

        {/* Introduction */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Vores vurdering af Luna Casino</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Luna Casino adskiller sig fra mange konkurrenter ved at fokusere på kvalitet frem for kvantitet. Bag casinoet står SkillOnNet Limited, et veletableret selskab der driver flere andre danske casinoer og har haft dansk licens fra Spillemyndigheden (nr. 16-1066791) i flere år.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Med en{" "}
            <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> på 100 % op til 500 kr., kun 10x{" "}
            <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>, et stigende loyalitetsprogram og daglige bonuskampagner giver Luna Casino solide incitamenter for både nye og tilbagevendende spillere. Spiludvalget er kurateret med fokus på kvalitet – hver titel er nøje udvalgt.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Luna Casino tilbyder spilleautomater, bordspil og{" "}
            <Link to="/live-casino" className={linkClass}>live casino</Link> fra anerkendte udbydere. Selvom udvalget er mindre end hos de største casinoer, sikrer den kuraterede tilgang at spillere altid finder kvalitetsspil.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I denne dybdegående anmeldelse gennemgår vi velkomstbonus, loyalitetsprogram, spiludvalg,{" "}
            <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link> og kundeservice – så du kan tage en informeret beslutning.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Pros & Cons */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Fordele og ulemper ved Luna Casino</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg text-primary"><Check className="h-5 w-5" />Fordele</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Kun 10x omsætningskrav (d+b) – meget lavt",
                    "Loyalitetsprogram med stigende niveauer",
                    "Daglige bonuskampagner og deals",
                    "Regelmæssige turneringer med præmier",
                    "Kurateret kvalitetsudvalg af spil",
                    "Skræddersyet bonusspiludvalg til din profil",
                    "Dansk licens fra Spillemyndigheden",
                    "SSL-kryptering og ROFUS-tilslutning",
                    "MobilePay tilgængelig til indbetaling",
                  ].map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{pro}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg text-destructive/80"><X className="h-5 w-5" />Ulemper</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Maks. bonus på 500 kr. (lavere end gennemsnittet)",
                    "Mindre spiludvalg end de største casinoer",
                    "Ingen sportsbetting tilgængelig",
                    "Begrænsede betalingsmetoder (ingen PayPal/Trustly)",
                    "5% gebyr på Skrill-indbetalinger",
                    "Ingen No-Sticky bonusstruktur",
                  ].map((con) => (
                    <li key={con} className="flex items-start gap-2 text-sm">
                      <X className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{con}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Welcome Bonus */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Velkomstbonus hos Luna Casino – Komplet Guide</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Luna Casino tilbyder en{" "}
            <Link to="/indskudsbonus" className={linkClass}>matchbonus</Link> på 100 % op til 500 kr. ved din første indbetaling. Bonussen aktiveres automatisk ved din første indbetaling på mindst 100 kr.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Det unikke ved Luna Casinos bonus er, at spiludvalget for bonussen skræddersys til din profil, hvilket gør oplevelsen mere personlig end hos de fleste konkurrenter.{" "}
            <Link to="/omsaetningskrav" className={linkClass}>Omsætningskravet</Link> er 10x (d+b) med 60 dages gyldighed.
          </p>

          <Card className="border-border bg-card mb-6">
            <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Gift className="h-5 w-5 text-primary" />Sådan aktiverer du bonussen</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { step: "1", title: "Besøg Luna Casino", desc: "Gå til forsiden og klik på 'Spil nu' for at komme i gang." },
                  { step: "2", title: "Opret din konto", desc: "Udfyld personlige oplysninger, vælg brugernavn og adgangskode." },
                  { step: "3", title: "Bekræft med MitID", desc: "Indtast CPR-nummer og verificer via MitID." },
                  { step: "4", title: "Vælg velkomstbonussen", desc: "Gå til kampagnesektionen og vælg velkomstbonussen." },
                  { step: "5", title: "Foretag din første indbetaling", desc: "Indbetal mindst 100 kr. og bonussen aktiveres automatisk." },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{item.step}</span>
                    <div><h4 className="font-semibold text-foreground">{item.title}</h4><p className="text-sm text-muted-foreground">{item.desc}</p></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><RotateCcw className="h-5 w-5 text-primary" />Beregning af omsætningskrav</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">Eksempel: Du indbetaler 300 kr. og får 300 kr. i bonus.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground">Indskud + Bonus</p><p className="text-xl font-bold text-foreground">600 kr.</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground">× 10 omsætning</p><p className="text-xl font-bold text-foreground">= 6.000 kr.</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground">Indenfor</p><p className="text-xl font-bold text-foreground">60 dage</p></div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Loyalty Program */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Loyalitetsprogram og turneringer</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En af Luna Casinos stærkeste sider er deres loyalitetsprogram. For hver indsats du placerer, akkumulerer du points, der får dig til at stige i level. Hvert nyt niveau bringer nye fordele og bonusser, hvilket gør spilleoplevelsen mere givende over tid.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Derudover afholder Luna Casino regelmæssige turneringer, hvor du kan konkurrere mod andre spillere om ekstra præmier. Turneringerne omfatter både spilleautomater og bordspil og giver en ekstra dimension til spiloplevelsen.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border bg-card border-l-4 border-l-accent">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <Trophy className="h-6 w-6 text-accent" />
                  <h3 className="text-lg font-bold text-foreground">Stigende loyalitetsniveauer</h3>
                </div>
                <p className="text-sm text-muted-foreground">Akkumuler points for at stige i level. Hvert niveau giver nye fordele, bedre bonusser og eksklusive kampagner.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card border-l-4 border-l-primary">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-bold text-foreground">Regelmæssige turneringer</h3>
                </div>
                <p className="text-sm text-muted-foreground">Konkurrér mod andre spillere i turneringer med præmier. Klatr op ad ranglisten og vind belønninger.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Game Selection */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Spiludvalg – Kvalitet frem for kvantitet</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Luna Casino fokuserer på at tilbyde et kurateret udvalg af kvalitetsspil fra anerkendte{" "}
            <Link to="/spiludviklere" className={linkClass}>spiludbydere</Link>. Selvom udvalget er mindre end hos de største casinoer, sikrer tilgangen at hvert spil lever op til høje standarder:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Gamepad2 className="h-5 w-5 text-primary" />Spilleautomater</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Kurateret udvalg af kvalitetsslots fra anerkendte udbydere. Populære titler nøje udvalgt for den bedste spiloplevelse.</p></CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Trophy className="h-5 w-5 text-primary" />Bordspil</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Klassiske bordspil som roulette, blackjack og baccarat i digitale versioner med varierede indsatsbeløb.</p></CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Sparkles className="h-5 w-5 text-primary" />Live Casino</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Live casino med professionelle dealere. Blackjack, roulette og baccarat i realtid med HD-streaming.</p></CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Payment Methods */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Betalingsmetoder hos Luna Casino</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Luna Casino tilbyder et udvalg af{" "}
            <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link> med fokus på sikkerhed. Min. indbetaling er 100 kr.
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Metode</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Indbetaling</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Udbetaling</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Gebyr</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Visa / Mastercard", deposit: "✓", withdraw: "✓", fee: "Ingen" },
                  { name: "MobilePay", deposit: "✓", withdraw: "—", fee: "Ingen" },
                  { name: "Skrill", deposit: "✓", withdraw: "✓", fee: "5%" },
                  { name: "Payz", deposit: "✓", withdraw: "✓", fee: "Ingen" },
                  { name: "Bankoverførsel", deposit: "—", withdraw: "✓", fee: "Ingen" },
                ].map((m) => (
                  <tr key={m.name} className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">{m.name}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{m.deposit}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{m.withdraw}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{m.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground">Bemærk: Skrill har 5% gebyr. Alle andre metoder er gebyrfri.</p>
        </section>

        <Separator className="my-10" />

        {/* Daglige bonuskampagner */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Daglige bonuskampagner og deals</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Ud over velkomstbonussen tilbyder Luna Casino daglige bonuskampagner, der giver dig ekstra værdi hver eneste dag. Kampagnerne varierer fra dag til dag og kan inkludere{" "}
            <Link to="/free-spins" className={linkClass}>free spins</Link> på udvalgte spilleautomater, reload-bonusser, cashback-tilbud og eksklusive turneringsinvitationer.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det unikke ved Luna Casinos tilgang er, at bonusspiludvalget skræddersys til din profil. Baseret på dine foretrukne spiltyper og spillevaner modtager du personlige tilbud, der er relevante for netop dig. Det gør oplevelsen mere engagerende end de standardiserede kampagner, man finder hos mange konkurrenter.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For at holde dig opdateret anbefaler vi at tjekke kampagnesektionen dagligt. De bedste deals har ofte begrænsede pladser eller tidsvinduer, og det betaler sig at være hurtig. Kombineret med loyalitetsprogrammet giver de daglige kampagner en solid grund til at vende tilbage til Luna Casino regelmæssigt.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Mobiloplevelse */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Mobiloplevelse hos Luna Casino</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Luna Casino tilbyder en fuldt mobiloptimeret hjemmeside, der fungerer sømløst i alle moderne browsere på iOS og Android. Der er ingen dedikeret app, men den mobilvenlige udgave er hurtig, stabil og nem at navigere. Alle spil, bonusser og kontofunktioner er tilgængelige direkte fra din smartphone eller tablet.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Indbetalinger via{" "}
            <Link to="/betalingsmetoder" className={linkClass}>MobilePay</Link>{" "}
            er særligt velegnet til mobilspil – du kan gennemføre en indbetaling med blot et par tryk og en swipe i MobilePay-appen. Login via MitID fungerer ligeledes problemfrit fra mobilenheder.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {" "}
            <Link to="/live-casino" className={linkClass}>Live casino</Link>-spillene streamer i høj kvalitet selv på mobilnetværk, og spilleautomaterne tilpasser sig automatisk til din skærmstørrelse. Det kuraterede spiludvalg er faktisk en fordel på mobilen, da det gør det lettere at finde kvalitetsspil uden at skulle scrolle gennem tusindvis af titler.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Registrering */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Tilmelding og registrering</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Tilmeldingsprocessen hos Luna Casino er enkel og strømlinet via MitID-integration. Du udfylder dine personlige oplysninger, vælger brugernavn og adgangskode, bekræfter din identitet via MitID og sætter dine indbetalingsgrænser. Hele processen tager under 5 minutter, og du er klar til at spille med det samme.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Alle danske casinoer med licens fra Spillemyndigheden kræver, at du sætter daglige, ugentlige og månedlige indbetalingsgrænser ved oprettelse. Dette er en del af lovgivningen om{" "}
            <Link to="/responsible-gaming" className="text-primary hover:underline">ansvarligt spil</Link>{" "}
            og sikrer, at du altid har kontrol over dit forbrug. Grænserne kan justeres senere via din kontoside.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Security */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sikkerhed og licens</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Luna Casino opererer med dansk licens fra Spillemyndigheden (nr. 16-1066791). SkillOnNet Limited er et veletableret selskab med mange års erfaring i branchen og driver flere andre anerkendte online casinoer i Danmark og internationalt. Denne erfaring og dokumenterede track record giver ekstra tryghed for danske spillere.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Alle transaktioner og personoplysninger beskyttes med 256-bit SSL-kryptering, og casinoet er tilsluttet{" "}
            <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a> for selvudelukkelse og{" "}
            <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className={linkClass}>StopSpillet</a> for rådgivning om spilleproblemer.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Luna Casino overholder Spillemyndighedens strenge regler for{" "}
            <Link to="/responsible-gaming" className="text-primary hover:underline">ansvarligt spil</Link>, herunder obligatoriske indbetalingsgrænser, session-påmindelser efter 60 minutters spil og mulighed for midlertidig udelukkelse. Identitetsverifikation sker automatisk via MitID, så du behøver aldrig at uploade dokumentation manuelt.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Konklusion */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Konklusion – Er Luna Casino det rigtige for dig?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Luna Casino er det ideelle valg for spillere, der foretrækker kvalitet over kvantitet. Med lave omsætningskrav, et loyalitetsprogram der belønner trofaste spillere, daglige bonuskampagner og regelmæssige turneringer er der meget at komme efter.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            De begrænsede betalingsmetoder og det mindre spiludvalg er de primære ulemper, men for spillere der værdsætter et kurateret og personligt casino-miljø, er Luna Casino et stærkt valg.
          </p>
          <div className="flex justify-center">
            <Button onClick={handleBonusClick} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base px-8">
              <Gift className="mr-2 h-5 w-5" />Hent din bonus hos Luna Casino
            </Button>
          </div>
        </section>

        <Separator className="my-10" />
        <InlineCasinoCards />
        <Separator className="my-10" />
        <RelatedGuides currentPath="/luna-casino-anmeldelse" />

        <FAQSection title="Ofte stillede spørgsmål om Luna Casino" faqs={lunaFaqs} />
      </div>
    </>
  );
};

export default LunaCasinoAnmeldelse;
