import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Landmark, Sparkles, CheckCircle2, Zap } from "lucide-react";
import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/seo";
import type { ReactNode } from "react";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er Trustly, og hvordan fungerer det på nye casinoer?",
    answer: (
      <>
        <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link> er en svensk fintech-løsning, der muliggør direkte bankoverførsler via open banking. Du logger ind med din netbank (eller MitID i Danmark), og betalingen gennemføres øjeblikkeligt – uden at casinoet får adgang til dine bankoplysninger. Det er en af de sikreste og hurtigste betalingsmetoder.
      </>
    ),
  },
  {
    question: "Hvad er Pay N Play, og tilbyder nye casinoer det?",
    answer: "Pay N Play er Trustlys innovative løsning, der kombinerer registrering og indbetaling i ét trin. Du identificeres via din bank, og din konto oprettes automatisk. Flere nye danske casinoer tilbyder Pay N Play, hvilket gør hele opstartsprocessen under 60 sekunder.",
  },
  {
    question: "Er Trustly sikkert at bruge på nye casinoer?",
    answer: "Ja, Trustly er reguleret som betalingsinstitut i EU og bruger bankgraderet kryptering. Dine bankoplysninger deles aldrig med casinoet. Trustly har processet over 100 milliarder euro i transaktioner og betjener over 8.300 banker i Europa.",
  },
  {
    question: "Hvor hurtig er en udbetaling via Trustly?",
    answer: (
      <>
        Udbetalinger via Trustly på nye casinoer behandles typisk inden for 5 minutter. Nogle nye casinoer tilbyder instant-udbetalinger, hvor pengene er på din bankkonto inden for sekunder. Se vores guide til <Link to="/nye-casinoer/hurtig-udbetaling" className={linkClass}>nye casinoer med hurtig udbetaling</Link>.
      </>
    ),
  },
  {
    question: "Kræver Trustly en separat konto?",
    answer: "Nej, Trustly kræver ingen separat konto eller app. Du bruger din eksisterende netbank direkte. Det er en af Trustlys største fordele – ingen ekstra registrering, ingen app-download, ingen ekstra gebyrer.",
  },
];

const NyeCasinoerTrustly = () => {
  const articleSchema = buildArticleSchema({
    headline: "Nye Casinoer med Trustly – Pay N Play i Danmark 2026",
    description: "Find nye casinoer med Trustly og Pay N Play. Instant-indbetalinger og hurtige udbetalinger via din netbank.",
    url: `${SITE_URL}/nye-casinoer/trustly`,
    datePublished: "2026-02-01",
    dateModified: "2026-02-16",
    authorName: "Kevin",
    authorUrl: `${SITE_URL}/forfatter/kevin`,
  });

  const faqSchema = buildFaqSchema(faqs.map(f => ({ question: f.question, answer: typeof f.answer === "string" ? f.answer : f.question })));

  return (
    <>
      <SEO title="Nye Casinoer med Trustly – Pay N Play Casino 2026" description="Find nye casinoer med Trustly Pay N Play i 2026. Instant-indbetalinger, hurtige udbetalinger og ingen separat konto krævet." jsonLd={[articleSchema, faqSchema]} />

      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ background: 'linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))' }}>
        <div className="container"><div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4"><Landmark className="mr-1.5 h-3.5 w-3.5" />Trustly Casinoer</Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Nye Casinoer med Trustly</h1>
          <p className="text-lg text-white/80">Oplev Pay N Play hos nye danske casinoer. Instant-indbetalinger via din netbank og udbetalinger på under 5 minutter.</p>
        </div></div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="kevin" date="16-02-2026" readTime="7 Min." />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Trustly hos nye casinoer i Danmark</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link> er blevet den foretrukne betalingsmetode hos <Link to="/nye-casinoer" className={linkClass}>nye casinoer</Link> i Danmark. Den svenske open banking-løsning muliggør instant-indbetalinger direkte fra din bankkonto – uden behov for kreditkort, e-wallets eller separat kontooprettelse.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For nye casinoer er Trustly særligt attraktivt, fordi det muliggør Pay N Play – en revolutionerende funktion, der kombinerer registrering og indbetaling i ét trin. Du identificeres via din bank, og din casinokonto oprettes automatisk. Hele processen tager under 60 sekunder.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Udbetalinger via Trustly hos nye casinoer behandles typisk inden for 5 minutter, og pengene lander direkte på din bankkonto. Det gør Trustly til det ideelle valg for spillere, der prioriterer hastighed og bekvemmelighed. Se også vores guide til <Link to="/nye-casinoer/hurtig-udbetaling" className={linkClass}>nye casinoer med hurtig udbetaling</Link>.
          </p>
        </section>

        <InlineCasinoCards title="Nye Casinoer med Trustly" />

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Fordele ved Trustly hos nye casinoer</h2>
          <div className="space-y-3">
            {[
              "Instant-indbetalinger direkte fra din bankkonto",
              "Udbetalinger på under 5 minutter – 24/7",
              "Ingen separat konto, app eller registrering krævet",
              "Bankgraderet sikkerhed – casinoet ser aldrig dine bankoplysninger",
              "Pay N Play – registrering og indbetaling i ét trin",
              "Ingen gebyrer fra Trustly på indbetalinger eller udbetalinger",
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
          <h2 className="mb-4 text-3xl font-bold">Udforsk flere guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { to: "/nye-casinoer", label: "Nye Casinoer – Hovedside", desc: "Alle nye casinoer i Danmark" },
              { to: "/betalingsmetoder/trustly", label: "Trustly Guide", desc: "Alt om Trustly som betalingsmetode" },
              { to: "/nye-casinoer/hurtig-udbetaling", label: "Hurtig Udbetaling", desc: "Nye casinoer med de hurtigste udbetalinger" },
              { to: "/nye-casinoer/mitid", label: "Med MitID", desc: "Nye casinoer med MitID-verifikation" },
            ].map((link) => (
              <Link key={link.to} to={link.to} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50">
                <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div><h3 className="font-semibold text-sm">{link.label}</h3><p className="text-xs text-muted-foreground">{link.desc}</p></div>
              </Link>
            ))}
          </div>
        </section>

        <AuthorBio author="kevin" />
        <RelatedGuides currentPath="/nye-casinoer/trustly" />
        <FAQSection title="Ofte stillede spørgsmål om Trustly og nye casinoer" faqs={faqs} />
      </div>
    </>
  );
};

export default NyeCasinoerTrustly;
