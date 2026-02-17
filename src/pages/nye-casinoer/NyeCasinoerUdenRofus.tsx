import { Link } from "react-router-dom";
import udenRofusHero from "@/assets/heroes/nye-casinoer-uden-rofus-hero.jpg";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, AlertTriangle, Sparkles, XCircle, CheckCircle2, Scale } from "lucide-react";
import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/seo";
import type { ReactNode } from "react";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er ROFUS, og hvorfor er det vigtigt?",
    answer: (
      <>
        ROFUS (Register Over Frivilligt Udelukkede Spillere) er det danske register til selvudelukkelse fra gambling, administreret af Spillemyndigheden. Alle casinoer med dansk licens er lovmæssigt forpligtet til at kontrollere ROFUS ved kontooprettelse og login. Registret er et centralt værktøj til <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>, da det giver spillere mulighed for at udelukke sig selv midlertidigt (24 timer, 1, 3 eller 6 måneder) eller permanent fra alle danske licenserede spillesteder. Over 30.000 danske spillere har benyttet ROFUS siden oprettelsen, hvilket understreger dets betydning for spillerbeskyttelsen.
      </>
    ),
  },
  {
    question: "Er nye casinoer uden ROFUS lovlige i Danmark?",
    answer: "Nej. ROFUS-tilslutning er et ufravigeligt krav for dansk licens. Casinoer uden ROFUS-tilslutning opererer per definition uden dansk licens og er derfor ulovlige for danske spillere at benytte. Spillemyndigheden kan blokere adgangen til ulovlige casinoer via DNS-blokering, og der arbejdes løbende på at udvide denne liste. Det er dog vigtigt at bemærke, at det ikke er strafbart for spilleren at spille hos ulovlige casinoer – men du mister alle beskyttelser, og dine gevinster bliver skattepligtige.",
  },
  {
    question: "Hvilke risici er der ved at spille hos casinoer uden ROFUS?",
    answer: "Risiciene er konkrete og betydelige: 1) Gevinster er skattepligtige – du skal selvangive og betale op til 45% i skat. 2) Ingen klageadgang via dansk myndighed – tvister afgøres efter udenlandsk lovgivning. 3) Ingen garanti for udbetaling – uden bankgaranti kan operatøren nægte udbetaling uden konsekvens. 4) Ingen ROFUS-selvudelukkelse – du har intet sikkerhedsnet ved problematisk spil. 5) Ingen RNG-garanti – spillene kan potentielt være manipulerede. 6) Omsætningskrav typisk 30–60x mod danske 10x. Vi fraråder stærkt at spille hos casinoer uden dansk licens.",
  },
  {
    question: "Kan jeg registrere mig i ROFUS for at udelukke mig selv?",
    answer: (
      <>
        Ja, du kan registrere dig i ROFUS på rofus.nu via <Link to="/nye-casinoer/mitid" className={linkClass}>MitID</Link>. Du vælger mellem midlertidig udelukkelse (24 timer, 1 måned, 3 måneder eller 6 måneder) eller permanent udelukkelse. Midlertidig udelukkelse udløber automatisk. Permanent udelukkelse kan tidligst ophæves efter 1 år ved henvendelse til Spillemyndigheden. Registreringen gælder for alle danske licenserede spillesteder – online casinoer, væddemål og fysiske kasinoer. Har du brug for hjælp, kontakt StopSpillet på 70 22 28 25.
      </>
    ),
  },
  {
    question: "Hvorfor anbefaler Casinoaftaler.dk kun casinoer med ROFUS?",
    answer: (
      <>
        Vi anbefaler udelukkende casinoer med dansk licens og ROFUS-tilslutning, fordi spillersikkerhed er vores absolutte prioritet. Vores <Link to="/redaktionel-politik" className={linkClass}>redaktionelle politik</Link> fastslår, at vi aldrig vil anbefale et casino, vi ikke selv ville spille hos med vores egne penge. ROFUS-tilslutning er en grundpille i dansk spilleregulering, og casinoer uden den mangler de fundamentale beskyttelser, som danske spillere har krav på. Se også vores <Link to="/forretningsmodel" className={linkClass}>forretningsmodel</Link> for fuld transparens.
      </>
    ),
  },
  {
    question: "Hvad gør Spillemyndigheden for at stoppe ulovlige casinoer?",
    answer: "Spillemyndigheden anvender flere værktøjer: DNS-blokering af ulovlige hjemmesider (listen udvides løbende), samarbejde med internationale myndigheder om at lukke ulovlige operatører, og informationskampagner rettet mod danske spillere. I 2025 blev over 100 ulovlige casinodomæner blokeret. Derudover arbejder Spillemyndigheden med betalingsudbydere for at blokere transaktioner til og fra ulovlige casinoer.",
  },
  {
    question: "Kan ulovlige casinoer tilbyde bedre bonusser end danske?",
    answer: (
      <>
        Nominelt kan ulovlige casinoer tilbyde højere bonusbeløb, men den reelle værdi er typisk lavere. En bonus på 10.000 kr. med 50x omsætningskrav kræver 500.000 kr. i spil, før du kan hæve. Til sammenligning kræver en dansk bonus på 2.000 kr. med 5x omsætning kun 10.000 kr. i spil. Den danske bonus har markant højere sandsynlighed for at resultere i reel udbetaling. Se vores guide til <Link to="/nye-casinoer/lav-wagering" className={linkClass}>nye casinoer med lav wagering</Link>.
      </>
    ),
  },
  {
    question: "Hvad skal jeg gøre, hvis jeg allerede spiller hos et casino uden ROFUS?",
    answer: "Vi anbefaler, at du hæver din saldo hurtigst muligt og lukker din konto. Overfør derefter til et dansk licenseret casino, hvor dine rettigheder er beskyttet. Husk at selvangive eventuelle gevinster fra det ulovlige casino til SKAT. Hvis du oplever problemer med udbetaling fra et ulovligt casino, har du desværre begrænset klageadgang – kontakt eventuelt Forbrugerrådet Tænk for rådgivning.",
  },
];

const NyeCasinoerUdenRofus = () => {
  const articleSchema = buildArticleSchema({
    headline: "Nye Casinoer uden ROFUS – Hvad du skal vide",
    description: "Alt om nye casinoer uden ROFUS-tilslutning. Forstå risici, lovgivning og hvorfor vi anbefaler danske licenserede casinoer.",
    url: `${SITE_URL}/nye-casinoer/uden-rofus`,
    datePublished: "2026-01-25",
    dateModified: "2026-02-16",
    authorName: "Kevin",
    authorUrl: `${SITE_URL}/forfatter/kevin`,
  });

  const faqSchema = buildFaqSchema(faqs);

  return (
    <>
      <SEO
        title="Nye Casinoer uden ROFUS – Risici og Alternativer 2026"
        description="Alt om nye casinoer uden ROFUS. Forstå risiciene, lovgivningen og hvorfor danske licenserede casinoer med ROFUS er det sikre valg."
        jsonLd={[articleSchema, faqSchema]}
      />

      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ background: 'linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))' }}>
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4"><AlertTriangle className="mr-1.5 h-3.5 w-3.5" />Informationsguide</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Nye Casinoer uden ROFUS</h1>
            <p className="text-lg text-white/80">Hvad du bør vide om nye casinoer uden ROFUS-tilslutning, de tilknyttede risici og hvorfor vi altid anbefaler licenserede alternativer.</p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="kevin" date="16-02-2026" readTime="14 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={udenRofusHero} alt="Casino uden ROFUS – advarsler og risici" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        <Card className="mb-8 border-l-4 border-l-destructive">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
              <div>
                <p className="font-semibold">Vigtig advarsel</p>
                <p className="text-sm text-muted-foreground">Casinoaftaler.dk anbefaler udelukkende casinoer med dansk licens og ROFUS-tilslutning. Denne guide er informativ og har til formål at oplyse om risici ved ulovlige spillesteder, så du kan træffe et informeret valg.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvad er nye casinoer uden ROFUS?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Nye casinoer uden ROFUS er spillesteder, der opererer uden dansk licens fra <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link>. Da ROFUS-tilslutning er et ufravigeligt krav for dansk licens, betyder mangel på ROFUS automatisk, at casinoet opererer uden lovlig tilladelse til at udbyde spil til danske spillere.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Disse casinoer har typisk udenlandske licenser – oftest fra <Link to="/casino-licenser#curacao" className={linkClass}>Curaçao</Link> (billigst og mindst reguleret), <Link to="/casino-licenser#mga" className={linkClass}>Malta Gaming Authority</Link> (mere velrenommeret, men uden dansk beskyttelse) eller helt ulicenserede operatører. De markedsfører sig aggressivt mod danske spillere med tilsyneladende attraktive bonusser og løfter om "ingen begrænsninger", men bag facaden mangler de fundamentale spillerbeskyttelser. Læs vores <Link to="/casino-licenser" className={linkClass}>komplette guide til casino-licenser</Link> for at forstå forskellen.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Vi hos Casinoaftaler.dk har valgt et klart, ufravigeligt standpunkt: vi anbefaler aldrig casinoer uden dansk licens. Vores mission er at beskytte danske spillere og fremme <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>. Hvis du søger et sikkert nyt casino, se vores liste over <Link to="/nye-casinoer/dansk-licens" className={linkClass}>nye casinoer med dansk licens</Link>.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I det følgende gennemgår vi de konkrete risici, den juridiske ramme og de markant bedre alternativer, der findes hos danske licenserede casinoer.
          </p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Konkrete risici ved nye casinoer uden ROFUS</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Risiciene ved at spille hos casinoer uden dansk licens er ikke teoretiske – de er dokumenterede og har ramt tusindvis af danske spillere. Her er en detaljeret gennemgang af de seks mest alvorlige risikofaktorer:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Skattepligtige gevinster", desc: "Gevinster fra ulovlige casinoer er skattepligtige i Danmark efter personskattelovens § 4. Du skal selvangive alle gevinster, og skattesatsen kan nå op til 45%. SKAT har øget fokus på udenlandske casinotransaktioner og kan indhente oplysninger fra betalingsudbydere. Manglende selvangivelse kan resultere i strafbøde." },
              { title: "Ingen spillerbeskyttelse", desc: "Uden dansk licens har du ingen klageadgang via Spillemyndigheden. Tvister afgøres efter operatørens hjemlands lovgivning – typisk Curaçao eller Malta – hvor din position som forbruger er markant svagere. I praksis er det næsten umuligt at vinde en klagesag mod en Curaçao-licenseret operatør." },
              { title: "Ingen bankgaranti", desc: "Ulovlige casinoer stiller ingen bankgaranti i Danmark. Dine indeståender er ikke beskyttet, hvis operatøren lukker, går konkurs eller beslutter ikke at udbetale. Der er talrige dokumenterede tilfælde, hvor spillere har mistet deres saldo ved pludselige lukninger." },
              { title: "Ingen selvudelukkelse via ROFUS", desc: "Uden ROFUS-tilslutning kan du ikke benytte den danske selvudelukkelsesordning. Det fjerner et vigtigt sikkerhedsnet for spillere med risikoadfærd. Selvom nogle ulovlige casinoer tilbyder egne selvudelukkelsesværktøjer, er de typisk lette at omgå og dækker kun det enkelte casino." },
              { title: "Intet omsætningsloft på bonusser", desc: "Dansk lovgivnings 10x-loft på omsætningskrav gælder ikke for ulovlige casinoer. Vi ser regelmæssigt krav på 40–60x, og i ekstreme tilfælde op til 99x. En bonus på 5.000 kr. med 50x krav kræver 250.000 kr. i spil – det gør bonussen praktisk talt værdiløs." },
              { title: "Tvivlsom RNG og fairness", desc: "Uden dansk tilsyn er der ingen uafhængig garanti for, at spillenes tilfældighedsgenerator (RNG) er fair og umanipuleret. Certificering fra akkrediterede testlaboratorier er sjælden hos Curaçao-licenserede casinoer, og der er dokumenterede tilfælde af manipulerede RTP-procenter." },
            ].map((risk) => (
              <div key={risk.title} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
                <div>
                  <h3 className="font-semibold">{risk.title}</h3>
                  <p className="text-sm text-muted-foreground">{risk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Den juridiske ramme: Dansk spillelovgivning</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den danske spillelov (Lov om spil, LOV nr. 848 af 01/07/2010 med senere ændringer) regulerer alt online gambling rettet mod danske spillere. Loven fastslår, at udbydere skal have dansk licens for at lovligt tilbyde online casinospil til danske borgere. Operatører uden licens er ulovlige – ikke spilleren, men udbyderen.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det er vigtigt at forstå: det er ikke strafbart for dig som spiller at benytte et ulovligt casino. Du risikerer ikke bøde eller fængsel for at spille. Men du mister alle de rettigheder og beskyttelser, som dansk lovgivning giver dig, herunder skattefrihed, klageadgang og ROFUS-beskyttelse. Det er en risikovurdering, og vi mener, at risikoen aldrig er det værd.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Spillemyndigheden arbejder aktivt med DNS-blokering af ulovlige casinoer, samarbejde med internationale myndigheder og betalingsudbydere for at reducere adgangen til ulovlige spillesteder for danske borgere.
          </p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Det sikre alternativ: nye casinoer med dansk licens</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I stedet for at risikere dine penge hos ulovlige casinoer, anbefaler vi, at du vælger blandt de mange nye casinoer med dansk licens. Disse spillesteder tilbyder konkurrencedygtige bonusser, moderne platforme og et bredt spiludvalg – men med den fulde beskyttelse, som dansk lovgivning giver dig. Forskellen i reel bonusværdi er ofte til danske casinoers fordel pga. det lave omsætningsloft.
          </p>
          <div className="space-y-3">
            {[
              "Skattefri gevinster – spar potentielt tusindvis af kroner i skat",
              "Maksimalt 10x omsætningskrav – bonusser du faktisk kan omsætte",
              "ROFUS-selvudelukkelse – beskyt dig selv mod problematisk spil",
              "Klageadgang via Spillemyndigheden – din ret som forbruger",
              "Bankgaranti min. 750.000 kr. – dine penge er sikre",
              "MitID-verifikation – hurtig KYC uden manuel dokumenthåndtering",
              "Dansk kundesupport – hjælp på dit eget sprog",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" />
                <p className="text-sm text-muted-foreground">{benefit}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sådan genkender du et ulovligt casino</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Der er flere advarselstegn, der kan hjælpe dig med at identificere casinoer uden dansk licens, før du opretter en konto:
          </p>
          <div className="space-y-3">
            {[
              { title: "Ingen MitID-krav", desc: "Danske casinoer kræver altid MitID ved registrering. Hvis et casino lader dig oprette en konto med kun e-mail og kodeord, har det ikke dansk licens." },
              { title: "Omsætningskrav over 10x", desc: "Det danske lovmæssige loft er 10x. Ser du krav på 20x, 40x eller 60x, opererer casinoet under udenlandsk licens." },
              { title: "Ingen ROFUS-information", desc: "Alle danske casinoer har ROFUS-information synligt på deres hjemmeside. Mangler det, er det et klart advarselstegn." },
              { title: "Kryptovaluta som eneste betalingsmetode", desc: "Casinoer der primært eller udelukkende accepterer kryptovaluta, har sjældent dansk licens og bruger krypto til at undgå betalingsblokeringer." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Udforsk sikre nye casinoer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { to: "/nye-casinoer", label: "Nye Casinoer – Hovedside", desc: "Alle nye casinoer med dansk licens" },
              { to: "/nye-casinoer/dansk-licens", label: "Med Dansk Licens", desc: "Kun licenserede nye casinoer" },
              { to: "/licenserede-casinoer", label: "Licenserede Casinoer", desc: "Alle licenserede casinoer" },
              { to: "/ansvarligt-spil", label: "Ansvarligt Spil", desc: "Guide til ansvarligt spil" },
            ].map((link) => (
              <Link key={link.to} to={link.to} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50">
                <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold text-sm">{link.label}</h3>
                  <p className="text-xs text-muted-foreground">{link.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <InlineCasinoCards title="Licenserede alternativer vi anbefaler" count={4} />

        <AuthorBio author="kevin" />
        <RelatedGuides currentPath="/nye-casinoer/uden-rofus" />
        <FAQSection title="Ofte stillede spørgsmål om casinoer uden ROFUS" faqs={faqs} />
      </div>
    </>
  );
};

export default NyeCasinoerUdenRofus;
