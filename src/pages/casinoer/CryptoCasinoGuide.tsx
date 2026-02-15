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
import heroImage from "@/assets/heroes/crypto-casino-hero.jpg";
import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/seo";
import type { ReactNode } from "react";
import { Bitcoin, ShieldCheck, Zap, AlertTriangle, CheckCircle2, Globe, Lock, Star, Wallet, Scale } from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  { question: "Er crypto casinoer lovlige i Danmark?", answer: (<>Situationen er nuanceret. <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> regulerer kun casinoer, der accepterer traditionelle valutaer (DKK, EUR). Rene crypto casinoer opererer typisk uden dansk licens, hvilket betyder, at dine gevinster kan være skattepligtige, og du mangler den forbrugerbeskyttelse, som licenserede casinoer tilbyder. Danske spillere kan lovligt spille på crypto casinoer, men det anbefales stærkt at vælge <Link to="/licenserede-casinoer" className={linkClass}>licenserede casinoer</Link> for maksimal beskyttelse.</>) },
  { question: "Hvilke kryptovalutaer accepteres på online casinoer?", answer: "De mest udbredte kryptovalutaer på online casinoer er Bitcoin (BTC), Ethereum (ETH), Litecoin (LTC), Tether (USDT) og Dogecoin (DOGE). Nogle platforme accepterer også Ripple (XRP), Bitcoin Cash (BCH) og Solana (SOL). Bitcoin dominerer med den bredeste accept, mens USDT (en stablecoin) er populær, fordi den er knyttet til USD og dermed undgår volatilitet." },
  { question: "Er gevinster fra crypto casinoer skattefri?", answer: (<>Det afhænger af licensens oprindelse. Gevinster fra casinoer med dansk licens er altid skattefri uanset betalingsmetode. For crypto casinoer uden dansk licens gælder generelle skatteregler – gevinster kan være skattepligtige som kapitalindkomst. Derudover kan der opstå skattepligt ved kursgevinster på selve kryptovalutaen. Konsultér altid en skatterådgiver. Læs vores guide om <Link to="/casinoer/casino-og-skat" className={linkClass}>casino og skat</Link> for detaljer.</>) },
  { question: "Hvad er fordelene ved at spille med kryptovaluta?", answer: "De primære fordele er: 1) Hurtigere transaktioner (minutter vs. dage for bankoverførsler), 2) Lavere eller ingen gebyrer, 3) Større anonymitet (ingen bankoplysninger deles), 4) Ingen valutaomregning for internationale casinoer, 5) Provably fair-teknologi der verificerer spilretfærdighed. Ulempen er prisudsving – din gevinst kan ændre sig i værdi hurtigt." },
  { question: "Hvad er 'provably fair'-teknologi?", answer: "Provably fair er et kryptografisk system, der giver spillere mulighed for uafhængigt at verificere, at hvert spilresultat er retfærdigt og ikke manipuleret. Det bruger hash-funktioner til at skabe et verificerbart bevis for tilfældighed. Spilleren kan selv kontrollere, at casinoet ikke har ændret resultatet efter indsatsen er placeret. Denne teknologi er unik for crypto casinoer og tilbyder et transparensniveau, som traditionelle casinoer ikke kan matche." },
  { question: "Er crypto casinoer mere sikre end traditionelle casinoer?", answer: (<>Det afhænger af perspektivet. Blockchain-teknologien sikrer transparent og manipulationssikker transaktionsregistrering. Men mange crypto casinoer mangler formel licensering og reguleringsmæssigt tilsyn, hvilket kan udsætte dig for risici som unfair spil, forsinket udbetaling eller platform-konkurs uden erstatning. <Link to="/licenserede-casinoer" className={linkClass}>Licenserede casinoer</Link> med dansk licens tilbyder garanteret forbrugerbeskyttelse, som de fleste crypto casinoer ikke kan matche.</>) },
  { question: "Kan jeg bruge crypto på danske licenserede casinoer?", answer: "Per februar 2026 accepterer ingen danske licenserede casinoer direkte kryptovaluta-indbetaling. Den danske regulering kræver identitetsverifikation via MitID, hvilket er inkompatibelt med anonyme crypto-transaktioner. Dog kan du bruge crypto-venlige betalingstjenester som mellemled – visse e-wallets lader dig konvertere crypto til DKK og derefter indsætte på et dansk casino." },
  { question: "Hvad er risiciene ved crypto casinoer?", answer: "De primære risici inkluderer: 1) Manglende regulering og forbrugerbeskyttelse, 2) Volatilitet i kryptopriser kan ændre din gevinstværdi, 3) Ingen garanteret adskillelse af spillermidler, 4) Begrænset klageadgang ved tvister, 5) Skattekompleksitet, 6) Risiko for svindel og uregulerede operatører. Vælg altid velkendte platforme med dokumenteret track record og community-verifikation." },
];

const CryptoCasinoGuide = () => {
  const articleSchema = buildArticleSchema({ headline: "Crypto Casino 2026 – Guide til Kryptovaluta og Online Casino", description: "Alt om crypto casinoer i Danmark 2026. Bitcoin, Ethereum og blockchain-baseret gambling.", url: `${SITE_URL}/casinoer/crypto-casino`, datePublished: "2026-02-01", dateModified: "2026-02-15" });
  const faqSchema = buildFaqSchema(faqs.map(f => ({ question: f.question, answer: typeof f.answer === "string" ? f.answer : f.question })));

  return (
    <>
      <SEO title="Crypto Casino 2026 – Guide til Bitcoin & Krypto Gambling i Danmark" description="Komplet guide til crypto casinoer i Danmark 2026. Lær om Bitcoin gambling, provably fair-teknologi, fordele, risici og skatteforhold ved kryptovaluta-baseret casinospil." jsonLd={[articleSchema, faqSchema]} />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: 'linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))',
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Bitcoin className="mr-1.5 h-3.5 w-3.5" />
              Opdateret Februar 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Crypto Casino i Danmark 2026
            </h1>
            <p className="text-lg text-white/80">
              Alt du skal vide om kryptovaluta og online casino: Bitcoin, Ethereum, provably fair, skatteforhold og sikkerhed.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="1. februar 2026" readTime="22 min" />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} alt="Crypto casino – blockchain og kryptovaluta" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Overblik over crypto casinoer</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Kryptovalutaer har revolutioneret mange brancher, og online gambling er ingen undtagelse. Crypto casinoer tilbyder hurtigere transaktioner, lavere gebyrer og et niveau af gennemsigtighed, som traditionelle casinoer ikke kan matche – takket være blockchain-teknologi og provably fair-systemer. Men denne nye verden kommer også med unikke risici, som danske spillere bør forstå grundigt, før de dykker ind.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">I denne guide gennemgår vi alt om crypto casinoer: Hvordan de fungerer, hvilke kryptovalutaer du kan bruge, fordelene og ulemperne sammenlignet med <Link to="/top-10-casino-online" className={linkClass}>traditionelle danske casinoer</Link>, samt de vigtige skatte- og licensmæssige aspekter.</p>
          <Card className="bg-destructive/10 border-destructive/30 my-6"><CardContent className="pt-6"><div className="flex items-start gap-3"><AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" /><div><h3 className="font-bold text-destructive mb-2">Vigtig advarsel</h3><p className="text-sm text-muted-foreground">De fleste crypto casinoer opererer uden dansk licens fra <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link>. Det betyder, at du ikke har den samme forbrugerbeskyttelse som på licenserede danske casinoer. Vi anbefaler altid at prioritere <Link to="/licenserede-casinoer" className={linkClass}>licenserede casinoer</Link> for maksimal sikkerhed.</p></div></div></CardContent></Card>
        </section>

        <InlineCasinoCards title="Licenserede alternativer vi anbefaler" />

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2"><Bitcoin className="h-7 w-7 text-primary" /> Hvad er et crypto casino?</h2>
          <p className="text-muted-foreground mb-6">Et crypto casino er en online gambling-platform, der accepterer kryptovalutaer som Bitcoin, Ethereum og Litecoin som betalingsmetode. Nogle crypto casinoer opererer udelukkende med kryptovaluta, mens andre tilbyder det som et supplement til traditionelle betalingsmetoder.</p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="border-border bg-card"><CardHeader><CardTitle className="text-lg flex items-center gap-2"><Lock className="h-5 w-5 text-primary" /> Blockchain-baseret sikkerhed</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Alle transaktioner registreres på en decentraliseret, offentlig blockchain, der er praktisk talt umulig at manipulere. Hver transaktion får et unikt hash, der kan verificeres af enhver. Dette skaber et transparensniveau, der overgår traditionelle banksystemer.</p></CardContent></Card>
            <Card className="border-border bg-card"><CardHeader><CardTitle className="text-lg flex items-center gap-2"><Zap className="h-5 w-5 text-primary" /> Øjeblikkelige transaktioner</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Crypto-transaktioner behandles typisk inden for minutter (Bitcoin: 10–60 min, Ethereum: 15 sek–5 min, Litecoin: 2–3 min), sammenlignet med 1–5 bankdage for traditionelle metoder. Gebyrer er typisk 0,1–2 % sammenlignet med 2–5 % for kreditkort.</p></CardContent></Card>
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2"><CheckCircle2 className="h-7 w-7 text-primary" /> Fordele og ulemper ved crypto casinoer</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="border-green-500/30"><CardHeader><CardTitle className="text-green-500 flex items-center gap-2"><CheckCircle2 className="h-5 w-5" /> Fordele</CardTitle></CardHeader><CardContent><ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" /> Lynhurtige ind- og udbetalinger (minutter vs. dage)</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" /> Lavere eller ingen transaktionsgebyrer</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" /> Provably fair-teknologi for verificerbar retfærdighed</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" /> Højere anonymitet og privatliv</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" /> Ingen valutaomregning for internationale spil</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" /> Ofte højere bonusser og lavere omsætningskrav</li>
            </ul></CardContent></Card>
            <Card className="border-red-500/30"><CardHeader><CardTitle className="text-red-500 flex items-center gap-2"><AlertTriangle className="h-5 w-5" /> Ulemper</CardTitle></CardHeader><CardContent><ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" /> Manglende dansk licens og forbrugerbeskyttelse</li>
              <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" /> Volatilitet i kryptopriser kan ændre gevinstens værdi</li>
              <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" /> Skattekompleksitet – gevinster kan være skattepligtige</li>
              <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" /> Ingen ROFUS-selvudelukkelse som beskyttelse</li>
              <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" /> Irreversible transaktioner – fejl kan ikke rettes</li>
              <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" /> Risiko for svindel og uregulerede operatører</li>
            </ul></CardContent></Card>
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2"><Wallet className="h-7 w-7 text-primary" /> Populære kryptovalutaer på online casinoer</h2>
          <p className="text-muted-foreground mb-6">Hver kryptovaluta har unikke egenskaber, der påvirker din spiloplevelse.</p>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {[
              { name: "Bitcoin (BTC)", desc: "Den mest udbredte kryptovaluta med den bredeste accept. Transaktioner tager 10-60 minutter og koster typisk 1-20 kr. i gebyr." },
              { name: "Ethereum (ETH)", desc: "Næstmest populær med hurtigere transaktioner (15 sek-5 min). Smart contract-funktionalitet muliggør avancerede gambling-protokoller." },
              { name: "Tether (USDT)", desc: "En stablecoin knyttet til USD, der eliminerer volatilitetsrisiko. Ideel for spillere, der vil have fordelene ved crypto uden prisudsvingene." },
              { name: "Litecoin (LTC)", desc: "Hurtigere transaktioner (2-3 min) og lavere gebyrer end Bitcoin. Populær for sin balance mellem hastighed, sikkerhed og lave omkostninger." },
              { name: "Dogecoin (DOGE)", desc: "Meget hurtige transaktioner (1-2 min) og ekstremt lave gebyrer. Populær for micro-betting og casual gambling." },
              { name: "Solana (SOL)", desc: "En af de hurtigste blockchains med transaktioner under 1 sekund og minimale gebyrer. Voksende popularitet i gambling-sektoren." },
            ].map((crypto, i) => (
              <Card key={i} className="border-border bg-card"><CardContent className="pt-6"><h3 className="font-bold mb-2">{crypto.name}</h3><p className="text-sm text-muted-foreground">{crypto.desc}</p></CardContent></Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2"><Scale className="h-7 w-7 text-primary" /> Skatteforhold ved crypto gambling</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Skatteforholdene ved crypto gambling er komplekse og involverer to separate skattemæssige overvejelser.</p>
          <Card className="border-border bg-card mb-6"><CardContent className="pt-6">
            <h3 className="font-bold mb-3">Skattemæssige scenarier</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><strong>Licenseret dansk casino:</strong> Gevinster er skattefri uanset betalingsmetode.</li>
              <li><strong>EU-licenseret casino uden dansk licens:</strong> Gevinster er typisk skattefri pga. EU's regler.</li>
              <li><strong>Casino uden EU-licens:</strong> Gevinster er som udgangspunkt skattepligtige.</li>
              <li><strong>Kursgevinster på krypto:</strong> Kan være skattepligtige uanset hvor du spiller.</li>
            </ul>
          </CardContent></Card>
          <p className="text-muted-foreground leading-relaxed">Vi anbefaler altid at konsultere en professionel skatterådgiver, hvis du spiller med kryptovaluta. Læs mere i vores detaljerede guide om <Link to="/casinoer/casino-og-skat" className={linkClass}>casino og skat</Link>.</p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Konklusion: Er crypto casinoer det rigtige for dig?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Crypto casinoer tilbyder innovative fordele som hurtige transaktioner, lave gebyrer og provably fair-teknologi. Men de mangler den forbrugerbeskyttelse og reguleringsmæssige sikkerhed, som danske <Link to="/licenserede-casinoer" className={linkClass}>licenserede casinoer</Link> tilbyder. For de fleste danske spillere er et licenseret casino med hurtige <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link> som <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link> det sikreste og mest praktiske valg.</p>
          <p className="text-muted-foreground leading-relaxed">Hvis du vælger at udforske crypto casinoer, gør det med åbne øjne: Forstå risiciene, spil kun med midler du har råd til at tabe, og husk at <Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link> gælder uanset valutaen.</p>
        </section>

        <CommunityPromoSection />

        <AuthorBio />

        <Separator className="my-10" />

        <RelatedGuides currentPath="/casinoer/crypto-casino" />

        <FAQSection title="Ofte stillede spørgsmål om crypto casinoer" faqs={faqs} />
      </div>
    </>
  );
};

export default CryptoCasinoGuide;
