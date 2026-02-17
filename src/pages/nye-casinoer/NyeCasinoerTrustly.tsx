import { Link } from "react-router-dom";
import trustlyHero from "@/assets/heroes/nye-casinoer-trustly-hero.jpg";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Landmark, Sparkles, CheckCircle2, Zap, ShieldCheck } from "lucide-react";
import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/seo";
import type { ReactNode } from "react";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er Trustly, og hvordan fungerer det på nye casinoer?",
    answer: (
      <>
        <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link> er en svensk fintech-løsning, der muliggør direkte bankoverførsler via open banking. Du logger ind med din netbank (eller <Link to="/nye-casinoer/mitid" className={linkClass}>MitID</Link> i Danmark), og betalingen gennemføres øjeblikkeligt – uden at casinoet får adgang til dine bankoplysninger. Trustly er reguleret som betalingsinstitut i EU og bruger bankgraderet kryptering.
      </>
    ),
  },
  {
    question: "Er Trustly sikkert at bruge på nye casinoer?",
    answer: "Ja. Trustly er reguleret under PSD2-direktivet, bruger 256-bit SSL-kryptering og deler aldrig dine bankoplysninger med casinoet. Over 100 milliarder euro er processet gennem Trustly på tværs af 33 europæiske lande.",
  },
  {
    question: "Hvor hurtig er en udbetaling via Trustly?",
    answer: (
      <>
        De fleste nye casinoer behandler Trustly-udbetalinger inden for 5 minutter – nogle endda øjeblikkeligt. Trustly fungerer 24/7, også weekender og helligdage. Det er den hurtigste udbetalingsmetode hos nye danske casinoer. Sammenlign med andre metoder i vores <Link to="/nye-casinoer/hurtig-udbetaling" className={linkClass}>guide til hurtig udbetaling</Link>.
      </>
    ),
  },
  {
    question: "Kræver Trustly en separat konto eller app?",
    answer: "Nej. Det er en af Trustlys største styrker: ingen registrering, ingen app, ingen ekstra gebyrer. Du bruger din eksisterende netbank direkte, og hver transaktion autentificeres via MitID. Trustly opkræver heller ingen gebyrer fra spillere – alle transaktionsomkostninger betales af casinoet.",
  },
];

const NyeCasinoerTrustly = () => {
  const articleSchema = buildArticleSchema({
    headline: "Nye Casinoer med Trustly – Pay N Play i Danmark 2026",
    description: "Find nye casinoer med Trustly og Pay N Play. Instant-indbetalinger og hurtige udbetalinger via din netbank.",
    url: `${SITE_URL}/nye-casinoer/trustly`,
    datePublished: "2026-02-01",
    dateModified: "2026-02-16",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  const faqSchema = buildFaqSchema(faqs);

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
        <AuthorMetaBar author="jonas" date="16-02-2026" readTime="8 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={trustlyHero} alt="Nye casinoer med Trustly betaling" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Trustly hos nye casinoer i Danmark</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link> er blevet den foretrukne betalingsmetode hos <Link to="/nye-casinoer" className={linkClass}>nye casinoer</Link> i Danmark. Den svenske open banking-løsning muliggør instant-indbetalinger direkte fra din bankkonto – uden behov for kreditkort, e-wallets eller separat kontooprettelse. For danske spillere er Trustly særligt attraktivt, fordi det integrerer sømløst med <Link to="/nye-casinoer/mitid" className={linkClass}>MitID</Link>.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For nye casinoer er Trustly særligt attraktivt, fordi det muliggør Pay N Play – en revolutionerende funktion, der kombinerer registrering og indbetaling i ét trin. Du identificeres via din bank, og din casinokonto oprettes automatisk i baggrunden. Hele processen tager under 60 sekunder – sammenlignet med 5-10 minutter ved traditionel registrering.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Udbetalinger via Trustly hos nye casinoer behandles typisk inden for 5 minutter, og pengene lander direkte på din bankkonto. Det gør Trustly til det ideelle valg for spillere, der prioriterer hastighed og bekvemmelighed. Se også vores guide til <Link to="/nye-casinoer/hurtig-udbetaling" className={linkClass}>nye casinoer med hurtig udbetaling</Link> for en komplet sammenligning af betalingsmetoder.
          </p>
        </section>

        <InlineCasinoCards title="Nye Casinoer med Trustly" />

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sådan fungerer Trustly på nye casinoer</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Trustly-processen hos nye danske casinoer er enkel og gennemskuelig. Her er det typiske flow:
          </p>
          <div className="space-y-3">
            {[
              { step: "1. Vælg Trustly", desc: "Ved registrering eller indbetaling vælger du Trustly som betalingsmetode. Du viderestilles til Trustlys sikre betalingsvindue." },
              { step: "2. Vælg din bank", desc: "Du vælger din bank fra listen over danske banker. Alle større danske banker understøttes, inklusiv Danske Bank, Nordea, Jyske Bank og Nykredit." },
              { step: "3. Log ind med MitID", desc: "Du verificerer dig med MitID – enten via MitID-appen eller chip/kodelæser. Casinoet får aldrig adgang til dine bankoplysninger." },
              { step: "4. Bekræft beløb", desc: "Du bekræfter indbetalingsbeløbet direkte i din netbank. Pengene overføres øjeblikkeligt til din casinokonto." },
              { step: "5. Spil med det samme", desc: "Ved Pay N Play oprettes din konto automatisk, og du kan spille umiddelbart efter bekræftelse. Ingen formularer, ingen ventetid." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.step}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Fordele ved Trustly hos nye casinoer</h2>
          <div className="space-y-3">
            {[
              "Instant-indbetalinger direkte fra din bankkonto – pengene er tilgængelige med det samme",
              "Udbetalinger på under 5 minutter – 24/7, inklusiv weekender og helligdage",
              "Ingen separat konto, app eller registrering krævet – brug din eksisterende netbank",
              "Bankgraderet sikkerhed – casinoet ser aldrig dine bankoplysninger eller login-data",
              "Pay N Play – registrering og indbetaling i ét trin, under 60 sekunder",
              "Ingen gebyrer fra Trustly – alle omkostninger betales af casinoet",
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
          <h2 className="mb-4 text-3xl font-bold">Trustly sikkerhed</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Trustly er en af de sikreste betalingsmetoder tilgængelige for danske casinospillere. Her er de vigtigste sikkerhedsgarantier:
          </p>
          <div className="space-y-3">
            {[
              { title: "EU-reguleret betalingsinstitut", desc: "Trustly er autoriseret under PSD2-direktivet og overvåges af den svenske finanstilsynsmyndighed (Finansinspektionen)." },
              { title: "Bankgraderet kryptering", desc: "Alle transaktioner beskyttes med 256-bit SSL-kryptering – samme niveau som din netbank bruger." },
              { title: "Ingen data lagret", desc: "Trustly lagrer ikke dine bankoplysninger efter transaktionen. Hver betaling autentificeres individuelt via MitID." },
              { title: "Transaktionsgaranti", desc: "Trustly garanterer, at transaktioner gennemføres korrekt. Ved fejl refunderes beløbet automatisk." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
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