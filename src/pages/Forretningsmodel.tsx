import { Link } from "react-router-dom";
import pragmaticPlayLogo from "@/assets/providers/pragmatic-play-logo-transparent.png";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import forretningsmodelHero from "@/assets/heroes/forretningsmodel-hero.jpg";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import spillemyndighedenForside from "@/assets/screenshots/spillemyndigheden-dk-forside.png";
import spillemyndighedenLicens from "@/assets/screenshots/spillemyndigheden-licensliste-onlinekasino.png";
import { AuthorBio } from "@/components/AuthorBio";
import {
  Banknote,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Scale,
  Users,
  Search,
  FileText,
  XCircle,
  HandCoins,
  Eye,
  BarChart3,
  Star,
  Trophy,
  Gamepad2,
  CreditCard,
  Sparkles,
  Award,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { RelatedGuides } from "@/components/RelatedGuides";
import { buildArticleSchema } from "@/lib/seo";

const Forretningsmodel = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const articleJsonLd = buildArticleSchema({
    headline: "Forretningsmodel – Sådan finansieres Casinoaftaler.dk",
    description: "Forstå hvordan Casinoaftaler.dk finansieres gennem affiliate-partnerskaber, og hvorfor vores anmeldelser forbliver uafhængige.",
    url: "https://casinoaftaler.dk/forretningsmodel",
    datePublished: "2025-06-01",
    authorName: "Ajse",
    authorUrl: "https://casinoaftaler.dk/forfatter/ajse",
  });

  const principles = [
    { icon: Scale, title: "Redaktionel uafhængighed", desc: "Vores vurderinger bygger på faste kriterier og reel test. Kommercielle samarbejder påvirker aldrig vores scoring eller anbefalinger." },
    { icon: ShieldCheck, title: "Gennemsigtighed", desc: "Vi oplyser tydeligt om alle bonusvilkår, betingelser og potentielle interessekonflikter." },
    { icon: Search, title: "Systematisk testning", desc: "Hvert casino testes med reel registrering, indbetaling og gameplay – ikke skrivebordsvurdering." },
    { icon: Users, title: "Community først", desc: "Vores community er vores fundament. Vi prioriterer altid brugernes interesser over kommercielle hensyn." },
  ];

  return (
    <>
      <SEO
        title="Forretningsmodel – Sådan finansieres | Casinoaftaler"
        description="Forstå hvordan Casinoaftaler.dk finansieres gennem affiliate-partnerskaber, og hvorfor vores anmeldelser forbliver uafhængige og troværdige."
        jsonLd={[articleJsonLd]}
      />

      {/* Hero */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: heroBackgroundImage
            ? `linear-gradient(135deg, hsl(260 70% 18% / 0.97), hsl(210 80% 22% / 0.95)), url(${heroBackgroundImage})`
            : "linear-gradient(135deg, hsl(260 70% 18%), hsl(250 60% 15%) 40%, hsl(210 80% 20%))",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Banknote className="mr-1.5 h-3.5 w-3.5" />
              Transparens
            </Badge>
            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
              Forretningsmodel
            </h1>
            <p className="text-lg text-white/80">
              Sådan finansieres Casinoaftaler.dk – og hvorfor det ikke påvirker vores anmeldelser.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-10 md:py-14">
        <AuthorMetaBar author="ajse" readTime="8 min" showAffiliateDisclaimer={false} />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={forretningsmodelHero}
            alt="Forretningsmodel og transparens hos Casinoaftaler.dk"
            width={1920}
            height={1080}
            className="w-full h-auto object-cover max-h-[400px]"
            loading="eager"
          />
        </div>

        {/* Hvad er affiliate-marketing */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Banknote className="h-7 w-7 text-primary" />
            Hvad er affiliate-marketing?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Casinoaftaler.dk finansieres primært gennem affiliate-partnerskaber med udvalgte online casinoer. 
            Det betyder, at vi modtager en kommission, når en bruger opretter en konto via vores links og 
            begynder at spille.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Affiliate-marketing er en udbredt forretningsmodel i branchen og gør det muligt for os at 
            drive en uafhængig platform uden at opkræve betaling fra vores brugere. Vi kan dermed tilbyde 
            gratis adgang til alle vores anmeldelser, guides og sammenligninger.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Det er vigtigt at understrege, at vores læsere aldrig betaler mere for at bruge et casino 
            via vores links. Kommissionen betales af casinoet – ikke af brugeren.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Modellen er sammenlignelig med, hvordan prissammenligningssider inden for forsikring, bredbånd eller 
            el fungerer: du får en uvildig sammenligning, og platformen finansieres af de virksomheder, der 
            ønsker eksponering. Forskellen er, at vi i modsætning til mange sammenligningssider også anmelder 
            casinoer, vi <strong className="text-foreground">ikke</strong> har et kommercielt samarbejde med, 
            hvis de fortjener at blive nævnt.
          </p>
        </section>

        <ReviewScreenshot
          src={spillemyndighedenForside}
          alt="Spillemyndighedens officielle hjemmeside – den danske reguleringsmyndighed der kontrollerer casinolicenser og spillelovgivning"
          caption="Spillemyndigheden fører tilsyn med alle danske casinoer – vores forretningsmodel opererer inden for denne regulering"
        />

        <Separator className="my-10" />

        {/* Sådan fungerer det i praksis */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <HandCoins className="h-7 w-7 text-primary" />
            Sådan fungerer det i praksis
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Når du klikker på et affiliate-link på Casinoaftaler.dk og opretter en konto hos det pågældende casino, 
            registrerer casinoet, at du er henvist fra os. Vi modtager herefter en kommission baseret på en af 
            følgende modeller:
          </p>
          <div className="grid gap-4 sm:grid-cols-3 mb-6">
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold">CPA (Cost Per Acquisition)</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Vi modtager et fast engangsbeløb, når en ny spiller opretter og verificerer en konto. 
                  Beløbet er uafhængigt af, hvor meget spilleren indbetaler eller spiller for.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold">Revenue Share</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Vi modtager en procentdel af casinoets nettoomsætning fra den henviste spiller over tid. 
                  Denne model kan betyde, at vi tjener nul, hvis spilleren vinder.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold">Hybrid</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  En kombination af CPA og Revenue Share, hvor vi modtager et mindre engangsbeløb plus en 
                  lavere løbende andel.
                </p>
              </CardContent>
            </Card>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Uanset hvilken model der anvendes, betaler du som bruger aldrig mere for at bruge et casino 
            via vores links. Kommissionen betales af casinoets marketingbudget – præcis som en reklame i TV 
            eller en sponsoreret post på sociale medier.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Påvirker det vores anmeldelser */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            Påvirker det vores anmeldelser?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Nej. Vores redaktionelle vurderinger er fuldstændig uafhængige af vores kommercielle 
            samarbejder. Vi har etableret klare retningslinjer, der sikrer adskillelse mellem 
            affiliate-indtægter og redaktionelt indhold.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {principles.map((p) => (
              <Card key={p.title} className="border-border bg-card">
                <CardContent className="p-6">
                  <p.icon className="mb-3 h-6 w-6 text-primary" />
                  <h3 className="mb-2 font-semibold">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Interessekonflikt-politik */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Eye className="h-7 w-7 text-primary" />
            Vores interessekonflikt-politik
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Vi anerkender, at affiliate-modellen skaber en potentiel interessekonflikt: vi tjener penge, 
            når brugere opretter konti hos casinoer, vi anbefaler. Netop derfor har vi implementeret en 
            række konkrete foranstaltninger for at sikre, at denne konflikt aldrig påvirker vores 
            redaktionelle integritet.
          </p>
          <div className="rounded-xl border border-border bg-card p-6 space-y-3">
            {[
              "Ranking-kriterier er fastlagt før et samarbejde indgås – ikke efter",
              "Vi anmelder og rangerer casinoer, vi IKKE har affiliate-aftaler med",
              "Et casino kan aldrig betale sig til en bedre placering eller score",
              "Alle bonusvilkår verificeres uafhængigt af kommercielle aftaler",
              "Vores redaktionelle team har ingen indsigt i provisionsbeløb fra specifikke casinoer",
              "Negative anmeldelser fjernes aldrig, uanset kommercielle konsekvenser",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Denne politik gennemgås og revideres kvartalsvist af vores juridiske redaktør,{" "}
            <Link to="/forfatter/ajse" className="text-primary underline hover:text-primary/80">Ajse</Link>, 
            for at sikre, at den forbliver aktuel og effektiv.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Hvad vi IKKE gør */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <XCircle className="h-7 w-7 text-destructive" />
            Hvad vi ikke gør
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Gennemsigtighed handler også om at fortælle, hvad vi bevidst har fravalgt. 
            Her er praksisser, som er udbredte i branchen, men som vi aktivt afviser:
          </p>
          <Card className="border-destructive/30">
            <CardContent className="pt-6">
              <ul className="space-y-3 text-muted-foreground">
                {[
                  "Vi sælger aldrig redaktionelt indhold – ingen 'sponsorerede anmeldelser' eller betalte placeringer",
                  "Vi anbefaler aldrig casinoer uden gyldig dansk licens fra Spillemyndigheden",
                  "Vi skjuler aldrig negative aspekter ved et casino for at beskytte en kommerciel aftale",
                  "Vi bruger aldrig vildledende bonusoplysninger for at øge klik-raten",
                  "Vi indgår aldrig aftaler, der begrænser vores ret til at skrive ærlige anmeldelser",
                  "Vi henviser aldrig til casinoer, der ikke overholder dansk lovgivning om ansvarligt spil",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-destructive" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Hvordan vi vurderer casinoer */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Search className="h-7 w-7 text-primary" />
            Hvad bygger vores vurderinger på?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Alle casinoer på Casinoaftaler.dk vurderes efter faste, dokumenterede kriterier – uanset 
            om vi har et affiliate-samarbejde med dem eller ej. Vores testmetode inkluderer:
          </p>
          <div className="rounded-xl border border-border bg-card p-6">
            {[
              "Reel registrering og indbetaling",
              "Test af bonusvilkår og omsætningskrav",
              "Vurdering af spiludvalg og software",
              "Analyse af udbetalingshastighed",
              "Evaluering af kundeservice",
              "Gennemgang af licensforhold og sikkerhed",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 py-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/saadan-tester-vi-casinoer">
              <Button variant="outline" size="sm">
                <ShieldCheck className="mr-1.5 h-4 w-4" />
                Læs om vores testmetode
              </Button>
            </Link>
            <Link to="/redaktionel-politik">
              <Button variant="outline" size="sm">
                <FileText className="mr-1.5 h-4 w-4" />
                Redaktionel politik
              </Button>
            </Link>
          </div>
        </section>

        <ReviewScreenshot
          src={spillemyndighedenLicens}
          alt="Spillemyndighedens licensliste over godkendte online casinoer i Danmark – vi anbefaler kun licenserede operatører"
          caption="Vi anbefaler udelukkende casinoer med aktiv dansk licens – verificerbart via Spillemyndighedens licensliste"
        />

        <Separator className="my-10" />

        {/* Hvordan rangering fungerer */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary" />
            Hvordan vores rangering fungerer
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Vores casino-ranking på forsiden og i guides som{" "}
            <Link to="/top-10-casino-online" className="text-primary underline hover:text-primary/80">Top 10 Casino Online</Link>{" "}
            er baseret på en vægtet score-model, hvor sikkerhed og licens udgør 30 % af den samlede vurdering. 
            Spiludvalg og bonusvilkår vægter hver 20 %, mens udbetalingshastighed og samlet brugeroplevelse 
            vægter 15 % hver.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Et casino med et affiliate-samarbejde kan blive placeret lavere end et casino uden samarbejde, 
            hvis sidstnævnte scorer højere på vores kriterier. Vi har konkrete eksempler på casinoer, der 
            er blevet nedgraderet eller fjernet fra vores anbefalinger trods aktive kommercielle aftaler, 
            fordi de ikke levede op til vores standarder.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Rangeringen revideres løbende, og alle ændringer i bonusvilkår, licensstatus eller 
            brugeroplevelse kan medføre en ny placering. Du kan altid se den seneste opdateringsdato 
            på hver side.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Brancheanerkendelse */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Trophy className="h-7 w-7 text-primary" />
            Brancheanerkendelse
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Casinoaftaler.dk er officielt anerkendt som affiliate-partner af førende spiludviklere i den internationale casino-branche.
            Denne anerkendelse bekræfter, at vores platform lever op til branchens højeste standarder for kvalitet, gennemsigtighed og ansvarlig formidling.
          </p>
          <Card className="overflow-hidden border-primary/20">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row">
                {/* Logo section */}
                <div className="flex items-center justify-center bg-gray-900 p-8 sm:w-48 sm:flex-shrink-0 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none">
                  <img
                    src={pragmaticPlayLogo}
                    alt="Pragmatic Play logo"
                    className="h-12 w-auto"
                  />
                </div>
                {/* Content section */}
                <div className="flex flex-col justify-center p-6">
                  <div className="mb-1 flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      <Award className="mr-1 h-3 w-3" />
                      Officiel Partner
                    </Badge>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Pragmatic Play – Affiliate Partner</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Casinoaftaler er listet som officiel affiliate-partner på{" "}
                    <a
                      href="https://www.pragmaticplay.com/en/about-us/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline hover:text-primary/80"
                    >
                      Pragmatic Play's About Us-side
                    </a>
                    {" "}– verdens førende leverandør af casinospil med over 250+ titler i det danske marked.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Vores løfte */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-primary" />
            Vores løfte til dig
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Vi forpligter os til altid at være gennemsigtige om vores forretningsmodel og de 
            samarbejder, vi indgår. Hvis et casino ikke lever op til vores standarder, vil vi aldrig 
            anbefale det – uanset potentiel indtægt.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Vores mål er at være den mest troværdige kilde til casino-information i Danmark. Det 
            kræver, at vi prioriterer vores læseres tillid over alt andet.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Har du spørgsmål til vores forretningsmodel eller ønsker du at vide mere om, hvordan 
            et specifikt samarbejde fungerer? Du er altid velkommen til at{" "}
            <Link to="/kontakt" className="text-primary underline hover:text-primary/80">kontakte os</Link>. 
            Vi svarer åbent og ærligt på alle henvendelser om vores økonomi og kommercielle relationer.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Hub-links – intern link equity distribution */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <ArrowRight className="h-7 w-7 text-primary" />
            Udforsk vores indhold
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Vi producerer dybdegående guides, anmeldelser og analyser inden for alle aspekter af online casino i Danmark. 
            Her er et overblik over vores vigtigste indholdsområder:
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { to: "/casino-bonus", icon: BookOpen, title: "Casino Bonus Guide", desc: "Komplet guide til alle bonustyper i Danmark" },
              { to: "/casinoer", icon: Star, title: "Alle Casinoer", desc: "Dybdegående kategoriguides og analyser" },
              { to: "/nye-casinoer", icon: Trophy, title: "Nye Casinoer", desc: "De nyeste casinoer med dansk licens" },
              { to: "/casino-anmeldelser", icon: FileText, title: "Casino Anmeldelser", desc: "29+ detaljerede casinoanmeldelser" },
              { to: "/casinospil", icon: Gamepad2, title: "Casinospil", desc: "Guides til blackjack, roulette, poker og slots" },
              { to: "/casinospil/spillemaskiner", icon: Star, title: "Spillemaskiner", desc: "30+ dybdegående spillemaskineguides" },
              { to: "/live-casino", icon: Users, title: "Live Casino", desc: "Guide til live dealer-spil i Danmark" },
              { to: "/betalingsmetoder", icon: CreditCard, title: "Betalingsmetoder", desc: "Alle godkendte betalingsmetoder" },
              { to: "/spiludviklere", icon: Search, title: "Spiludviklere", desc: "12 ledende studier analyseret" },
              { to: "/ordbog", icon: BookOpen, title: "Casino Ordbog", desc: "30+ tekniske termer forklaret" },
              { to: "/free-spins", icon: Sparkles, title: "Free Spins", desc: "Alt om gratis spins på danske casinoer" },
              { to: "/omsaetningskrav", icon: Scale, title: "Omsætningskrav", desc: "Forstå bonusvilkår og omsætning" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
              >
                <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <LatestNewsByCategory pagePath="/forretningsmodel" />
        <RelatedGuides currentPath="/forretningsmodel" maxLinks={5} />

        <AuthorBio author="ajse" showCommunity={false} />
      </div>
    </>
  );
};

export default Forretningsmodel;