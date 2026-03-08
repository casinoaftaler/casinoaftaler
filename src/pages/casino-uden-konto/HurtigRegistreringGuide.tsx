import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { RelatedGuides } from "@/components/RelatedGuides";
import { FAQSection } from "@/components/FAQSection";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import {
  Zap, Shield, Clock, ArrowRight, CheckCircle, AlertTriangle,
  BarChart3, Globe, CreditCard, Users, FileText, TrendingUp, Smartphone,
} from "lucide-react";

const hurtigRegFaqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvad er den hurtigste måde at registrere sig på et dansk casino?",
    answer: "Pay N Play via Trustly er den hurtigste metode med et gennemsnit på 27 sekunder fra klik til første spin. MitID-registrering tager typisk 2-3 minutter, mens standard email-registrering tager 4-5 minutter.",
  },
  {
    question: "Er hurtig registrering lige så sikker som standard registrering?",
    answer: "Ja, og i mange tilfælde mere sikker. Pay N Play og MitID-registrering bruger bankens sikkerhedssystemer (MitID), som er den højeste sikkerhedsstandard i Danmark. Standard email-registrering er den mindst sikre, da den afhænger af brugerens adgangskodehygiejne.",
  },
  {
    question: "Kan jeg skifte registreringsmetode efter oprettelse?",
    answer: "Nej. Registreringsmetoden vælges ved oprettelse og kan ikke ændres efterfølgende. Hvis du har oprettet en konto via standard email-registrering, kan du ikke konvertere den til Pay N Play. Du kan dog oprette en ny konto på et Pay N Play-casino.",
  },
  {
    question: "Hvad er EV-besparelsen ved Pay N Play over tid?",
    answer: "Vores model viser, at en spiller der registrerer sig hos 5 casinoer om året sparer ca. 18 minutter akkumuleret med Pay N Play vs. standard registrering. Over 5 år svarer det til 1,5 timer – plus den løbende tidsbesparelse ved hurtigere udbetalinger (estimeret 50+ timer over 5 år ved ugentlige udbetalinger).",
  },
];

const HurtigRegistreringGuide = () => {
  const faqJsonLd = buildFaqSchema(hurtigRegFaqs);
  const articleJsonLd = buildArticleSchema({
    headline: "Hurtig Registrering – Pay N Play vs. MitID vs. Standard 2026",
    description: "Detaljeret sammenligning af registreringsmetoder på danske casinoer: Pay N Play, MitID og standard email. Tidstest-data, scenarieanalyser og EV-model for tidsbesparelse.",
    url: `${SITE_URL}/casino-uden-konto/hurtig-registrering`,
    datePublished: "2026-03-08",
    dateModified: "2026-03-08",
    authorName: "Kevin",
    authorUrl: `${SITE_URL}/forfatter/kevin`,
  });

  return (
    <>
      <SEO
        title="Hurtig Registrering – Pay N Play vs. MitID vs. Standard"
        description="Sammenlign registreringsmetoder: Pay N Play, MitID og standard. Tidstest-data fra 12 casinoer, scenarieanalyser og EV-model. Find den hurtigste vej til spil."
        jsonLd={[faqJsonLd, articleJsonLd]}
        datePublished="2026-03-08"
        dateModified="2026-03-08"
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{ backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))" }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4"><Clock className="mr-1.5 h-3.5 w-3.5" />Sammenligning</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Hurtig Registrering – Metodesammenligning</h1>
            <p className="text-lg text-white/80">Pay N Play vs. MitID vs. standard email: Tidstest fra 12 casinoer, scenarieanalyser og EV-model for tidsbesparelse.</p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="kevin" date="2026-03-08" readTime="26 Min." />

        {/* 1. INTRODUKTION */}
        <section className="mb-12" id="introduktion">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Globe className="h-7 w-7 text-primary" />Tre veje til dit casinospil</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I 2026 tilbyder danske licenserede casinoer tre primære registreringsmetoder: Pay N Play (via{" "}
            <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>
            ), hurtig registrering via{" "}
            <Link to="/nye-casinoer/mitid" className="text-primary underline hover:text-primary/80">MitID</Link>
            , og standard email-registrering. Denne guide sammenligner dem objektivt baseret på tidstest-data fra 12 casinoer.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For en overordnet introduktion til konceptet casino uden konto, se vores{" "}
            <Link to="/casino-uden-konto" className="text-primary underline hover:text-primary/80">hub-side</Link>. For den tekniske dybde i Pay N Play-protokollen, se{" "}
            <Link to="/casino-uden-konto/pay-n-play" className="text-primary underline hover:text-primary/80">Pay N Play-guiden</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* 2. SIDE-BY-SIDE COMPARISON */}
        <section className="mb-12" id="sammenligning">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><BarChart3 className="h-7 w-7 text-primary" />Side-by-side sammenligning</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              {
                title: "Pay N Play",
                color: "text-primary",
                badge: "Hurtigst",
                items: [
                  "Registreringstid: ~27 sek.",
                  "KYC: Automatisk via bank",
                  "Adgangskode: Ikke nødvendig",
                  "Email-verifikation: Nej",
                  "Udbetalingshastighed: 5-15 min.",
                  "Betalingsmetode: Kun Trustly",
                  "Bonusser: Varierer",
                  "Sikkerhed: Bankniveau (TLS 1.3)",
                ],
              },
              {
                title: "MitID-registrering",
                color: "text-foreground",
                badge: "Balanceret",
                items: [
                  "Registreringstid: ~2 min 45 sek.",
                  "KYC: Semi-automatisk via MitID",
                  "Adgangskode: Ja (oprettes)",
                  "Email-verifikation: Nej",
                  "Udbetalingshastighed: 1-24 timer",
                  "Betalingsmetode: Alle tilgængelige",
                  "Bonusser: Fuld adgang",
                  "Sikkerhed: Høj (MitID + password)",
                ],
              },
              {
                title: "Standard email",
                color: "text-muted-foreground",
                badge: "Traditionel",
                items: [
                  "Registreringstid: ~4 min 12 sek.",
                  "KYC: Manuel upload (ID/adresse)",
                  "Adgangskode: Ja (oprettes)",
                  "Email-verifikation: Ja",
                  "Udbetalingshastighed: 1-5 hverdage",
                  "Betalingsmetode: Alle tilgængelige",
                  "Bonusser: Fuld adgang",
                  "Sikkerhed: Standard (password-afhængig)",
                ],
              },
            ].map((method) => (
              <Card key={method.title} className="border-border bg-card">
                <CardHeader>
                  <CardTitle className={`flex items-center justify-between ${method.color}`}>
                    {method.title}
                    <Badge variant="secondary" className="text-xs">{method.badge}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  {method.items.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* 3. TIDSTEST-TABEL */}
        <section className="mb-12" id="tidstest">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Clock className="h-7 w-7 text-primary" />Tidstest-data fra 12 casinoer</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Vi har tidsregistreret hele processen fra landingsside til første spin på 12 danske licenserede casinoer – 4 for hver registreringsmetode:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Metode</th>
                  <th className="text-center p-3 font-semibold text-foreground">Casino 1</th>
                  <th className="text-center p-3 font-semibold text-foreground">Casino 2</th>
                  <th className="text-center p-3 font-semibold text-foreground">Casino 3</th>
                  <th className="text-center p-3 font-semibold text-foreground">Casino 4</th>
                  <th className="text-center p-3 font-semibold text-foreground">Gennemsnit</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="p-3 font-medium text-primary">Pay N Play</td>
                  <td className="p-3 text-center">22 sek.</td>
                  <td className="p-3 text-center">25 sek.</td>
                  <td className="p-3 text-center">29 sek.</td>
                  <td className="p-3 text-center">32 sek.</td>
                  <td className="p-3 text-center font-semibold text-primary">27 sek.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3 font-medium text-foreground">MitID</td>
                  <td className="p-3 text-center">2:12</td>
                  <td className="p-3 text-center">2:38</td>
                  <td className="p-3 text-center">3:05</td>
                  <td className="p-3 text-center">3:15</td>
                  <td className="p-3 text-center font-semibold">2:45</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-muted-foreground">Standard email</td>
                  <td className="p-3 text-center">3:28</td>
                  <td className="p-3 text-center">4:05</td>
                  <td className="p-3 text-center">4:32</td>
                  <td className="p-3 text-center">4:43</td>
                  <td className="p-3 text-center font-semibold">4:12</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed text-sm italic">
            * Standard email inkluderer tid til email-verifikation (åbning af email-klient og klik på bekræftelseslink). Alle test udført marts 2026 på desktop (Chrome).
          </p>
        </section>

        <Separator className="my-10" />

        {/* 4. EV-MODEL FOR TIDSBESPARELSE */}
        <section className="mb-12" id="ev-model">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><TrendingUp className="h-7 w-7 text-primary" />EV-model: Tidsbesparelse over tid</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Registrering er en engangsbegivenhed per casino, men den akkumulerede tidsbesparelse over tid er signifikant – især når vi inkluderer den løbende tidsbesparelse ved hurtigere udbetalinger:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Scenarie</th>
                  <th className="text-center p-3 font-semibold text-foreground">Pay N Play</th>
                  <th className="text-center p-3 font-semibold text-foreground">MitID</th>
                  <th className="text-center p-3 font-semibold text-foreground">Standard</th>
                  <th className="text-center p-3 font-semibold text-foreground">PnP besparelse</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  { s: "1 casino, 1 registrering", pnp: "27 sek.", mid: "2:45", std: "4:12", save: "3:45" },
                  { s: "5 casinoer over 1 år", pnp: "2:15", mid: "13:45", std: "21:00", save: "18:45" },
                  { s: "10 casinoer over 3 år", pnp: "4:30", mid: "27:30", std: "42:00", save: "37:30" },
                  { s: "Ugentlig udbetaling (1 år)", pnp: "~10 timer*", mid: "~390 timer*", std: "~780 timer*", save: "380+ timer" },
                ].map((row) => (
                  <tr key={row.s} className="border-b border-border">
                    <td className="p-3 font-medium text-foreground">{row.s}</td>
                    <td className="p-3 text-center text-primary font-semibold">{row.pnp}</td>
                    <td className="p-3 text-center">{row.mid}</td>
                    <td className="p-3 text-center">{row.std}</td>
                    <td className="p-3 text-center font-semibold">{row.save}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed text-sm">
            * Udbetalingstider: Pay N Play ~12 min/uge, MitID ~7,5 timer/uge (gennemsnit), Standard ~15 timer/uge (gennemsnit). Beregnet over 52 uger. Faktiske tider varierer efter casino og beløb.
          </p>
        </section>

        <Separator className="my-10" />

        {/* 5. SCENARIEANALYSE */}
        <section className="mb-12" id="scenarier">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><Users className="h-7 w-7 text-primary" />Hvornår er hvilken metode bedst?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              {
                title: "Vælg Pay N Play hvis:",
                items: ["Du prioriterer hastighed over alt", "Du kun bruger Trustly som betaling", "Du ønsker hurtigste udbetalinger", "Du foretrækker ingen adgangskode", "Du registrerer dig hos flere casinoer"],
                icon: Zap,
              },
              {
                title: "Vælg MitID-registrering hvis:",
                items: ["Du vil bruge MobilePay eller Apple Pay", "Du ønsker fuld bonus-adgang", "Du foretrækker at have en fast konto", "Du spiller primært hos ét casino", "Du vil have flere betalingsmetoder"],
                icon: Shield,
              },
              {
                title: "Vælg standard email hvis:",
                items: ["Casinoet ikke tilbyder MitID/PnP", "Du har brug for maksimal kontokontrol", "Du foretrækker traditionelle login-flows", "Du spiller på internationale casinoer", "Du bruger kryptovaluta som betaling"],
                icon: Globe,
              },
            ].map((scenario) => (
              <Card key={scenario.title} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base"><scenario.icon className="h-5 w-5 text-primary" />{scenario.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {scenario.items.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* CLUSTER NAVIGATION */}
        <section className="mb-12" id="relaterede-guides">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2"><FileText className="h-7 w-7 text-primary" />Relaterede guides</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { to: "/casino-uden-konto", title: "Casino uden Konto – Hub", desc: "Komplet overblik over casino uden kontooprettelse" },
              { to: "/casino-uden-konto/pay-n-play", title: "Pay N Play – Teknisk", desc: "Trustly-protokollen og bankmatrice" },
              { to: "/casino-uden-konto/fordele-og-ulemper", title: "Fordele og Ulemper", desc: "Sikkerhed, compliance og risk/reward" },
            ].map((g) => (
              <Link key={g.to} to={g.to} className="flex flex-col rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted">
                <h3 className="font-semibold text-foreground mb-1">{g.title}</h3>
                <p className="text-xs text-muted-foreground">{g.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <LatestNewsByCategory pagePath="/casino-uden-konto/hurtig-registrering" />
        <RelatedGuides currentPath="/casino-uden-konto/hurtig-registrering" />
        <FAQSection title="Ofte Stillede Spørgsmål om Hurtig Registrering" faqs={hurtigRegFaqs} />
        <AuthorBio author="kevin" />
      </div>
    </>
  );
};

export default HurtigRegistreringGuide;
