import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Gamepad2,
  BookOpen,
  Zap,
  Gift,
  Target,
  CheckCircle2,
  ArrowRight,
  Search,
  Scale,
  Newspaper,
  Star,
  TrendingUp,
} from "lucide-react";

export function HomepageCasinospilSection() {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-3xl font-bold">🎲 Casinospil – Slots, Bordspil og Live Casino</h2>
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Et komplet online casino tilbyder hundredvis af forskellige{" "}
        <Link to="/casinospil" className="text-primary hover:underline font-medium">casinospil</Link>
        , fra klassiske spilleautomater til avancerede live dealer-spil. Forståelse af de forskellige kategorier hjælper dig med at finde de spil, der passer til din spillestil og budget.
      </p>
      <p className="mb-4 text-muted-foreground leading-relaxed">
        <strong>Spilleautomater</strong> er den mest populære kategori med tusindvis af titler. RTP varierer typisk fra 94 % til 97 %, og volatiliteten afgør, om du foretrækker hyppige små gevinster eller sjældnere store udbetalinger. I{" "}
        <Link to="/live-casino" className="text-primary hover:underline font-medium">live casino</Link>
        {" "}kan du spille blackjack, roulette og baccarat med rigtige dealere i realtid – streamet fra professionelle studier hos{" "}
        <Link to="/spiludviklere/evolution-gaming" className="text-primary hover:underline font-medium">Evolution Gaming</Link>.
      </p>
      <p className="text-muted-foreground leading-relaxed">
        Bordspil som blackjack tilbyder lavere husfordel (ned til 0,5 % med optimal strategi), hvilket gør dem attraktive for strategiske spillere. Vil du have den fulde dealer-oplevelse med blackjack, roulette og baccarat i realtid, så læs vores{" "}
        <Link to="/live-casino" className="text-primary hover:underline font-medium">live casino guide</Link>
        {" "}med house edge, strategi, udbydere og de bedste danske live casinoer. Vi anbefaler også vores{" "}
        <Link to="/community/slots" className="text-primary hover:underline font-medium">gratis spillehal</Link>
        {" "}for at teste forskellige spiltyper uden risiko. Forstå alle begreber som RTP, volatilitet og house edge i vores{" "}
        <Link to="/ordbog" className="text-primary hover:underline font-medium">casino ordbog</Link>.
      </p>
    </section>
  );
}

export function HomepageAnmeldelserSection() {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-3xl font-bold">Casino Anmeldelser – Uafhængige og Dybdegående</h2>
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Vi anmelder hvert online casino grundigt med fokus på de faktorer, der reelt betyder noget for danske spillere. Vores anmeldelser dækker alt fra vilkår og spiludvalg til{" "}
        <Link to="/betalingsmetoder" className="text-primary hover:underline font-medium">betalingsmetoder</Link>
        {" "}og udbetalingstider. Her er nogle af vores seneste anmeldelser:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {[
          { name: "Spilleautomaten", to: "/casino-anmeldelser/spilleautomaten" },
          { name: "Campobet", to: "/casino-anmeldelser/campobet" },
          { name: "Betinia", to: "/casino-anmeldelser/betinia" },
          { name: "Swift Casino", to: "/casino-anmeldelser/swift-casino" },
          { name: "Luna Casino", to: "/casino-anmeldelser/luna-casino" },
          { name: "SpilDanskNu", to: "/casino-anmeldelser/spildansknu" },
        ].map((casino) => (
          <Link
            key={casino.name}
            to={casino.to}
            className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            <BookOpen className="h-4 w-4 text-primary flex-shrink-0" />
            {casino.name} Anmeldelse
          </Link>
        ))}
      </div>
      <p className="mt-4 text-muted-foreground leading-relaxed">
        Læs alle vores{" "}
        <Link to="/casino-anmeldelser" className="text-primary hover:underline font-medium">casino anmeldelser</Link>
        {" "}for at finde det online casino, der matcher dine præferencer.
      </p>
    </section>
  );
}

export function HomepageBonusHuntSection() {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
        <Target className="h-7 w-7 text-primary" />
        Live Bonus Hunts – Dokumenterede Resultater
      </h2>
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Følg med i vores live bonus hunts, hvor vi tester spilleautomater på{" "}
        <Link to="/casino-licenser" className="text-primary hover:underline font-medium">licenserede danske casinoer</Link>
        {" "}med fuld transparens. Alle resultater dokumenteres med gennemsnit X, break-even analyser og community bets i realtid.
      </p>
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Vores{" "}
        <Link to="/bonus-hunt/arkiv" className="text-primary hover:underline font-medium">Bonus Hunt Arkiv</Link>
        {" "}giver dig adgang til alle tidligere hunts med detaljerede statistikker, gennemsnit X og break-even analyser. Se den aggregerede data fra alle hunts i vores{" "}
        <Link to="/statistik" className="text-primary hover:underline font-medium">bonus hunt statistik</Link>
        {" "}med provider-rankings og historiske grafer. Udforsk vores{" "}
        <Link to="/slot-database" className="text-primary hover:underline font-medium">Slot Database</Link>
        {" "}med community-data fra 1.400+ testede spillemaskiner, eller følg med i{" "}
        <Link to="/community/turneringer" className="text-primary hover:underline font-medium">månedlige turneringer</Link>
        {" "}med kontante præmier. Følg{" "}
        <Link to="/om" className="text-primary hover:underline font-medium">Casinoaftaler</Link>
        {" "}live på{" "}
        <a href="https://www.twitch.tv/fedesvinsejer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Twitch</a>.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link to="/bonus-hunt" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary">
          <Target className="h-4 w-4 text-primary flex-shrink-0" />
          Se alle bonus hunts
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link to="/bonus-hunt/arkiv" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary">
          <BookOpen className="h-4 w-4 text-primary flex-shrink-0" />
          Bonus Hunt Arkiv
        </Link>
        <Link to="/slot-database" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary">
          <Gamepad2 className="h-4 w-4 text-primary flex-shrink-0" />
          Slot Database
        </Link>
        <Link to="/community/turneringer/arkiv" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary">
          <Trophy className="h-4 w-4 text-primary flex-shrink-0" />
          Turneringsarkiv
        </Link>
        <Link to="/statistik" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary">
          <TrendingUp className="h-4 w-4 text-primary flex-shrink-0" />
          Bonus Hunt Statistik
        </Link>
        <Link to="/community" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary">
          <Users className="h-4 w-4 text-primary flex-shrink-0" />
          Udforsk community
        </Link>
        <Link to="/ordbog" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary">
          <BookOpen className="h-4 w-4 text-primary flex-shrink-0" />
          Casino Ordbog
        </Link>
      </div>
    </section>
  );
}

export function HomepageNyhederSection() {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-3xl font-bold">Casino Nyheder</h2>
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Hold dig opdateret med de seneste nyheder, analyser og ændringer fra det danske online casino-marked. Vi dækker licensudstedelser, bonusændringer, nye lanceringer og lovgivning – alt sammen med fokus på, hvad det betyder for dig som dansk spiller.
      </p>
      <Link
        to="/casino-nyheder"
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
      >
        <Newspaper className="h-4 w-4 text-primary flex-shrink-0" />
        Se alle casino nyheder
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}

export function HomepageTrendsSection() {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-3xl font-bold">Online Casino-trends i Danmark 2026</h2>
      <p className="mb-6 text-muted-foreground leading-relaxed">
        Det danske marked for online casino udvikler sig hurtigt. Her er de vigtigste trends, der former din spiloplevelse i 2026:
      </p>
      <div className="space-y-3">
        {[
          { title: "Øjeblikkelige betalinger", desc: "MobilePay, Trustly og Apple Pay gør ind- og udbetalinger øjeblikkelige. Nye løsninger som Revolut og Zimpler vinder også frem hos danske online casinoer." },
          { title: "Mobil-first design", desc: "Nye online casinoer designes med mobilen i centrum – fuldt optimeret til smartphones og tablets med hurtig loading og intuitive menuer.", link: "/mobil-casino" },
          { title: "Gamification og belønninger", desc: "Missioner, achievements og loyalitetsprogrammer gør spiloplevelsen mere engagerende og giver ekstra værdi for dit spil." },
          { title: "Personlige tilbud", desc: "Online casinoer bruger spilleradfærd til at skræddersy tilbud, der passer til den enkelte. Det betyder mere relevante kampagner og bedre værdi." },
          { title: "Udvidet live casino", desc: "Live dealer-sektioner vokser med nye spiltyper, game shows og interaktive funktioner fra Evolution Gaming og andre førende udbydere." },
          { title: "Fokus på ansvarligt spil", desc: "Flere online casinoer implementerer proaktive værktøjer som realtime-advarsler, tabsgrænser og spillepauser direkte i brugeroplevelsen." },
        ].map((trend) => (
          <div
            key={trend.title}
            className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <div>
              <h3 className="font-semibold">{trend.title}</h3>
              <p className="text-sm text-muted-foreground">
                {trend.desc}
                {trend.link && (
                  <>
                    {" "}
                    <Link to={trend.link} className="text-primary hover:underline font-medium">Læs mere →</Link>
                  </>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HomepageGennemsigtighedSection() {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-3xl font-bold">Gennemsigtighed og Troværdighed</h2>
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Fuld gennemsigtighed er grundlaget for alt, vi gør. Sitet er en gratis ressource, finansieret gennem affiliate-partnerskaber med udvalgte online casinoer. Når du klikker på et link og registrerer dig, modtager vi en provision – det koster dig aldrig ekstra og påvirker ikke vores vurderinger.
      </p>
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Vores team tester hvert online casino grundigt baseret på objektive kriterier. Vi samarbejder kun med licenserede og pålidelige spillesteder, der overholder standarder for{" "}
        <Link to="/ansvarligt-spil" className="text-primary hover:underline font-medium">ansvarligt spil</Link>
        . Læs mere{" "}
        <Link to="/om" className="text-primary hover:underline font-medium">om os</Link>
        {" "}eller{" "}
        <Link to="/kontakt" className="text-primary hover:underline font-medium">kontakt os</Link>
        {" "}med spørgsmål.
      </p>
    </section>
  );
}

export function HomepageSlotShowcase() {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
        <Gamepad2 className="h-7 w-7 text-primary" />
        Nye Spillemaskiner 2026
      </h2>
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Online spilleautomater udvikler sig konstant, og 2026 byder på en ny generation af populære titler med innovative mekanikker og imponerende gevinstpotentiale. Her er fem af de mest spillede spillemaskiner hos danske casinoer lige nu:
      </p>
      <ul className="space-y-2 mb-4">
        <li className="flex items-center gap-2 text-muted-foreground">
          <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
          <Link to="/casinospil/spillemaskiner/sweet-bonanza" className="text-primary hover:underline font-medium">Sweet Bonanza</Link>
          {" "}– Pragmatic Plays cluster-pays hit med 96,48 % RTP og 21.175× max win.
        </li>
        <li className="flex items-center gap-2 text-muted-foreground">
          <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
          <Link to="/casinospil/spillemaskiner/gates-of-olympus" className="text-primary hover:underline font-medium">Gates of Olympus</Link>
          {" "}– Zeus' multiplikator-slot med op til 500× per spin og 96,50 % RTP.
        </li>
        <li className="flex items-center gap-2 text-muted-foreground">
          <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
          <Link to="/casinospil/spillemaskiner/wanted-dead-or-a-wild" className="text-primary hover:underline font-medium">Wanted Dead or a Wild</Link>
          {" "}– Hacksaw Gamings westernslot med Duel at Dawn og 12.500× max win.
        </li>
        <li className="flex items-center gap-2 text-muted-foreground">
          <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
          <Link to="/casinospil/spillemaskiner/big-bass-bonanza" className="text-primary hover:underline font-medium">Big Bass Bonanza</Link>
          {" "}– Money Collect-mekanikken fra Pragmatic Play med 96,71 % RTP.
        </li>
        <li className="flex items-center gap-2 text-muted-foreground">
          <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
          <Link to="/casinospil/spillemaskiner/mega-moolah" className="text-primary hover:underline font-medium">Mega Moolah</Link>
          {" "}– Den progressive jackpot-legende fra Microgaming med milliongevinster.
        </li>
      </ul>
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Udforsk alle vores dybdegående analyser i{" "}
        <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline font-medium">den komplette spillemaskine-guide</Link>.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Link to="/megaways-slots" className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary">
          <Zap className="h-4 w-4 text-primary flex-shrink-0" />
          Megaways Slots
        </Link>
        <Link to="/jackpot-slots" className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary">
          <Trophy className="h-4 w-4 text-primary flex-shrink-0" />
          Jackpot Slots
        </Link>
        <Link to="/bonus-buy-slots" className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary">
          <Gift className="h-4 w-4 text-primary flex-shrink-0" />
          Bonus Buy Slots
        </Link>
      </div>
    </section>
  );
}

export function HomepageAnsvarligtSpilSection() {
  return (
    <section className="mb-12">
      <Card className="border-border bg-card border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            Ansvarligt Spil
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-muted-foreground leading-relaxed">
            Online casino skal altid være underholdning – ikke en kilde til stress eller økonomiske problemer. Derfor står{" "}
            <Link to="/ansvarligt-spil" className="text-primary hover:underline font-medium">ansvarligt spil</Link>
            {" "}centralt i alle vores anmeldelser og guides. Vi opfordrer alle spillere til at sætte grænser, holde pauser og aldrig spille for mere, end de har råd til at tabe.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Alle online casinoer på vores liste har dansk licens og tilbyder selvudelukkelse via{" "}
            <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">ROFUS</a>
            . Har du brug for hjælp, kontakt{" "}
            <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">StopSpillet.dk</a>
            {" "}– en gratis og anonym rådgivningstjeneste.
          </p>
          <p className="text-xs text-muted-foreground">
            18+ | Spil ansvarligt | Annoncering
          </p>
        </CardContent>
      </Card>
    </section>
  );
}

export function HomepageKonverteringsSection() {
  return (
    <section className="mb-12">
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="py-10 text-center space-y-4">
          <Search className="h-12 w-12 mx-auto text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold">Find dit Online Casino i Danmark</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Vi har gjort forarbejdet, så du ikke behøver det. Sammenlign de bedste online casinoer med dansk licens – filtrér efter betalingsmetoder, spiludvalg og udbetalingshastighed, og find præcis det spillested, der passer til dig.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button asChild size="lg" className="gap-2">
              <a href="#top-casinos">
                <Trophy className="h-5 w-5" />
                Sammenlign Casinoer
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link to="/top-10-casino-online">
                <Star className="h-5 w-5" />
                Se Top 10 Liste
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
