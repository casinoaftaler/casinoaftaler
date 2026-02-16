import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { RelatedGuides } from "@/components/RelatedGuides";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, AlertTriangle, Sparkles, XCircle, CheckCircle2 } from "lucide-react";
import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/seo";
import type { ReactNode } from "react";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er ROFUS, og hvorfor er det vigtigt?",
    answer: (
      <>
        ROFUS (Register Over Frivilligt Udelukkede Spillere) er det danske register til selvudelukkelse fra gambling. Alle casinoer med dansk licens er lovmæssigt forpligtet til at være tilsluttet ROFUS. Registret er et vigtigt værktøj til <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>, da det giver spillere mulighed for at udelukke sig selv midlertidigt eller permanent fra alle danske spillesteder.
      </>
    ),
  },
  {
    question: "Er nye casinoer uden ROFUS lovlige i Danmark?",
    answer: "Nej. Casinoer uden ROFUS-tilslutning opererer uden dansk licens og er derfor ulovlige for danske spillere. Spillemyndigheden kræver ROFUS-tilslutning som betingelse for licens. Spil hos ulovlige casinoer er ikke strafbart for spilleren, men du mister alle beskyttelser, herunder skattefri gevinster og klageadgang.",
  },
  {
    question: "Hvilke risici er der ved at spille hos casinoer uden ROFUS?",
    answer: "Risiciene er betydelige: gevinster er skattepligtige, ingen klageadgang via Spillemyndigheden, ingen garanti for udbetaling, ingen ROFUS-selvudelukkelse, potentielt manipulation af RNG-systemer og ingen bankgaranti til at beskytte dine indeståender. Vi fraråder stærkt at spille hos ulovlige operatører.",
  },
  {
    question: "Kan jeg registrere mig i ROFUS for at udelukke mig selv?",
    answer: (
      <>
        Ja, du kan registrere dig i ROFUS på rofus.nu. Du kan vælge mellem midlertidig udelukkelse (24 timer, 1 måned, 3 måneder eller 6 måneder) eller permanent udelukkelse. Permanent udelukkelse kan tidligst ophæves efter 1 år. Registreringen gælder for alle danske licenserede spillesteder. Læs mere om <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>.
      </>
    ),
  },
  {
    question: "Hvorfor anbefaler Casinoaftaler.dk kun casinoer med ROFUS?",
    answer: (
      <>
        Vi anbefaler udelukkende casinoer med dansk licens og ROFUS-tilslutning, fordi spillersikkerhed er vores højeste prioritet. ROFUS-tilslutning er en grundpille i dansk spilleregulering og sikrer, at spillere med problematisk spilleadfærd kan beskytte sig selv. Se vores <Link to="/redaktionel-politik" className={linkClass}>redaktionelle politik</Link> for mere.
      </>
    ),
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

  const faqSchema = buildFaqSchema(faqs.map(f => ({ question: f.question, answer: typeof f.answer === "string" ? f.answer : f.question })));

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
        <AuthorMetaBar author="kevin" date="16-02-2026" readTime="10 Min." />

        <Card className="mb-8 border-l-4 border-l-destructive">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
              <div>
                <p className="font-semibold">Vigtig advarsel</p>
                <p className="text-sm text-muted-foreground">Casinoaftaler.dk anbefaler udelukkende casinoer med dansk licens og ROFUS-tilslutning. Denne guide er informativ og har til formål at oplyse om risici ved ulovlige spillesteder.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvad er nye casinoer uden ROFUS?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Nye casinoer uden ROFUS er spillesteder, der opererer uden dansk licens fra <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link>. Da ROFUS-tilslutning er et lovmæssigt krav for alle danske licensindehavere, betyder mangel på ROFUS-tilslutning automatisk, at casinoet opererer ulovligt i Danmark.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Disse casinoer har typisk udenlandske licenser (f.eks. Curaçao, Malta uden dansk tilladelse eller helt ulicenserede). Mens de kan tilbyde tilsyneladende attraktive bonusser og et bredt spiludvalg, mangler de grundlæggende spillerbeskyttelser, som danske spillere er berettiget til under dansk lovgivning.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vi hos Casinoaftaler.dk har valgt et klart standpunkt: vi anbefaler aldrig casinoer uden dansk licens. Vores mission er at beskytte danske spillere og fremme <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>. Se i stedet vores liste over <Link to="/nye-casinoer/dansk-licens" className={linkClass}>nye casinoer med dansk licens</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Risici ved nye casinoer uden ROFUS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Skattepligtige gevinster", desc: "Gevinster fra ulovlige casinoer er skattepligtige i Danmark. Du risikerer efterbetaling og bøde fra SKAT." },
              { title: "Ingen spillerbeskyttelse", desc: "Uden dansk licens har du ingen klageadgang via Spillemyndigheden og ingen garanti for fair spil." },
              { title: "Ingen bankgaranti", desc: "Ulovlige casinoer stiller ingen bankgaranti. Dine indeståender er ikke beskyttet, hvis operatøren lukker." },
              { title: "Ingen selvudelukkelse", desc: "Uden ROFUS kan du ikke udelukke dig selv, hvilket øger risikoen for problematisk spilleadfærd." },
              { title: "Ingen omsætningsloft", desc: "Dansk lovgivnings 10x-loft på omsætningskrav gælder ikke. Ulovlige casinoer kan sætte 50x eller højere." },
              { title: "Tvivlsom RNG", desc: "Uden dansk tilsyn er der ingen garanti for, at spillenes tilfældighedsgenerator (RNG) er fair og umanipuleret." },
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
          <h2 className="mb-4 text-3xl font-bold">Det sikre alternativ: nye casinoer med dansk licens</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I stedet for at risikere dine penge hos ulovlige casinoer, anbefaler vi, at du vælger blandt de mange nye casinoer med dansk licens. Disse spillesteder tilbyder lige så attraktive bonusser, et bredt spiludvalg og moderne platforme – men med den fulde beskyttelse, som dansk lovgivning giver dig.
          </p>
          <div className="space-y-3">
            {[
              "Skattefri gevinster – spar potentielt tusindvis af kroner",
              "Maksimalt 10x omsætningskrav – de laveste i Europa",
              "ROFUS-selvudelukkelse – beskyt dig selv mod problematisk spil",
              "Klageadgang via Spillemyndigheden – din ret som forbruger",
              "Bankgaranti – dine penge er sikre",
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

        <AuthorBio author="kevin" />
        <RelatedGuides currentPath="/nye-casinoer/uden-rofus" />
        <FAQSection title="Ofte stillede spørgsmål om casinoer uden ROFUS" faqs={faqs} />
      </div>
    </>
  );
};

export default NyeCasinoerUdenRofus;
