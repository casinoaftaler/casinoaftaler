import { Link } from "react-router-dom";
import { ComparisonPageTemplate } from "./ComparisonPageTemplate";
import type { ComparisonCasino, ComparisonCategory } from "./ComparisonPageTemplate";
import heroImage from "@/assets/comparison-hero-danskespil-spilnu.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const casinoA: ComparisonCasino = {
  name: "Spilleautomaten",
  slug: "spilleautomaten",
  bonusTitle: "5-dages velkomstbonus",
  bonusAmount: "100% op til 1.000 kr.",
  wagering: "10x (d+b)",
  minDeposit: "100 kr.",
  payoutTime: "Samme dag–24 timer",
  gameCount: "2.000+ slots",
  license: "Dansk licens",
  mobileFriendly: true,
  liveCasino: false,
  pros: [
    "Slots-specialist med klart produktfokus",
    "Præmieshop med kontante belønninger",
    "5-dages bonusmodel med lav 10x omsætning",
    "Hurtige MobilePay-udbetalinger",
  ],
  cons: [
    "Ingen egentlig sportssektion",
    "Mindre bredde end generalist-casinoer",
    "Mere nichepræget end allround-platforme",
  ],
};

const casinoB: ComparisonCasino = {
  name: "SpilDanskNu",
  slug: "spildansknu",
  bonusTitle: "5-dages velkomstbonus",
  bonusAmount: "100% op til 1.000 kr.",
  wagering: "10x (d+b)",
  minDeposit: "100 kr.",
  payoutTime: "Samme dag–3 hverdage",
  gameCount: "2.500+ spil",
  license: "Dansk licens",
  mobileFriendly: true,
  liveCasino: true,
  pros: [
    "Dansk casino med bredere samlet spiludvalg",
    "Live casino oven på det klassiske slots-katalog",
    "Samme lave 10x omsætningskrav som søstersiden",
    "MitID-flow og dansk support",
  ],
  cons: [
    "Mindre skarpt differentieret end Spilleautomaten",
    "Ikke samme slots-specialisering",
    "Udbetalinger er ikke lige så konsekvent hurtige",
  ],
};

const categories: ComparisonCategory[] = [
  {
    label: "Velkomstbonus",
    casinoA: { score: 5, detail: "5-dages model, 10x (d+b)" },
    casinoB: { score: 5, detail: "5-dages model, 10x (d+b)" },
  },
  {
    label: "Slots-fokus",
    casinoA: { score: 5, detail: "Rendyrket slots-positionering" },
    casinoB: { score: 4, detail: "Bredt casino med mere allround-fokus" },
  },
  {
    label: "Samlet spiludvalg",
    casinoA: { score: 4, detail: "2.000+ titler med stærk slot-dybde" },
    casinoB: { score: 5, detail: "2.500+ spil plus live casino" },
  },
  {
    label: "Udbetalingshastighed",
    casinoA: { score: 5, detail: "MobilePay typisk hurtigst i testen" },
    casinoB: { score: 4, detail: "Samme dag til få hverdage" },
  },
  {
    label: "Loyalitetsværdi",
    casinoA: { score: 5, detail: "Præmieshop er central del af produktet" },
    casinoB: { score: 4, detail: "Stærk værdi, men mindre profilbærende" },
  },
  {
    label: "Live casino",
    casinoA: { score: 2, detail: "Ikke kerneprodukt" },
    casinoB: { score: 4, detail: "Markant bredere live-tilbud" },
  },
  {
    label: "Mobiloplevelse",
    casinoA: { score: 4, detail: "Hurtig og enkel mobilnavigation" },
    casinoB: { score: 4, detail: "Stabil mobiloplevelse med flere kategorier" },
  },
  {
    label: "Brand-positionering",
    casinoA: { score: 5, detail: "Tydelig niche som slots-specialist" },
    casinoB: { score: 4, detail: "Bredt dansk casino med høj relevans" },
  },
];

const faqs = [
  {
    question: "Hvad er den største forskel på Spilleautomaten og SpilDanskNu?",
    answer: "Den største forskel er produktfokus. Spilleautomaten er bygget som en rendyrket slots-specialist med Præmieshop og hurtig, enkel navigation, mens SpilDanskNu er bredere og mere allround med flere spil i kataloget og et tydeligere live casino-lag oven på den samme lave bonusøkonomi.",
  },
  {
    question: "Har Spilleautomaten og SpilDanskNu samme velkomstbonus?",
    answer: (
      <>
        Ja, på hovedlinjen ligner de hinanden meget: begge arbejder med en 5-dages bonusmodel på 100 % op til 1.000 kr. og kun 10x <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>. Forskellen ligger mere i produktoplevelsen efter bonusen end i selve bonusøkonomien.
      </>
    ),
  },
  {
    question: "Hvilket casino er bedst til rene slotsspillere?",
    answer: "Spilleautomaten er det stærkeste valg til rene slotsspillere. Hele brandet er bygget omkring slots, hurtige beslutninger, loyalitetsværdi og et mere fokuseret katalog uden unødvendig støj fra andre vertikaler.",
  },
  {
    question: "Hvilket casino har det bredeste udvalg – Spilleautomaten eller SpilDanskNu?",
    answer: "SpilDanskNu er bredest på totalpakken med flere spil samlet set og et mere tydeligt live casino-lag. Spilleautomaten er til gengæld mere koncentreret omkring de vigtigste slots og opleves derfor skarpere, hvis du ved præcis hvad du leder efter.",
  },
  {
    question: "Er begge casinoer danske og licenserede?",
    answer: (
      <>
        Ja. Begge drives på det danske marked og opererer med dansk licens fra <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link>. Det betyder MitID, ROFUS-integration og skattefrie gevinster for danske spillere.
      </>
    ),
  },
  {
    question: "Hvem bør vælge SpilDanskNu frem for Spilleautomaten?",
    answer: "Du bør vælge SpilDanskNu, hvis du vil have et bredere casino med mere variation, flere spil samlet set og et mere klassisk allround-casino-setup frem for et rendyrket slots-brand.",
  },
];

export default function SpilleautomatenVsSpilDanskNu() {
  return (
    <ComparisonPageTemplate
      metaTitle="Spilleautomaten vs SpilDanskNu 2026"
      metaDescription="Sammenligning af Spilleautomaten og SpilDanskNu. Se forskellen på bonus, slots-fokus, udbetalinger, live casino og samlet værdi for danske spillere."
      h1="Spilleautomaten vs SpilDanskNu – hvilken søsterside er bedst?"
      intro="To danske casinoer fra samme operatør, samme bonusfilosofi og samme lave 10x omsætningskrav – men med to meget forskellige produktstrategier. Her er den komplette duel mellem slots-specialisten og den bredere allround-platform."
      path="/casino-anmeldelser/spilleautomaten-vs-spildansknu"
      datePublished="2026-03-16"
      author="jonas"
      heroImage={heroImage}
      heroAlt="Sammenligning af Spilleautomaten og SpilDanskNu for danske casinospillere"
      casinoA={casinoA}
      casinoB={casinoB}
      categories={categories}
      verdict="Spilleautomaten vinder snævert for den dedikerede slotsspiller, fordi produktet er mere fokuseret, payout-flowet føles skarpere, og Præmieshoppen er tættere integreret i oplevelsen. SpilDanskNu er dog det bedre valg, hvis du vil have et bredere casino med flere spil samlet set og mere variation uden at opgive den lave bonusøkonomi."
      verdictWinner="A"
      faqs={faqs}
      ctaSlug="spilleautomaten"
      readTime="24 min"
    >
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">To sider af samme danske casinofilosofi</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Sammenligningen mellem <Link to="/casino-anmeldelser/spilleautomaten" className={linkClass}>Spilleautomaten</Link> og <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link> er usædvanligt interessant, fordi forskellen ikke handler om licens, tillid eller aggressiv bonuskrig. Begge brands kommer fra samme danske miljø og bygger på den samme kernelogik: overskuelige bonusvilkår, dansk brugeroplevelse, MitID og et produkt der skal fungere uden unødig friktion.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Derfor bliver det i praksis en duel om positionering. Spilleautomaten forsøger at være det mest målrettede valg til spilleren, der primært vil spille slots og have høj driftssikkerhed i hverdagen. SpilDanskNu søger i højere grad at være det brede danske casino, hvor du får lidt mere katalog, lidt mere variation og en mere klassisk allround-oplevelse.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Bonus og omsætningskrav – næsten identisk på papiret</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          På bonusfronten er forskellen mindre end mange forventer. Begge sider bygger på en 5-dages model med 100 % bonus op til 1.000 kr. og kun 10x <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>. Det placerer dem i den mest spillervenlige ende af det danske marked, hvor lav friktion og høj gennemsigtighed betyder mere end oppustede bonusmaksimer.
        </p>
        <div className="rounded-lg border border-border bg-muted/30 p-5">
          <p className="mb-2 font-semibold">Praktisk konsekvens for spilleren</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Når bonusøkonomien er næsten identisk, bliver oplevelsen efter bonusen langt vigtigere end selve kampagneteksten. Derfor bør du i højere grad vælge ud fra spilprofil, navigation, loyalitetsværdi og hvor hurtigt du kan komme fra indbetaling til spil og tilbage til udbetaling.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Slots-specialist mod allround-casino</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Spilleautomaten er den mest rendyrkede løsning. Brandet er bygget til spilleren, der vil hurtigt ind, finde en spilleautomat og komme videre uden at blive distraheret af for mange sekundære sektioner. Det gør oplevelsen mere fokuseret og mere konsekvent – især for brugere der vender tilbage ofte.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          SpilDanskNu tilbyder derimod mere bredde. Flere spil samlet set og et tydeligere <Link to="/live-casino" className={linkClass}>live casino</Link>-lag gør siden mere alsidig, hvis du ikke kun spiller slots. Til gengæld bliver brandets profil en smule mindre skarp, fordi det skal være mere for flere typer spillere på én gang.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Hvis du normalt sammenligner casinoer ud fra antal spil alene, vil SpilDanskNu se stærkest ud. Hvis du vægter fokus, tempo og hverdagsbrug højere end ren bredde, har Spilleautomaten en reel fordel.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Hvem skal vælge hvad?</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Vælg Spilleautomaten, hvis du er en tilbagevendende slotsspiller, der vil have et mere skarpt miljø, hurtige rutiner og et produkt som tydeligt er bygget omkring den type adfærd. Vælg SpilDanskNu, hvis du gerne vil have samme lave vilkår men i en lidt bredere casino-ramme med mere variation i selve kataloget.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          For begge gælder, at de hører til blandt de mest interessante danske valg, netop fordi de ikke prøver at vinde med kunstigt høje bonusbeløb. De prøver at vinde på drift, klarhed og friktion – og det er et langt sundere signal for seriøse spillere.
        </p>
      </section>
    </ComparisonPageTemplate>
  );
}
