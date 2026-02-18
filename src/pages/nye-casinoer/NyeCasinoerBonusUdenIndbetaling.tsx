import { Link } from "react-router-dom";
import bonusUdenIndbetalingHero from "@/assets/heroes/nye-casinoer-bonus-uden-indbetaling-hero.jpg";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Gift, Sparkles, CheckCircle2, AlertTriangle } from "lucide-react";
import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/seo";
import type { ReactNode } from "react";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er en bonus uden indbetaling hos nye casinoer?",
    answer: (
      <>
        En <Link to="/bonus-uden-indbetaling" className={linkClass}>bonus uden indbetaling</Link> er en gratis bonus, du modtager blot ved at oprette en konto – uden at indbetale penge. Det kan være free spins, bonuspenge eller en kombination. Du tester casinoet uden risiko, men husk at læse vilkårene.
      </>
    ),
  },
  {
    question: "Har no-deposit bonusser omsætningskrav?",
    answer: (
      <>
        Ja, altid. Danske casinoer har et loft på 10x <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>, men de bedste nye casinoer tilbyder 1x-3x. Det gør danske no-deposit bonusser markant mere favorable end udenlandske, der kan kræve 40-60x.
      </>
    ),
  },
  {
    question: "Hvor mange free spins kan man typisk få?",
    answer: "Hos nye danske casinoer ser vi typisk 10–50 free spins uden indbetaling med en spinværdi på 1–5 kr. Nogle tilbyder bonuspenge (50–100 kr.) i stedet. Den samlede bonusværdi ligger typisk mellem 20 og 250 kr.",
  },
  {
    question: "Kan man vinde rigtige penge med en bonus uden indbetaling?",
    answer: "Ja, men der er typisk en maksimal udbetalingsgrænse (ofte 500–1.000 kr.) og omsætningskrav. I praksis vinder ca. 15-20% af spillere noget, der kan udbetales. Det er risikofrit og en god måde at teste et nyt casino på.",
  },
  {
    question: "Kan man få bonus uden indbetaling mere end én gang?",
    answer: "Nej. No-deposit bonusser er udelukkende for nye spillere og kan kun bruges én gang pr. person, kontrolleret via MitID-verifikation. Forsøg på at oprette flere konti kan resultere i kontolukning og tab af gevinster.",
  },
  {
    question: "Hvad er de vigtigste ting at tjekke i vilkårene?",
    answer: (
      <>
        Fire ting du altid skal verificere: 1) Omsætningskravet – er det 1x eller 10x? 2) Udbetalingsgrænsen – typisk 500-1.000 kr. 3) Tidsfristen – de fleste udløber efter 7-30 dage. 4) Spilrestriktioner – free spins er ofte begrænset til én bestemt automat. Se også <Link to="/nye-casinoer/lav-wagering" className={linkClass}>nye casinoer med lav wagering</Link> for bonusser med bedre vilkår.
      </>
    ),
  },
  {
    question: "Er no-deposit bonusser hos nye casinoer bedre end hos etablerede?",
    answer: "Generelt ja. Nye casinoer bruger no-deposit bonusser mere aggressivt som konkurrenceværktøj, hvilket resulterer i bedre vilkår for spilleren – typisk lavere omsætningskrav, højere udbetalingsgrænser og flere free spins. Etablerede casinoer har sjældnere no-deposit tilbud, da de allerede har en kundebase.",
  },
];

const NyeCasinoerBonusUdenIndbetaling = () => {
  const articleSchema = buildArticleSchema({
    headline: "Nye Casinoer med Bonus uden Indbetaling 2026",
    description: "Find nye casinoer med gratis bonus uden indbetaling. Free spins og bonuspenge ved oprettelse hos nye danske spillesteder.",
    url: `${SITE_URL}/nye-casinoer/bonus-uden-indbetaling`,
    datePublished: "2026-01-30",
    dateModified: "2026-02-16",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  const faqSchema = buildFaqSchema(faqs);

  return (
    <>
      <SEO
        title="Nye Casinoer med Bonus uden Indbetaling (2026 Guide)"
        description="Nye casinoer med gratis bonus uden indbetaling i 2026. Få free spins og bonuspenge ved oprettelse – helt uden risiko."
        jsonLd={[articleSchema, faqSchema]}
      />

      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ background: 'linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))' }}>
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4"><Gift className="mr-1.5 h-3.5 w-3.5" />Gratis Bonus</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Nye Casinoer med Bonus uden Indbetaling</h1>
            <p className="text-lg text-white/80">Få gratis free spins og bonuspenge ved oprettelse hos nye danske casinoer – helt uden at indbetale en krone.</p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="16-02-2026" readTime="9 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={bonusUdenIndbetalingHero} alt="Nye casinoer med bonus uden indbetaling" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Gratis bonus hos nye casinoer i 2026</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En af de mest attraktive fordele ved <Link to="/nye-casinoer" className={linkClass}>nye casinoer</Link> er muligheden for at modtage en <Link to="/bonus-uden-indbetaling" className={linkClass}>bonus uden indbetaling</Link>. Disse bonusser giver dig gratis free spins eller bonuspenge blot ved at oprette en konto, hvilket gør det muligt at teste casinoet helt risikofrit. Det er casinoets måde at demonstrere tillid til sin platform.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Nye casinoer bruger no-deposit bonusser som et strategisk værktøj til at tiltrække nye spillere i et konkurrencepræget marked. Det er en win-win: du får mulighed for at udforske platformen, teste <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>, kundeservice og spiludvalg uden at bruge dine egne penge. Casinoet får chancen for at imponere dig med sin spiloplevelse.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Husk altid at læse vilkårene for en no-deposit bonus. Selv om bonussen er gratis, er der typisk <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> (max 10x på danske casinoer), udbetalingsgrænser og tidsfrister, du skal være opmærksom på. Vi angiver altid de specifikke vilkår i vores anmeldelser.
          </p>
          <div className="mt-6 rounded-lg border border-primary/30 bg-accent/30 p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Se også alle bonusser uden indbetaling</strong> – ikke kun hos nye casinoer. Vores <Link to="/bonus-uden-indbetaling" className={linkClass}>komplette guide til bonus uden indbetaling</Link> dækker no-deposit bonusser hos både nye og etablerede danske casinoer.
            </p>
          </div>
        </section>

        <InlineCasinoCards title="Nye Casinoer med No-Deposit Bonus" />

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Typer af bonusser uden indbetaling</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Nye casinoer tilbyder flere varianter af no-deposit bonusser. Hver type har sine fordele og begrænsninger:
          </p>
          <div className="space-y-3">
            {[
              { title: "Free spins uden indbetaling", desc: "Det mest almindelige tilbud. Du modtager typisk 10–50 gratis spins på udvalgte spilleautomater ved oprettelse. Gevinsterne er underlagt omsætningskrav. Spinværdien varierer fra 1–5 kr., og du kan typisk kun bruge dem på én specifik automat." },
              { title: "Bonuspenge uden indbetaling", desc: "Nogle nye casinoer tilbyder et lille bonusbeløb (typisk 50–100 kr.) i stedet for free spins. Det giver dig mere frihed til at vælge, hvilke spil du vil prøve – inklusiv bordspil og live casino. Omsætningskrav gælder dog stadig." },
              { title: "Cashback uden indbetaling", desc: "En sjældnere variant, hvor det nye casino returnerer en procentdel af dine tab i den første periode – uden at du har indbetalt. Typisk 10-25% cashback på de første 24-48 timers spil. Cashback har ofte lavere omsætningskrav end traditionelle bonusser." },
              { title: "Kombinations-bonus", desc: "Nogle nye casinoer kombinerer flere typer – f.eks. 25 free spins + 50 kr. bonuspenge. Disse tilbud giver den bedste samlede værdi, men læs vilkårene for hver del, da de kan have forskellige omsætningskrav." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
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
          <h2 className="mb-4 text-3xl font-bold">Sådan vurderer du en no-deposit bonus</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Ikke alle bonusser uden indbetaling er lige gode. Her er de fem faktorer, du skal kigge efter, når du sammenligner no-deposit tilbud hos nye casinoer:
          </p>
          <div className="space-y-3">
            {[
              { title: "Omsætningskrav (wagering)", desc: "Jo lavere, jo bedre. Danske casinoer har et loft på 10x, men de bedste nye casinoer tilbyder 1x-5x. Se vores guide til nye casinoer med lav wagering." },
              { title: "Udbetalingsgrænse", desc: "Mange no-deposit bonusser har en max-udbetaling på 500-1.000 kr. Jo højere grænsen er, jo mere værd er bonussen i praksis." },
              { title: "Tidsfrist", desc: "De fleste no-deposit bonusser udløber efter 7-30 dage. Sørg for, at du har tid til at opfylde omsætningskravene inden fristen." },
              { title: "Spilrestriktioner", desc: "Free spins er ofte begrænset til én specifik spilleautomat. Bonuspenge kan have vægtede spilbidrag – f.eks. tæller bordspil kun 10% mod omsætningskravet." },
              { title: "Samlet bonusværdi", desc: "Beregn den reelle værdi: (Bonusbeløb × Vinderchance) ÷ Omsætningskrav. En 50 kr. bonus med 3x omsætning er ofte mere værd end en 200 kr. bonus med 10x." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <Gift className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
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
          <h2 className="mb-4 text-3xl font-bold">Advarselstegn ved no-deposit bonusser</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Selvom no-deposit bonusser er risikofrie økonomisk, bør du være opmærksom på disse røde flag:
          </p>
          <div className="space-y-3">
            {[
              "Omsætningskrav over 10x – det er ulovligt for danske casinoer og tyder på manglende dansk licens",
              "Ingen udbetalingsgrænse nævnt i vilkårene – tjek altid detaljerne, da der næsten altid er en",
              "Meget kort tidsfrist (under 3 dage) – gør det næsten umuligt at opfylde omsætningskravene",
              "Krav om indbetaling før udbetaling af no-deposit gevinster – et tegn på dårlig praksis",
            ].map((warning, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
                <p className="text-sm text-muted-foreground">{warning}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Udforsk flere bonus-guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { to: "/nye-casinoer", label: "Nye Casinoer – Hovedside", desc: "Alle nye casinoer i Danmark" },
              { to: "/bonus-uden-indbetaling", label: "Bonus uden Indbetaling", desc: "Komplet guide til no-deposit bonusser" },
              { to: "/nye-casinoer/lav-wagering", label: "Lav Wagering", desc: "Nye casinoer med lave omsætningskrav" },
              { to: "/nye-casinoer/hurtig-udbetaling", label: "Hurtig Udbetaling", desc: "Nye casinoer med hurtigste udbetalinger" },
            ].map((link) => (
              <Link key={link.to} to={link.to} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50">
                <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold text-sm">{link.label}</h3>
                  <p className="text-xs text-muted-foreground">{link.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <AuthorBio author="jonas" />
        <RelatedGuides currentPath="/nye-casinoer/bonus-uden-indbetaling" />
        <FAQSection title="FAQ om nye casinoer med bonus uden indbetaling" faqs={faqs} />
      </div>
    </>
  );
};

export default NyeCasinoerBonusUdenIndbetaling;