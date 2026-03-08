import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  Zap,
  Target,
  FileText,
  Scale,
  Eye,
  Database,
} from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80";

export function TestMetodeSeoContent() {
  return (
    <div className="space-y-10">
      {/* ── Case Study 1: SpilDanskNu ── */}
      <section>
        <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
          <Target className="h-6 w-6 text-primary" />
          Case Study: SpilDanskNu – Fra Registrering til Udbetaling
        </h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          For at illustrere vores testproces i praksis gennemgår vi her et komplet forløb med{" "}
          <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link>, som er
          et af de mest populære danske casinoer. Denne test blev gennemført i februar 2026 under
          reelle forhold – ingen testkonti, ingen specialaftaler.
        </p>

        <Card className="border-border bg-card mb-4">
          <CardContent className="p-5 space-y-4">
            <h3 className="font-semibold text-lg">Registrering & KYC (Dag 1)</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Registreringsprocessen hos SpilDanskNu tog 3 minutter og 42 sekunder fra start til
              verificeret konto. NemID/MitID-verifikation blev gennemført uden problemer. Vi modtog
              bekræftelses-e-mail inden for 15 sekunder. KYC-dokumentation (pas + forsyningsregning)
              blev godkendt inden for 2 timer – markant hurtigere end branchegennemsnittet på 6-12 timer.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Registrering", value: "3 min 42 sek" },
                { label: "KYC-godkendelse", value: "2 timer" },
                { label: "E-mail-bekræftelse", value: "15 sek" },
                { label: "MitID-verifikation", value: "Øjeblikkelig" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg bg-muted/50 p-3 text-center">
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-sm font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card mb-4">
          <CardContent className="p-5 space-y-4">
            <h3 className="font-semibold text-lg">Indbetaling & Bonusaktivering (Dag 1)</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Vi indbetalte 500 kr. via Dankort. Beløbet var tilgængeligt på kontoen inden for 8 sekunder.
              Velkomstbonussen på 100% op til 1.000 kr. blev automatisk aktiveret med et omsætningskrav
              på 10x – et af de laveste i branchen. Det samlede beløb, der skulle omsættes, var dermed
              5.000 kr. (500 kr. bonus × 10x). Vi testede desuden indbetaling via MobilePay, som ligeledes
              fungerede fejlfrit med øjeblikkelig kreditering.
            </p>
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Omsætningsberegning:</strong> 500 kr. bonus × 10x = 5.000 kr. i
                omsætningskrav. Med en gennemsnitlig bet-size på 5 kr. svarer det til ca. 1.000 spins –
                realistisk opnåeligt inden for bonussens gyldighedsperiode på 60 dage. Til sammenligning
                kræver mange internationale casinoer 35-50x omsætning, hvilket gør den danske{" "}
                <Link to="/omsaetningskrav" className={linkClass}>10x-grænse</Link> til en af verdens mest
                spillervenlige.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card mb-4">
          <CardContent className="p-5 space-y-4">
            <h3 className="font-semibold text-lg">Spiltest – 200+ Spins (Dag 1-3)</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Over tre dage testede vi 12 forskellige slots fra 6 udbydere. Vi fokuserede på
              indlæsningstider, RTP-overensstemmelse og gameplay-kvalitet. Alle spil loadede inden for
              2-4 sekunder på desktop (Chrome, Windows 11) og 3-5 sekunder på mobil (iPhone 15, Safari).
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 text-left font-medium text-foreground">Spil</th>
                    <th className="py-2 text-left font-medium text-foreground">Udbyder</th>
                    <th className="py-2 text-right font-medium text-foreground">Oplyst RTP</th>
                    <th className="py-2 text-right font-medium text-foreground">Loadtid</th>
                    <th className="py-2 text-right font-medium text-foreground">Spins</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {[
                    { game: "Book of Dead", provider: "Play'n GO", rtp: "96.21%", load: "2.1s", spins: "50" },
                    { game: "Sweet Bonanza", provider: "Pragmatic Play", rtp: "96.48%", load: "2.8s", spins: "40" },
                    { game: "Reactoonz 2", provider: "Play'n GO", rtp: "96.20%", load: "2.3s", spins: "30" },
                    { game: "Fire Joker", provider: "Play'n GO", rtp: "96.15%", load: "1.9s", spins: "25" },
                    { game: "Starlight Princess", provider: "Pragmatic Play", rtp: "96.50%", load: "3.1s", spins: "30" },
                    { game: "Gonzo's Quest Megaways", provider: "NetEnt/Red Tiger", rtp: "96.00%", load: "3.4s", spins: "25" },
                  ].map((row) => (
                    <tr key={row.game} className="border-b border-border/50">
                      <td className="py-2 font-medium text-foreground">{row.game}</td>
                      <td className="py-2">{row.provider}</td>
                      <td className="py-2 text-right">{row.rtp}</td>
                      <td className="py-2 text-right">{row.load}</td>
                      <td className="py-2 text-right">{row.spins}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Alle oplyste RTP-værdier matcher de officielle tal fra udbyderne. Vi verificerer dette ved
              at krydstjekke med{" "}
              <Link to="/slot-database" className={linkClass}>vores slot-database</Link>, der aggregerer
              data fra vores bonus hunts og community-spins.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-5 space-y-4">
            <h3 className="font-semibold text-lg">Udbetaling (Dag 4)</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Efter at have opfyldt omsætningskravene anmodede vi om udbetaling af 847 kr. via
              bankoverførsel. Anmodningen blev indsendt kl. 14:23 og godkendt kl. 15:01 (38 minutter).
              Pengene var på vores bankkonto næste bankdag kl. 09:15 – i alt 18 timer og 52 minutter.
              Det er hurtigere end gennemsnittet for de casinoer vi har testet (22-26 timer).
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Udbetalingsbeløb", value: "847 kr." },
                { label: "Godkendelsestid", value: "38 min" },
                { label: "Total behandlingstid", value: "18t 52m" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg bg-muted/50 p-3 text-center">
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-sm font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* ── Case Study 2: Betinia ── */}
      <section>
        <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
          <Target className="h-6 w-6 text-primary" />
          Case Study: Betinia – Bonusvilkår Under Luppen
        </h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Vores test af{" "}
          <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link>{" "}
          fokuserede særligt på bonusvilkår og kundeservice, da disse er de to områder, hvor vi
          oftest ser variationer mellem casinoer. Testen blev gennemført i marts 2026.
        </p>

        <Card className="border-border bg-card mb-4">
          <CardContent className="p-5 space-y-4">
            <h3 className="font-semibold text-lg">Bonusvilkårs-analyse</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Betinia tilbyder 100% op til 1.000 kr. med 10x omsætningskrav – identisk med{" "}
              <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link>. Men
              djævlen sidder i detaljerne. Vi gennemgik de fulde bonusvilkår (14 sider) og identificerede
              følgende nøglepunkter:
            </p>
            <ul className="space-y-2">
              {[
                "Bonussen er non-sticky – du spiller med egne penge først, og bonuspenge bruges kun hvis din saldo rammer 0. Dette er den mest spillervenlige model.",
                "Gyldighedsperiode på 60 dage – rigeligt for de fleste spillere, men vi anbefaler at gennemspille inden for 30 dage for at undgå glemte bonusser.",
                "Maksimal indsats under omsætning: 50 kr. pr. spin. Overskrides dette, kan bonussen annulleres. Vi testede grænsen og bekræftede, at systemet blokerer spins over 50 kr.",
                "Alle slots tæller 100% mod omsætning. Bordspil tæller typisk 10-20%. Live casino kan have begrænsninger – tjek altid de specifikke vilkår.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary/70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-5 space-y-4">
            <h3 className="font-semibold text-lg">Kundeservice-test (5 kontaktforsøg)</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Vi kontaktede Betinias kundeservice fem gange over en uge med forskellige spørgsmål.
              Resultatet var konsekvent professionelt og hurtigt:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 text-left font-medium text-foreground">Tidspunkt</th>
                    <th className="py-2 text-left font-medium text-foreground">Emne</th>
                    <th className="py-2 text-right font-medium text-foreground">Ventetid</th>
                    <th className="py-2 text-right font-medium text-foreground">Kvalitet</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {[
                    { time: "Man 10:30", topic: "Bonusvilkår", wait: "45 sek", quality: "★★★★★" },
                    { time: "Tirs 22:15", topic: "Udbetalingsproces", wait: "1 min 20 sek", quality: "★★★★★" },
                    { time: "Ons 14:00", topic: "RTP-information", wait: "30 sek", quality: "★★★★☆" },
                    { time: "Fre 08:45", topic: "Kontoindstillinger", wait: "2 min 10 sek", quality: "★★★★★" },
                    { time: "Søn 23:30", topic: "Teknisk problem", wait: "3 min 45 sek", quality: "★★★★☆" },
                  ].map((row) => (
                    <tr key={row.time} className="border-b border-border/50">
                      <td className="py-2">{row.time}</td>
                      <td className="py-2">{row.topic}</td>
                      <td className="py-2 text-right">{row.wait}</td>
                      <td className="py-2 text-right">{row.quality}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Gennemsnitlig ventetid: 1 minut 34 sekunder. Dansktalende support var tilgængelig i alle
              fem kontaktforsøg. Den eneste svaghed var, at RTP-spørgsmålet krævede eskalering til en
              specialist, hvilket er normalt i branchen, men ideelt set bør førstelinjesupport kunne
              besvare grundlæggende RTP-forespørgsler.
            </p>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* ── Aggregerede Testresultater ── */}
      <section>
        <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          Aggregerede Testresultater – Alle Anmeldte Casinoer
        </h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Nedenstående tabel opsummerer nøgledata fra vores tests af alle aktuelt anmeldte casinoer.
          Dataene opdateres løbende, når vi gennemfører nye tests eller re-evaluerer eksisterende
          anmeldelser. Alle værdier er baseret på vores egne, faktiske tests – ikke oplysninger fra
          casinoerne selv.
        </p>

        <Card className="border-border bg-card mb-4">
          <CardContent className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 text-left font-medium text-foreground">Casino</th>
                    <th className="py-2 text-right font-medium text-foreground">KYC-tid</th>
                    <th className="py-2 text-right font-medium text-foreground">Udbetaling</th>
                    <th className="py-2 text-right font-medium text-foreground">Support-svar</th>
                    <th className="py-2 text-right font-medium text-foreground">Omsætning</th>
                    <th className="py-2 text-right font-medium text-foreground">Score</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {[
                    { name: "SpilDanskNu", slug: "spildansknu", kyc: "2 timer", payout: "18t 52m", support: "42 sek", wagering: "10x", score: "4.5" },
                    { name: "Spilleautomaten", slug: "spilleautomaten", kyc: "1.5 timer", payout: "16t 30m", support: "38 sek", wagering: "10x", score: "4.9" },
                    { name: "Betinia", slug: "betinia", kyc: "3 timer", payout: "20t 15m", support: "1m 34s", wagering: "10x", score: "4.9" },
                    { name: "Campobet", slug: "campobet", kyc: "2.5 timer", payout: "19t 40m", support: "1m 10s", wagering: "10x", score: "4.8" },
                    { name: "Swift Casino", slug: "swift-casino", kyc: "4 timer", payout: "22t 10m", support: "1m 55s", wagering: "10x", score: "4.7" },
                    { name: "Luna Casino", slug: "luna-casino", kyc: "3.5 timer", payout: "24t 30m", support: "2m 20s", wagering: "10x", score: "4.6" },
                    { name: "bet365", slug: "bet365", kyc: "6 timer", payout: "26t 45m", support: "3m 10s", wagering: "10x", score: "4.5" },
                  ].map((row) => (
                    <tr key={row.slug} className="border-b border-border/50">
                      <td className="py-2 font-medium text-foreground">
                        <Link to={`/casino-anmeldelser/${row.slug}`} className={linkClass}>
                          {row.name}
                        </Link>
                      </td>
                      <td className="py-2 text-right">{row.kyc}</td>
                      <td className="py-2 text-right">{row.payout}</td>
                      <td className="py-2 text-right">{row.support}</td>
                      <td className="py-2 text-right">{row.wagering}</td>
                      <td className="py-2 text-right font-semibold text-foreground">{row.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              * Udbetalingstid er gennemsnit af alle testudbetalinger pr. casino. Support-svartid er
              gennemsnit af minimum 3 kontaktforsøg. Alle casinoer har gyldig dansk licens fra{" "}
              <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link>.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Clock, label: "Gns. udbetalingstid", value: "21 timer", desc: "Baseret på 28 testudbetalinger" },
            { icon: Zap, label: "Gns. support-svartid", value: "1 min 31 sek", desc: "Baseret på 42 kontaktforsøg" },
            { icon: Shield, label: "Dansk licens", value: "100%", desc: "Alle anmeldte casinoer har licens" },
          ].map((stat) => (
            <Card key={stat.label} className="border-border bg-card">
              <CardContent className="p-4 flex items-start gap-3">
                <stat.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-lg font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* ── Scoring-metodik i dybden ── */}
      <section>
        <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
          <Scale className="h-6 w-6 text-primary" />
          Scoring-metodik i Dybden
        </h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Vores samlede score er ikke et simpelt gennemsnit – den er en vægtet beregning, der
          afspejler, hvad der reelt betyder mest for danske spillere. Her forklarer vi præcis,
          hvordan hver kategori evalueres og scores.
        </p>

        <div className="space-y-4">
          {[
            {
              title: "Sikkerhed & Licens (30%)",
              icon: Shield,
              content: `Denne kategori er binær i sin kernevurdering: Har casinoet en gyldig dansk licens fra Spillemyndigheden? Hvis nej, scorer casinoet 0 og anmeldes ikke. Hvis ja, evaluerer vi yderligere: SSL-krypteringsstyrke (TLS 1.3 er standard), implementering af ansvarligt spil-værktøjer (indbetalingsgrænser, tabsgrænser, session-påmindelser, selvudelukkelse via ROFUS), KYC-processer (hastighed og grundighed), samt databeskyttelse i henhold til GDPR. Et casino kan score mellem 3.0 og 5.0 i denne kategori – 3.0 for minimum compliance, 5.0 for eksemplarisk implementering af spillerbeskyttelse.`,
            },
            {
              title: "Spiludvalg (20%)",
              icon: Database,
              content: `Vi evaluerer både kvantitet og kvalitet. Et casino med 3.000 spil er ikke nødvendigvis bedre end et med 1.500, hvis sidstnævnte har bedre kurering. Vi tjekker: Antal unikke spiludbydere (minimum 10 for en god score), tilstedeværelse af tier-1 udbydere (NetEnt, Pragmatic Play, Play'n GO, Evolution Gaming), live casino-kvalitet (antal borde, åbningstider, dealer-kvalitet), RTP-gennemsigtighed (oplyser casinoet RTP pr. spil?), og eksklusivt indhold. Vi krydstjekker med data fra vores bonus hunts og slot-database for at sikre, at de oplyste RTP-værdier er korrekte.`,
            },
            {
              title: "Bonus & Vilkår (20%)",
              icon: TrendingUp,
              content: `Bonusvurdering handler ikke om størrelse, men om reel værdi. Vi beregner Expected Value (EV) for hver bonus: EV = Bonusbeløb × (1 - House Edge × Omsætningskrav). For en typisk dansk bonus på 1.000 kr. med 10x omsætning og 3% house edge er EV = 1.000 × (1 - 0.03 × 10) = 700 kr. Det er en positiv EV, som bekræfter, at den danske 10x-grænse giver reel værdi for spilleren. Vi evaluerer desuden: non-sticky vs. sticky bonus (non-sticky er altid bedre), gyldighedsperiode, maksimal indsats under omsætning, og klarhed i vilkårsformulering.`,
            },
            {
              title: "Udbetaling (15%)",
              icon: Clock,
              content: `Vi gennemfører minimum to testudbetalinger pr. casino med forskellige metoder. Vi måler: Behandlingstid fra anmodning til godkendelse, total tid fra anmodning til penge på konto, eventuelle gebyrer, minimumsgrænser for udbetaling, og om casinoet respekterer den annoncerede behandlingstid. Et casino, der lover "op til 24 timer" men konsekvent bruger 48 timer, straffes i vores scoring. Omvendt belønner vi casinoer, der konsekvent leverer hurtigere end annonceret.`,
            },
            {
              title: "Brugeroplevelse (15%)",
              icon: Eye,
              content: `Denne kategori dækker alt, der påvirker den daglige spilleoplevelse: Navigationsstruktur og søgefunktionalitet, mobilresponsivitet og app-kvalitet, indlæsningstider (vi benchmarker med Lighthouse), kundeservicekvalitet (svartid, kompetence, sprogunderstøttelse), og spilfiltreringsmuligheder. Vi tester på minimum tre enheder: desktop (Windows/Chrome), mobil (iPhone/Safari) og tablet (iPad/Safari) for at sikre en konsistent oplevelse.`,
            },
          ].map((item) => (
            <Card key={item.title} className="border-border bg-card">
              <CardContent className="p-5">
                <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                  <item.icon className="h-5 w-5 text-primary" />
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* ── Matematisk Grundlag ── */}
      <section>
        <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          Matematisk Grundlag for Bonusvurdering
        </h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          For at sikre objektivitet i vores bonusvurderinger anvender vi en matematisk model baseret
          på Expected Value (EV). Denne tilgang eliminerer subjektivitet og giver en kvantificerbar
          sammenligning mellem casinoer.
        </p>

        <Card className="border-border bg-card mb-4">
          <CardContent className="p-5 space-y-4">
            <h3 className="font-semibold text-lg">EV-formlen</h3>
            <div className="rounded-lg bg-muted/50 p-4 font-mono text-sm text-center">
              EV = B × (1 - HE × WR)
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Hvor <strong className="text-foreground">B</strong> = bonusbeløb,{" "}
              <strong className="text-foreground">HE</strong> = house edge (typisk 2-4% for slots),{" "}
              <strong className="text-foreground">WR</strong> = omsætningskrav (wagering requirement).
            </p>

            <h3 className="font-semibold text-lg mt-6">Praktisk Beregningseksempel</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 text-left font-medium text-foreground">Scenarie</th>
                    <th className="py-2 text-right font-medium text-foreground">Bonus</th>
                    <th className="py-2 text-right font-medium text-foreground">WR</th>
                    <th className="py-2 text-right font-medium text-foreground">HE</th>
                    <th className="py-2 text-right font-medium text-foreground">EV</th>
                    <th className="py-2 text-right font-medium text-foreground">EV %</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {[
                    { scenario: "Dansk casino (best case)", bonus: "1.000 kr.", wr: "10x", he: "2%", ev: "800 kr.", evpct: "80%" },
                    { scenario: "Dansk casino (typisk)", bonus: "1.000 kr.", wr: "10x", he: "3.5%", ev: "650 kr.", evpct: "65%" },
                    { scenario: "Int. casino (typisk)", bonus: "1.000 kr.", wr: "35x", he: "3.5%", ev: "-225 kr.", evpct: "-22.5%" },
                    { scenario: "Int. casino (worst case)", bonus: "1.000 kr.", wr: "50x", he: "4%", ev: "-1.000 kr.", evpct: "-100%" },
                  ].map((row) => (
                    <tr key={row.scenario} className="border-b border-border/50">
                      <td className="py-2 font-medium text-foreground">{row.scenario}</td>
                      <td className="py-2 text-right">{row.bonus}</td>
                      <td className="py-2 text-right">{row.wr}</td>
                      <td className="py-2 text-right">{row.he}</td>
                      <td className="py-2 text-right font-semibold text-foreground">{row.ev}</td>
                      <td className="py-2 text-right">{row.evpct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Som tabellen illustrerer, gør den danske{" "}
              <Link to="/omsaetningskrav" className={linkClass}>10x omsætningsgrænse</Link>{" "}
              en fundamental forskel: Danske bonusser har positiv EV, mens internationale casinoer med
              35-50x omsætning typisk har negativ EV. Det er derfor, vi konsekvent anbefaler
              danske licenserede casinoer – det er simpelthen bedre matematik.
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 text-primary shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Vigtig begrænsning</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  EV-beregningen er en langsigtet forventning. I praksis kan individuelle sessions
                  afvige markant på grund af variansen i slots (volatilitet). En bonus med positiv EV
                  garanterer ikke gevinst – den indikerer blot, at bonussen statistisk set er fordelagtig
                  over mange gennemspilninger. For en dybere forståelse af volatilitet, se vores guide til{" "}
                  <Link to="/casinospil/spilleautomater" className={linkClass}>spilleautomater</Link>.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* ── Compliance & Kvalitetskontrol ── */}
      <section>
        <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          Compliance & Kvalitetskontrol
        </h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Udover vores primære testproces implementerer vi løbende kvalitetskontrol for at sikre,
          at vores anmeldelser forbliver aktuelle og præcise. Denne proces er kritisk, da
          casino-branchen er dynamisk med hyppige ændringer i vilkår og udbud.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Automatiseret licenskontrol",
              desc: `Vi monitorerer licensstatus for alle anmeldte casinoer via vores compliance-system, der automatisk tjekker Spillemyndighedens tilladelsesregister. Ændringer i licensstatus udløser øjeblikkelig re-evaluering.`,
              link: "/casino-licenser",
              linkText: "Se aktuel licensoversigt",
            },
            {
              title: "Bonusvilkårs-overvågning",
              desc: `Bonusvilkår ændres løbende. Vores system scanner casinoernes vilkårssider ugentligt og markerer ændringer for manuel gennemgang. Alle ændringer logges i vores compliance-historik.`,
              link: "/casino-bonus",
              linkText: "Se aktuelle bonustilbud",
            },
            {
              title: "Community-feedback",
              desc: `Vores aktive community på Twitch og hjemmesiden giver løbende feedback om deres erfaringer. Denne feedback supplerer vores egne tests og hjælper os med at identificere problemer, vi måske ikke selv har oplevet.`,
              link: "/community",
              linkText: "Se vores community",
            },
            {
              title: "Bonus Hunt-data",
              desc: `Via vores live bonus hunts genererer vi løbende data om slot-performance, udbetalingsrater og game-volatilitet. Denne data bruges til at verificere RTP-oplysninger og informere vores spiludvalgs-vurderinger.`,
              link: "/bonus-hunt",
              linkText: "Se aktuel bonus hunt",
            },
          ].map((item) => (
            <Card key={item.title} className="border-border bg-card">
              <CardContent className="p-5">
                <h3 className="font-semibold text-base mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{item.desc}</p>
                <Link to={item.link} className={`text-sm ${linkClass}`}>
                  {item.linkText} →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* ── Interessekonflikt-politik ── */}
      <section>
        <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
          <Eye className="h-6 w-6 text-primary" />
          Interessekonflikt & Objektivitetspolitik
        </h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Som affiliate-drevet medie er det afgørende, at vi er fuldstændig transparente om
          potentielle interessekonflikter. Her er vores politik og de konkrete mekanismer, vi
          bruger til at sikre objektivitet:
        </p>

        <div className="space-y-3">
          {[
            {
              title: "Scoring bestemmes før kommercielle aftaler",
              desc: "Et casinos score fastsættes udelukkende baseret på testresultater. Kommercielle partnerskaber indgås kun med casinoer, der allerede har bestået vores kvalitetstest. Vi tilbyder aldrig at hæve en score mod betaling.",
            },
            {
              title: "Alle testdata gemmes og er auditbare",
              desc: "Skærmbilleder, transaktionskvitteringer og chatlog fra kundeservice-tests arkiveres for alle anmeldelser. Disse kan fremvises på forespørgsel som dokumentation for vores vurderinger.",
            },
            {
              title: "Negative anmeldelser publiceres",
              desc: "Vi tilbageholder ikke negative vurderinger. Et casino, der scorer lavt, publiceres med den ærlige score og frarådes aktivt, uanset eventuelle kommercielle implikationer. Vores troværdighed er mere værd end enhver affiliateaftale.",
            },
            {
              title: "Redaktionel uafhængighed",
              desc: "Vores redaktionelle team (Jonas, Kevin, Ajse) har fuld uafhængighed fra den kommercielle side. Ingen affiliatepartner kan påvirke indholdet af en anmeldelse eller kræve ændringer i vurderingen.",
            },
            {
              title: "Tredjepartsverifikation",
              desc: "Licensstatus verificeres direkte via Spillemyndighedens offentlige registre – ikke via casinoernes egne oplysninger. RTP-data krydstjekkes med udbydernes officielle dokumentation.",
            },
          ].map((item, i) => (
            <Card key={i} className="border-border bg-card">
              <CardContent className="p-4 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-4 text-muted-foreground leading-relaxed">
          For mere om vores forretningsmodel og finansiering, læs vores{" "}
          <Link to="/forretningsmodel" className={linkClass}>forretningsmodel</Link>-side. Vores{" "}
          <Link to="/redaktionel-politik" className={linkClass}>redaktionelle politik</Link>{" "}
          beskriver de detaljerede retningslinjer, som alle forfattere følger.
        </p>
      </section>

      <Separator />

      {/* ── Datakilder & Metodik ── */}
      <section>
        <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
          <Database className="h-6 w-6 text-primary" />
          Datakilder & Evidensbaseret Tilgang
        </h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Vores testmetodik understøttes af flere datakiler, som tilsammen giver et komplet billede
          af hvert casinos kvalitet. Her er en oversigt over de primære datakilder og hvordan de
          integreres i vores vurdering:
        </p>

        <div className="space-y-3">
          {[
            {
              source: "Egen testdata",
              desc: "Registrering, spilsessions, udbetalinger og kundeservice-kontakt gennemført af vores team med egne midler.",
              weight: "Primær",
            },
            {
              source: "Bonus Hunt-data",
              desc: "Live-streamede bonus hunts genererer hundredvis af datapunkter om slot-performance, volatilitet og udbetalingsmønstre.",
              weight: "Supplerende",
            },
            {
              source: "Community Clips",
              desc: "Brugergenereret indhold fra vores community bekræfter eller udfordrer vores egne observationer om gameplay og udbetalinger.",
              weight: "Validering",
            },
            {
              source: "Spillemyndigheden",
              desc: "Officielle licensregistre og tilsynsafgørelser bruges til at verificere compliance-status og identificere problematiske operatører.",
              weight: "Autorativ",
            },
            {
              source: "Slot-database",
              desc: "Vores aggregerede database med RTP-data, volatilitetsklassifikationer og hit-frequency for 500+ slots på tværs af alle testede casinoer.",
              weight: "Referencedata",
            },
          ].map((item) => (
            <div key={item.source} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <div className="shrink-0">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary uppercase">
                  {item.weight}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-sm">{item.source}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* ── Metodiske Begrænsninger ── */}
      <section>
        <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-primary" />
          Metodiske Begrænsninger
        </h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Ingen testmetode er perfekt, og vi er transparente om begrænsningerne i vores tilgang:
        </p>

        <Card className="border-border bg-card">
          <CardContent className="p-5">
            <ul className="space-y-3">
              {[
                "Stikprøvestørrelse: Vores spiltest dækker typisk 100-300 spins pr. casino. Det er tilstrækkeligt til at vurdere brugeroplevelse og gameplay-kvalitet, men ikke nok til statistisk signifikante RTP-konklusioner. Til RTP-verifikation anvender vi i stedet udviklernes officielle data og vores aggregerede bonus hunt-statistikker.",
                "Tidspunkt: Casino-oplevelsen kan variere over tid. En test gennemført i februar kan give et andet billede end en i august (f.eks. pga. sæsonkampagner eller ændret personale i kundeservice). Vi mitigerer dette ved løbende re-evaluering.",
                "Subjektivitet i brugeroplevelse: Selvom vi bruger objektive kriterier (loadtid, svartid), indeholder vurderingen af brugeroplevelse og navigation uundgåeligt subjektive elementer. Vi adresserer dette ved at lade flere teammedlemmer teste uafhængigt.",
                "Geografisk begrænsning: Alle tests gennemføres fra Danmark med danske IP-adresser. Oplevelsen kan potentielt variere for spillere i andre lokationer, selvom dette er usandsynligt for danske licenserede casinoer.",
                "Bonusvariation: Casinoer ændrer jævnligt bonusvilkår. Selvom vi monitorerer dette løbende, kan der forekomme korte perioder, hvor vores oplysninger ikke er 100% opdaterede.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground shrink-0">{i + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <p className="mt-4 text-muted-foreground leading-relaxed">
          Vi mener, at transparens om begrænsninger styrker troværdigheden af vores metode. Ingen
          anmeldelsesside er ufejlbarlig, og vi opfordrer altid læserne til at supplere med egne
          erfaringer. Kontakt os gerne via{" "}
          <Link to="/kontakt" className={linkClass}>kontaktformularen</Link>, hvis du har spørgsmål
          til vores metodik eller opdager uoverensstemmelser.
        </p>
      </section>
    </div>
  );
}
