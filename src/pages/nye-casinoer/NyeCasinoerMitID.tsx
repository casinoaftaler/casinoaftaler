import { Link } from "react-router-dom";
import mitidHero from "@/assets/heroes/nye-casinoer-mitid-hero.jpg";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, Sparkles, CheckCircle2, Smartphone, Zap } from "lucide-react";
import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/seo";
import type { ReactNode } from "react";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  { question: "Hvad er MitID, og hvorfor kræves det på nye casinoer?", answer: "MitID er Danmarks digitale identitetsløsning, der erstattede NemID i 2023. Alle danske licenserede casinoer er lovmæssigt forpligtet til at verificere spilleres identitet via MitID som led i KYC-kravene (Know Your Customer). Det sikrer, at kun myndige danske borgere kan spille, forhindrer identitetsmisbrug og muliggør automatisk ROFUS-kontrol." },
  { question: "Hvor lang tid tager MitID-verifikation hos nye casinoer?", answer: (
    <>
      MitID-verifikation på nye casinoer tager typisk under 2 minutter. De bedste nye casinoer har integreret MitID direkte i registreringsprocessen, så verifikation sker i realtid. Det eliminerer den traditionelle ventetid på manuel dokumentgennemgang. Kombineret med <Link to="/nye-casinoer/trustly" className={linkClass}>Trustly Pay N Play</Link> kan hele registreringen ske på under 60 sekunder.
    </>
  )},
  { question: "Kan man oprette en casinokonto uden MitID?", answer: "Nej, alle danske licenserede casinoer kræver MitID-verifikation som betingelse for kontooprettelse. Det er et lovkrav fra Spillemyndigheden, der sikrer spillerbeskyttelse, ROFUS-tilslutning og forebyggelse af hvidvask. Casinoer uden MitID-krav opererer uden dansk licens og bør undgås – se vores guide til nye casinoer med dansk licens." },
  { question: "Er mine data sikre, når jeg bruger MitID på nye casinoer?", answer: "Ja, MitID bruger bankgraderet kryptering (256-bit SSL) og multi-faktor-autentificering. Casinoet modtager kun de nødvendige identifikationsdata – ikke dine bankoplysninger, CPR-nummer eller andre følsomme data. MitID er udviklet og driftet af Nets/Nexi under streng regulering fra Digitaliseringsstyrelsen." },
  { question: "Hvad hvis jeg har problemer med MitID på et nyt casino?", answer: (
    <>
      Kontakt først casinoets kundeservice – de har typisk erfaring med MitID-problemer. Hvis problemet er teknisk med MitID selv, kan du kontakte MitID-supporten på mitid.dk/support. De fleste nye casinoer har integreret alternative verifikationsmetoder som fallback. Er du i tvivl om et casinos legitimitet, så tjek vores liste over <Link to="/nye-casinoer/dansk-licens" className={linkClass}>nye casinoer med dansk licens</Link>.
    </>
  )},
  { question: "Fungerer MitID på mobiltelefon hos nye casinoer?", answer: "Ja, MitID fungerer fuldt ud på mobil. De fleste nye casinoer bruger MitID-appen til verifikation, som giver den hurtigste og nemmeste oplevelse. Du modtager en notifikation i MitID-appen, swiper for at godkende, og verifikationen er gennemført. Det fungerer på både iOS og Android." },
];

const NyeCasinoerMitID = () => {
  const articleSchema = buildArticleSchema({ headline: "Nye Casinoer med MitID – Sikker Verifikation 2026", description: "Nye casinoer med hurtig MitID-verifikation. Opret konto på under 2 minutter hos nye danske spillesteder.", url: `${SITE_URL}/nye-casinoer/mitid`, datePublished: "2026-02-05", dateModified: "2026-02-16", authorName: "Kevin", authorUrl: `${SITE_URL}/forfatter/kevin` });
  const faqSchema = buildFaqSchema(faqs);

  return (
    <>
      <SEO title="Nye Casinoer med MitID – Hurtig Verifikation 2026" description="Find nye casinoer med MitID-verifikation i 2026. Opret konto på under 2 minutter med sikker digital identifikation." jsonLd={[articleSchema, faqSchema]} />

      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ background: 'linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))' }}>
        <div className="container"><div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4"><Smartphone className="mr-1.5 h-3.5 w-3.5" />MitID Verifikation</Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Nye Casinoer med MitID</h1>
          <p className="text-lg text-white/80">Opret konto på under 2 minutter med sikker MitID-verifikation hos de nyeste danske online casinoer.</p>
        </div></div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="kevin" date="16-02-2026" readTime="8 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={mitidHero} alt="MitID verifikation hos nye casinoer" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">MitID hos nye casinoer i Danmark</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">MitID er den obligatoriske digitale identitetsløsning for alle <Link to="/nye-casinoer" className={linkClass}>nye casinoer</Link> med dansk licens. Verifikationen sikrer, at kun myndige danske borgere kan oprette konti, og at ROFUS-registret automatisk kontrolleres ved registrering. Det er din garanti for, at casinoet opererer lovligt.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">De bedste nye casinoer i 2026 har integreret MitID sømløst i registreringsprocessen. Du åbner casinoet, klikker 'Opret konto', verificerer med MitID-appen, og din konto er oprettet – på under 2 minutter. Nogle nye casinoer kombinerer MitID med <Link to="/nye-casinoer/trustly" className={linkClass}>Trustly Pay N Play</Link>, så registrering og indbetaling sker i ét trin – under 60 sekunder totalt.</p>
          <p className="text-muted-foreground leading-relaxed">MitID-verifikation er din garanti for, at casinoet opererer lovligt under dansk licens fra <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link>. Casinoer, der ikke kræver MitID, har ikke dansk licens og bør undgås – se vores guide til <Link to="/nye-casinoer/dansk-licens" className={linkClass}>nye casinoer med dansk licens</Link>.</p>
        </section>

        <InlineCasinoCards title="Nye Casinoer med MitID" />

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sådan fungerer MitID på nye casinoer</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            MitID-processen hos nye casinoer er designet til at være hurtig og intuitiv. Her er det typiske flow:
          </p>
          <div className="space-y-3">
            {[
              { step: "1. Klik 'Opret konto'", desc: "Du besøger det nye casino og klikker på oprettelsesknappen. Casinoet viderestiller dig til MitID-verifikation." },
              { step: "2. Åbn MitID-appen", desc: "Du modtager en notifikation i MitID-appen på din smartphone. Alternativt kan du bruge MitID med chip/kodelæser." },
              { step: "3. Godkend verifikation", desc: "Du swiper i MitID-appen for at godkende. Casinoet modtager kun dit navn og alder – ikke bankoplysninger eller CPR-nummer." },
              { step: "4. ROFUS-kontrol", desc: "Casinoet checker automatisk ROFUS-registret. Hvis du er registreret, kan du ikke oprette en konto. Det sker helt automatisk." },
              { step: "5. Konto oprettet", desc: "Din konto er nu oprettet og verificeret. Du kan indbetale og spille med det samme – ingen yderligere dokumentation krævet." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.step}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Fordele ved MitID på nye casinoer</h2>
          <div className="space-y-3">
            {["Hurtig verifikation på under 2 minutter – ingen manuelle dokumentuploads", "Automatisk ROFUS-tjek ved registrering – beskytter udelukkede spillere", "Bankgraderet sikkerhed med multi-faktor-autentificering (256-bit SSL)", "Garanti for at casinoet har gyldig dansk licens fra Spillemyndigheden", "Forhindrer identitetsmisbrug og beskytter mindreårige spillere", "Sømløs mobiloplevelse via MitID-appen – fungerer på både iOS og Android"].map((b) => (
              <div key={b} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" /><p className="text-sm text-muted-foreground">{b}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">MitID sikkerhed og databeskyttelse</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            MitID er designet med sikkerhed som højeste prioritet. Her er de vigtigste sikkerhedsgarantier for casinospillere:
          </p>
          <div className="space-y-3">
            {[
              { title: "Multi-faktor-autentificering", desc: "MitID kræver altid mindst to faktorer: noget du har (din telefon/chip) og noget du ved (din kode/biometri). Det gør det næsten umuligt for uautoriserede at bruge din identitet." },
              { title: "Minimale data delt", desc: "Casinoet modtager kun de lovpligtige oplysninger: dit navn, alder og om du er ROFUS-registreret. Ingen bankoplysninger, CPR-nummer eller adresse deles via MitID." },
              { title: "Statssikret infrastruktur", desc: "MitID driftes af Nets/Nexi under streng regulering fra Digitaliseringsstyrelsen. Systemet har 99,9% uptime og gennemgår løbende sikkerhedsaudits." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Udforsk flere guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { to: "/nye-casinoer", label: "Nye Casinoer – Hovedside", desc: "Alle nye casinoer i Danmark" },
              { to: "/nye-casinoer/dansk-licens", label: "Med Dansk Licens", desc: "Kun licenserede nye casinoer" },
              { to: "/nye-casinoer/trustly", label: "Med Trustly", desc: "Trustly Pay N Play casinoer" },
              { to: "/nye-casinoer/hurtig-udbetaling", label: "Hurtig Udbetaling", desc: "De hurtigste nye casinoer" },
            ].map((link) => (
              <Link key={link.to} to={link.to} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50">
                <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" /><div><h3 className="font-semibold text-sm">{link.label}</h3><p className="text-xs text-muted-foreground">{link.desc}</p></div>
              </Link>
            ))}
          </div>
        </section>

        <AuthorBio author="kevin" />
        <RelatedGuides currentPath="/nye-casinoer/mitid" />
        <FAQSection title="Ofte stillede spørgsmål om MitID og nye casinoer" faqs={faqs} />
      </div>
    </>
  );
};

export default NyeCasinoerMitID;