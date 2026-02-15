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
import heroImage from "@/assets/heroes/casino-og-skat-hero.jpg";
import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/seo";
import type { ReactNode } from "react";
import { Scale, FileText, Calculator, CheckCircle2, AlertTriangle, ShieldCheck, Star, Globe, Wallet, BadgeCheck, Gavel, CircleDollarSign, Landmark } from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  { question: "Skal jeg betale skat af gevinster fra online casino i Danmark?", answer: (<>Det afhænger af casinoets licens. Gevinster fra casinoer med gyldig dansk licens fra <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> er 100 % skattefri – uanset beløbet. Gevinster fra EU-licenserede casinoer er typisk også skattefri. Gevinster fra casinoer uden EU-licens er som udgangspunkt skattepligtig personlig indkomst og skal selvangives.</>) },
  { question: "Hvorfor er casinogevinster skattefri i Danmark?", answer: "Fordi casinooperatørerne med dansk licens betaler en afgift på 28 % af deres bruttospilleindtægt (GGR) direkte til den danske stat. Denne afgift erstatter individuel beskatning af spillergevinster. Systemet er administrativt effektivt, da det er langt nemmere at beskatte 40-45 operatører end millioner af individuelle spillere. Den samlede statsindtægt fra casinoafgifter i Danmark er ca. 1-1,5 mia. kr. årligt." },
  { question: "Skal jeg indberette mine casinogevinster til SKAT?", answer: "Nej – gevinster fra danske licenserede casinoer skal hverken indberettes eller selvangives. SKAT ved allerede, at afgiften er betalt af operatøren. For gevinster fra ulicenserede casinoer uden for EU skal du dog selvangive beløbet som personlig indkomst i din årsopgørelse. Undladelse kan medføre skattetillæg og potentielle bøder." },
  { question: "Hvad med gevinster fra udenlandske casinoer?", answer: "Det afgørende er, hvor casinoet er licenseret. EU-licenserede casinoer (f.eks. Malta Gaming Authority): Gevinster er typisk skattefri pga. EU's principper om fri udveksling af tjenesteydelser. Casinoer licenseret uden for EU (f.eks. Curaçao, Costa Rica): Gevinster er skattepligtige som personlig indkomst med op til 52 % beskatning afhængigt af din samlede indkomst." },
  { question: "Er gevinster fra fysiske casinoer i udlandet skattefri?", answer: "Det afhænger af casinoets beliggenhed. Gevinster fra casinoer i EU-lande (f.eks. Monaco, Malta, Spanien) er skattefri for danske statsborgere. Gevinster fra casinoer uden for EU (f.eks. Las Vegas, Macau, Bahamas) er skattepligtige og skal selvangives. USA tilbageholder desuden automatisk 30 % kildeskat på gevinster over $1.200, som du kan søge om tilbagebetaling af via den dansk-amerikanske dobbeltbeskatningsoverenskomst." },
  { question: "Er der grænse for skattefri gevinster?", answer: "Nej, der er ingen øvre grænse. Uanset om du vinder 100 kr. eller 100 millioner kr. på et dansk licenseret casino, er gevinsten 100 % skattefri. Det gælder for alle spiltyper: spilleautomater, bordspil, live casino, poker og sportsbetting. Den eneste betingelse er, at casinoet har gyldig dansk licens." },
  { question: "Hvad med cryptocurrency-gevinster fra online casinoer?", answer: (<>Kryptovaluta-gambling tilføjer et ekstra lag af kompleksitet. Selve casino-gevinsten beskattes efter de normale regler (skattefri fra licenserede casinoer). Men kursgevinster på din kryptovaluta kan være skattepligtige uafhængigt af casino-gevinsten. Eksempel: Du indsætter 1 Bitcoin (værdi 400.000 kr.), vinder 0,5 BTC, men når du hæver, er 1,5 BTC steget til 900.000 kr. Kursgevinsten kan være skattepligtig. Læs mere i vores <Link to="/casinoer/crypto-casino" className={linkClass}>crypto casino guide</Link>.</>) },
  { question: "Kan tab fra casinospil fratrækkes i skat?", answer: "Nej, tab fra spil på danske licenserede casinoer kan ikke fratrækkes i din skattepligtige indkomst. Da gevinsterne er skattefri, er tabene heller ikke fradragsberettigede – de to sider modsvarer hinanden. For spil på skattepligtige platforme (uden for EU) er der teknisk set mulighed for at modregne tab mod gevinster, men kun i samme indkomstår og kun dokumenterede tab. I praksis er dette ekstremt vanskeligt at administrere." },
];

const CasinoOgSkatGuide = () => {
  const articleSchema = buildArticleSchema({ headline: "Casino og Skat i Danmark 2026 – Komplet Skatteguide", description: "Alt om skat og casinogevinster i Danmark 2026.", url: `${SITE_URL}/casinoer/casino-og-skat`, datePublished: "2026-02-01", dateModified: "2026-02-15" });
  const faqSchema = buildFaqSchema(faqs.map(f => ({ question: f.question, answer: typeof f.answer === "string" ? f.answer : f.question })));

  return (
    <>
      <SEO title="Casino og Skat 2026 – Er Casinogevinster Skattefri i Danmark?" description="Komplet guide til skat og casinogevinster i Danmark 2026. Er dine gevinster skattefri? Hvad med udenlandske casinoer og krypto? Alt om skatteforhold ved online gambling." jsonLd={[articleSchema, faqSchema]} />

      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#1a2744] to-[#162040]">
        <div className="absolute inset-0"><img src={heroImage} alt="Casino og skat" className="h-full w-full object-cover opacity-25" loading="eager" /><div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent" /></div>
        <div className="container relative z-10 py-16 md:py-24 text-center">
          <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30"><Scale className="h-3 w-3 mr-1" /> Opdateret Februar 2026</Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight max-w-4xl mx-auto">Casino og Skat i Danmark 2026</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">Den komplette guide til skatteforhold ved casinospil. Er dine gevinster skattefri? Hvad med udenlandske casinoer og krypto? Vi gennemgår alle regler.</p>
        </div>
      </section>

      <AuthorMetaBar author="Jonas" date="1. februar 2026" readTime="15 min" />

      <article className="container max-w-4xl py-10 md:py-16">
        <section className="prose prose-lg max-w-none dark:prose-invert mb-12">
          <p className="text-lg leading-relaxed"><strong>Det korte svar: Ja, gevinster fra danske licenserede casinoer er 100 % skattefri – uanset beløbet.</strong> Men situationen er mere nuanceret, når det gælder udenlandske casinoer, kryptovaluta og fysiske casinoer i udlandet. I denne guide gennemgår vi alle skattemæssige aspekter af casinospil, så du ved præcis, hvor du står.</p>
          <p>Det danske system er unikt i sin enkelhed: Operatørerne betaler afgift, spillerne beholder alt. Men denne enkelhed gælder kun for <Link to="/licenserede-casinoer" className={linkClass}>casinoer med dansk licens</Link>. Spiller du på andre platforme, kan situationen hurtigt blive kompliceret. Læs videre for den fulde forklaring.</p>
          <Card className="bg-primary/5 border-primary/20 not-prose my-6"><CardContent className="pt-6"><p className="text-sm text-muted-foreground"><strong>Juridisk disclaimer:</strong> Denne guide er udarbejdet med omhyggelighed og baseret på gældende dansk skattelovgivning per februar 2026. Den erstatter dog ikke professionel skatterådgivning. Skatteforhold kan ændre sig, og individuelle omstændigheder kan påvirke din skattepligt. Konsultér altid en autoriseret skatterådgiver ved tvivl.</p></CardContent></Card>
        </section>

        <InlineCasinoCards slugs={["spildansknu", "spilleautomaten", "betinia", "campobet", "swift-casino", "luna-casino"]} title="Skattefri casinoer med dansk licens" />

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2"><Landmark className="h-7 w-7 text-primary" /> Det danske afgiftssystem for online casino</h2>
          <p className="text-muted-foreground mb-6">Det danske system for beskatning af online casinospil er bygget på et simpelt princip: <strong>Operatøren betaler – spilleren beholder.</strong> Her er, hvordan det fungerer i praksis.</p>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card className="border-l-4 border-l-green-500"><CardContent className="pt-6"><h3 className="font-bold mb-2">28 % afgift</h3><p className="text-sm text-muted-foreground">Casinooperatører med dansk licens betaler 28 % af deres bruttospilleindtægt (GGR) til staten. GGR = samlede indsatser minus samlede udbetalinger. Denne afgift erstatter individuel beskatning af spillergevinster.</p></CardContent></Card>
            <Card className="border-l-4 border-l-green-500"><CardContent className="pt-6"><h3 className="font-bold mb-2">0 % spillerbeskatning</h3><p className="text-sm text-muted-foreground">Som spiller på et dansk licenseret casino betaler du 0 % skat af dine gevinster – uanset beløb. Du behøver ikke indberette eller selvangive noget. Gevinsten er din, og du kan bruge den som du vil.</p></CardContent></Card>
            <Card className="border-l-4 border-l-green-500"><CardContent className="pt-6"><h3 className="font-bold mb-2">Ca. 1,5 mia. kr. årligt</h3><p className="text-sm text-muted-foreground">Den samlede statsindtægt fra casinoafgifter er ca. 1-1,5 milliarder kr. årligt. Systemet er administrativt effektivt, da staten kun skal overvåge 40-45 operatører i stedet for millioner af individuelle spillere.</p></CardContent></Card>
          </div>
        </section>

        <Separator className="mb-12" />

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2"><Globe className="h-7 w-7 text-primary" /> Skatteforhold for udenlandske casinoer</h2>
          <p className="text-muted-foreground mb-6">Spiller du på casinoer uden dansk licens, ændrer skattereglerne sig markant. Her er en oversigt over de forskellige scenarier.</p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-border"><th className="text-left py-3 px-4 font-semibold">Casino-type</th><th className="text-left py-3 px-4 font-semibold">Licens</th><th className="text-left py-3 px-4 font-semibold">Skat på gevinster</th><th className="text-left py-3 px-4 font-semibold">Selvangive?</th></tr></thead>
              <tbody>
                <tr className="border-b border-border/50"><td className="py-3 px-4">Dansk licenseret casino</td><td className="py-3 px-4">Spillemyndigheden</td><td className="py-3 px-4"><Badge className="bg-green-500/20 text-green-500">0 % skattefri</Badge></td><td className="py-3 px-4">Nej</td></tr>
                <tr className="border-b border-border/50"><td className="py-3 px-4">EU-licenseret casino</td><td className="py-3 px-4">Malta (MGA), Gibraltar etc.</td><td className="py-3 px-4"><Badge className="bg-green-500/20 text-green-500">Typisk skattefri</Badge></td><td className="py-3 px-4">Nej (normalt)</td></tr>
                <tr className="border-b border-border/50"><td className="py-3 px-4">Casino uden EU-licens</td><td className="py-3 px-4">Curaçao, Costa Rica etc.</td><td className="py-3 px-4"><Badge className="bg-red-500/20 text-red-500">Op til 52 %</Badge></td><td className="py-3 px-4">Ja</td></tr>
                <tr className="border-b border-border/50"><td className="py-3 px-4">Ulicenseret casino</td><td className="py-3 px-4">Ingen</td><td className="py-3 px-4"><Badge className="bg-red-500/20 text-red-500">Op til 52 %</Badge></td><td className="py-3 px-4">Ja</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground">Bemærk: Selv for EU-licenserede casinoer anbefaler vi at konsultere en skatterådgiver ved store gevinster (over 50.000 kr.), da individuelle omstændigheder kan variere. Det sikreste valg er altid et casino med <Link to="/licenserede-casinoer" className={linkClass}>dansk licens</Link>, hvor skattefriheden er 100 % garanteret ved lov.</p>
        </section>

        <Separator className="mb-12" />

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2"><Calculator className="h-7 w-7 text-primary" /> Skatteberegning ved skattepligtige gevinster</h2>
          <p className="text-muted-foreground mb-4">Hvis du spiller på et casino uden EU-licens og vinder, beskattes gevinsten som personlig indkomst. Det betyder, at den lægges oven i din øvrige indkomst og beskattes efter de normale skattesatser.</p>
          <Card className="mb-6"><CardContent className="pt-6">
            <h3 className="font-bold mb-3">Eksempel: Gevinst på 50.000 kr. fra ulicenseret casino</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Antag en spiller med en årsindkomst på 400.000 kr.:</p>
              <ul className="space-y-1 ml-4">
                <li>• Gevinsten beskattes som personlig indkomst: 50.000 kr.</li>
                <li>• Marginalskattesats (inkl. kommuneskat): ca. 37-42 %</li>
                <li>• <strong>Skat at betale: ca. 18.500–21.000 kr.</strong></li>
                <li>• Netto gevinst efter skat: ca. 29.000–31.500 kr.</li>
              </ul>
              <p className="mt-3 font-medium">Sammenligning: Samme gevinst på et dansk licenseret casino = 50.000 kr. skattefrit i hånden.</p>
            </div>
          </CardContent></Card>
          <p className="text-muted-foreground">Eksemplet illustrerer tydeligt den økonomiske fordel ved at spille på licenserede danske casinoer. Over tid kan skattebesparelsen udgøre en markant forskel i din samlede gevinst.</p>
        </section>

        <Separator className="mb-12" />

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2"><Star className="h-7 w-7 text-primary" /> Konklusion: Vælg skattefrihed – vælg dansk licens</h2>
          <p className="text-muted-foreground mb-4">Skatteforholdene ved casinospil i Danmark er enkle, så længe du vælger et casino med dansk licens: <strong>0 % skat, ingen selvangivelse, ingen grænser.</strong> Det er et af verdens mest spillervenlige skattesystemer, og det er en tungtvejende grund til altid at vælge <Link to="/licenserede-casinoer" className={linkClass}>licenserede casinoer</Link>.</p>
          <p className="text-muted-foreground">Spiller du på udenlandske casinoer uden EU-licens, risikerer du at betale op til 52 % i skat af dine gevinster. Det er en pris, der sjældent retfærdiggøres af eventuelle fordele ved ulicenserede platforme. Besøg vores <Link to="/top-10-casino-online" className={linkClass}>top 10 online casino</Link> for de bedste skattefri casinomuligheder i Danmark.</p>
        </section>

        <FAQSection faqs={faqs} />
        <RelatedGuides guides={[{ to: "/licenserede-casinoer", label: "Licenserede Casinoer" }, { to: "/casinoer/crypto-casino", label: "Crypto Casino" }, { to: "/spillemyndigheden", label: "Spillemyndigheden" }, { to: "/top-10-casino-online", label: "Top 10 Online Casino" }]} />
        <CommunityPromoSection />
        <AuthorBio author="Jonas" />
      </article>
    </>
  );
};

export default CasinoOgSkatGuide;
