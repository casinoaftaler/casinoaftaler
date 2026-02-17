import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema } from "@/lib/seo";
import { AuthorBio } from "@/components/AuthorBio";
import { Separator } from "@/components/ui/separator";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { User, CalendarDays, BookOpen, Target, ShieldCheck, BarChart3, Sparkles, Trophy, Zap, Layers, Dices } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import crapsHero from "@/assets/heroes/craps-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const crapsFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er craps, og hvordan spiller man det online?",
    answer: (
      <>
        Craps er et terningspil, hvor spillere satser på udfaldet af to seks-sidede terningers kast. Online craps simulerer det fysiske spil med en Random Number Generator (RNG), der sikrer tilfældige resultater. Du vælger dit væddemål, klikker for at kaste terningerne og ser resultatet. Den mest grundlæggende indsats er "Pass Line" – du vinder, hvis det første kast (come-out roll) er 7 eller 11, og taber på 2, 3 eller 12. Ethvert andet tal (4, 5, 6, 8, 9, 10) etablerer et "point", og du skal ramme dette tal igen før en 7 for at vinde. Online craps er tilgængeligt på de fleste <Link to="/top-10-casino-online" className={linkClass}>danske casinoer</Link>.
      </>
    ),
  },
  {
    question: "Hvad er forskellen på Pass Line og Don't Pass i craps?",
    answer:
      "Pass Line er det mest populære væddemål – du satser på, at kasteren vinder (7/11 på come-out, eller ramme pointet). House edge: 1,41 %. Don't Pass er det modsatte: du satser mod kasteren (2/3 på come-out vinder, 12 er push, 7 før pointet). House edge: 1,36 %. Don't Pass har marginalt bedre odds men er kulturelt upopulært i fysiske casinoer ('wrong bettor'). Online er der ingen social stigma, og Don't Pass er faktisk det matematisk overlegne væddemål. Begge kan forstærkes med Odds Bets – ekstra indsatser med 0 % house edge – som gør craps til et af de mest spillervenlige casinospil overhovedet.",
  },
  {
    question: "Hvad er Odds Bets, og hvorfor er de specielle?",
    answer:
      "Odds Bets er det eneste væddemål i et casino med en house edge på præcis 0 % – casinoet har ingen fordel overhovedet. Du kan placere en Odds Bet bag din Pass Line-indsats efter et point er etableret. Udbetalingen er baseret på de sande matematiske odds: 2:1 for 4/10, 3:2 for 5/9, og 6:5 for 6/8. De fleste casinoer tillader 2x–5x din originale indsats som Odds Bet, og nogle tilbyder 10x, 20x eller endda 100x odds. Jo større Odds Bet i forhold til din Pass Line-indsats, jo lavere er din samlede house edge. Med 10x odds reduceres den til ca. 0,18 %. Odds Bets er den primære grund til, at craps anses for et af de mest spillervenlige casinospil.",
  },
  {
    question: "Hvilke craps-væddemål bør man undgå?",
    answer: (
      <>
        De mest fordelagtige væddemål i craps er Pass/Don't Pass (1,41 %/1,36 % house edge) og Come/Don't Come (samme odds). Med Odds Bets reduceres edge yderligere. Undgå derimod alle "proposition bets" i midten af bordet: Any 7 (16,67 % house edge), Any Craps (11,11 %), Hard 4/10 (11,11 %), Hard 6/8 (9,09 %), Yo (11) med 11,11 %, og Big 6/8 (9,09 %). Disse væddemål har attraktive udbetalinger men forfærdelige odds. Generelt gælder: jo højere udbetalingen lyder, jo værre er oddsen. Hold dig til Pass Line + Odds Bets for den bedste matematiske position i craps.
      </>
    ),
  },
  {
    question: "Kan man spille live craps online?",
    answer: (
      <>
        Ja, <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> tilbyder live craps med rigtige terninger, et fysisk bord og en professionel dealer – alt streames i HD. Live craps online giver den autentiske casinofornemmelse uden at du behøver at forstå alle de sociale konventioner ved et fysisk crapsbord. Du kan satse i dit eget tempo, og interfacet forklarer de tilgængelige væddemål. Indsatsgrænser varierer typisk fra 5 kr. til 25.000 kr. Det er den ideelle måde at opleve craps, hvis du er nybegynder og gerne vil lære spillet uden pres fra andre spillere.
      </>
    ),
  },
  {
    question: "Er craps bedre end roulette og blackjack odds-mæssigt?",
    answer: (
      <>
        Det afhænger af dine væddemål. Craps' Pass Line (1,41 %) har bedre odds end europæisk <Link to="/casinospil/roulette" className={linkClass}>roulette</Link> (2,7 %) men er lidt dårligere end optimal <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link> (0,4–0,5 %). Craps' unikke styrke er Odds Bets med 0 % house edge, som ikke findes i andre spil. Med maksimale odds kan craps' samlede house edge falde til under 0,2 % – bedre end næsten alle blackjack-varianter. Proposition bets har dog forfærdelige odds (op til 16,67 %). Craps er dermed det mest fleksible spil: det kan være både et af de bedste og de værste spil i casinoet, afhængigt af dine valg.
      </>
    ),
  },
  {
    question: "Hvad er craps-etikette, og gælder det online?",
    answer:
      "I fysiske casinoer har craps strenge sociale regler: ræk aldrig hånden ind over bordet under et kast, sig aldrig tallet 7 (brug 'big red' i stedet), og kast terningerne med én hånd så de rammer bagvæggen. Online gælder ingen af disse konventioner – du spiller i dit eget tempo uden social pression. Det gør online craps ideelt for nybegyndere, der vil lære spillet uden angsten for at bryde uskrevne regler. I live craps kan du interagere med dealeren via chat, men der er ingen forventning om at følge fysisk casino-etikette. Det vigtigste er at forstå dine væddemål og spille ansvarligt.",
  },
];

const CrapsGuide = () => {
  const faqJsonLd = buildFaqSchema(crapsFaqs);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Forside", item: "https://casinoaftaler.dk/" },
      { "@type": "ListItem", position: 2, name: "Casinospil", item: "https://casinoaftaler.dk/casinospil" },
      { "@type": "ListItem", position: 3, name: "Craps", item: "https://casinoaftaler.dk/casinospil/craps" },
    ],
  };

  return (
    <>
      <SEO
        title="Craps Regler 2026 – Komplet Guide til Online Craps"
        description="Lær craps regler, væddemålstyper, odds bets og strategi. Guide til Pass Line, Don't Pass og de bedste craps-væddemål på danske casinoer."
        jsonLd={[faqJsonLd, breadcrumbJsonLd]}
      />

      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))" }}>
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4"><Sparkles className="mr-1.5 h-3.5 w-3.5" /> Opdateret Februar 2026</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Craps Regler 2026</h1>
            <p className="text-lg text-white/80">Guide til terningspil, odds bets og strategi – den komplette craps-guide.</p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="15-02-2026" readTime="13 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={crapsHero} alt="Craps-bord med terninger i luften" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Craps – Det Mest Energiske Casinospil</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Craps er terningspillet, der definerer casinoatmosfæren – råb, jubel og nervøs spænding omkring et stort grønt bord. Spillet har rødder i det engelske terningspil "Hazard" fra korstogsæraen og blev videreudviklet i New Orleans i 1800-tallet af Bernard de Mandeville. I dag er craps en fast bestanddel af ethvert seriøst casino, og med online teknologi kan du opleve spændingen fra din egen stue.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Craps kan virke overvældende for nybegyndere – bordet er fyldt med markeringer for dusinvis af væddemål, og handlingen bevæger sig hurtigt. Men kernen er overraskende simpel: to terninger kastes, og du satser på udfaldet. De mest grundlæggende væddemål (Pass Line og Don't Pass) har nogle af de laveste house edges i hele casinoet, og med Odds Bets kan du reducere casinoets fordel til næsten nul.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Online craps eliminerer kompleksiteten ved det fysiske bord. Interfacet guider dig gennem væddemålene, og du kan spille i dit eget tempo uden pres fra andre spillere. Både RNG-baseret craps og live craps (med rigtige terninger og dealere) er tilgængelige på danske licenserede casinoer. Denne guide giver dig alt, du behøver for at forstå og mestre craps.
          </p>
        </section>

        <InlineCasinoCards title="Bedste Casinoer til Craps" count={4} />

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Spillets Gang – Come-Out Roll og Point</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En craps-runde starter med "come-out roll" – det første kast. Resultatet af dette kast bestemmer, hvad der sker næste gang. Hvis terningerne viser 7 eller 11, vinder Pass Line-spillere med det samme ("natural"). Viser de 2, 3 eller 12, taber Pass Line-spillere ("craps"). Ethvert andet tal (4, 5, 6, 8, 9, 10) etablerer et "point" – dette tal markeres på bordet.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Når et point er etableret, fortsætter kastene, indtil en af to ting sker: kasteren rammer pointet igen (Pass Line vinder, udbetaling 1:1) eller kaster en 7 ("seven out" – Pass Line taber). Alle andre tal er irrelevante for Pass Line-væddemålet under point-fasen, men de påvirker Come, Place og andre væddemål. Denne to-fase-struktur er unik for craps og skaber spillets karakteristiske rytme.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Sandsynligheden for hvert terningeresultat er præcist beregnet: 7 er det mest sandsynlige udfald (6 kombinationer ud af 36), efterfulgt af 6 og 8 (5 kombinationer hver), 5 og 9 (4 hver), 4 og 10 (3 hver), 3 og 11 (2 hver), og 2 og 12 (1 kombination hver). Denne fordeling er fundamentet for alle odds-beregninger i craps.
          </p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Væddemålstyper i Craps</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Craps tilbyder over 40 forskellige væddemål, men kun nogle få er matematisk fordelagtige. At forstå forskellen er afgørende for at spille optimalt.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><ShieldCheck className="h-5 w-5 text-primary" />Pass Line</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">House edge: 1,41 %. Vinder på 7/11 come-out, taber på 2/3/12. Point skal rammes før 7. Det mest fundamentale og anbefalede væddemål.</p></CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Target className="h-5 w-5 text-primary" />Don't Pass</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">House edge: 1,36 %. Det modsatte af Pass Line. Vinder på 2/3 come-out (12 er push), og vinder hvis 7 kastes før pointet.</p></CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Sparkles className="h-5 w-5 text-primary" />Odds Bets</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">House edge: 0 %! Placeres bag Pass/Don't Pass efter point. Udbetaler til sande odds. Craps' hemmelige våben.</p></CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Dices className="h-5 w-5 text-primary" />Come / Don't Come</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Fungerer identisk med Pass/Don't Pass men kan placeres efter come-out. Etablerer et personligt point. Samme house edge.</p></CardContent>
            </Card>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Place Bets</strong> lader dig satse direkte på specifikke numre (4, 5, 6, 8, 9, 10) uden at gå gennem come-out processen. House edge varierer: 6 og 8 har 1,52 %, 5 og 9 har 4 %, og 4 og 10 har 6,67 %. Place 6 og Place 8 er acceptable væddemål; resten bør undgås.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Proposition Bets</strong> (midterste del af bordet) inkluderer væddemål som Any 7 (16,67 % house edge), Any Craps (11,11 %), Hardways (9,09–11,11 %), Yo/11 (11,11 %), og Horn (12,5 %). Disse væddemål har de værste odds i craps og bør undgås af seriøse spillere. De tiltrækker med høje udbetalinger (op til 30:1) men har forfærdelig forventet værdi.
          </p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Craps-Strategi for Begyndere</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den optimale craps-strategi er overraskende enkel: satse Pass Line (eller Don't Pass) og maksimere dine Odds Bets. Denne to-trins-tilgang giver dig den lavest mulige house edge og er let at huske, selv for nybegyndere.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Trin 1:</strong> Placer et minimum Pass Line-væddemål. <strong>Trin 2:</strong> Når et point er etableret, placer det maksimalt tilladte Odds Bet bag din Pass Line. Odds Bets har 0 % house edge og kompenserer dermed den 1,41 % edge på Pass Line. Med 2x odds reduceres den samlede edge til 0,85 %. Med 5x odds: 0,33 %. Med 10x odds: 0,18 %. Jo større proportion af din indsats, der er i Odds Bets, jo tættere kommer du på et "fair" spil.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For bankroll management i craps anbefaler vi minimum 30 gange din Pass Line-indsats plus den planlagte Odds Bet. Eksempel: med 50 kr. Pass Line og 3x Odds (150 kr.) = 200 kr. pr. runde → bankroll bør være mindst 6.000 kr. Sæt altid en tabsgrænse og vindergrænse, og hold dig til dem. Craps kan være volatilt, og <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link> er afgørende for at bevare spillets underholdningsværdi.
          </p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Online vs. Live Craps</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            RNG-baseret online craps er ideelt for nybegyndere: du spiller i dit eget tempo, interfacet forklarer væddemålene, og der er ingen social pression. Minimumsindsat er typisk 5–10 kr., og du kan eksperimentere med forskellige strategier uden stress.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Live craps fra <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> bringer den autentiske casinooplevelse online med rigtige terninger, et fysisk bord og en professionel dealer. Fordelen er autenticitet og den sociale dimension (du kan chatte med dealeren og andre spillere). Ulempen er langsommere spilletempo og typisk højere minimumsindsatser. Begge formater bruger europæiske standardregler med identiske odds.
          </p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Craps-Matematikken – House Edge Oversigt</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Her er en komplet oversigt over house edge for de vigtigste craps-væddemål, så du kan træffe informerede beslutninger:
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Bedste væddemål:</strong> Don't Pass/Don't Come: 1,36 %. Pass Line/Come: 1,41 %. Odds Bets: 0,00 %. Place 6/8: 1,52 %. <strong>Acceptable væddemål:</strong> Field (med 3x for 12): 2,78 %. Place 5/9: 4,00 %. <strong>Dårlige væddemål:</strong> Place 4/10: 6,67 %. Hardway 6/8: 9,09 %. Hardway 4/10: 11,11 %. Any Craps: 11,11 %. <strong>Værste væddemål:</strong> Any 7: 16,67 %. 
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Sammenlignet med andre casinospil tilbyder craps (med korrekte væddemål) en af de bedste positioner for spilleren. Pass Line + maksimale Odds er bedre end <Link to="/casinospil/roulette" className={linkClass}>europæisk roulette</Link> (2,7 %) og sammenligneligt med optimal <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link> (0,4–0,5 %). Nøglen er at holde sig til de gode væddemål og ignorere de farverige men dårlige proposition bets i midten af bordet.
          </p>
        </section>

        <Separator className="my-10" />

        <RelatedGuides currentPath="/casinospil/craps" />

        <FAQSection faqs={crapsFaqs} />

        <AuthorBio author="jonas" showCommunity={false} />
      </div>
    </>
  );
};

export default CrapsGuide;
