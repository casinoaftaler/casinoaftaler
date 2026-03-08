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
  CreditCard,
  TrendingUp,
  Star,
  BookOpen,
  Zap,
  Gift,
  Target,
  CheckCircle2,
  ArrowRight,
  Search,
  Scale,
  Newspaper,
} from "lucide-react";

export function HomepageSeoSections() {
  return (
    <>
      {/* Section 1: Hvorfor sammenligne online casinoer? */}
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Hvorfor Sammenligne Online Casinoer?</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Med over 30 licenserede online casinoer i Danmark kan det være overvældende at finde det rette spillested. Hvert online casino har sine styrker og svagheder – fra spiludvalg og udbetalingshastighed til kundeservice og mobiloplevelse. Derfor er en grundig sammenligning afgørende, før du opretter en konto og indbetaler penge.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Hos <strong>Casinoaftaler</strong> tester vi hvert online casino efter en standardiseret metode, så du kan træffe en informeret beslutning baseret på objektive kriterier frem for markedsføring. Vi undersøger alt fra licensforhold og{" "}
          <Link to="/betalingsmetoder" className="text-primary hover:underline font-medium">betalingsmetoder</Link>
          {" "}til{" "}
          <Link to="/casinospil" className="text-primary hover:underline font-medium">spiludvalget</Link>
          {" "}og de reelle vilkår bag tilbuddene. Vores{" "}
          <Link to="/top-10-casino-online" className="text-primary hover:underline font-medium">top 10 liste over de bedste casinoer</Link>
          {" "}opdateres månedligt baseret på disse tests.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          En uafhængig sammenligning beskytter dig mod skjulte vilkår, langsomme udbetalinger og dårlig kundesupport. Ved at læse vores vurderinger, før du vælger, undgår du de mest almindelige fælder og finder det online casino, der reelt passer til dine præferencer og din spillestil.
        </p>
      </section>

      <Separator className="my-10" />

      {/* Section 2: Hvad kendetegner det bedste online casino? */}
      <section className="mb-12">
        <h2 className="mb-6 text-3xl font-bold">Hvad Kendetegner det Bedste Online Casino?</h2>
        <p className="mb-6 text-muted-foreground leading-relaxed">
          Der findes ikke ét objektivt bedste online casino – det afhænger af, hvad du prioriterer. Men der er en række faktorer, som adskiller de bedste online casinoer fra gennemsnittet. Her er de vigtigste kriterier, vi vurderer hvert spillested på:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: ShieldCheck, title: "Dansk Licens og Sikkerhed", desc: "Alle online casinoer, vi anbefaler, har gyldig licens fra Spillemyndigheden, SSL-kryptering og er tilsluttet ROFUS. Det er det absolutte minimum for et seriøst spillested." },
            { icon: Gamepad2, title: "Bredt Spiludvalg", desc: "Et godt online casino tilbyder hundredvis af slots, bordspil og live casino fra anerkendte udbydere som NetEnt, Pragmatic Play og Evolution Gaming." },
            { icon: TrendingUp, title: "Hurtige Udbetalinger", desc: "De bedste online casinoer behandler udbetalinger inden for 24 timer. Vi måler de faktiske behandlingstider og sammenligner dem på tværs af platforme." },
            { icon: CreditCard, title: "Fleksible Betalingsmetoder", desc: "MobilePay, Trustly, Visa og Apple Pay – et topmoderne online casino understøtter de metoder, danske spillere foretrækker." },
            { icon: Users, title: "Tilgængelig Kundeservice", desc: "Live chat, e-mail og helst dansk support. Vi tester responstider og kvaliteten af den hjælp, man faktisk modtager." },
            { icon: Scale, title: "Fair og Gennemsigtige Vilkår", desc: "Omsætningskrav, udbetalingsgrænser og bonusvilkår skal være klart kommunikeret. Vi afslører de spillesteder, der gemmer vilkår i det fine print." },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
            >
              <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator className="my-10" />

      {/* Section 3: Nye online casinoer i Danmark */}
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Nye Online Casinoer i Danmark 2026</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Det danske marked for online casino byder løbende på nye spillesteder, og 2026 er ingen undtagelse. Nye online casinoer bringer ofte innovativt design, hurtigere betalingsløsninger og konkurrencedygtige tilbud for at tiltrække spillere fra de etablerede platforme.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Vi holder konstant øje med markedet og tester hvert nyt online casino grundigt, inden vi anbefaler det. Vores{" "}
          <Link to="/nye-casinoer" className="text-primary hover:underline font-medium">oversigt over nye casinoer i Danmark</Link>
          {" "}giver dig et komplet overblik over de seneste tilføjelser – inklusiv vores ærlige vurdering af spiludvalg, betalingsmetoder og brugeroplevelse.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Nye spillesteder satser typisk på moderne løsninger som{" "}
          <Link to="/betalingsmetoder/mobilepay" className="text-primary hover:underline font-medium">MobilePay</Link>
          {" "}og{" "}
          <Link to="/betalingsmetoder/trustly" className="text-primary hover:underline font-medium">Trustly</Link>
          {" "}samt et kurateret spiludvalg fra innovative udviklere som{" "}
          <Link to="/spiludviklere/hacksaw-gaming" className="text-primary hover:underline font-medium">Hacksaw Gaming</Link>
          {" "}og{" "}
          <Link to="/spiludviklere/nolimit-city" className="text-primary hover:underline font-medium">Nolimit City</Link>.
        </p>
      </section>

      <Separator className="my-10" />

      {/* Section 4: Bonusser og kampagner */}
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Bonusser og Kampagner hos Online Casinoer</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          De fleste online casinoer tilbyder en form for velkomstpakke til nye spillere. Det kan være en matchbonus, free spins eller begge dele. Bonussen er dog kun én af mange faktorer, du bør overveje, når du vælger online casino – spiludvalg, udbetalingshastighed og vilkår er mindst lige så vigtige.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Hvis du vil dykke ned i de forskellige bonustyper, omsætningskrav og strategier for at få mest muligt ud af dit spil, har vi samlet alt i vores{" "}
          <Link to="/casino-bonus" className="text-primary hover:underline font-medium">komplette guide til casino bonusser</Link>
          . Her finder du også sammenligning af{" "}
          <Link to="/velkomstbonus" className="text-primary hover:underline font-medium">velkomstbonusser</Link>
          ,{" "}
          <Link to="/free-spins" className="text-primary hover:underline font-medium">free spins</Link>
          {", "}
          <Link to="/free-spins-i-dag" className="text-primary hover:underline font-medium">dagens free spins tilbud</Link>
          {" "}og{" "}
          <Link to="/bonus-uden-omsaetningskrav" className="text-primary hover:underline font-medium">bonusser uden omsætningskrav</Link>.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Erfarne spillere bør desuden kende til{" "}
          <Link to="/cashback-bonus" className="text-primary hover:underline font-medium">cashback bonusser</Link>
          , der returnerer en procentdel af dine tab, og{" "}
          <Link to="/reload-bonus" className="text-primary hover:underline font-medium">reload bonusser</Link>
          , der giver ekstra midler ved gentagne indbetalinger. Begge bonustyper kan have højere langsigtet værdi end en engangsbonusser.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Husk altid at læse vilkårene grundigt – især{" "}
          <Link to="/omsaetningskrav" className="text-primary hover:underline font-medium">omsætningskravene</Link>
          {" "}– før du accepterer en bonus. Et lavt omsætningskrav er ofte mere værd end en stor bonussum med urealistiske betingelser.
        </p>
      </section>
    </>
  );
}
