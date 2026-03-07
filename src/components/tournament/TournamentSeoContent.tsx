import { Link } from "react-router-dom";
import { Gamepad2, Trophy, BarChart3, Gift } from "lucide-react";
import { YoutubeEmbed } from "@/components/YoutubeEmbed";
import { VideoContextBox } from "@/components/VideoContextBox";

const steps = [
  {
    icon: Gamepad2,
    step: 1,
    heading: "Opret en konto & spil",
    description: (
      <>
        For at deltage i vores månedlige turneringer skal du oprette en gratis konto på{" "}
        <Link to="/community" className="text-primary hover:underline">
          community-siden
        </Link>
        . Herefter kan du spille vores eksklusive{" "}
        <Link to="/community/slots/fedesvin-bonanza" className="text-primary hover:underline">
          community spilleautomater
        </Link>{" "}
        — helt uden rigtige penge. Du deltager automatisk i turneringen, så snart du starter dit første spin.
      </>
    ),
  },
  {
    icon: BarChart3,
    step: 2,
    heading: "Tre kategorier — tre vindere",
    description: (
      <>
        Hver måned kåres vindere i tre kategorier: <strong>Flest Point</strong> (samlet antal point),{" "}
        <strong>Højeste X</strong> (største multiplikator) og <strong>Største Gevinst</strong> (højeste
        enkeltgevinst). Det betyder, at du har tre forskellige chancer for at vinde — uanset om du
        foretrækker volumen eller high-risk spins.
      </>
    ),
  },
  {
    icon: Trophy,
    step: 3,
    heading: "Klatr op på leaderboardet",
    description: (
      <>
        Dit bedste resultat i hver kategori registreres automatisk og opdateres i realtid på{" "}
        <Link to="/community/turneringer" className="text-primary hover:underline">
          leaderboardet
        </Link>
        . Du kan følge din placering, søge efter andre spillere og se, hvor tæt du er på top 3.
        Turneringen nulstilles den 1. i hver måned, så alle starter fra scratch.
      </>
    ),
  },
  {
    icon: Gift,
    step: 4,
    heading: "Vind præmier hver måned",
    description: (
      <>
        De tre bedste spillere i hver kategori vinder præmier: <strong>500 kr</strong> for 1. pladsen,{" "}
        <strong>300 kr</strong> for 2. pladsen og <strong>200 kr</strong> for 3. pladsen. Vinderne
        annonceres automatisk, og tidligere vindere kan ses i{" "}
        <span className="text-primary">turneringsarkivet</span>. Det koster intet at deltage —
        kun dit engagement tæller.
      </>
    ),
  },
];

export function TournamentSeoContent() {
  return (
    <div className="space-y-8">
      {/* 4-step guide */}
      <section className="space-y-5">
        <h2 className="text-lg font-bold text-foreground">
          Sådan deltager du i vores månedlige turneringer
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {steps.map((s) => (
            <div
              key={s.step}
              className="group rounded-xl border border-border/50 bg-card p-5 space-y-3 cursor-default transition-all duration-200 hover:border-primary/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5"
              style={{
                background: 'linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--card) / 0.7) 100%)',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm">
                  {s.step}
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                    Trin {s.step}
                  </span>
                  <h3 className="text-sm font-semibold text-foreground leading-tight">
                    {s.heading}
                  </h3>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Video guide */}
      <div className="space-y-3">
        <YoutubeEmbed
          videoId="5OBGaiJDHVM"
          title="Guide: Sådan fungerer vores turneringer"
          description="Jonas forklarer credit-systemet, turneringskategorierne og præmiestrukturen."
          uploadDate="2026-03-07"
          duration="PT5M"
        />
        <VideoContextBox heading="Jonas forklarer turneringerne trin for trin">
          I denne video gennemgår Jonas hvordan vores{" "}
          <Link to="/community/turneringer" className="text-primary hover:underline">månedlige turneringer</Link>{" "}
          fungerer — herunder credit-systemet, de tre turneringskategorier og hvordan præmierne fordeles.
          Du lærer hvordan du får dine daglige credits, og hvordan dine spins automatisk tæller med i{" "}
          <Link to="/community/slots" className="text-primary hover:underline">community-spillehallen</Link>.
        </VideoContextBox>
      </div>

      {/* Rules & tournament structure – card style */}
      <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground">
          Turneringsregler & præmiestruktur
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Vores månedlige slot-turneringer er designet til at give alle en fair chance for at vinde. I modsætning til{" "}
            <Link to="/nye-casinoer" className="text-primary hover:underline">
              nye online casinoer
            </Link>
            , hvor turneringer ofte kræver et indskud, er vores turneringer 100 % gratis og risikofrie.
          </p>
          <p>
            Du får <strong className="text-foreground">2.000 virtuelle credits dagligt</strong>, som deles på tværs af alle tre spilleautomater. Det betyder, at du selv vælger, hvordan du fordeler dine credits — fokusér på én turnering eller spred dem ud. Credits nulstilles ved midnat dansk tid,
            så du kan vende tilbage hver dag og forbedre din placering. Dit bedste resultat i løbet af måneden tæller — ikke det seneste.
          </p>
          <p>
            Turneringen opdeles i tre uafhængige kategorier, så forskellige spilstile belønnes:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong className="text-foreground">Fedesvin Bonanza – Flest Point:</strong> Belønner konsistente spillere, der akkumulerer flest samlede point over måneden — inspireret af tumble-mekanikken fra{" "}
              <Link to="/casinospil/spillemaskiner/sweet-bonanza" className="text-primary hover:underline">Sweet Bonanza</Link>.
            </li>
            <li>
              <strong className="text-foreground">Book of Fedesvin – Højeste X:</strong> Går efter den single biggest multiplikator — perfekt til high-risk spillere, der jager store udbetalinger med expanding wilds som i{" "}
              <Link to="/casinospil/spillemaskiner/book-of-dead" className="text-primary hover:underline">Book of Dead</Link>.
            </li>
            <li>
              <strong className="text-foreground">Rise of Fedesvin – Største Gevinst:</strong> Belønner den højeste enkeltgevinst i credits — inspireret af{" "}
              <Link to="/casinospil/spillemaskiner/legacy-of-dead" className="text-primary hover:underline">Legacy of Dead</Link> med en blanding af held og timing.
            </li>
          </ul>
          <p>
            Præmierne for top 3 i hver kategori er: <strong className="text-foreground">500 kr</strong> (1. plads), <strong className="text-foreground">300 kr</strong> (2. plads) og <strong className="text-foreground">200 kr</strong> (3. plads).
            Præmierne udbetales kontant til vinderne.
          </p>
        </div>
      </section>

      {/* Strategy section – card style */}
      <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground">
          Strategitips til turneringerne
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Selvom vores spilleautomater er baseret på tilfældighed (ligesom{" "}
            <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">
              rigtige spillemaskiner
            </Link>
            ), kan du optimere dine chancer med en bevidst tilgang:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong className="text-foreground">Spred dine credits:</strong> Med 2.000 daglige credits fordelt på tværs af alle maskiner kan du selv prioritere. Mindre bets giver flere spins og dermed flere chancer for at triggere bonusrunder.
            </li>
            <li>
              <strong className="text-foreground">Fokusér på din stærkeste kategori:</strong> Hvis du jager "Højeste X", bør du prioritere Book of Fedesvin, hvor bonus-mekanikken favoriserer store multiplikatorer.
            </li>
            <li>
              <strong className="text-foreground">Kom tilbage dagligt:</strong> Med 2.000 nye credits hver dag kan du fokusere på de turneringer, der betyder mest for dig. Jo flere dage du spiller, jo bedre er dine odds.
            </li>
            <li>
              <strong className="text-foreground">Forstå volatilitet:</strong> Hver maskine har unik volatilitet. Fedesvin Bonanza har tumble-mekanik for jævne gevinster (som{" "}
              <Link to="/casinospil/spillemaskiner/sweet-bonanza" className="text-primary hover:underline">
                Sweet Bonanza
              </Link>
              ), mens Book of Fedesvin har expanding wilds for sjældne, men store udbetalinger — ligesom{" "}
              <Link to="/casinospil/spillemaskiner/book-of-dead" className="text-primary hover:underline">
                Book of Dead
              </Link>, og Rise of Fedesvin er inspireret af{" "}
              <Link to="/casinospil/spillemaskiner/legacy-of-dead" className="text-primary hover:underline">
                Legacy of Dead
              </Link>.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

/**
 * Tournament FAQ items for the FAQSection component and JSON-LD schema.
 */
export const tournamentFaqs = [
  {
    question: "Koster det penge at deltage i turneringerne?",
    answer: "Nej, alle turneringer er 100 % gratis. Du spiller med virtuelle credits – ikke rigtige penge. Du får 2.000 credits dagligt, som deles på tværs af alle tre maskiner, og de nulstilles automatisk ved midnat dansk tid.",
  },
  {
    question: "Hvad kan jeg vinde?",
    answer: "Hver måned uddeles præmier til top 3 i tre kategorier: 500 kr for 1. pladsen, 300 kr for 2. pladsen og 200 kr for 3. pladsen. Præmierne udbetales kontant til vinderne.",
  },
  {
    question: "Hvor mange spilleautomater kan jeg spille?",
    answer: "Der er tre eksklusive community-maskiner: Fedesvin Bonanza (Flest Point), Book of Fedesvin (Højeste X) og Rise of Fedesvin (Største Gevinst). Hver maskine har sin egen turnering, men alle deler den samme daglige pulje på 2.000 credits — så du selv bestemmer, hvordan du fordeler dem.",
  },
  {
    question: "Hvornår nulstilles turneringen?",
    answer: "Turneringen nulstilles automatisk den 1. i hver måned kl. 00:00 dansk tid. Alle spillere starter fra scratch, og vinderne fra den foregående måned arkiveres.",
  },
  {
    question: "Kan jeg deltage på mobil?",
    answer: "Ja, alle spilleautomater og turneringer er fuldt optimeret til mobil. Du kan spille og følge din placering direkte fra din smartphone.",
  },
  {
    question: "Hvordan adskiller dette sig fra rigtige casino-turneringer?",
    answer: "Vores turneringer bruger virtuelle credits – ikke rigtige penge – og er derfor fuldstændig risikofrie. Hos rigtige onlinecasinoer kræver turneringer typisk et indskud.",
  },
  {
    question: "Er der krav om wagering eller omsætning?",
    answer: "Nej, der er ingen omsætningskrav i vores community-turneringer. Præmierne udbetales kontant.",
  },
];

/**
 * FAQ structured data for the tournament page.
 * Should be passed to <SEO jsonLd={...} />.
 */
export function getTournamentFaqSchema() {
  return {
    "@type": "FAQPage",
    mainEntity: tournamentFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: typeof item.answer === "string" ? item.answer : "",
      },
    })),
  };
}
