import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { buildArticleSchema, buildFaqSchema } from "@/lib/seo";
import { QuickFactsProviders } from "@/components/QuickFactsProviders";
import { CasinoReviewHero } from "@/components/CasinoReviewHero";
import type { ReactNode } from "react";
import {
  Star,
  CreditCard,
  Trophy,
  Sparkles,
  Gamepad2,
  Zap,
  Check,
  X,
  Globe,
  Shield,
  Smartphone,
  Headphones,
  Monitor,
} from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Er bet365 lovligt i Danmark?",
    answer: (
      <>
        Ja. bet365 har dansk licens fra Spillemyndigheden og er registreret i{" "}
        <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a>.
        De har opereret under dansk regulering siden markedet blev liberaliseret i 2012. Alle krav til{" "}
        <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link> overholdes.
      </>
    ),
  },
  {
    question: "Hvad er bet365's velkomstbonus for casino?",
    answer: (
      <>
        bet365 tilbyder en <Link to="/velkomstbonus" className={linkClass}>matchbonus</Link> til nye
        casino-spillere plus <Link to="/free-spins" className={linkClass}>free spins</Link>.
        Bonussen er underlagt et <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>{" "}
        på 10x (indskud + bonus). Sportsspillere får et separat væddemålstilbud.
      </>
    ),
  },
  {
    question: "Hvem ejer bet365?",
    answer:
      "bet365 er privatejet af Denise Coates CBE og hendes familie. Virksomheden blev grundlagt i Stoke-on-Trent i 2000 og er ikke børsnoteret. Det private ejerskab betyder mindre offentlig indsigt i regnskaber, men til gengæld en operatør med langsigtet perspektiv uden aktionærpres.",
  },
  {
    question: "Hvor hurtigt udbetaler bet365?",
    answer: (
      <>
        Via <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link> behandles
        udbetalinger typisk inden for 24 timer. <Link to="/betalingsmetoder/visa-mastercard" className={linkClass}>Kort</Link>-udbetalinger
        tager 1-3 hverdage. Førstegangsudbetalinger kræver KYC-verifikation, som kan forlænge processen med 24-48 timer.
      </>
    ),
  },
  {
    question: "Har bet365 live streaming?",
    answer:
      "Ja. bet365 streamer tusindvis af sportsbegivenheder årligt – fodbold, tennis, basketball, hestevæddeløb og mere. Kræver typisk en aktiv saldo eller et nyligt placeret væddemål. Dækningen er markant bredere end hvad danske konkurrenter tilbyder.",
  },
  {
    question: "Kan man spille poker på bet365?",
    answer:
      "Ja, bet365 har et pokerrum, men det er ikke tilgængeligt for danske spillere under den danske licens. Poker-sektionen er begrænset til markeder, hvor det er reguleret separat. Danske spillere kan dog benytte casino, sport og live casino.",
  },
  {
    question: "Er bet365's odds bedre end konkurrenterne?",
    answer:
      "bet365 er konsekvent blandt de operatører med de laveste marginer på store sportsbegivenheder – særligt fodbold, tennis og basketball. På nichemarkeder og mindre ligaer kan oddsene dog variere. Generelt er bet365 konkurrencedygtig, men ikke altid billigst på alle markeder.",
  },
];

const Bet365Anmeldelse = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background_image;

  const articleSchema = buildArticleSchema({
    headline: "bet365 Anmeldelse 2026 – Sportsbook, Casino og Live Streaming",
    description:
      "Kritisk anmeldelse af bet365 i Danmark. Sportsbook, casino med 2.500+ spil, live streaming og dansk licens gennemgået i detaljer.",
    url: "https://casinoaftaler.dk/casino-anmeldelser/bet365",
    datePublished: "2026-02-15",
    dateModified: "2026-02-17",
    authorName: "Jonas",
    authorUrl: "https://casinoaftaler.dk/forfatter/jonas",
  });

  const faqJsonLd = buildFaqSchema(faqs);

  const reviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Organization",
      name: "bet365",
      url: "https://www.bet365.dk/",
    },
    author: { "@type": "Organization", name: "Casinoaftaler" },
    reviewRating: { "@type": "Rating", ratingValue: "4.5", bestRating: "5" },
    reviewBody:
      "bet365 er primært en sportsbook-gigant med et solidt casino-tillæg. Stærkest på sportsbetting og live streaming, men casino-oplevelsen kan virke sekundær.",
  };

  return (
    <>
      <SEO
        title="bet365 Anmeldelse 2026 – Casino, Odds & Live Streaming | Casinoaftaler"
        description="Kritisk anmeldelse af bet365 Danmark. Vi tester casino, sportsbetting, live streaming, bonus, udbetaling og kundeservice. Dansk licens."
        jsonLd={[articleSchema, faqJsonLd, reviewJsonLd]}
      />

      {/* Hero */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: heroBackgroundImage
            ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})`
            : "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Globe className="mr-1.5 h-3.5 w-3.5" />
              4.5 / 5 – Sportsbook-gigant med casino
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              bet365 Anmeldelse 2026
            </h1>
            <p className="mb-6 text-lg text-white/80">
              bet365 er først og fremmest en sportsbook – men casinoet er langt fra et appendiks. Vi har testet hele platformen fra odds til spilleautomater, og her er vores ærlige vurdering.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="17-02-2026" readTime="18 Min." />
        <CasinoReviewHero slug="bet365" casinoName="bet365" />

        {/* Hurtige fakta */}
        <section className="mb-12">
          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Zap className="h-6 w-6 text-primary" />
                Overblik – bet365 i tal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Casino-spil</p>
                  <p className="text-lg font-bold text-foreground">~2.500</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Sportsgrene</p>
                  <p className="text-lg font-bold text-foreground">40+</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Omsætningskrav</p>
                  <p className="text-lg font-bold text-foreground">10x (d+b)</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Udbetaling</p>
                  <p className="text-lg font-bold text-foreground">Under 24 timer</p>
                </div>
              </div>
              <QuickFactsProviders
                providers={[
                  "Pragmatic Play",
                  "NetEnt",
                  "Play'n GO",
                  "Evolution Gaming",
                  "Red Tiger",
                  "Big Time Gaming",
                  "Hacksaw Gaming",
                  "Blueprint Gaming",
                ]}
              />
            </CardContent>
          </Card>
        </section>

        {/* Introduktion – hvem er bet365? */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvem er bet365 – og hvad gør de i Danmark?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            bet365 er en britisk gambling-virksomhed grundlagt i 2000 af Denise Coates. De startede som en fysisk bookmaker i Stoke-on-Trent og bevægede sig hurtigt online. I dag er de den største online sportsbook målt på omsætning, med tilstedeværelse i over 20 regulerede markeder. I Danmark har de opereret med licens fra Spillemyndigheden siden 2012.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det er vigtigt at forstå bet365's DNA: de er en sportsbook, der også har et casino – ikke omvendt. Det mærkes i platformen. Navigation, design og markedsføring er bygget omkring sport. Casino-sektionen er gemt et klik væk, og nye brugere lander som standard på sportsforsiden. Det er ikke nødvendigvis en svaghed – men det er en realitet, som casino-fokuserede spillere bør kende, før de opretter en konto.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Hvad der adskiller bet365 fra de fleste danske konkurrenter, er skala. Virksomheden beskæftiger over 6.000 medarbejdere, behandler millioner af daglige transaktioner og har investeret massivt i egen teknologi. De bruger ikke tredjepartsplatforme som mange mindre operatører – alt fra odds-beregning til betalingsinfrastruktur er bygget internt. Det giver en stabilitet og reaktionshastighed, der er sjælden i branchen.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Bonusanalyse */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Bonussen – hvad får du reelt?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            bet365's <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> til casino-spillere er en matchbonus med <Link to="/free-spins" className={linkClass}>free spins</Link>. Det er en standard-pakke, og den skiller sig ærligt talt ikke ud i feltet. Bonusbeløbet er moderat sammenlignet med dedikerede casino-operatører – du får ikke de samme aggressive tilbud som hos eksempelvis <Link to="/casino-anmeldelser/mr-vegas" className={linkClass}>Mr Vegas</Link> eller <Link to="/casino-anmeldelser/leovegas" className={linkClass}>LeoVegas</Link>.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <Link to="/omsaetningskrav" className={linkClass}>Omsætningskravet</Link> er 10x på indskud plus bonus – det danske lovmæssige maksimum. I praksis: indbetaler du 1.000 kr. og modtager 1.000 kr. i bonus, skal du omsætte for 20.000 kr. i alt, før du kan udbetale. Det er standardvilkår, men det er ikke de mest fordelagtige. Til sammenligning tilbyder flere danske operatører bonusser, hvor kun bonusbeløbet skal omsættes – ikke indskuddet.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sportsbettingdelen har et separat velkomsttilbud med et risikofrit væddemål. Her er bet365 mere konkurrencedygtig. For spillere, der primært er interesseret i odds, er velkomsttilbuddet solidt – men det er de løbende kampagner, der gør den reelle forskel hos bet365.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Det er i de løbende kampagner, at bet365 faktisk leverer. Daglige casino-tilbud, sæsonbestemte kampagner knyttet til store sportsbegivenheder og personaliserede tilbud baseret på aktivitetsniveau. bet365 er ikke stedet, hvor du får den største dag-1-bonus – men det er stedet, hvor du konsekvent får værdi over tid, hvis du er en aktiv spiller.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Spiludvalg */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Spiludvalget – bredt, men uden overraskelser</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            bet365 tilbyder cirka 2.500 <Link to="/casinospil/spillemaskiner" className={linkClass}>spilleautomater</Link> og bordspil. Kataloget dækker alle de store udbydere: <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>, <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>, <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link>, <Link to="/spiludviklere/red-tiger" className={linkClass}>Red Tiger</Link> og <Link to="/spiludviklere/big-time-gaming" className={linkClass}>Big Time Gaming</Link>. Du finder Gates of Olympus, Book of Dead, Sweet Bonanza og andre populære titler. Der er ingen huller i det basale udvalg.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hvor bet365 halter lidt, er på niche-udbydere. Studier som Nolimit City, Hacksaw Gaming og Push Gaming er repræsenteret, men med færre titler end hos eksempelvis <Link to="/casino-anmeldelser/videoslots" className={linkClass}>Videoslots</Link>, der har over 5.000 spil. For de fleste spillere er forskellen ubetydelig – men entusiaster, der jagter specifikke titler fra mindre studier, vil indimellem opleve at et spil mangler.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Nye spilrelease kommer typisk inden for den første uge efter lancering. bet365 er sjældent den allerførste operatør med en ny titel, men forsinkelsen er minimal. Jackpot-sektionen inkluderer progressive puljer fra Pragmatic Play og NetEnt. Gevinster i millionklassen er sjældne men dokumenterede – og bet365 har historik for at udbetale store jackpots uden drama.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Bordspilssektionen er tilstrækkelig med standard <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link>- og <Link to="/casinospil/roulette" className={linkClass}>roulette</Link>-varianter, men den er klart sekundær til live casinoet. Ingen eksklusivt udviklede bordspil eller særlige RTP-varianter – bare standard-versioner af de klassiske spil.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Live Casino */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            <Sparkles className="inline h-7 w-7 text-primary mr-2" />
            Live casinoet – her leverer bet365
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <Link to="/live-casino" className={linkClass}>Live casinoet</Link> er et af de områder, hvor bet365 virkelig retfærdiggør sin størrelse. Med <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> som primær leverandør er der hundredvis af aktive borde på ethvert tidspunkt. Du finder blackjack fra 50 kr. til 500.000 kr. per hånd, roulette i alle varianter og game shows som Lightning Roulette, Crazy Time og Monopoly Live.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            bet365 har eksklusive live-borde med dedikerede dealers og branding – en fordel, der sjældent ses hos mindre operatører. Bordgrænserne er fleksible nok til at rumme både casual spillere og high rollers. Streaming-kvaliteten er stabil med minimal latency, og interfacet er rent og funktionelt. Her er ingen unødvendige animationer eller distraktioner – bare spillet.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            En realistisk observation: bordene med de laveste minimumsindsatser (under 25 kr.) kan have ventetid i spidsbelastningsperioder, typisk aften og weekend. Det er ikke unikt for bet365 – det gælder alle operatører, der bruger Evolutions delte bordinfrastruktur. De eksklusive bet365-borde har sjældnere dette problem, men kræver generelt højere minimumsindsatser.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Sportsbetting & Live Streaming */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            <Monitor className="inline h-7 w-7 text-primary mr-2" />
            Sportsbetting og live streaming
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det er her, bet365 dominerer. Sportsbook'en dækker over 40 sportsgrene med markeder, der går langt dybere end hvad nogen dansk konkurrent tilbyder. En Premier League-kamp kan have 200+ væddemålsmarkeder hos bet365, hvor en typisk dansk operatør ligger på 80-120. Denne dybde er relevant for seriøse bettors, der søger value i sekundære markeder som antal hjørnespark, spillerkort eller kampspecifikke props.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bet Builder er et af bet365's bedste værktøjer. Du kan kombinere multiple markeder fra en enkelt kamp til ét samlet væddemål – eksempelvis "Begge hold scorer + Over 2.5 mål + Bestemt spiller scorer". Oddsene beregnes automatisk, og Cash Out er tilgængeligt på de fleste kombinationer. Early Payout-funktionen udbetaler automatisk dit væddemål, hvis dit hold fører med to mål – en unik feature, der reducerer risiko markant.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Live streaming er bet365's signaturfeature. Tusindvis af kampe streames direkte – fodbold, tennis, basketball, hestevæddeløb og mere. Kvaliteten er stabil, forsinkelsen er minimal, og integrationen med in-play betting er sømløs. Du kan se kampen og placere væddemål i samme visning. Ingen anden dansk-licenseret operatør matcher denne kombination af dækning og kvalitet. For sportsfans, der også spiller casino indimellem, er dette alene grund nok til at vælge bet365.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Mobiloplevelse */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            <Smartphone className="inline h-7 w-7 text-primary mr-2" />
            Mobiloplevelsen – effektiv, men tæt pakket
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            bet365 tilbyder mobiladgang via browseren – ingen dedikeret app i de danske app stores. Mobilsiden fungerer som en progressiv webapp med hurtig indlæsning og app-lignende navigation. Det fulde funktionssæt er tilgængeligt: sport, casino, live casino, <Link to="/betalingsmetoder" className={linkClass}>betalinger</Link> og kontostyring.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Live streaming fungerer overraskende godt på mobil. Billedkvaliteten tilpasser sig automatisk til din forbindelseshastighed, og du kan stadig placere væddemål, mens du ser kampen. Casino-spillene er touch-optimerede, og indlæsningstiderne er generelt acceptable – typisk 2-4 sekunder for en slot.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Den ærlige observation er, at bet365 på mobil kan føles overvældende. Der er mange menupunkter, mange kategorier og mange funktioner pakket ind i en lille skærm. Nye brugere bruger tid på at finde rundt. Sammenlignet med mobiloplevelsen hos <Link to="/casino-anmeldelser/leovegas" className={linkClass}>LeoVegas</Link>, der er designet mobile-first, føles bet365 som en desktop-oplevelse, der er tilpasset mobil – ikke bygget til den. Det er funktionelt, det er stabilt, men det er ikke elegant.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Betalingsmetoder */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Betalingsmetoder og udbetalingstid</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            bet365 understøtter de gængse danske <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>: <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link>, <Link to="/betalingsmetoder/visa-mastercard" className={linkClass}>Visa/Mastercard</Link>, <Link to="/betalingsmetoder/skrill" className={linkClass}>Skrill</Link> og <Link to="/betalingsmetoder/paysafecard" className={linkClass}>Paysafecard</Link>. Indbetalinger er øjeblikkelige uanset metode. Der er ingen gebyrer fra bet365's side – men din bank eller e-wallet kan opkræve egne gebyrer.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              {
                title: "Trustly",
                desc: "Direkte bankoverførsel. Udbetalinger typisk under 24 timer. Den hurtigste og mest populære metode for danske spillere.",
                speed: "⚡ Under 24 timer",
              },
              {
                title: "Visa / Mastercard",
                desc: "Udbetalinger tager 1-3 hverdage pga. bankens processeringstid. Stabil, men ikke den hurtigste mulighed.",
                speed: "🕐 1-3 hverdage",
              },
              {
                title: "Skrill",
                desc: "E-wallet med udbetalinger inden for 24 timer. Kræver separat Skrill-konto. God til spillere med flere operatørkonti.",
                speed: "⚡ 24 timer",
              },
              {
                title: "Paysafecard",
                desc: "Forudbetalt kort – kun til indbetaling. Udbetalinger skal ske via en alternativ metode, typisk Trustly.",
                speed: "➡️ Kun indbetaling",
              },
            ].map((m) => (
              <div key={m.title} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <CreditCard className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{m.title}</h3>
                    <Badge variant="outline" className="text-xs">{m.speed}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            KYC-verifikation (Know Your Customer) kræves ved den første udbetaling. Du skal indsende billedlegitimation og bevis for bopæl. bet365's verifikationsproces er generelt hurtig – typisk afsluttet inden for 24 timer – men det kan tage op til 72 timer i spidsbelastningsperioder. Når du er verificeret, behandles efterfølgende udbetalinger automatisk.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Den samlede betalingsoplevelse hos bet365 er gnidningsfri. Ingen overraskelser, ingen skjulte gebyrer, ingen urimelige udbetalingsgrænser. Det er et af de områder, hvor skalaen giver en reel fordel – bet365's betalingsinfrastruktur er bygget til volumen og fungerer derefter.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Kundeservice */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            <Headphones className="inline h-7 w-7 text-primary mr-2" />
            Kundeservice – hurtig, men på engelsk
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            bet365 tilbyder 24/7 live chat og e-mail-support. Responstiden på chat er typisk under to minutter – hurtigere end de fleste danske operatører. Agenterne er kompetente og kan håndtere alt fra kontoverifikation til bonusspørgsmål og tekniske problemer.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det store men: kommunikationen foregår primært på engelsk. For danske spillere med begrænset engelskkundskab kan dette være en reel barriere. <Link to="/casino-anmeldelser/danske-spil" className={linkClass}>Danske Spil</Link> og andre lokale operatører tilbyder fuld dansk support – et klart fortrin for den dansksprogede spiller.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            FAQ-centret er omfattende og velorganiseret med kategorier for kontostyring, betalinger og spilleregler. De fleste standardspørgsmål kan besvares her uden at kontakte support. For danske spillere, der er komfortable med engelsk, er bet365's kundeservice fuldt tilstrækkelig. For dem, der foretrækker dansk, er det en klar ulempe.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Sikkerhed og licens */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            <Shield className="inline h-7 w-7 text-primary mr-2" />
            Sikkerhed og licens
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            bet365 opererer under dansk licens fra Spillemyndigheden og er fuldt tilsluttet ROFUS. Platformen bruger 256-bit SSL-kryptering til alle data- og betalingstransaktioner. Som en af verdens mest kontrollerede gambling-virksomheder er bet365 underlagt regulering fra myndigheder i over 20 lande, herunder UK Gambling Commission.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det private ejerskab under Coates-familien er det eneste punkt, der kan diskuteres i sikkerhedssammenhæng. Børsnoterede konkurrenter som Kindred Group (der driver <Link to="/casino-anmeldelser/unibet" className={linkClass}>Unibet</Link>) offentliggør detaljerede kvartalsregnskaber. bet365 har ikke samme forpligtelse. I praksis har dette dog aldrig resulteret i problemer for spillere – udbetalinger behandles pålideligt, og virksomhedens track record over 20+ år er uplettet.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Værktøjer til <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link> inkluderer indbetalingsgrænser, tabsgrænser, sessionsgrænser og selvudelukkelse. Disse er let tilgængelige i kontostyringen og fungerer som forventet. bet365 samarbejder desuden med GamCare og andre organisationer for forebyggelse af ludomani.
          </p>
          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardContent className="pt-6 space-y-3">
              <p className="text-muted-foreground">
                Spil ansvarligt. Kontakt{" "}
                <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                  StopSpillet.dk
                </a>{" "}
                på tlf. 70 22 28 25 ved behov.
              </p>
              <p className="text-xs text-muted-foreground">18+ | Spil ansvarligt | Annoncering</p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Fordele og ulemper */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Fordele og ulemper</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg text-primary">
                  <Check className="h-5 w-5" />
                  Fordele
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Sportsbook med uovertruffen dybde og dækning",
                    "Live streaming af tusindvis af events",
                    "Stabilt casino med ~2.500 titler",
                    "Hurtige udbetalinger via Trustly",
                    "Innovative features: Bet Builder, Cash Out, Early Payout",
                    "24/7 kundeservice med hurtig respons",
                    "Dansk licens og 20+ års driftserfaring",
                    "Effektiv betalingsinfrastruktur uden gebyrer",
                  ].map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary" />
                      <span className="text-muted-foreground">{p}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg text-destructive/80">
                  <X className="h-5 w-5" />
                  Ulemper
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Casino føles sekundært til sport i designet",
                    "Velkomstbonus er gennemsnitlig for casino",
                    "Kundeservice primært på engelsk",
                    "Privatejerskab giver mindre finansiel transparens",
                    "Mobilnavigation kan føles tæt pakket",
                    "Færre niche-spiludbydere end specialister",
                  ].map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm">
                      <X className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{c}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Hvem passer bet365 til? */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvem passer bet365 til?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            bet365 er det oplagte valg for spillere, der primært er interesseret i sportsbetting og ønsker casino som en sidegevinst. Hvis du følger fodbold, tennis eller hestevæddeløb aktivt og værdsætter live streaming, er bet365 svær at matche. Platformen fungerer også godt for spillere, der ønsker alt samlet ét sted – sport, casino og live casino under én konto – og som prioriterer stabilitet og pålidelighed over den nyeste bonus.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Hvem bør vælge anderledes?</strong> Hvis du udelukkende spiller casino og aldrig rører sportsbetting, får du en bedre oplevelse hos en dedikeret casino-operatør. <Link to="/casino-anmeldelser/leovegas" className={linkClass}>LeoVegas</Link> har en mere intuitiv mobil casinooplevelse. <Link to="/casino-anmeldelser/mr-vegas" className={linkClass}>Mr Vegas</Link> har et bredere spiludvalg og stærkere velkomstbonus. Og hvis dansk kundeservice er vigtigt for dig, er <Link to="/casino-anmeldelser/danske-spil" className={linkClass}>Danske Spil</Link> det mere komfortable valg. bet365 er en generalist – og den bedste generalist – men generalister er ikke for alle.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Sammenligning */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sammenligning med konkurrenter</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Mod <Link to="/casino-anmeldelser/unibet" className={linkClass}>Unibet</Link>: Begge er store allround-platforme, men bet365 har den dybere sportsbook med bedre odds og bredere live streaming. Unibet har til gengæld et aktivt pokerrum tilgængeligt i Danmark og en platform, der føles mere balanceret mellem sport og casino. Unibets ejer, Kindred Group, er børsnoteret – hvilket giver mere transparens. For den sportsfokuserede spiller vinder bet365; for den alsidige spiller er Unibet et stærkt alternativ.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Mod <Link to="/casino-anmeldelser/leovegas" className={linkClass}>LeoVegas</Link>: Her er det et spørgsmål om prioriteter. LeoVegas er designet mobile-first med en casino-oplevelse, der er mere poleret og intuitiv. Deres live casino-sektion er dybere med flere eksklusive borde. Men LeoVegas har ingen sportsbook, ingen live streaming og ingen Bet Builder. Hvis casino er 100% af dit fokus, vælg LeoVegas. Hvis du vil have sport og casino, vælg bet365.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Mod <Link to="/casino-anmeldelser/danske-spil" className={linkClass}>Danske Spil</Link>: Danske Spil har den unikke fordel af fuld dansk kundeservice og den tillid, der følger med statsligt ejerskab. Til gengæld er spiludvalget smallere, oddsene typisk højere (dårligere for bettoren), og der er ingen live streaming. For spillere, der prioriterer dansk support og lokal forankring, er Danske Spil det trygge valg. For alle andre er bet365 objektivt den stærkere platform.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Endelig vurdering */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Vores endelige vurdering</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            bet365 er den mest komplette spilleplatform, der er tilgængelig for danske spillere. Sportsbook'en er i en liga for sig selv med dybde, live streaming og innovative værktøjer, som ingen konkurrent matcher. Casino-sektionen er solid med et bredt udvalg, og live casinoet er blandt de bedste. Udbetalinger er hurtige, platformen er stabil, og 20+ års erfaring mærkes i hvert aspekt af produktet.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            De reelle svagheder er begrænsede: en gennemsnitlig casino-velkomstbonus, engelsksproget kundeservice og et design, der prioriterer sport over casino. For den rette spiller – en der ønsker alt samlet ét sted med sport som fundament – er bet365 svær at forbigå. Læs om{" "}
            <Link to="/forfatter/jonas" className={linkClass}>forfatteren</Link>.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Sportsbetting", score: "10/10" },
              { label: "Casino", score: "8/10" },
              { label: "Pålidelighed", score: "10/10" },
              { label: "Samlet", score: "4.5/5" },
            ].map((i) => (
              <div key={i.label} className="rounded-lg border border-border bg-card p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase mb-1">{i.label}</p>
                <p className="text-2xl font-bold text-primary">{i.score}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild variant="outline" size="lg" className="flex-1">
              <Link to="/top-10-casino-online">
                <Trophy className="mr-2 h-5 w-5" />
                Se Top 10 Casinoer
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="flex-1">
              <Link to="/casino-anmeldelser">
                <Star className="mr-2 h-5 w-5" />
                Alle Casino Anmeldelser
              </Link>
            </Button>
          </div>
        </section>

        <InlineCasinoCards title="Andre anbefalede casinoer" count={6} excludeSlugs={["bet365"]} />
        <AuthorBio />
        <Separator className="my-10" />
        <RelatedGuides currentPath="/casino-anmeldelser/bet365" />
        <FAQSection title="Ofte stillede spørgsmål om bet365" faqs={faqs} />
      </div>
    </>
  );
};

export default Bet365Anmeldelse;
