import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { RelatedGuides } from "@/components/RelatedGuides";
import { CommunityPromoSection } from "@/components/CommunityPromoSection";
import heroImage from "@/assets/heroes/licenserede-casinoer-hero.jpg";
import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/seo";
import type { ReactNode } from "react";
import { ShieldCheck, Scale, Lock, CheckCircle2, AlertTriangle, Star, FileText, BadgeCheck, Globe, Gavel, Eye, Wallet } from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  { question: "Hvad kræves for at få en dansk casino-licens?", answer: (<>For at opnå licens fra <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> skal operatøren demonstrere finansiel soliditet, implementere anti-hvidvask procedurer, integrere MitID-verifikation, tilbyde ROFUS-selvudelukkelse, bruge certificerede tilfældighedsgeneratorer (RNG), og holde spillermidler adskilt fra driftsmidler. Licensen koster ca. 350.000 kr. i ansøgningsgebyr plus en årlig afgift på 28 % af bruttospilleindtægten. Processen tager typisk 4-6 måneder.</>) },
  { question: "Hvordan kan jeg verificere, at et casino har gyldig dansk licens?", answer: (<>Du kan tjekke et casinos licens direkte på <a href="https://www.spillemyndigheden.dk/spiller/licenserede-virksomheder" target="_blank" rel="noopener noreferrer" className={linkClass}>Spillemyndighedens hjemmeside</a>. Alle licenserede casinoer skal vise deres licensnummer tydeligt på hjemmesiden og have et direkte link til Spillemyndighedens register.</>) },
  { question: "Er mine penge sikre på et licenseret dansk casino?", answer: "Ja. Danske licenserede casinoer er forpligtet til at holde spillermidler adskilt fra driftsmidler på segregerede bankkonti. Dette betyder, at selv hvis casinoet går konkurs, er dine penge beskyttet og vil blive returneret." },
  { question: "Skal jeg betale skat af gevinster fra licenserede danske casinoer?", answer: (<>Nej, alle gevinster fra casinoer med gyldig dansk licens er 100 % skattefri for spilleren – uanset beløbets størrelse. Operatøren betaler en afgift på 28 % af bruttospilleindtægten (GGR) til staten. Læs mere i vores guide om <Link to="/casinoer/casino-og-skat" className={linkClass}>casino og skat</Link>.</>) },
  { question: "Hvad er forskellen på en dansk og en Malta-licens?", answer: "En dansk licens fra Spillemyndigheden giver den højeste beskyttelse for danske spillere: MitID-verifikation, ROFUS-integration, dansk kundeservice, skattefri gevinster og fuld forbrugerbeskyttelse under dansk lov. En Malta-licens (MGA) er internationalt anerkendt men giver ikke de samme specifikke danske beskyttelsesmekanismer." },
  { question: "Hvad er ROFUS, og hvordan fungerer det?", answer: (<>ROFUS (Register Over Frivilligt Udelukkede Spillere) er et nationalt register, der giver dig mulighed for at udelukke dig selv fra alle danske licenserede spillesider i en periode (24 timer til permanent). Det er en vigtig del af <Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link> i Danmark.</>) },
  { question: "Hvor mange casinoer har dansk licens?", answer: "Per februar 2026 har cirka 40-45 online casinoer aktiv dansk licens fra Spillemyndigheden. Antallet svinger, da nye licensansøgninger behandles og eksisterende licenser kan tilbagekaldes ved overtrædelser." },
];

const LicenseredeCasinoerGuide = () => {
  const articleSchema = buildArticleSchema({ headline: "Licenserede Casinoer i Danmark 2026 – Din Komplette Guide", description: "Alt om licenserede danske casinoer, Spillemyndigheden og spillerbeskyttelse.", url: `${SITE_URL}/licenserede-casinoer`, datePublished: "2026-02-01", dateModified: "2026-02-15" });
  const faqSchema = buildFaqSchema(faqs.map(f => ({ question: f.question, answer: typeof f.answer === "string" ? f.answer : f.question })));

  return (
    <>
      <SEO title="Licenserede Casinoer i Danmark 2026 – Komplet Guide til Sikre Casinoer" description="Guide til licenserede danske casinoer 2026. Forstå licenskrav, spillerbeskyttelse, skatteforhold og hvorfor du altid bør vælge et casino med dansk licens fra Spillemyndigheden." jsonLd={[articleSchema, faqSchema]} />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: 'linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))',
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
              Opdateret Februar 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Licenserede Casinoer i Danmark 2026
            </h1>
            <p className="text-lg text-white/80">
              Alt du skal vide om dansk casino-licensering, spillerbeskyttelse, ROFUS og hvorfor licens er dit vigtigste kriterium ved valg af online casino.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="1. februar 2026" readTime="19 min" />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Licenserede casinoer i Danmark" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Overblik over licenserede casinoer</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Når du spiller på et online casino, er der ét kriterium, der bør trumfe alle andre: <strong>Har casinoet en gyldig dansk licens fra <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link>?</strong> Licensen er ikke bare et stempel – den er din garanti for fair spil, beskyttede midler, skattefri gevinster og adgang til et system af selvbegrænsningsværktøjer, der beskytter dig som spiller.</p>
          <p className="text-muted-foreground leading-relaxed">Det danske licenssystem er blandt de mest restriktive og spillerbeskyttende i verden. Det stiller strenge krav til operatører inden for anti-hvidvask, ansvarligt spil, teknisk sikkerhed og finansiel soliditet. Resultatet er et marked, hvor danske spillere kan spille med tryghed og tillid.</p>
        </section>

        <InlineCasinoCards title="Anbefalede licenserede casinoer i Danmark" />

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2"><Scale className="h-7 w-7 text-primary" /> Hvad er den danske casino-licens?</h2>
          <p className="text-muted-foreground mb-6">Den danske online casino-licens udstedes af Spillemyndigheden (Danish Gambling Authority), som blev etableret i 2000 og regulerer alt lovligt spil i Danmark.</p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="border-border bg-card"><CardHeader><CardTitle className="text-lg flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> Licenskrav</CardTitle></CardHeader><CardContent><ul className="space-y-2 text-sm text-muted-foreground">
              <li>• MitID-integration for identitetsverifikation</li>
              <li>• ROFUS-tilslutning for selvudelukkelse</li>
              <li>• Segregerede spillermiddelkonti</li>
              <li>• Certificerede tilfældighedsgeneratorer (RNG)</li>
              <li>• Anti-hvidvask (AML) procedurer</li>
              <li>• Dansk kundeservice</li>
              <li>• Ansvarligt spil-værktøjer</li>
              <li>• Regelmæssig ekstern auditering</li>
            </ul></CardContent></Card>
            <Card className="border-border bg-card"><CardHeader><CardTitle className="text-lg flex items-center gap-2"><BadgeCheck className="h-5 w-5 text-primary" /> Spillerbeskyttelse</CardTitle></CardHeader><CardContent><ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 100 % skattefri gevinster</li>
              <li>• Klagemulighed via Spillemyndigheden</li>
              <li>• Beskyttede midler ved konkurs</li>
              <li>• Gennemsigtige bonusvilkår (max 10x omsætning)</li>
              <li>• Obligatoriske indbetalingsgrænser</li>
              <li>• 24-timers afkølingsperiode ved forhøjelse</li>
              <li>• Sessionstidsadvarsler</li>
              <li>• Gratis helpline via StopSpillet.dk</li>
            </ul></CardContent></Card>
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2"><AlertTriangle className="h-7 w-7 text-destructive" /> Risici ved ulicenserede casinoer</h2>
          <p className="text-muted-foreground mb-6">Ulicenserede casinoer udgør en reel risiko for danske spillere.</p>
          <div className="space-y-4 mb-6">
            {[
              { title: "Ingen forbrugerbeskyttelse", desc: "Uden dansk licens har du ingen klagemulighed via Spillemyndigheden. Danske domstole kan ikke håndhæve krav mod udenlandske uregulerede operatører.", icon: <Gavel className="h-5 w-5 text-destructive" /> },
              { title: "Skattepligtige gevinster", desc: "Gevinster fra casinoer uden EU-licens er som udgangspunkt skattepligtige personlig indkomst.", icon: <Wallet className="h-5 w-5 text-destructive" /> },
              { title: "Ingen ROFUS-beskyttelse", desc: "Selvudelukkelse via ROFUS gælder kun licenserede danske spillesider.", icon: <Eye className="h-5 w-5 text-destructive" /> },
              { title: "Ubeskyttede midler", desc: "Ulicenserede operatører har ingen lovkrav om at holde spillermidler adskilt fra driftsmidler.", icon: <Lock className="h-5 w-5 text-destructive" /> },
            ].map((risk, i) => (
              <Card key={i} className="border-destructive/30"><CardContent className="flex items-start gap-4 pt-4">{risk.icon}<div><h3 className="font-semibold mb-1">{risk.title}</h3><p className="text-sm text-muted-foreground">{risk.desc}</p></div></CardContent></Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2"><CheckCircle2 className="h-7 w-7 text-primary" /> Sådan vælger du det rigtige licenserede casino</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Alle licenserede casinoer opfylder de samme grundlæggende krav, men der er stadig markante forskelle i kvalitet.</p>
          <div className="space-y-3 mb-6">
            {[
              "Tjek licensen på Spillemyndighedens hjemmeside",
              "Sammenlign bonusvilkår – se efter lave omsætningskrav og no-sticky bonusser",
              "Test kundeservicen inden du indbetaler",
              "Undersøg udbetalingshastigheden",
              "Vurdér spiludvalget",
              "Læs vores anmeldelser",
            ].map((tip, i) => (
              <Card key={i} className="border-border bg-card"><CardContent className="flex items-start gap-3 pt-4"><div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">{i+1}</div><p className="text-sm text-muted-foreground">{tip}</p></CardContent></Card>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed">Besøg vores <Link to="/casino-anmeldelser" className={linkClass}>casino anmeldelser</Link> for detaljerede vurderinger af individuelle licenserede casinoer, eller se vores <Link to="/top-10-casino-online" className={linkClass}>top 10 liste</Link> for de bedste casinoer i Danmark lige nu.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Konklusion</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">At vælge et licenseret casino er det vigtigste, du kan gøre for din sikkerhed som online casinospiller i Danmark. Licensen garanterer fair spil, beskyttede midler, skattefri gevinster og adgang til et robust system af selvbegrænsningsværktøjer.</p>
          <p className="text-muted-foreground leading-relaxed">Alle casinoer vi anbefaler på Casinoaftaler.dk har gyldig dansk licens og er grundigt testet efter vores <Link to="/saadan-tester-vi-casinoer" className={linkClass}>testmetodik</Link>. Din sikkerhed er vores topprioritet.</p>
        </section>

        <CommunityPromoSection />

        <AuthorBio />

        <Separator className="my-10" />

        <RelatedGuides currentPath="/licenserede-casinoer" />

        <FAQSection title="Ofte stillede spørgsmål om licenserede casinoer" faqs={faqs} />
      </div>
    </>
  );
};

export default LicenseredeCasinoerGuide;
