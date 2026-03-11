import { Link } from "react-router-dom";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { AuthorBio } from "@/components/AuthorBio";
import { Separator } from "@/components/ui/separator";
import { RelatedGuides } from "@/components/RelatedGuides";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { CasinospilMoneyLinks } from "@/components/CasinospilMoneyLinks";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Target,
  ShieldCheck,
  BarChart3,
  Layers,
  Zap,
  Users,
  BookOpen,
  Dice1,
  ArrowRight,
  Scale,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import rouletteHero from "@/assets/heroes/roulette-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

/* ───────────────────────── FAQ ───────────────────────── */

const rouletteFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er forskellen på European og American roulette?",
    answer:
      "Europæisk roulette har 37 felter (0–36) med én grøn nul-lomme, hvilket giver en house edge på 2,70 %. Amerikansk roulette tilføjer en ekstra nul-lomme (00), så der er 38 felter og house edge stiger til 5,26 %. Udbetalingerne er identiske i begge versioner – en straight-up betaler stadig 35:1 – men med 38 felter i stedet for 37 får du dårligere odds for samme udbetaling. Over 500 spins med 100 kr. indsats er forskellen ca. 1.280 kr. i ekstra forventet tab på den amerikanske version. Vælg altid europæisk eller fransk.",
  },
  {
    question: "Hvad er den bedste roulette-variant for danske spillere?",
    answer: (
      <>
        Fransk roulette med La Partage-reglen er den klart bedste variant. La Partage returnerer halvdelen af din indsats på lige-penge-væddemål, når kuglen lander på 0 – det reducerer house edge til blot 1,35 %. Europæisk roulette uden La Partage er næstbedst med 2,70 %. Mange <Link to="/live-casino" className={linkClass}>live casino</Link>-udbydere tilbyder fransk roulette, men du skal aktivt søge den – den er sjældnere end standard europæisk. Tjek altid spillets regler i info-sektionen for at bekræfte, om La Partage gælder.
      </>
    ),
  },
  {
    question: "Er roulette 100 % tilfældigt?",
    answer:
      "Ja. I RNG-roulette (computer-genereret) bruger spillet en Random Number Generator, der er certificeret af uafhængige testlaboratorier som eCOGRA og iTech Labs. Hvert spin producerer et resultat, der er statistisk uafhængigt af alle foregående spins. I live roulette bestemmes resultatet af fysikken – kuglens hastighed, hjulets rotation, friktionskoefficienter – som tilsammen skaber et resultat, der i praksis er umuligt at forudsige. Casinoer kalibrerer og udskifter hjul regelmæssigt for at sikre, at ingen fysiske ubalancer favoriserer bestemte tal.",
  },
  {
    question: "Hvad betyder house edge i roulette?",
    answer:
      "House edge er den procentdel af din indsats, som casinoet i gennemsnit beholder over mange spins. I europæisk roulette er house edge 2,70 %, fordi udbetalingerne er beregnet, som om hjulet kun har 36 felter – men det har faktisk 37 (inkl. 0). Den 37. lomme skaber et strukturelt overskud til casinoet. I praksis betyder 2,70 % house edge, at for hver 100 kr. du satser, forventer du at tabe 2,70 kr. i gennemsnit. Over 1.000 spins á 100 kr. er dit forventede tab 2.700 kr.",
  },
  {
    question: "Kan man lovligt spille roulette online i Danmark?",
    answer: (
      <>
        Ja. Online roulette er fuldt lovligt i Danmark, forudsat at du spiller på et casino med licens fra den danske <Link to="/spillemyndigheden" className={linkClass}>Spillemyndighed</Link>. Licenserede casinoer overholder strenge krav til fairness, spillerbeskyttelse og <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>. Gevinster fra licenserede casinoer er skattefrie for danske spillere. Spiller du derimod på et casino uden dansk licens, er gevinsterne skattepligtige, og du har ingen forbrugerbeskyttelse.
      </>
    ),
  },
  {
    question: "Hvad er inside bets i roulette?",
    answer:
      "Inside bets (indre væddemål) er væddemål placeret direkte på tallene i roulettebordets indre felt. De fem typer er: Straight Up (ét tal, betaler 35:1), Split (to tilstødende tal, 17:1), Street (tre tal i en vandret række, 11:1), Corner (fire tal der mødes i et hjørne, 8:1) og Six Line (to tilstødende rækker, altså seks tal, 5:1). Inside bets har lavere vindchance men højere udbetaling end outside bets. House edge er den samme uanset bet-type: 2,70 % på europæisk roulette.",
  },
  {
    question: "Hvad er den maksimale gevinst i roulette?",
    answer:
      "På et standard straight-up væddemål (ét tal) betaler roulette 35:1. Med en indsats på 1.000 kr. er gevinsten 35.000 kr. plus din originale indsats. Bordets maksimale indsats varierer – typisk 500–5.000 kr. for inside bets og 5.000–50.000 kr. for outside bets på danske casinoer. I Lightning Roulette kan RNG-multiplikatorer op til 500x ganges med straight-up gevinster, hvilket teoretisk giver op til 500 × indsats. XXXTreme Lightning Roulette tilbyder op til 2.000x. Disse varianter har dog lavere basis-udbetaling (29:1 i stedet for 35:1).",
  },
  {
    question: "Er live roulette bedre end RNG-roulette?",
    answer: (
      <>
        "Bedre" afhænger af dine præferencer. Live roulette bruger et fysisk hjul filmet i realtid med en professionel dealer – det giver autenticitet, social interaktion og tillid til fairness. RNG-roulette er computergenereret og typisk hurtigere (du kan spille flere spins pr. minut) og ofte med lavere minimumsindsats. Matematisk set er house edge identisk, forudsat begge bruger europæisk layout. Live roulette tilbyder varianter som Immersive Roulette (slow-motion replay) og Lightning Roulette (multiplikatorer), som ikke findes i standard RNG-format. For de fleste spillere tilbyder live roulette en bedre samlet oplevelse.
      </>
    ),
  },
];

/* ───────────────────────── PAGE ───────────────────────── */

const RouletteGuide = () => {
  const faqJsonLd = buildFaqSchema(rouletteFaqs);
  const articleSchema = buildArticleSchema({
    headline: "Roulette Regler 2026 – Guide til Væddemål og Varianter",
    description:
      "Komplet guide til roulette: regler, bet-typer, hjulets opbygning, odds, European vs American og live roulette. Alt du skal vide.",
    url: `${SITE_URL}/casinospil/roulette`,
    datePublished: "2026-02-15",
    dateModified: "2026-02-18",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  // BreadcrumbList is auto-generated by SEO.tsx via buildBreadcrumbListSchema() – no manual injection needed.

  return (
    <>
      <SEO
        title="Roulette Regler 2026 – Væddemål, Odds og Varianter"
        description="Komplet guide til roulette: regler, bet-typer, hjulets opbygning, odds, European vs American og live roulette. Alt du skal vide."
        jsonLd={[faqJsonLd, articleSchema]}
      />

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{ backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))" }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Dice1 className="mr-1.5 h-3.5 w-3.5" /> Opdateret Februar 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Roulette – Regler, Væddemål og Varianter
            </h1>
            <p className="text-lg text-white/80">
              Din pædagogiske guide til roulettehjulet, bet-typer og odds.
            </p>
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="18-02-2026" readTime="32 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={rouletteHero}
            alt="Roulettehjul i et live casino-miljø med grønne feltmarkeringer"
            width={1920}
            height={600}
            className="w-full h-auto object-cover max-h-[400px]"
            loading="eager"
          />
        </div>

        {/* ═══════════════ 1 – ROULETTE FORKLARET PÅ 2 MINUTTER ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Roulette Forklaret på 2 Minutter</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Roulette er et casinospil, hvor en kugle kastes ind i et roterende hjul med nummererede lommer. Når hjulet stopper, afgør kuglens landingsposition, hvilke væddemål der vinder. Spilleren placerer sine chips på et bordlayout, der viser alle mulige væddemålsmuligheder – fra et enkelt tal til store grupper som rød/sort eller lige/ulige. Det er ét af de mest tilgængelige <Link to="/casinospil" className={linkClass}>casinospil</Link>, fordi det ikke kræver nogen teknisk viden at komme i gang.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spillets flow er simpelt: (1) du placerer dine indsatser på bordet, (2) dealeren (eller RNG-systemet) spinner hjulet og kaster kuglen, (3) kuglen lander i en nummereret lomme, (4) vindende væddemål udbetales, tabende indsatser inddrages. En runde tager typisk 40–60 sekunder i live roulette, hurtigere i RNG-format. Der er ingen komplekse regler at huske, ingen beslutninger at træffe efter indsatsen er placeret og ingen interaktion med andre spillere, der påvirker dit resultat.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det, der gør roulette unikt blandt casinospil, er kombinationen af enkelhed og dybde. Overfladen er simpel: vælg et tal eller en farve, og vent. Men under overfladen ligger et sofistikeret odds-system med over 150 mulige indsatskombinationer, tre fundamentalt forskellige hjulvarianter og specialregler som La Partage, der halverer casinoets fordel. Du kan spille roulette i 5 minutter og forstå det – eller studere det i årevis og stadig finde nye perspektiver.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I denne guide gennemgår vi hvert element i detaljer: hjulets fysiske opbygning, bordets layout, alle bet-typer med odds og udbetalinger, de vigtigste varianter, forskellen mellem live og RNG-roulette, og den danske regulering. Formålet er ikke at love dig en vinderstrategi – det er at give dig den viden, du behøver for at træffe informerede valg, når du sætter dig ved bordet.
          </p>
        </section>

        <InlineCasinoCards title="Bedste Casinoer til Roulette" count={6} />

        <Separator className="my-10" />

        {/* ═══════════════ 2 – HJULETS OPBYGNING ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Roulettehjulets Opbygning</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Et roulettehjul er en præcisionskonstruktion i træ, metal og plast med nummererede lommer, der er anbragt i en nøje beregnet rækkefølge. Hjulets design er ikke tilfældigt – det er resultatet af århundreders forfining med det formål at skabe en så jævn og uforudsigelig fordeling af resultater som muligt. Forståelse af hjulets opbygning hjælper dig med at vurdere forskelle mellem varianter og forstå, hvorfor visse væddemål eksisterer.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Europæisk hjul (37 lommer):</strong> Tallene 1–36 plus ét grønt nulfelt (0). Tallene er arrangeret i denne rækkefølge (med uret): 0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26. Denne sekvens er designet, så røde og sorte tal alternerer (med to undtagelser), høje og lave tal er fordelt jævnt, og tilstødende tal aldrig tilhører samme dozen eller kolonne. Formålet er at sikre, at en kugle, der lander i et specifikt område af hjulet, giver et så "tilfældigt" resultat som muligt relativt til de mulige væddemål.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Amerikansk hjul (38 lommer):</strong> Identisk med det europæiske, men med tilføjelsen af et dobbelt-nul (00) i en ekstra grøn lomme. Tallene er arrangeret i en helt anden sekvens: 0, 28, 9, 26, 30, 11, 7, 20, 32, 17, 5, 22, 34, 15, 3, 24, 36, 13, 1, 00, 27, 10, 25, 29, 12, 8, 19, 31, 18, 6, 21, 33, 16, 4, 23, 35, 14, 2. Den ekstra lomme øger casinoets fordel markant, fra 2,70 % til 5,26 %, uden at tilbyde nogen ekstra udbetalingsmulighed til spilleren.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Fransk hjul:</strong> Fysisk identisk med det europæiske hjul (37 lommer, samme talsekvens). Forskellen er i bordlayoutet og spillereglerne: det franske bord bruger franske betegnelser (Manque/Passe, Pair/Impair, Rouge/Noir) og tilbyder specialreglerne La Partage og/eller En Prison, der halverer <Link to="/ordbog/house-edge" className={linkClass}>house edge</Link> på lige-penge-væddemål. Hjulet selv er det samme – det er reglerne, der gør fransk roulette unik.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Moderne roulettehjul i live casinoer er præcisionskonstruktioner med minimale tolerancer. Hjulet drejes på kuglelejer med ekstrem lav friktion, lommerne er udformet med identiske dimensioner (typisk 30–35 mm bredde), og det samlede hjul kalibreres regelmæssigt med lasermålinger for at sikre, at ingen lomme har en statistisk signifikant fordel. Casinoer udskifter hjul med jævne mellemrum og overvåger resultatfordelingen elektronisk for at detektere eventuelle bias.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I RNG-roulette (computergenereret) eksisterer intet fysisk hjul. En algoritme producerer et tilfældigt tal mellem 0 og 36 (europæisk) eller 0 og 37 (amerikansk, hvor 37 repræsenterer 00). Animationen af hjulet er ren grafik – resultatet er allerede bestemt af RNG'en, før hjulet visuelt "spinner". Certificerede RNG-systemer gennemgår regelmæssige audits for at sikre uniformitet i resultatfordelingen.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 3 – BORDETS LAYOUT ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Bordets Layout og Bet-Områder</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Roulettebordet er opdelt i to hovedområder: det indre felt (inside) og det ydre felt (outside). Forståelse af bordlayoutet er fundamentet for at placere korrekte væddemål og forstå, hvad dine chips dækker.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Det indre felt</strong> består af et gitter med tallene 1–36 arrangeret i tre kolonner med 12 rækker. Nulfeltet (0) er placeret i toppen af gitteret, og i amerikansk roulette er 00 ved siden af 0. Hvert tal har sin egen boks, og du kan placere chips på et enkelt tal, på linjerne mellem tal (for at dække 2, 3, 4 eller 6 tal) eller på kanten af en hel række. Positionen af din chip bestemmer præcist, hvilke tal dit væddemål dækker.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Det ydre felt</strong> omgiver det indre gitter og indeholder de store gruppevæddemål. Langs den ene side finder du felterne for rød/sort, lige/ulige og høj/lav (alle 1:1 udbetalinger). I bunden af kolonnerne finder du tre "2 to 1"-felter for kolonnevæddemål. Desuden er der tre "dusinvis"-felter (1st 12, 2nd 12, 3rd 12) for væddemål på grupper af 12 tal.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Det franske bord</strong> adskiller sig visuelt fra det standard europæiske. Tallene er arrangeret i samme gitter, men outside bets er placeret på begge sider af gitteret (i stedet for kun den ene side), og betegnelserne er franske: Manque (1–18), Passe (19–36), Pair (lige), Impair (ulige), Rouge (rød), Noir (sort). Derudover inkluderer franske borde ofte et "racetrack"-felt – et ovalt område, der viser hjulets fysiske talsekvens og muliggør sektorvæddemål som Voisins du Zéro, Tiers du Cylindre og Orphelins.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Racetrack-væddemål</strong> (også kaldet "called bets" eller "announced bets") dækker grupper af fysisk tilstødende numre på hjulet – i modsætning til det indre felt, hvor tallene er arrangeret numerisk. Voisins du Zéro dækker 17 tal omkring nul, Tiers du Cylindre dækker 12 tal på den modsatte side, og Orphelins dækker de resterende 8 tal. Disse væddemål kræver flere chips og har forskellige udbetalingsstrukturer afhængigt af, hvordan de fordeles på de individuelle numre.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I online roulette – både RNG og live – vises bordlayoutet digitalt med interaktive klikzoner. Du trykker eller klikker for at placere chips, og softwaren forhindrer ugyldige placeringer. Mange online-borde tilbyder funktioner som "favourite bets" (gem dine foretrukne chip-placeringer), "rebet" (gentag sidste indsats) og "double" (fordobl alle indsatser). Disse kvalitetsforskelle påvirker ikke odds, men de forbedrer brugeroplevelsen markant.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 4 – INSIDE BETS ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Indsats-Typer – Inside Bets</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Inside bets er væddemål, der placeres direkte på de nummererede felter i bordets indre gitter. De tilbyder højere udbetalinger til gengæld for lavere vindchance. Alle inside bets har den samme house edge (2,70 % i europæisk roulette) – udbetalingen er proportional med antallet af dækkede tal.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Straight Up</strong> – væddemål på ét enkelt tal. Du placerer din chip midt i tallets boks. Udbetaling: 35:1. Vindchance: 1/37 = 2,70 %. Dette er det mest risikable væddemål i roulette, men også det med den højeste potentielle udbetaling. Med en indsats på 100 kr. vinder du 3.500 kr. plus din originale indsats. Over 37 spins vil du statistisk ramme dit tal én gang og tabe 36 gange – netto: 3.500 − 3.600 = −100 kr. (house edge: 100/3.700 ≈ 2,70 %).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Split</strong> – væddemål på to tilstødende tal. Du placerer din chip på linjen mellem de to tal. Udbetaling: 17:1. Vindchance: 2/37 = 5,41 %. Eksempel: chip på linjen mellem 17 og 20 dækker begge tal. Med 100 kr. indsats vinder du 1.700 kr. ved gevinst. Splits kan placeres vertikalt (fx 8/11) eller horisontalt (fx 8/9) afhængigt af tallenes position i gitteret.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Street</strong> – væddemål på tre tal i en vandret række. Du placerer din chip på den ydre kant af rækkens første tal. Udbetaling: 11:1. Vindchance: 3/37 = 8,11 %. Der er 12 mulige streets: 1-2-3, 4-5-6, 7-8-9, ..., 34-35-36. Desuden kan du placere et "Trio"-væddemål, der dækker 0-1-2 eller 0-2-3.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Corner (Square)</strong> – væddemål på fire tal, der mødes i et hjørne. Du placerer din chip i skæringspunktet mellem de fire tal. Udbetaling: 8:1. Vindchance: 4/37 = 10,81 %. Eksempel: chip i hjørnet af 5, 6, 8, 9 dækker alle fire tal. Corners er populære, fordi de giver en god balance mellem risiko og udbetaling – 8:1 odds med næsten 11 % vindchance.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Six Line (Double Street)</strong> – væddemål på to tilstødende rækker, altså seks tal. Du placerer din chip på det ydre skæringspunkt mellem de to rækker. Udbetaling: 5:1. Vindchance: 6/37 = 16,22 %. Der er 11 mulige six lines. Med 100 kr. indsats vinder du 500 kr. ved gevinst.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Basket (kun amerikansk roulette)</strong> – et specielt væddemål, der dækker 0, 00, 1, 2 og 3 (fem tal). Udbetaling: 6:1. Vindchance: 5/38 = 13,16 %. House edge: 7,89 % – det eneste væddemål i roulette med en <em>højere</em> house edge end standarden. Basket-væddemålet er endnu en grund til at undgå amerikansk roulette.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 5 – OUTSIDE BETS ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Indsats-Typer – Outside Bets</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Outside bets placeres på de store felter uden for tallgitteret. De dækker store grupper af tal og tilbyder lavere udbetaling men højere vindchance. For nye spillere er outside bets det naturlige startpunkt, fordi de giver en mere stabil spilleoplevelse med færre dramatiske swings.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Rød/Sort (Rouge/Noir)</strong> – væddemål på kuglens farve. 18 tal er røde, 18 er sorte, og 0 (plus 00 i amerikansk) er grøn. Udbetaling: 1:1. Vindchance: 18/37 = 48,65 %. Det mest populære væddemål i roulette, fordi det føles "næsten" som en 50/50 chance – men de 1,35 procentpoint forskel fra ægte 50/50 er præcis casinoets fortjeneste.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Lige/Ulige (Pair/Impair)</strong> – væddemål på om tallet er lige (2, 4, 6...) eller ulige (1, 3, 5...). Nul regnes hverken som lige eller ulige i roulette-kontekst (selvom 0 matematisk er lige). Udbetaling: 1:1. Vindchance: 18/37 = 48,65 %. Identisk matematisk profil som rød/sort – blot en anden kategorisering af de 36 ikke-nul tal.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Høj/Lav (Passe/Manque)</strong> – væddemål på om tallet er lavt (1–18) eller højt (19–36). Igen 18 tal i hver gruppe, udbetaling 1:1, vindchance 48,65 %. Nul falder uden for begge grupper. Disse tre lige-penge-væddemål (rød/sort, lige/ulige, høj/lav) er de eneste, der påvirkes af La Partage og En Prison-reglerne i fransk roulette.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Dusinvis (Dozens)</strong> – væddemål på 12 tal: 1st dozen (1–12), 2nd dozen (13–24) eller 3rd dozen (25–36). Udbetaling: 2:1. Vindchance: 12/37 = 32,43 %. Med 100 kr. indsats vinder du 200 kr. ved gevinst. Dusinvis tilbyder en attraktiv mellemvej – højere odds end lige-penge-bets men bredere dækning end inside bets.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Kolonner (Columns)</strong> – væddemål på 12 tal i en vertikal kolonne i bordlayoutet. Første kolonne: 1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34. Anden kolonne: 2, 5, 8... osv. Tredje kolonne: 3, 6, 9... Udbetaling: 2:1. Vindchance: 12/37 = 32,43 %. Nul er ikke inkluderet i nogen kolonne. Matematisk identisk med dusinvis – blot en anden opdeling af tallene.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            En vigtig pointe om outside bets: mange nye spillere tror fejlagtigt, at ydre væddemål har en lavere house edge end indre væddemål, fordi vindchancen er højere. Det er forkert. House edge er identisk for alle væddemål i europæisk roulette: 2,70 %. Det, der ændrer sig, er volatiliteten – outside bets giver hyppigere, men mindre gevinster, mens inside bets giver sjældnere, men større. Over mange spins taber du det samme i procent uanset væddemålstype.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 6 – UDBETALINGER OG ODDS ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Udbetalinger og Odds Forklaret</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Roulette-udbetalinger er baseret på en simpel formel: udbetaling = (36 / antal dækkede tal) − 1. Formlen bruger 36 som divisor – men hjulet har 37 felter (europæisk) eller 38 felter (amerikansk). Denne diskrepans er kilden til casinoets edge: udbetalingerne er beregnet, som om nulfeltet ikke eksisterer.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left font-semibold">Væddemål</th>
                  <th className="px-4 py-3 text-center font-semibold">Tal dækket</th>
                  <th className="px-4 py-3 text-center font-semibold">Udbetaling</th>
                  <th className="px-4 py-3 text-center font-semibold">Vindchance (EU)</th>
                  <th className="px-4 py-3 text-center font-semibold">Vindchance (US)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border"><td className="px-4 py-2">Straight Up</td><td className="px-4 py-2 text-center">1</td><td className="px-4 py-2 text-center">35:1</td><td className="px-4 py-2 text-center">2,70 %</td><td className="px-4 py-2 text-center">2,63 %</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2">Split</td><td className="px-4 py-2 text-center">2</td><td className="px-4 py-2 text-center">17:1</td><td className="px-4 py-2 text-center">5,41 %</td><td className="px-4 py-2 text-center">5,26 %</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2">Street</td><td className="px-4 py-2 text-center">3</td><td className="px-4 py-2 text-center">11:1</td><td className="px-4 py-2 text-center">8,11 %</td><td className="px-4 py-2 text-center">7,89 %</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2">Corner</td><td className="px-4 py-2 text-center">4</td><td className="px-4 py-2 text-center">8:1</td><td className="px-4 py-2 text-center">10,81 %</td><td className="px-4 py-2 text-center">10,53 %</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2">Six Line</td><td className="px-4 py-2 text-center">6</td><td className="px-4 py-2 text-center">5:1</td><td className="px-4 py-2 text-center">16,22 %</td><td className="px-4 py-2 text-center">15,79 %</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2">Dozen / Kolonne</td><td className="px-4 py-2 text-center">12</td><td className="px-4 py-2 text-center">2:1</td><td className="px-4 py-2 text-center">32,43 %</td><td className="px-4 py-2 text-center">31,58 %</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2">Rød/Sort, Lige/Ulige, Høj/Lav</td><td className="px-4 py-2 text-center">18</td><td className="px-4 py-2 text-center">1:1</td><td className="px-4 py-2 text-center">48,65 %</td><td className="px-4 py-2 text-center">47,37 %</td></tr>
              </tbody>
            </table>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Tabellen viser, at vindchancen for hvert væddemål er konsekvent lavere i amerikansk roulette end i europæisk – men udbetalingerne er identiske. Det er den ekstra grønne lomme (00), der skaber forskellen. For at illustrere: en straight-up bet vinder med 1/37 chance i europæisk og udbetaler 35:1, men med 1/38 i amerikansk roulette – stadig med 35:1 udbetaling. De "manglende" odds er casinoets fortjeneste.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Nøglepunkt:</strong> Udbetalingen bestemmer din potentielle gevinst, men vindchancen bestemmer din forventede værdi. Et 35:1 væddemål lyder fantastisk, men når vindchancen kun er 2,70 %, er den forventede værdi negativ. Intet væddemål i roulette har en positiv forventet værdi – udbetalingen kompenserer aldrig fuldt ud for den lave vindchance. Det er den matematiske kerne i casinoets forretningsmodel.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For spillere, der ønsker en mere detaljeret matematisk analyse af forventet værdi, varians og væddemålssystemer, har vi udarbejdet dybdegående guides til hvert enkelt system med formler, simuleringer og risk of ruin-beregninger – se oversigten nedenfor.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 7 – HOUSE EDGE ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">House Edge – Hvad Betyder 2,7 %?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            House edge er den procentdel af din indsats, som casinoet statistisk set beholder over tid. I europæisk roulette er house edge 2,70 %. Det tal stammer fra en simpel beregning: der er 37 felter, udbetalingerne er beregnet for 36 felter, og den "ekstra" lomme (nul) tilhører casinoet. Casinoets fordel = 1/37 = 2,70 %.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hvad betyder det i praksis? Forestil dig, at du sætter 100 kr. pr. spin i 100 spins. Din totale indsats er 10.000 kr. Med en house edge på 2,70 % forventer du at tabe 270 kr. over 100 spins. Det er et gennemsnit – dit faktiske resultat vil afvige, nogle gange markant. Men over 10.000 spins nærmer dit resultat sig uundgåeligt 2,70 % af total indsats.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>RTP (Return to Player)</strong> er det modsatte perspektiv: RTP = 100 % − house edge. For europæisk roulette er RTP 97,30 %. Det betyder, at for hver 100 kr. du satser, kan du forvente at få 97,30 kr. tilbage i gennemsnit. RTP bruges ofte til at sammenligne casinospil: roulette (97,30 %) vs. <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link> med perfect play (99,50 %) vs. <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskiner</Link> (typisk 92–97 %) vs. <Link to="/casinospil/baccarat" className={linkClass}>baccarat</Link> banker (98,94 %).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            House edge i forskellige roulette-varianter: Fransk med La Partage: 1,35 % (RTP 98,65 %). Europæisk standard: 2,70 % (RTP 97,30 %). Amerikansk: 5,26 % (RTP 94,74 %). Forskellen er enorm. Over 1.000 spins med 100 kr. indsats er dit forventede tab: La Partage 1.350 kr., europæisk 2.700 kr., amerikansk 5.260 kr. At vælge den rigtige variant er den mest konsekvensrige beslutning, du kan træffe som roulette-spiller.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            En vigtig nuance: house edge gælder pr. indsats, ikke pr. session. Hvis du satser 100 kr. på rød og vinder, har du ikke "slået" house edge – du har blot oplevet ét udfald af en sandsynlighedsfordeling, der over mange spins favoriserer casinoet. House edge er et langsigtet gennemsnit, ikke en garanti for hvert enkelt spin. Det er variansen (de kortsigtede udsving), der gør roulette underholdende – fordi den skjuler house edge bag tilfældige gevinster og tab.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 8 – EU VS US ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">European vs. American – Hvorfor Forskellen Er Vigtig</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Forskellen mellem europæisk og amerikansk roulette er den mest afgørende faktor for din spilleoplevelse – vigtigere end enhver strategi, ethvert system og enhver "tip" du nogensinde vil læse. Det er ikke en subtil forskel: amerikansk roulette koster dig næsten dobbelt så meget som europæisk over tid.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" /> Fransk (La Partage)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  <strong>Felter:</strong> 37<br />
                  <strong>House edge:</strong> 1,35 %<br />
                  <strong>Tab / 1.000 spins á 100 kr.:</strong> 1.350 kr.<br />
                  <strong>Anbefaling:</strong> Bedste valg
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" /> Europæisk
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  <strong>Felter:</strong> 37<br />
                  <strong>House edge:</strong> 2,70 %<br />
                  <strong>Tab / 1.000 spins á 100 kr.:</strong> 2.700 kr.<br />
                  <strong>Anbefaling:</strong> Standard
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" /> Amerikansk
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  <strong>Felter:</strong> 38<br />
                  <strong>House edge:</strong> 5,26 %<br />
                  <strong>Tab / 1.000 spins á 100 kr.:</strong> 5.260 kr.<br />
                  <strong>Anbefaling:</strong> Undgå
                </p>
              </CardContent>
            </Card>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Tallene taler for sig selv: over 1.000 spins koster det ekstra nulfelt i amerikansk roulette dig 2.560 kr. mere end europæisk. Det svarer til mere end et helt dags budget for mange spillere – tabt udelukkende fordi du valgte den forkerte variant. Det er ikke en strategi-fejl; det er en informations-fejl.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Historisk set opstod dobbelt-nullet, fordi de tidlige roulettehjul i Frankrig havde både 0 og 00. I 1843 introducerede brødrene François og Louis Blanc single-zero-hjulet i Bad Homburg, Tyskland, for at tiltrække spillere med bedre odds. Det europæiske marked adopterede single-zero, mens de amerikanske casinoer beholdt double-zero. I dag er der ingen rationel grund til at spille amerikansk roulette – medmindre det bogstaveligt talt er den eneste tilgængelige variant, hvilket sjældent er tilfældet online.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Tjekliste:</strong> Før du starter et roulette-spil, tjek altid: (1) Er det europæisk eller amerikansk? (Se efter 00 på hjulet/bordet.) (2) Gælder La Partage eller En Prison? (Tjek spillets info-sektion.) (3) Hvad er minimum- og maksimumindsatsen? Disse tre informationer tager 10 sekunder at verificere og kan spare dig tusinder af kroner over din spillekarriere.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 9 – LIVE VS RNG ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Live Roulette vs. RNG Roulette</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Online roulette findes i to fundamentalt forskellige formater: RNG-roulette (computergenereret) og live roulette (fysisk hjul filmet i realtid). Begge formater tilbyder den samme matematiske sandsynlighedsstruktur, men spilleoplevelsen er markant anderledes.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>RNG-roulette</strong> bruger en Random Number Generator til at bestemme resultatet. Der er intet fysisk hjul – animationen er grafik, og resultatet beregnes instantant. Fordele: hurtigere spins (du bestemmer tempoet), lavere minimumsindsatser (ofte fra 1–10 kr.), mulighed for at spille gratis i demo-mode, og ingen ventetid på andre spillere. Ulemper: mangler den sociale og visuelle oplevelse, nogle spillere har lavere tillid til RNG vs. fysisk kugle, og der er færre innovative varianter.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Live roulette</strong> anvender et fysisk hjul i et professionelt studie (eller et rigtigt casino via Dual Play). En trained dealer spinner hjulet og kaster kuglen, og multiple HD-kameraer fanger handlingen fra forskellige vinkler. Fordele: autenticitet, social interaktion via chat, visuel tilfredshed (se kuglen hoppe i slow-motion), og innovative varianter som Lightning Roulette og Immersive Roulette. Ulemper: langsommere tempo (40–60 sek. pr. runde), højere minimumsindsatser (typisk 10–50 kr.) og afhængighed af internetforbindelse til videostreaming.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Populære live varianter:</strong> <em>Immersive Roulette</em> (cinematisk slow-motion af kuglens landning), <em>Speed Roulette</em> (runder hvert 25. sekund), <em>Lightning Roulette</em> (RNG-multiplikatorer op til 500x), <em>XXXTreme Lightning Roulette</em> (op til 2.000x), <em>Auto Roulette</em> (uden dealer, automatisk kuglekast), <em>Dual Play Roulette</em> (forbinder online-spillere med fysisk casino) og <em>Mega Fire Blaze Roulette</em> (progressiv jackpot-mulighed).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Fairness:</strong> Begge formater er certificeret fair, når du spiller på et casino med dansk licens. RNG-systemer auditeres af uafhængige laboratorier (eCOGRA, iTech Labs, BMM Testlabs). Live-hjul producerer naturligt tilfældige resultater baseret på fysik, og casinoer overvåger resultatfordelingen elektronisk. Den danske <Link to="/spillemyndigheden" className={linkClass}>Spillemyndighed</Link> kræver regelmæssig dokumentation af begge formater.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Valget mellem live og RNG afhænger af dine præferencer: vil du have autenticitet og social oplevelse, vælg live. Vil du have tempo, lave indsatser og mulighed for demo-play, vælg RNG. Matematikken er den samme – det er oplevelsen, der adskiller dem.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 10 – REGULERING ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Roulette i Danmark – Regulering og Licens</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Online roulette er fuldt lovligt i Danmark, forudsat at du spiller på et casino med licens fra den danske Spillemyndighed. Spilleloven af 2012 (Lov om spil) liberaliserede det danske marked og åbnede for private operatører, der opfylder strenge krav til fairness, spillerbeskyttelse og ansvarligt spil. Pr. 2026 har over 30 online-casinoer en aktiv dansk licens, og alle tilbyder roulette som en del af deres spiludvalg.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Skatteregler:</strong> Gevinster fra spil på danske licenserede casinoer er skattefrie for spilleren – casinoet betaler bruttospilleafgift til staten. Spiller du på et casino uden dansk licens (fx med udenlandsk licens fra Malta eller Curaçao), er dine gevinster skattepligtige som personlig indkomst. Derudover mangler du forbrugerbeskyttelse og adgang til ROFUS (det danske selvudelukkelsesregister).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Spillerbeskyttelse:</strong> Alle danske licenserede casinoer er tilsluttet ROFUS, hvor du kan udelukke dig selv midlertidigt (24 timer, 1 måned, 3 måneder) eller permanent. Casinoerne er forpligtet til at tilbyde indbetalingsgrænser, tabsgrænser, sessionsgrænser og reality checks (påmindelser om spilletid). Disse værktøjer er obligatoriske – ikke valgfrie – og udgør en væsentlig del af Danmarks <Link to="/ansvarligt-spil" className={linkClass}>ansvarlige spil</Link>-ramme.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Licenserede casinoer skal desuden udføre KYC-verifikation (Know Your Customer) for at bekræfte din identitet og alder (minimum 18 år). Verifikationen omfatter typisk NemID/MitID-login eller upload af dokumentation. Processen kan virke besværlig, men den beskytter dig mod identitetstyveri og sikrer, at mindreårige ikke har adgang til spil.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 11 – MISFORSTÅELSER ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Almindelige Misforståelser om Roulette</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Roulette er omgivet af myter, der har overlevet i århundreder. Disse misforståelser koster spillere penge og fører til irrationelle beslutninger. At forstå dem er en del af at være en informeret spiller.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>"Rød er skyldig efter 10 sorte"</strong> – Den mest udbredte fejlslutning i gambling, kaldet gambler's fallacy. Hvert spin er uafhængigt. Kuglen og hjulet har ingen hukommelse. Sandsynligheden for rød er 18/37 efter 10 sorte, efter 100 sorte, og efter nul sorte. De elektroniske tavler, der viser de seneste resultater, eksisterer udelukkende for at friste spillere til at "følge" eller "modspille" trends – begge tilgange er matematisk meningsløse.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>"Visse tal er varme eller kolde"</strong> – Over korte perioder vil nogle tal naturligt komme hyppigere end andre – det er en statistisk forventning, ikke et bevis på bias. Med 37 mulige udfald og fx 100 spins vil standardafvigelsen skabe synlige "mønstre" i frekvensfordelingen. Over 100.000 spins konvergerer alle tal mod den forventede frekvens (1/37). "Hot" og "cold" tal er et produkt af tilfældig variation, ikke af hjulets egenskaber.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>"Man kan observere dealerens kast og forudsige resultatet"</strong> – Denne teori (kaldet "dealer signature" eller "visual ballistics") antager, at live-dealere kaster kuglen med konsistent kraft og timing, så man kan forudsige den omtrentlige landingszone. Moderne roulettehjul har anti-prediktion-funktioner: "ball deflectors" (små metalfremspring, der ændrer kuglens bane tilfældigt), varierende hjulhastighed og automatisk kugleskift. Selv hvis en dealer havde en perfekt konsistent kasteteknik, ville ball deflectors introducere tilstrækkelig tilfældighed til at gøre forudsigelse umulig i praksis.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>"Systemer kan slå roulette"</strong> – Ingen kombination af indsatsstørrelser kan ændre den matematiske forventede værdi. Martingale, Fibonacci, D'Alembert og alle andre progressive systemer omfordeler risiko – de eliminerer den ikke. En detaljeret matematisk analyse af hvert system finder du i strategi-guiderne nedenfor.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>"Inside bets har dårligere odds end outside bets"</strong> – House edge er identisk for alle væddemål i europæisk roulette: 2,70 %. Hvad der ændrer sig, er volatiliteten. En straight-up bet (35:1) har ekstrem høj varians, mens rød/sort (1:1) har lav varians. Over mange spins taber du den samme procentdel uanset bet-type. Valget mellem inside og outside handler om din risikoappetit, ikke om matematisk fordel.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 12 – HVEM PASSER ROULETTE TIL ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvem Passer Roulette Til?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Roulette er ikke for alle – og at forstå, om det passer til dig, er en del af at spille ansvarligt. Spillets egenskaber tiltrækker visse spillerprofiler mere end andre, og at matche dit spilvalg med din personlighed og økonomi er den bedste "strategi" du kan have.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Roulette passer til dig, hvis:</strong> Du nyder spænding og tilfældighed. Du foretrækker spil, der kræver minimal indlæring. Du er komfortabel med at betale for underholdning (ligesom en biografbillet). Du kan sætte et budget og overholde det. Du nyder den sociale dimension af live casino. Du vil have et spil med høj RTP (97,30 % europæisk) uden at skulle lære komplekse strategier (som i <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link>).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Roulette passer måske ikke til dig, hvis:</strong> Du leder efter strategisk kontrol over resultatet – her er blackjack bedre. Du har svært ved at stoppe, når du taber – roulettens hurtige tempo kan eskalere tab hurtigt. Du foretrækker lavere varians – <Link to="/casinospil/baccarat" className={linkClass}>baccarat</Link> (banker-bet) har lavere house edge og mere forudsigelige resultater. Du har et meget lille budget – med minimumsindsatser på 10–50 kr. i live roulette kan en bankroll på 500 kr. være opbrugt hurtigt.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Den vigtigste selvvurdering er ærlig: spiller du for underholdning, eller spiller du for at vinde penge? Roulette er designet til underholdning – casinoet har altid en matematisk fordel. Hvis din primære motivation er at generere indkomst, er roulette objektivt det forkerte valg. Hvis din motivation er at have det sjovt med en kontrolleret risiko, er roulette et fremragende valg – forudsat at du vælger den rigtige variant og sætter passende grænser.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 13 – TRIN FOR TRIN ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sådan Kommer Du i Gang – Trin for Trin</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hvis du aldrig har spillet roulette online før, kan de mange muligheder virke overvældende. Her er en struktureret guide til din første session, der sikrer, at du starter med de bedste forudsætninger.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Trin 1 – Vælg et licenseret casino.</strong> Tjek at casinoet har en aktiv dansk licens fra Spillemyndigheden. Det sikrer skattefrie gevinster, spillerbeskyttelse og adgang til ROFUS. Du kan verificere licensen på Spillemyndighedens hjemmeside. Vælg et casino med europæisk eller fransk roulette – undgå steder, der kun tilbyder amerikansk.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Trin 2 – Sæt dit budget.</strong> Beslut et beløb, du er villig til at tabe – og mener det. Et godt udgangspunkt er et beløb, du ville betale for en aftens underholdning (biografbillet + middag, typisk 300–1.000 kr.). Indstil en indbetalingsgrænse på casinoet, der matcher dit budget. Overvej også en tabsgrænse på 50 % af dit budget – stop-spil, når du når den.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Trin 3 – Vælg det rigtige spil.</strong> I casinoets lobby, find roulette-sektionen. Vælg europæisk roulette (37 felter, 2,70 % edge) eller – endnu bedre – fransk roulette med La Partage (1,35 % edge). Tjek spillets info-sektion for at bekræfte reglerne. Undgå "special" varianter med ekstra sidebets, medmindre du forstår deres house edge.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Trin 4 – Start med outside bets.</strong> For din første session, hold dig til lige-penge-væddemål (rød/sort, lige/ulige) eller dusinvis/kolonner. Disse giver hyppige gevinster, lav varians og den bedste mulighed for at lære spillets flow. Sæt din indsats til maks 2–5 % af din bankroll pr. spin (fx 20–50 kr. med 1.000 kr. bankroll). Når du er komfortabel med bordet, kan du eksperimentere med inside bets.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Trin 5 – Brug demo-mode først.</strong> De fleste online-casinoer tilbyder gratis RNG-roulette i demo-mode. Brug den til at lære bordlayoutet, forstå chip-placering og opleve spillets tempo – uden at risikere penge. Demo-mode bruger den samme RNG som real-money-spil, så resultatfordelingen er identisk.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Trin 6 – Stop planmæssigt.</strong> Sæt en timer på din telefon. Når din tids- eller tabsgrænse er nået, luk spillet. Den sværeste del af roulette er ikke at lære reglerne – det er at overholde dine egne grænser. Hvis du finder det svært at stoppe, er det et signal om at bruge de <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>-værktøjer, som alle danske casinoer tilbyder.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 14 – ROULETTE VARIANTER: DYBDEGÅENDE GUIDES ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Alle Roulette-Varianter: Dybdegående Guides</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Roulette er ikke ét spil – det er en familie af varianter med fundamentalt forskellige matematiske profiler. Valget af variant er den vigtigste beslutning du træffer, fordi det determinerer den house edge du betaler for hele din session. Nedenfor finder du vores komplet dækning af de tre primære hjulvarianter, hver med detaljeret matematik, simuleringer og bonus wagering EV-analyse.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="border-primary/30 hover:border-primary/60 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <Link to="/casinospil/roulette/europaeisk-roulette" className={linkClass}>Europæisk Roulette</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">37 felter · 2,70 % house edge · Standarden for informerede spillere</p>
                <p className="text-xs text-muted-foreground">Komplet guide med Risk of Ruin simulering, EV-analyse for danske bonusser og historisk kontekst fra Bad Homburg til Monte Carlo.</p>
              </CardContent>
            </Card>
            <Card className="border-primary/30 hover:border-primary/60 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <Link to="/casinospil/roulette/fransk-roulette" className={linkClass}>Fransk Roulette</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">37 felter · 1,35 % HE med La Partage · Det matematisk optimale valg</p>
                <p className="text-xs text-muted-foreground">La Partage-mekanik, En Prison-reglens impact på varians, progressive systems simulation og Live vs. RNG performance.</p>
              </CardContent>
            </Card>
            <Card className="border-destructive/30 hover:border-destructive/60 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <Link to="/casinospil/roulette/amerikansk-roulette" className={linkClass}>Amerikansk Roulette</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">38 felter · 5,26 % house edge · Dobbelt-nul hjulet der koster dobbelt</p>
                <p className="text-xs text-muted-foreground">Five Number Bet fælden, 10.000-spins Monte Carlo simulering, Surrender-reglen og psykologisk analyse af hjulvalg.</p>
              </CardContent>
            </Card>
          </div>

          <h3 className="mb-3 text-xl font-semibold">Indsatsstrategier: Matematik og Simuleringer</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Ingen indsatsstrategi kan overvinde house edge – men de påvirker din risikoprofil, session-dynamik og bankroll survival markant. Vores strategi-guides analyserer hvert system med Monte Carlo-simuleringer, Risk of Ruin-tabeller og EV-beregninger for dansk bonus wagering. Dyk direkte ned i et specifikt system:
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <Card className="hover:border-primary/40 transition-colors">
              <CardContent className="pt-6">
                <h4 className="font-bold mb-1">
                  <Link to="/casinospil/roulette/martingale-roulette" className={linkClass}>Martingale Strategi</Link>
                </h4>
                <p className="text-xs text-muted-foreground">Fordoblings-systemet: matematisk bevis for tabsgrænser, Monte Carlo-fallgruben (1913-analysen) og Lightning Roulette-advarsler.</p>
              </CardContent>
            </Card>
            <Card className="hover:border-primary/40 transition-colors">
              <CardContent className="pt-6">
                <h4 className="font-bold mb-1">
                  <Link to="/casinospil/roulette/fibonacci-roulette" className={linkClass}>Fibonacci Strategi</Link>
                </h4>
                <p className="text-xs text-muted-foreground">Det gyldne snit anvendt på roulette: sekvensmønstre, Golden Ratio (φ) analyse og psykologiske bias som Pattern Recognition.</p>
              </CardContent>
            </Card>
            <Card className="hover:border-primary/40 transition-colors">
              <CardContent className="pt-6">
                <h4 className="font-bold mb-1">
                  <Link to="/casinospil/roulette/dalembert-roulette" className={linkClass}>D'Alembert Strategi</Link>
                </h4>
                <p className="text-xs text-muted-foreground">Equilibrium-illusionen: Jean-Baptiste d'Alemberts teori, Gambler's Fallacy og tidsbaseret tabsanalyse (Live vs. RNG).</p>
              </CardContent>
            </Card>
            <Card className="hover:border-primary/40 transition-colors">
              <CardContent className="pt-6">
                <h4 className="font-bold mb-1">
                  <Link to="/casinospil/roulette/labouchere-roulette" className={linkClass}>Labouchère Strategi</Link>
                </h4>
                <p className="text-xs text-muted-foreground">Cancellation-systemet: sekvens-specifikke completion rates, inflationseffekten og tracking-krav i Live vs. Turbo RNG.</p>
              </CardContent>
            </Card>
            <Card className="hover:border-primary/40 transition-colors">
              <CardContent className="pt-6">
                <h4 className="font-bold mb-1">
                  <Link to="/casinospil/roulette/james-bond-roulette" className={linkClass}>James Bond Strategi</Link>
                </h4>
                <p className="text-xs text-muted-foreground">Ian Flemings 200-enhed system: Win Frequency Bias, Prospect Theory, Brand Halo-effekten og French Bond-varianten.</p>
              </CardContent>
            </Card>
            <Card className="hover:border-primary/40 transition-colors">
              <CardContent className="pt-6">
                <h4 className="font-bold mb-1">
                  <Link to="/ordbog/bankroll-management" className={linkClass}>Bankroll Management</Link>
                </h4>
                <p className="text-xs text-muted-foreground">Komplet guide til styring af dit spilbudget: session-grænser, stop-loss og optimal indsatsstørrelse.</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6 border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg">Strategi-Sammenligning: House Edge × Ruin-Risiko (1.000 spins, 100 kr.)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="py-3 px-3 text-left font-semibold">Strategi</th>
                      <th className="py-3 px-3 text-left font-semibold">Gns. tab (EU 2,70%)</th>
                      <th className="py-3 px-3 text-left font-semibold">Gns. tab (FR 1,35%)</th>
                      <th className="py-3 px-3 text-left font-semibold">Ruin-risiko (EU)</th>
                      <th className="py-3 px-3 text-left font-semibold">Varians-profil</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground">Flat Betting</td><td className="py-2 px-3">−2.700 kr.</td><td className="py-2 px-3">−1.350 kr.</td><td className="py-2 px-3 text-primary">6 %</td><td className="py-2 px-3">Lav</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground"><Link to="/casinospil/roulette/martingale-roulette" className={linkClass}>Martingale</Link></td><td className="py-2 px-3">−2.700 kr.</td><td className="py-2 px-3">−1.350 kr.</td><td className="py-2 px-3 text-destructive">24 %</td><td className="py-2 px-3">Ekstrem</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground"><Link to="/casinospil/roulette/fibonacci-roulette" className={linkClass}>Fibonacci</Link></td><td className="py-2 px-3">−2.700 kr.</td><td className="py-2 px-3">−1.350 kr.</td><td className="py-2 px-3">18 %</td><td className="py-2 px-3">Høj</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground"><Link to="/casinospil/roulette/dalembert-roulette" className={linkClass}>D'Alembert</Link></td><td className="py-2 px-3">−2.700 kr.</td><td className="py-2 px-3">−1.350 kr.</td><td className="py-2 px-3">14 %</td><td className="py-2 px-3">Medium</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground"><Link to="/casinospil/roulette/labouchere-roulette" className={linkClass}>Labouchère</Link></td><td className="py-2 px-3">−2.700 kr.</td><td className="py-2 px-3">−1.350 kr.</td><td className="py-2 px-3">20 %</td><td className="py-2 px-3">Høj</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 px-3 text-foreground"><Link to="/casinospil/roulette/james-bond-roulette" className={linkClass}>James Bond</Link></td><td className="py-2 px-3">−2.700 kr.</td><td className="py-2 px-3">−1.350 kr.</td><td className="py-2 px-3">16 %</td><td className="py-2 px-3">Medium-Høj</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Gennemsnitligt tab er identisk uanset strategi (determineret af house edge). Forskellen er ruin-risiko og session-dynamik. Flat betting er konsekvent den sikreste tilgang.</p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 15 – VIDERE LÆSNING ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Videre Læsning: Andre Casinospil og Bordspil</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Roulette er kun ét element i det bredere <Link to="/casinospil" className={linkClass}>casinospil</Link>-landskab. For at træffe det bedste valg for din spilleprofil bør du forstå, hvordan roulette positionerer sig relativt til andre klassiske bordspil – både i house edge, strategisk dybde og underholdningsværdi.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <Link to="/casinospil/blackjack" className={linkClass}>Blackjack</Link> er det eneste casinospil, hvor perfekt basisstrategi reducerer house edge til under 0,5 % – markant lavere end selv fransk roulettes 1,35 %. <Link to="/casinospil/baccarat" className={linkClass}>Baccarat</Link> tilbyder det simpleste bordspil med banker-bettets 1,06 % house edge. <Link to="/casinospil/craps" className={linkClass}>Craps</Link> er det mest sociale terningsspil med pass-line odds på blot 1,41 %. Og <Link to="/casinospil/game-shows" className={linkClass}>game shows</Link> som Lightning Roulette og Crazy Time fusionerer roulette-mekanik med underholdning.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Roulette forbliver et af de mest tilgængelige og visuelt engagerende casinospil – et spil, der belønner viden om regler og varianter, ikke med en edge over casinoet, men med en bedre, mere bevidst og mere underholdende spilleoplevelse. Og det er i sig selv en gevinst.
          </p>
        </section>

        <CasinospilMoneyLinks gameName="Roulette" currentPath="/casinospil/roulette" />
        <RelatedGuides currentPath="/casinospil/roulette" />
        <FAQSection faqs={rouletteFaqs} />
        <AuthorBio author="jonas" showCommunity={false} />
      </div>
      <StickyCtaBySlug slug="betinia" />
    </>
  );
};

export default RouletteGuide;
