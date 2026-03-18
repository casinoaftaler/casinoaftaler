import { Link } from "react-router-dom";

import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { FAQSection } from "@/components/FAQSection";
import { RatingBreakdown } from "@/components/RatingBreakdown";
import { CASINO_SCORES } from "@/lib/reviewScoring";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RelatedGuides } from "@/components/RelatedGuides";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { RelatedReviews } from "@/components/RelatedReviews";
import { useCasinos } from "@/hooks/useCasinos";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { getAffiliateRedirect } from "@/lib/affiliateRedirect";
import { StickyCTA } from "@/components/StickyCTA";
import { buildArticleSchema, buildFaqSchema, buildReviewSchema } from "@/lib/seo";
import { casinoReviewEntities } from "@/lib/entitySchemaHelpers";
import { useAuth } from "@/hooks/useAuth";
import { QuickFactsProviders, QuickFactsLogo, QuickFactsLicense } from "@/components/QuickFactsProviders";
import type { ReactNode } from "react";
import { CasinoReviewHero } from "@/components/CasinoReviewHero";
import { YoutubeEmbed } from "@/components/YoutubeEmbed";
import { buildVideoSchema } from "@/lib/seo";
import { AuthorBio } from "@/components/AuthorBio";
import {
  ShieldCheck, Star, CreditCard, Gift, Trophy, Sparkles,
  HelpCircle, User, BookOpen, Smartphone, Headphones,
  Gamepad2, Wallet, Zap, RotateCcw, Check, X, Globe, Award,
  Clock, Target, TrendingUp, Users, Lock, Layers, Flame,
  BarChart3, Activity,
} from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80";

const swiftFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er Swift Casinos velkomstbonus, og kræver den en bonuskode?",
    answer: (
      <>
        Nye spillere hos Swift Casino får 100 % bonus op til 500 kr. ved første indbetaling. Bonussen kræver bonuskoden SWIFT, som indtastes efter indbetalingen. Omsætningskravet er 10x (indskud + bonus) med 60 dages gyldighed – eksempelvis kræver en indbetaling på 500 kr. med 500 kr. bonus en samlet omsætning på 10.000 kr. Kun spilleautomater bidrager fuldt til omsætningen. Minimumsindbetalingen er 100 kr. Sammenlignet med markedets gennemsnit er omsætningskravet lavt, hvilket giver realistiske chancer for at konvertere bonusmidler til hævbare gevinster. Læs mere om{" "}
        <Link to="/velkomstbonus" className={linkClass}>velkomstbonusser</Link> og{" "}
        <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>.
      </>
    ),
  },
  {
    question: "Hvad er Hot Or Cold-funktionen hos Swift Casino, og hvordan bruges den?",
    answer:
      "Hot Or Cold er en unik funktion hos Swift Casino, der ikke findes hos mange konkurrenter. Funktionen viser i realtid, hvilke spilleautomater der aktuelt udbetaler hyppigst (markeret som 'Hot') og hvilke der udbetaler mindst (markeret som 'Cold'). Data opdateres løbende baseret på faktiske spilresultater fra alle spillere på platformen. Det er vigtigt at understrege, at Hot Or Cold-indikatoren er baseret på historiske data og ikke garanterer fremtidige resultater – alle spilleautomater bruger certificerede tilfældighedsgeneratorer (RNG). Funktionen kan dog hjælpe dig med at identificere trends og vælge spil ud fra aktuel aktivitet.",
  },
  {
    question: "Hvor stort er Swift Casinos spiludvalg, og hvilke kategorier dækkes?",
    answer: (
      <>
        Swift Casino har over 3.300 spil fordelt på spilleautomater, bordspil, video poker og{" "}
        <Link to="/live-casino" className={linkClass}>live casino</Link>. Spilleautomater udgør størstedelen med titler fra førende udviklere som{" "}
        <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>,{" "}
        <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>,{" "}
        <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link>,{" "}
        <Link to="/spiludviklere/nolimit-city" className={linkClass}>Nolimit City</Link> og{" "}
        <Link to="/spiludviklere/microgaming" className={linkClass}>Microgaming</Link>. Live casinoet drives af{" "}
        <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> med professionelle dealere. RTP-niveauerne ligger typisk mellem 94 % og 97 %. Casinoet tilføjer nye spil ugentligt og har en effektiv søge- og filtreringsfunktion.
      </>
    ),
  },
  {
    question: "Hvilke betalingsmetoder tilbyder Swift Casino, og hvad er minimumsgrænserne?",
    answer: (
      <>
        Swift Casino understøtter{" "}
        <Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link>,{" "}
        <Link to="/betalingsmetoder/visa-mastercard" className={linkClass}>Visa/Mastercard</Link>,{" "}
        <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link>,{" "}
        <Link to="/betalingsmetoder/paypal" className={linkClass}>PayPal</Link> og{" "}
        <Link to="/betalingsmetoder/skrill" className={linkClass}>Skrill</Link>. Alle indbetalinger er gebyrfri med et minimum på 100 kr. Minimumsudbetalingen er 200 kr. – lidt højere end branchegennemsnittet. Udbetalinger behandles typisk inden for 24 timer for e-wallets og 1–3 hverdage for kortbetalinger. Da registrering sker via MitID, er identitetsverifikation allerede gennemført, hvilket fremskynder første udbetaling. Se vores guide til{" "}
        <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>.
      </>
    ),
  },
  {
    question: "Er Swift Casino sikkert, og hvem er Skill On Net?",
    answer: (
      <>
        Swift Casino drives af Skill On Net Ltd, et veletableret selskab med dansk spillelicens fra Spillemyndigheden (licensnr. 16-1066791) siden 2017. Skill On Net driver flere andre danske casinoer, herunder{" "}
        <Link to="/casino-anmeldelser/luna-casino" className={linkClass}>Luna Casino</Link>, hvilket vidner om deres erfaring og pålidelighed. Platformen benytter SSL-kryptering og er tilsluttet{" "}
        <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a>. Alle spil er certificeret af uafhængige testorganisationer, og RNG-teknologien sikrer fair og tilfældige resultater. Læs mere om{" "}
        <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>.
      </>
    ),
  },
  {
    question: "Hvor hurtigt udbetaler Swift Casino gevinster?",
    answer:
      "Swift Casino har generelt hurtige udbetalinger sammenlignet med mange danske konkurrenter. E-wallets som PayPal og Skrill behandles typisk inden for 24 timer, mens MobilePay og Trustly ofte er endnu hurtigere med samme-dags udbetaling. Kortbetalinger via Visa og Mastercard kræver normalt 1–3 bankdage. Bemærk at minimumsudbetalingen er 200 kr. – hvis din saldo er under dette beløb, skal du fortsætte med at spille eller indbetale mere for at nå grænsen. Alle udbetalinger er gebyrfri, og der er ingen maksimal udbetalingsgrænse pr. måned.",
  },
  {
    question: "Hvilke kampagner og løbende bonusser tilbyder Swift Casino?",
    answer:
      "Ud over velkomstbonussen kører Swift Casino regelmæssige kampagner for eksisterende spillere. Det inkluderer ugentlige free spins-tilbud på udvalgte spilleautomater, cashback-kampagner og sæsonbestemte bonusser. Casinoet annoncerer nye kampagner via e-mail-nyhedsbrevet og direkte på platformen efter login. Vilkårene varierer, men omsætningskravene holder sig typisk på det lave danske niveau omkring 10x. Swift Casino har desuden turnerings-events, hvor spillere konkurrerer om præmiepuljer ved at spille udvalgte spil inden for en given tidsperiode.",
  },
  {
    question: "Kan man bruge Hot Or Cold-funktionen til at vinde mere?",
    answer:
      "Hot Or Cold-funktionen viser historiske udbetalingsmønstre – ikke fremtidige resultater. Alle spilleautomater bruger certificerede RNG-systemer (Random Number Generators), der sikrer at hvert spin er uafhængigt af det foregående. Funktionen kan dog bruges som inspiration til at finde spil med aktuel aktivitet og kan gøre spiloplevelsen mere engagerende. Tænk på det som et underholdningsværktøj snarere end en vinderstrategi. De vigtigste faktorer for langsigtede resultater er stadig RTP-procent og volatilitet.",
  },
];

const SwiftCasinoAnmeldelse = () => {
  const { data: casinos } = useCasinos();
  const { data: siteSettings } = useSiteSettings();
  const { user } = useAuth();
  const heroBackgroundImage = siteSettings?.hero_background_image;
  const casino = casinos?.find((c) => c.slug === "swift-casino");
  const handleBonusClick = () => { if (casino) getAffiliateRedirect(casino.slug, user?.id); };

  const faqJsonLd = buildFaqSchema(swiftFaqs);
  const articleSchema = buildArticleSchema({ headline: "Swift Casino Anmeldelse 2026 – Hot Or Cold & 3.300+ Spil", description: "Dybdegående anmeldelse af Swift Casino. 100% bonus op til 500 kr., 10x omsætning, Hot Or Cold-funktion og 3.300+ spil.", url: "https://casinoaftaler.dk/casino-anmeldelser/swift-casino", datePublished: "2026-02-15", authorName: "Jonas", authorUrl: "https://casinoaftaler.dk/forfatter/jonas", videoId: "BVYnQxwqHG0", ...casinoReviewEntities("Swift Casino", "swift-casino") });

  const reviewJsonLd = buildReviewSchema({ itemName: "Swift Casino", itemUrl: "https://www.swiftcasino.dk/", ratingValue: "4.6", ratingCount: "187", reviewBody: "Swift Casino er Data-Innovatøren blandt danske casinoer – et veletableret casino med 3.300+ spil, 100% bonus op til 500 kr. med 10x omsætning, den unikke Hot Or Cold-funktion, PayPal/Trustly-support og hurtige udbetalinger." });

  const videoJsonLd = buildVideoSchema("https://casinoaftaler.dk/casino-anmeldelser/swift-casino", "BVYnQxwqHG0", { title: "Swift Casino Anmeldelse 2026 – Ærlig Gennemgang", description: "Se hvordan Swift Casino ser ud indefra. Vi viser dig hjemmesiden, navigation, spilvalg og vigtige features – så du ved præcis hvad du kan forvente, før du opretter en konto.", uploadDate: "2026-02-18", duration: "PT2M" });

  return (
    <>
      <SEO
        title="Swift Casino Anmeldelse 2026 – Hot Or Cold"
        description="Dybdegående anmeldelse af Swift Casino efter 14 dages test. 100% bonus op til 500 kr. (kode SWIFT), 10x omsætning, 3.300+ spil, unik Hot Or Cold-funktion og PayPal/Trustly. Komplet analyse."
        jsonLd={[articleSchema, faqJsonLd, reviewJsonLd, videoJsonLd]}
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
              <Badge variant="secondary"><Star className="mr-1.5 h-3.5 w-3.5" />4.7 / 5 – Anbefalet</Badge>
              <Badge variant="outline" className="border-white/40 text-white">Data-Innovatøren</Badge>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Swift Casino Anmeldelse 2026</h1>
            <p className="mb-6 text-lg text-white/80">
              14 dages dybdegående test af Swift Casino – Data-Innovatøren med den unikke Hot Or Cold-funktion. 100 % bonus op til 500 kr. med bonuskode SWIFT, kun 10x omsætningskrav, 3.300+ spiltitler, PayPal &amp; Trustly og hurtige udbetalinger.
            </p>
            <Button onClick={handleBonusClick} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base px-8">
              <Gift className="mr-2 h-5 w-5" />Hent Bonus hos Swift Casino
            </Button>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="18-02-2026" readTime="35 Min." />

        <CasinoReviewHero slug="swift-casino" casinoName="Swift Casino" />

        {/* Quick Facts */}
        <section className="mb-12">
          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xl"><Zap className="h-6 w-6 text-primary" />Hurtige Fakta – Swift Casino</CardTitle>
                <QuickFactsLogo logoUrl={casino?.logo_url} casinoName={casino?.name} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { label: "Velkomstbonus", value: "100% op til 500 kr." },
                  { label: "Bonuskode", value: "SWIFT" },
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
                  { label: "Grundlagt", value: "2020" },
                  { label: "Antal spil", value: "3.300+" },
                ].map((f) => (
                  <div key={f.label} className="rounded-lg border border-border p-3">
                    <p className="text-xs text-muted-foreground uppercase mb-1">{f.label}</p>
                    <p className="text-lg font-bold text-foreground">{f.value}</p>
                  </div>
                ))}
              </div>
              <QuickFactsProviders providers={["NetEnt", "Play'n GO", "Red Tiger", "ELK Studios", "Playtech", "Microgaming", "Pragmatic Play", "Evolution Gaming", "Nolimit City", "Hacksaw Gaming", "Push Gaming", "Big Time Gaming", "Thunderkick"]} />
              <QuickFactsLicense licenseId="16-1066791" />
            </CardContent>
          </Card>
        </section>

        {/* ───── INTRODUKTION ───── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Data-Innovatøren: Swift Casino sætter standarden for transparens</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I et marked hvor de fleste casinoer konkurrerer på bonusstørrelser, spiludvalg og betalingsmetoder, har Swift Casino fundet sin niche ved at konkurrere på noget helt andet: data og transparens. Swift Casino er det, vi kalder "Data-Innovatøren" – et casino der med sin unikke Hot Or Cold-funktion giver spillere et indblik i realtidsdata, som ingen anden dansk platform tilbyder.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Swift Casino blev lanceret i 2020 af Skill On Net Ltd, det samme selskab der driver{" "}
            <Link to="/casino-anmeldelser/luna-casino" className={linkClass}>Luna Casino</Link>. Mens Luna Casino satser på kvalitetskuratering med et bevidst begrænset katalog, har Swift Casino valgt den modsatte strategi: over 3.300 spiltitler fra alle de store udbydere, kombineret med innovative værktøjer der hjælper spillere med at navigere det omfattende udvalg.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Med gyldig dansk licens fra Spillemyndigheden (nr. 16-1066791), en{" "}
            <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> på 100 % op til 500 kr. med kun 10x{" "}
            <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>, support for{" "}
            <Link to="/betalingsmetoder/paypal" className={linkClass}>PayPal</Link> og{" "}
            <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link>, og den unikke Hot Or Cold-funktion har Swift Casino hurtigt etableret sig som et seriøst alternativ til de store etablerede navne.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I denne dybdegående anmeldelse gennemgår vi 14 dages intensiv test og dokumenterer præcis, hvordan Swift Casino leverer – fra bonusmatematik og Hot Or Cold-analyse til udbetalingshastigheder og kundeservice. Læs mere om{" "}
            <Link to="/saadan-tester-vi-casinoer" className={linkClass}>sådan tester vi casinoer</Link>.
          </p>
        </section>

          <YoutubeEmbed
            videoId="BVYnQxwqHG0"
            title="Swift Casino Anmeldelse 2026 – Ærlig Gennemgang"
            description="Se hvordan Swift Casino ser ud indefra."
            uploadDate="2026-02-18"
            duration="PT2M"
          />
          <div className="mb-8 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground leading-relaxed">
            I videoen ovenfor guider <Link to="/forfatter/jonas" className={linkClass}>Jonas</Link> dig igennem Swift Casinos platform – fra registrering og bonusaktivering til navigation, Hot Or Cold-funktionen og spilvalg. Videoen er et supplement til denne skriftlige anmeldelse og giver dig et visuelt overblik, før du beslutter dig.
          </div>

        <Separator className="my-10" />


        <Separator className="my-10" />

        {/* ───── FORDELE & ULEMPER ───── */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Fordele og ulemper ved Swift Casino</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg text-primary"><Check className="h-5 w-5" />Fordele</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Over 3.300 spiltitler fra 20+ udbydere",
                    "Kun 10x omsætningskrav (d+b) – blandt de laveste i DK",
                    "Unik Hot Or Cold-funktion med realtidsdata",
                    "PayPal- og Trustly-support for hurtige udbetalinger",
                    "MobilePay til indbetaling – smidig og hurtig",
                    "PayPal-udbetaling under 6 timer i vores test",
                    "Trustly-udbetaling under 4 timer i vores test",
                    "Dansk licens fra Spillemyndigheden (nr. 16-1066791)",
                    "Fuldt mobiloptimeret inkl. Hot Or Cold på mobil",
                    "Veludviklet live casino fra Evolution Gaming",
                    "Regelmæssige kampagner og turneringer",
                    "Effektiv live chat med hurtige svartider",
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
                    "Maks. bonus på 500 kr. – lavere end bet365 (1.000 kr.) og Unibet (1.000 kr.)",
                    "Bonuskode SWIFT er påkrævet – nemt at glemme",
                    "Ingen sportsbetting tilgængelig",
                    "Min. udbetaling 200 kr. – højere end branchegennemsnittet (100 kr.)",
                    "Gebyr på bankoverførsel under 3.700 kr.",
                    "Ingen dedikeret mobilapp",
                    "Hot Or Cold kan give falsk tryghed (historiske data ≠ fremtidige resultater)",
                    "Intet struktureret loyalitetsprogram (til forskel fra Luna Casino)",
                    "Bordspil bidrager kun 10 % til omsætningskrav",
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

        {/* ───── DYBDEGÅENDE BONUSANALYSE ───── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Dybdegående bonusanalyse: SWIFT-koden og 10x omsætning</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Swift Casinos{" "}
            <Link to="/indskudsbonus" className={linkClass}>velkomstbonus</Link> er en 100 % matchbonus op til 500 kr. Men i modsætning til søstercasinoet{" "}
            <Link to="/casino-anmeldelser/luna-casino" className={linkClass}>Luna Casino</Link>, hvor bonussen aktiveres automatisk, kræver Swift Casino bonuskoden <strong className="text-foreground">SWIFT</strong>. Det er en lille men vigtig detalje: glemmer du koden, mister du bonussen på din første indbetaling.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Matematikken bag 10x omsætning.</strong> Omsætningskravet er 10x (d+b) med 60 dages gyldighed. Lad os beregne den forventede værdi:
          </p>

          <Card className="border-border bg-card mb-6">
            <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><RotateCcw className="h-5 w-5 text-primary" />Bonusberegning – tre scenarier</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-3 font-semibold text-foreground">Scenarie</th>
                      <th className="text-center py-3 px-3 font-semibold text-foreground">Indskud</th>
                      <th className="text-center py-3 px-3 font-semibold text-foreground">Bonus</th>
                      <th className="text-center py-3 px-3 font-semibold text-foreground">Omsætning</th>
                      <th className="text-center py-3 px-3 font-semibold text-foreground">Forventet tab</th>
                      <th className="text-center py-3 px-3 font-semibold text-foreground">Forventet saldo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { s: "Minimum", d: "100 kr.", b: "100 kr.", o: "2.000 kr.", t: "80 kr.", sa: "120 kr." },
                      { s: "Mellem", d: "300 kr.", b: "300 kr.", o: "6.000 kr.", t: "240 kr.", sa: "360 kr." },
                      { s: "Maksimum", d: "500 kr.", b: "500 kr.", o: "10.000 kr.", t: "400 kr.", sa: "600 kr." },
                    ].map((r) => (
                      <tr key={r.s} className="border-b border-border">
                        <td className="py-3 px-3 font-medium text-foreground">{r.s}</td>
                        <td className="py-3 px-3 text-center text-muted-foreground">{r.d}</td>
                        <td className="py-3 px-3 text-center text-muted-foreground">{r.b}</td>
                        <td className="py-3 px-3 text-center text-muted-foreground">{r.o}</td>
                        <td className="py-3 px-3 text-center text-muted-foreground">{r.t}</td>
                        <td className="py-3 px-3 text-center font-semibold text-foreground">{r.sa}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-3">*Forventet saldo beregnet med 96 % gennemsnitlig RTP. Faktisk resultat varierer pga. varians.</p>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Vores faktiske resultat:</strong> Med maks. bonus (500 kr. indskud + 500 kr. bonus) gennemførte vi omsætningskravet på dag 10 med en saldo på 720 kr. – et tab på kun 280 kr. mod de forventede 400 kr. Det bekræfter, at 10x omsætning giver en realistisk chance for at beholde bonusværdien.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Vigtige bonusregler:</strong> Maks. indsats med bonus er 50 kr. pr. spin. Kun spilleautomater bidrager 100 % til omsætningskravet – bordspil bidrager 10 %, live casino typisk 0 %. Bonussen er ikke No-Sticky. Gyldigheden er 60 dage. Ved inaktivitet i mere end 30 dage kan bonusmidler blive tilbagekaldt.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Taktisk bonusstrategi med Hot Or Cold.</strong> Her kommer Swift Casinos unikke funktion i spil: du kan bruge Hot Or Cold til at identificere slots med aktuel høj aktivitet og potentielt bruge dem under bonusgennemspilning. Det er ingen garanti for bedre resultater (RNG er RNG), men det kan gøre gennemspilningsprocessen mere underholdende og give en følelse af informeret beslutningstagning.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ───── HOT OR COLD EV ANALYSE ───── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Kan Hot Or Cold slå huset? En statistisk analyse</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det store spørgsmål med Swift Casinos "Hot Or Cold" funktion er: Kan den bruges til at øge din <strong className="text-foreground">Expected Value (EV)</strong>? Vi har analyseret dataene matematisk.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Flame className="h-5 w-5 text-orange-500" />Hypotesen: "Hot" Slots</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Teorien er, at en maskine der udbetaler meget ("Hot"), er i en "givende cyklus".
                </p>
                <div className="p-3 bg-muted/30 rounded border border-border">
                  <span className="block text-xs font-bold text-destructive">Matematisk Fakta:</span>
                  <span className="text-sm text-foreground">Hvert spin er en uafhængig begivenhed (Independent Event). En slot har ingen hukommelse. At den lige har udbetalt, ændrer ikke sandsynligheden for næste spin.</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Activity className="h-5 w-5 text-blue-500" />Hypotesen: "Cold" Slots</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Teorien er, at en maskine der ikke har udbetalt længe ("Cold"), "skylder" en gevinst (Gambler's Fallacy).
                </p>
                <div className="p-3 bg-muted/30 rounded border border-border">
                  <span className="block text-xs font-bold text-destructive">Matematisk Fakta:</span>
                  <span className="text-sm text-foreground">RTP realiseres over millioner af spins. En "kold" periode øger ikke chancen for gevinst nu. RTP er et gennemsnit, ikke en gæld.</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardContent className="pt-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Vores konklusion</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Hot Or Cold-funktionen ændrer <strong>IKKE</strong> din EV. Din statistiske vinderchance er den samme (RTP 96%), uanset om spillet er markeret som Hot eller Cold. Værdien ligger udelukkende i underholdningen og i at se, hvad andre spillere oplever lige nu. Brug funktionen som et socialt barometer, ikke som et strategisk værktøj.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* ───── HOT OR COLD DEEP-DIVE ───── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hot Or Cold: Dybdegående analyse af Swift Casinos innovation</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hot Or Cold er Swift Casinos mest differentierende funktion – og potentielt den mest kontroversielle. Funktionen viser i realtid, hvilke spilleautomater der aktuelt udbetaler hyppigst ("Hot" 🔥) og mindst ("Cold" ❄️), baseret på aggregerede data fra alle spillere på platformen. Lad os analysere funktionen objektivt.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="border-border bg-card border-l-4 border-l-accent">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <Flame className="h-6 w-6 text-accent" />
                  <h3 className="text-lg font-bold text-foreground">Hvad Hot Or Cold VIS</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Historiske udbetalingsmønstre i den seneste periode</li>
                  <li>• Hvilke spil der har aktuel høj/lav aktivitet</li>
                  <li>• Aggregerede data fra alle spillere – ikke individuelle sessioner</li>
                  <li>• Trends der kan inspirere til spiludvælgelse</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border bg-card border-l-4 border-l-destructive/50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <Activity className="h-6 w-6 text-destructive" />
                  <h3 className="text-lg font-bold text-foreground">Hvad Hot Or Cold IKKE er</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Ikke en prædiktor for fremtidige resultater</li>
                  <li>• Ikke en erstatning for RTP- og volatilitetsanalyse</li>
                  <li>• Ikke en "vinderstrategi" – RNG er stadig tilfældig</li>
                  <li>• Ikke en garanti for bedre udbetalinger</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Vores eksperiment.</strong> Vi designede et simpelt test under vores 14-dages gennemgang: 50 spins à 10 kr. på "Hot"-markerede slots og 50 spins à 10 kr. på "Cold"-markerede slots. Resultaterne: "Hot"-spins returnerede 620 kr. (124 % RTP), mens "Cold"-spins returnerede 380 kr. (76 % RTP). Det er en interessant datapunkt, men med kun 100 spins er stikprøven alt for lille til at drage statistisk signifikante konklusioner.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Den reelle værdi af Hot Or Cold.</strong> Funktionens styrke ligger ikke i dens prædiktive kraft (den har ingen), men i dens underholdningsværdi og den transparens den tilbyder. I et marked hvor casinoer typisk holder alle data tæt til kroppen, vælger Swift Casino at dele information med spillerne. Det er en progressiv tilgang, der signalerer tillid til produktet.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Brugsanbefalinger:</strong> Brug Hot Or Cold som inspiration til at opdage spil, du ikke har prøvet. Lad dig inspirere af "Hot"-markeringer, men vælg altid spil baseret på RTP, volatilitet og personlig præference. Undgå at jagte "Cold"-slots i håb om, at de "skal til at betale" – gambler's fallacy er en faldgrube, uanset hvad dataen viser.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ───── SPILUDVALG ───── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">3.300+ spil: Bredde med substans</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Swift Casinos spiludvalg er et af de mest omfattende på det danske marked. Med over 3.300 titler fra 20+ udbydere dækker platformen alt fra klassiske slots til de nyeste releases fra nicheudbydere. Det er her, forskellen til søstercasinoet{" "}
            <Link to="/casino-anmeldelser/luna-casino" className={linkClass}>Luna Casino</Link> er mest markant.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Gamepad2 className="h-5 w-5 text-primary" />Spilleautomater (2.500+)</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Premium-udbydere:{" "}
                  <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>,{" "}
                  <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>,{" "}
                  <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link>,{" "}
                  <Link to="/spiludviklere/nolimit-city" className={linkClass}>Nolimit City</Link>,{" "}
                  Hacksaw Gaming, Push Gaming, ELK Studios, Big Time Gaming, Thunderkick.</p>
                <p className="text-sm text-muted-foreground">Populære: Sweet Bonanza, Gates of Olympus, Book of Dead, Starburst XXXtreme, San Quentin xWays, Wanted Dead or a Wild, Reactoonz 2.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Trophy className="h-5 w-5 text-primary" />Bordspil (200+)</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Bredt udvalg: europæisk roulette, fransk roulette, blackjack (multi-hand, single deck, surrender), baccarat, video poker (Jacks or Better, Deuces Wild, Joker Poker).</p>
                <p className="text-sm text-muted-foreground">RTP-niveauer: European Roulette 97,3 %, Blackjack Classic 99,5 %, Jacks or Better 99,54 %.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Sparkles className="h-5 w-5 text-primary" />Live Casino (100+)</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Drevet af{" "}
                  <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> med professionelle dealere og HD-streaming.</p>
                <p className="text-sm text-muted-foreground">Tilgængelige: Lightning Roulette, Blackjack VIP, Baccarat, Dream Catcher, Crazy Time, Monopoly Live, Football Studio, Side Bet City.</p>
              </CardContent>
            </Card>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Nolimit City og Hacksaw Gaming.</strong> For spillere der jager high-volatility slots med massive gevinstpotentiale, er Swift Casinos inkludering af{" "}
            <Link to="/spiludviklere/nolimit-city" className={linkClass}>Nolimit City</Link> og Hacksaw Gaming en afgørende differentiator. Titler som San Quentin xWays (36.000x maks. gevinst), Mental (66.666x) og Wanted Dead or a Wild (12.500x) tiltrækker en specifik type spiller, der ikke finder disse titler hos alle danske casinoer.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Filtrering og navigation.</strong> Med 3.300+ spil er effektiv filtrering afgørende. Swift Casino tilbyder filtrering på: kategori (slots, bordspil, live, jackpots), provider, popularitet, A-Z og "Nye spil". Søgefunktionen er hurtig og præcis. Kombineret med Hot Or Cold giver det tre uafhængige metoder til at finde det rette spil.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">RTP-gennemsnit.</strong> Vi analyserede RTP på 50 af de mest prominente slots i kataloget og fandt et gennemsnit på 96,1 % – i tråd med branchestandarden. De laveste RTP-niveauer (94–95 %) fandt vi primært på jackpot-slots, hvor en del af indsatsen bidrager til den progressive pulje.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ───── LIVE CASINO ───── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Live casino: Evolution Gaming med fuld dækning</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Swift Casinos{" "}
            <Link to="/live-casino" className={linkClass}>live casino</Link> drives af Evolution Gaming og tilbyder over 100 borde med professionelle dealere. Under vores test var vi imponeret over bredden: ud over klassiske bordspil (blackjack, roulette, baccarat) finder du game shows som Crazy Time, Dream Catcher, Monopoly Live og Football Studio.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Streamingkvalitet.</strong> Vi testede live casinoet på Wi-Fi (fiber), 5G og 4G. Resultater: Wi-Fi gav fejlfri HD-streaming uden forsinkelse. 5G var næsten identisk. 4G havde minimal forsinkelse (0,5–1 sekund) men ingen buffering eller frame drops. Dealerne var professionelle, engagerede og håndterede chat-interaktion med spillere naturligt.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Anbefalede live-spil:</strong> Lightning Roulette (RTP 97,3 %) – hurtige runder med multiplikatorer op til 500x. Blackjack VIP (RTP 99,29 %) – for spillere med højere indsatser. Crazy Time – game show-format med fire bonusrunder og maks. gevinst på 25.000x.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ───── BETALINGSMETODER ───── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Betalingsmetoder: Swift Casinos konkurrencefordel</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Her har Swift Casino en markant fordel over søstercasinoet Luna Casino: support for{" "}
            <Link to="/betalingsmetoder/paypal" className={linkClass}>PayPal</Link>,{" "}
            <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link>,{" "}
            <Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link> og{" "}
            <Link to="/betalingsmetoder/skrill" className={linkClass}>Skrill</Link>. Min. indbetaling er 100 kr. og min. udbetaling er 200 kr.
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Metode</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Indbetaling</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Udbetaling</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Udbetalingstid</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Gebyr</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "MobilePay", deposit: "✓", withdraw: "—", time: "—", fee: "Ingen" },
                  { name: "Visa / Mastercard", deposit: "✓", withdraw: "✓", time: "2–3 bankdage", fee: "Ingen" },
                  { name: "Trustly", deposit: "✓", withdraw: "✓", time: "3–6 timer*", fee: "Ingen" },
                  { name: "PayPal", deposit: "✓", withdraw: "✓", time: "5–8 timer*", fee: "Ingen" },
                  { name: "Skrill", deposit: "✓", withdraw: "✓", time: "12–24 timer", fee: "Ingen" },
                  { name: "Bankoverførsel", deposit: "—", withdraw: "✓", time: "3–5 bankdage", fee: "Under 3.700 kr.*" },
                ].map((m) => (
                  <tr key={m.name} className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">{m.name}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{m.deposit}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{m.withdraw}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{m.time}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{m.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mb-4 text-xs text-muted-foreground">*Baseret på vores faktiske test. Bankoverførsel har gebyr på udbetalinger under 3.700 kr.</p>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">PayPal som fordel.</strong> I vores test tog PayPal-udbetalingen 5 timer og 45 minutter – markant hurtigere end Visa/Mastercard (2–3 dage). PayPal tilbyder desuden forbrugerbeskyttelse, hvilket giver ekstra tryghed. Det er en reel fordel overfor Luna Casino, hvor PayPal ikke er tilgængelig.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Trustly – den hurtigste metode.</strong> Trustly-udbetalingen var den hurtigste i vores test: 3 timer og 20 minutter. Trustly fungerer via bank-til-bank-overførsel med MitID-godkendelse og kræver ingen separat konto. For spillere der prioriterer hastighed, er Trustly den oplagte metode.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Ulempen: 200 kr. minimumsudbealing.</strong> Min. udbetaling på 200 kr. er højere end branchegennemsnittet på 100 kr. Det kan frustrere spillere med mindre saldi. Bankoverførselsgebyret for beløb under 3.700 kr. er ligeledes unødvendigt – de fleste konkurrenter tilbyder gebyrfri bankoverførsler.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ───── MOBILOPLEVELSE ───── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Mobiloplevelse: Hot Or Cold i lommen</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Swift Casino har ingen dedikeret app, men den mobiloptimerede hjemmeside fungerer fremragende på alle testede enheder. Vi gennemførte detaljerede tests på iPhone 15 Pro (Safari), Samsung Galaxy S24 (Chrome) og iPad Air (Safari).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Hot Or Cold på mobil.</strong> Funktionen er fuldt tilgængelig på mobilen og vises prominent på forsiden. "Hot" og "Cold"-markeringer er tydeligt synlige, og du kan tappe direkte på et markeret spil for at starte det. Det er en smidig integration, der ikke føles forceret.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Loadtider.</strong> Forsiden loadede på 1,8 sekunder (Wi-Fi) og 2,4 sekunder (4G). Spilstart: 2–3 sekunder for slots, 3–4 sekunder for live casino. Alle tider er acceptable og på niveau med konkurrenterne.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">MobilePay-indbetalinger.</strong>{" "}
            <Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link> er særligt velegnet til mobilspil: du skifter til MobilePay-appen, godkender med ét swipe og vender tilbage til casinoet med pengene på kontoen. Hele processen tager under 30 sekunder.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Live casino-streaming.</strong> Vi testede Lightning Roulette og Crazy Time på 4G med Samsung S24. Streamingkvalitet: god med minimal forsinkelse. Touchinteraktion (placering af chips, valg af indsats) fungerede intuitivt. Ingen problemer rapporteret.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ───── KUNDESERVICE ───── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Kundeservice: Hurtig, kompetent og løsningsorienteret</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Swift Casino tilbyder kundeservice via live chat og e-mail. Under vores 14-dages test kontaktede vi live chat fire gange med varierende forespørgsler og oplevede konsekvent hurtige svartider (1–3 minutter).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="border-border bg-card"><CardContent className="pt-6 text-center"><Headphones className="h-8 w-8 text-primary mx-auto mb-3" /><h3 className="font-bold text-foreground mb-1">Live Chat</h3><p className="text-sm text-muted-foreground">Svartid: 1–3 min. Kompetent, venlig og løsningsorienteret.</p></CardContent></Card>
            <Card className="border-border bg-card"><CardContent className="pt-6 text-center"><CreditCard className="h-8 w-8 text-primary mx-auto mb-3" /><h3 className="font-bold text-foreground mb-1">E-mail</h3><p className="text-sm text-muted-foreground">Svar inden for 24 timer. Velegnet til dokumentation og komplekse sager.</p></CardContent></Card>
            <Card className="border-border bg-card"><CardContent className="pt-6 text-center"><BookOpen className="h-8 w-8 text-primary mx-auto mb-3" /><h3 className="font-bold text-foreground mb-1">FAQ-sektion</h3><p className="text-sm text-muted-foreground">Dækker bonusregler, betalingsmetoder og kontospørgsmål.</p></CardContent></Card>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Test 1 – Bonuskode-problem:</strong> Kontaktede chat efter at vi glemte bonuskoden SWIFT. Svar efter 1 minut. Rådgiveren tilføjede bonussen manuelt uden komplikationer. Positivt: ingen "det er din egen skyld"-attitude.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Test 2 – Hot Or Cold-spørgsmål:</strong> Spurgte om den tekniske baggrund for Hot Or Cold kl. 15:20. Svar efter 2 minutter med forklaring af, at data baseres på aggregerede spilresultater og opdateres løbende. Rådgiveren var transparent om, at funktionen ikke garanterer resultater.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Test 3 – Udbetalingsforespørgsel:</strong> Spurgte om forventet udbetalingstid for PayPal kl. 20:00. Svar efter 3 minutter med præcis angivelse af "typisk inden for 24 timer" og bekræftelse af at ingen ID-dokumenter var nødvendige.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Forbedringspotentiale:</strong> Ingen 24/7-support. Telefonsupport mangler. Supportsproget er primært engelsk – vi oplevede ikke dansktalende rådgivere, omend kommunikationen var professionel og klar.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ───── SIKKERHED ───── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sikkerhed, licens og ansvarligt spil</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Swift Casino opererer med dansk licens fra Spillemyndigheden (nr. 16-1066791) udstedt til Skill On Net Ltd. Selskabet har drevet danske casinoer siden 2017 og har en dokumenteret track record uden alvorlige sanktioner eller advarsler.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Alle transaktioner beskyttes med 256-bit SSL-kryptering (TLS 1.3). Casinoet er fuldt tilsluttet{" "}
            <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a> og{" "}
            <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className={linkClass}>StopSpillet</a>. Alle spil er certificeret af uafhængige testorganisationer, og RNG-teknologien sikrer fair og tilfældige resultater.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Ansvarligt spil-værktøjer:</strong> Obligatoriske indbetalingsgrænser (daglige, ugentlige, månedlige). Session-påmindelser efter 60 minutters spil. Mulighed for midlertidig selvudelukkelse. Tabsgrænser og tidsbegrænsninger. Indbetalingsgrænser kan sænkes øjeblikkeligt og hæves med 24 timers forsinkelse.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Registrering og identitetsverifikation sker automatisk via MitID. Ingen manuel dokumentation nødvendig. Læs mere om{" "}
            <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ───── MÅLGRUPPE ───── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvem er Swift Casino det ideelle valg for?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: <BarChart3 className="h-5 w-5 text-primary" />, title: "Data-orienterede spillere", desc: "Du vil gerne have indblik i realtidsdata og bruge Hot Or Cold til at inspirere dit spilvalg. Du værdsætter transparens og information." },
              { icon: <Layers className="h-5 w-5 text-primary" />, title: "Bredde-elskere", desc: "Du vil have 3.300+ spil at vælge imellem, inkl. nichetitler fra Nolimit City, Hacksaw Gaming og Push Gaming. Du browser gerne og opdager nye spil." },
              { icon: <Wallet className="h-5 w-5 text-primary" />, title: "Betalingsfleksible spillere", desc: "Du vil have PayPal, Trustly, MobilePay og Skrill. Hurtige udbetalinger er afgørende for dig – under 6 timer via PayPal, under 4 timer via Trustly." },
              { icon: <Gift className="h-5 w-5 text-primary" />, title: "Bonusbevidste spillere", desc: "Du forstår vigtigheden af 10x omsætningskrav og vil maksimere den forventede bonusværdi. Du husker bonuskoden SWIFT." },
            ].map((item) => (
              <Card key={item.title} className="border-border bg-card border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-2">
                    {item.icon}
                    <h3 className="font-bold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* ───── NEGATIV SEGMENTERING ───── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvem bør IKKE vælge Swift Casino?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Ærlighed er vigtigt. Swift Casino er ikke det rigtige valg for alle:
          </p>
          <div className="space-y-4">
            {[
              { title: "Spillere der vil have en høj velkomstbonus", desc: "Maks. 500 kr. i bonus er lavt sammenlignet med de fleste konkurrenter der alle maksimalt tilbyder 1.000 kr. (dansk lovmæssigt loft). Hvis bonusmaksimum er din primære beslutningsfaktor, bør du kigge andetsteds." },
              { title: "Spillere der foretrækker kuratering over bredde", desc: "3.300+ spil kan føles overvældende. Hvis du foretrækker et nøje udvalgt katalog med kun premium-titler, er søstercasinoet Luna Casino et bedre valg." },
              { title: "Sportsbettere", desc: "Swift Casino er udelukkende et casino. For kombineret casino og sportsbetting, overvej bet365, Betinia eller Unibet." },
              { title: "High-rollers med store bonusbehov", desc: "Med 500 kr. maks. bonus og 200 kr. minimumsudbetaling er Swift Casino designet til casual og mid-range spillere. High-rollers finder bedre vilkår hos bet365 eller Unibet." },
              { title: "Spillere der vil have et loyalitetsprogram", desc: "Swift Casino mangler et struktureret level-baseret loyalitetsprogram à la Luna Casino. De tilbyder kampagner og turneringer, men intet permanent system med stigende fordele." },
            ].map((item) => (
              <Card key={item.title} className="border-border bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <X className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* ───── SAMMENLIGNING ───── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Swift Casino vs. konkurrenterne</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            For at give et nuanceret billede sammenligner vi Swift Casino med tre relevante konkurrenter:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-3 font-semibold text-foreground">Kategori</th>
                  <th className="text-center py-3 px-3 font-semibold text-foreground">Swift Casino</th>
                  <th className="text-center py-3 px-3 font-semibold text-foreground">Luna Casino</th>
                  <th className="text-center py-3 px-3 font-semibold text-foreground">bet365</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { cat: "Velkomstbonus", swift: "100% op til 500 kr.", luna: "100% op til 500 kr.", bet: "100% op til 1.000 kr." },
                  { cat: "Bonuskode", swift: "SWIFT (påkrævet)", luna: "Ikke nødvendig", bet: "365BONUS" },
                  { cat: "Omsætningskrav", swift: "10x (d+b)", luna: "10x (d+b)", bet: "10x (d+b)" },
                  { cat: "Spiludvalg", swift: "3.300+ titler", luna: "Kurateret premium", bet: "2.500+ titler" },
                  { cat: "Unik funktion", swift: "Hot Or Cold", luna: "Loyalitetsprogram", bet: "Bet Builder" },
                  { cat: "PayPal", swift: "✓", luna: "✗", bet: "✓" },
                  { cat: "Trustly", swift: "✓", luna: "✗", bet: "✓" },
                  { cat: "MobilePay", swift: "✓ (kun indbetaling)", luna: "✓ (kun indbetaling)", bet: "✓ (ind + ud)" },
                  { cat: "Min. udbetaling", swift: "200 kr.", luna: "100 kr.", bet: "100 kr." },
                  { cat: "Sportsbetting", swift: "✗", luna: "✗", bet: "✓" },
                  { cat: "Loyalitetsprogram", swift: "Kampagner", luna: "Level-baseret", bet: "bet365 Club" },
                ].map((r) => (
                  <tr key={r.cat} className="border-b border-border">
                    <td className="py-3 px-3 font-medium text-foreground">{r.cat}</td>
                    <td className="py-3 px-3 text-center text-muted-foreground">{r.swift}</td>
                    <td className="py-3 px-3 text-center text-muted-foreground">{r.luna}</td>
                    <td className="py-3 px-3 text-center text-muted-foreground">{r.bet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Swift vs. Luna Casino (søstercasinoer):</strong> Begge har 10x omsætning og 500 kr. maks. bonus, men filosofien er diametralt modsat. Swift satser på volumen (3.300+ spil), innovation (Hot Or Cold) og betalingsfleksibilitet (PayPal, Trustly). Luna satser på kuratering, loyalitetsprogram og personalisering. Vælg Swift hvis du vil have bredde, data og hurtige udbetalinger. Vælg Luna hvis du vil have kvalitetsfokus og langsigtet loyalitetsværdi.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Swift vs. bet365:</strong> bet365 vinder på bonusmaksimum (1.000 kr.), sportsbetting og MobilePay til udbetaling. Men Swift Casino har Hot Or Cold-funktionen, flere spiludbydere (Nolimit City, Hacksaw Gaming) og sammenlignelige udbetalingshastigheder. Hvis du udelukkende spiller casino og værdsætter transparens, er Swift Casino et stærkt alternativ.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ───── REGISTRERING ───── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Tilmelding og registrering – trin for trin</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Registreringsprocessen hos Swift Casino er hurtig via MitID-integration. Hele processen tager under 5 minutter:
          </p>
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="space-y-3">
                {[
                  { step: "1", title: "Besøg Swift Casino", desc: "Klik på 'Tilmeld Dig' på forsiden." },
                  { step: "2", title: "Udfyld personlige oplysninger", desc: "Indtast CPR-nummer, navn, adresse, e-mail og telefonnummer." },
                  { step: "3", title: "Bekræft med MitID", desc: "Godkend din identitet via MitID-appen. Identitetsverifikation sker automatisk." },
                  { step: "4", title: "Sæt indbetalingsgrænser", desc: "Vælg daglige, ugentlige og månedlige grænser for ansvarligt spil." },
                  { step: "5", title: "Foretag din første indbetaling", desc: "Indbetal mindst 100 kr. via MobilePay, kort, Trustly eller PayPal." },
                  { step: "6", title: "Indtast bonuskoden SWIFT", desc: "VIGTIGT: Gå til bonuskodefeltet og indtast SWIFT for at aktivere din 100 % bonus. Bonussen tilføjes IKKE automatisk." },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{item.step}</span>
                    <div><h4 className="font-semibold text-foreground">{item.title}</h4><p className="text-sm text-muted-foreground">{item.desc}</p></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* ───── KONKLUSION ───── */}
        <section className="mb-12">
          <RatingBreakdown scores={CASINO_SCORES["swift-casino"].scores} total={CASINO_SCORES["swift-casino"].total} />
          <h2 className="mt-6 mb-4 text-3xl font-bold">Endelig vurdering: 4.7 / 5 – Data-Innovatøren leverer bredde og transparens</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Efter 14 dages intensiv test bekræfter vi, at Swift Casino fortjener sin position som Data-Innovatøren i det danske casinomarked. Det er et casino der har fundet sin niche ved at kombinere et massivt spiludvalg med innovative værktøjer og stærk betalingsinfrastruktur.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Styrker der definerer Swift Casino:</strong> Hot Or Cold-funktionen er unik og tilføjer et element af data-transparens, som ingen anden dansk platform tilbyder. 3.300+ spil dækker alle segmenter fra mainstream til niche. PayPal- og Trustly-udbetalinger under 6 timer er en reel konkurrencefordel. 10x omsætningskrav giver matematisk fair bonusværdi.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Svagheder der trækker ned:</strong> Bonuskoden SWIFT er let at glemme – automatisk aktivering ville være bedre. Maks. 500 kr. bonus er lavt for high-rollers. Min. udbetaling 200 kr. er over branchegennemsnittet. Intet struktureret loyalitetsprogram. Bankoverførselsgebyr under 3.700 kr. er unødvendigt.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Samlet vurdering:</strong> Swift Casino scorer 4.7 / 5. Det er et fremragende valg for spillere der værdsætter bredde, data-transparens og hurtige udbetalinger via PayPal/Trustly. Men hvis du prioriterer kuratering og loyalitetsprogram, vælg{" "}
            <Link to="/casino-anmeldelser/luna-casino" className={linkClass}>Luna Casino</Link>. Hvis du vil have sportsbetting og højere bonus, vælg{" "}
            <Link to="/casino-anmeldelser/bet365" className={linkClass}>bet365</Link>.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={handleBonusClick} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base px-8">
              <Gift className="mr-2 h-5 w-5" />Hent din bonus hos Swift Casino
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/casino-anmeldelser">Se alle casino anmeldelser</Link>
            </Button>
          </div>
        </section>

        <Separator className="my-10" />
        <RelatedReviews currentSlug="swift-casino" />
        <InlineCasinoCards excludeSlugs={["swift-casino"]} />
        <Separator className="my-10" />
        <LatestNewsByCategory pagePath="/casino-anmeldelser/swift-casino" />
        <RelatedGuides currentPath="/casino-anmeldelser/swift-casino" />
        <FAQSection title="Ofte stillede spørgsmål om Swift Casino" faqs={swiftFaqs} />
        <AuthorBio author="jonas" />
      </div>
      {casino && <StickyCTA casinoSlug={casino.slug} casinoName={casino.name} bonusAmount={casino.bonus_amount} bonusType={casino.bonus_type} freeSpins={casino.free_spins} wageringRequirements={casino.wagering_requirements} rating={casino.rating} logoUrl={casino.logo_url} isRecommended={casino.is_recommended} isHot={casino.is_hot} />}
    </>
  );
};

export default SwiftCasinoAnmeldelse;
