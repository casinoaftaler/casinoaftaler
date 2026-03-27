import contactHero from "@/assets/heroes/contact-hero.jpg";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import spillemyndighedenForside from "@/assets/screenshots/spillemyndigheden-dk-forside.png";
import betiniaLobby from "@/assets/screenshots/betinia-lobby.webp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Mail,
  Building2,
  Handshake,
  Newspaper,
  Send,
  CheckCircle2,
  Users,
  Megaphone,
  BadgeCheck,
  HelpCircle,
  User,
  CalendarDays,
  BookOpen,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { RelatedGuides } from "@/components/RelatedGuides";

const INQUIRY_TYPES = [
  "Casino Partnerskab",
  "Affiliate / Kommercielt Samarbejde",
  "Presse / Medier",
  "Anden Kommerciel Henvendelse",
] as const;

const COOPERATION_AREAS = [
  { icon: Handshake, label: "Casino partnerskaber" },
  { icon: Users, label: "Affiliate aftaler" },
  { icon: Megaphone, label: "Kampagner og promotions" },
  { icon: Newspaper, label: "Presse- og mediehenvendelser" },
];

export default function Contact() {
  const { toast } = useToast();
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [inquiryType, setInquiryType] = useState("");

  const contactFaqs = [
    {
      question: "Hvem henvender kontaktsiden sig til, og hvad kan I hjælpe med?",
      answer: (
        <>
          Kontaktsiden er udelukkende til erhvervsmæssige henvendelser – vi besvarer ikke spørgsmål om individuelle casinokonti eller bonusaktivering. Vi modtager henvendelser fra casinooperatører, der ønsker at blive anmeldt, affiliate-partnere, medievirksomheder og kommercielle samarbejdspartnere. Alle casinoer vi anmelder skal have gyldig dansk licens fra Spillemyndigheden. Har du spørgsmål om bonusvilkår, anbefaler vi vores guides til{" "}
          <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>,{" "}
          <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">omsætningskrav</Link> og{" "}
          <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link>. Har du spillerelaterede problemer, henviser vi til{" "}
          <Link to="/ansvarligt-spil" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>-ressourcer.
        </>
      ),
    },
    {
      question: "Hvor hurtigt besvarer I henvendelser, og hvad sker der efter indsendelsen?",
      answer:
        "Vi bestræber os på at besvare alle seriøse erhvervshenvendelser inden for 1–3 hverdage. I travle perioder – særligt omkring store kampagneperioder som jul, nytår og store sportsbegivenheder – kan svartiden forlænges til op til 5 hverdage. Når vi modtager din henvendelse, vurderer vi først relevansen og kategoriserer den. Casino-partnerskabsforespørgsler gennemgår vores interne evalueringsproces, hvor vi tjekker licensstatus, bonusvilkår og spiludvalg. Affiliate-henvendelser videresendes til vores kommercielle team. Du modtager altid en bekræftelse efter afsendelse, og vi kontakter dig via den oplyste e-mail.",
    },
    {
      question: "Hvordan kan mit casino blive anmeldt på Casinoaftaler?",
      answer: (
        <>
          For at blive anmeldt skal dit casino have en aktiv dansk spillelicens fra Spillemyndigheden – dette er et ufravigeligt krav. Send en henvendelse via formularen med casinoets navn, licensnummer, bonusstruktur og kontaktoplysninger. Vores redaktion tester casinoet grundigt over minimum 2 uger, hvor vi evaluerer{" "}
          <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonus</Link>, spiludvalg,{" "}
          <Link to="/betalingsmetoder" className="text-primary underline hover:text-primary/80">betalingsmetoder</Link>, udbetalingshastighed, kundeservice og{" "}
          <Link to="/live-casino" className="text-primary underline hover:text-primary/80">live casino</Link>-tilbud. Vi publicerer kun anmeldelser af casinoer, der lever op til vores kvalitetsstandarder. Se eksempler i vores{" "}
          <Link to="/casino-anmeldelser" className="text-primary underline hover:text-primary/80">casino anmeldelser</Link>.
        </>
      ),
    },
    {
      question: "Tilbyder I affiliate- og mediesamarbejder, og hvad kræver det?",
      answer: (
        <>
          Vi samarbejder med udvalgte affiliates, mediepartnere og indholdsproducenter inden for den danske gambling-industri. Vi prioriterer partnere med dokumenteret trafik, kvalitetsindhold og fokus på det regulerede danske marked. Kontakt os via formularen med information om dit medie, trafikvolumen og foreslået samarbejdsform. Vi vurderer alle henvendelser individuelt og vender tilbage inden for 5 hverdage. Læs mere{" "}
          <Link to="/om" className="text-primary underline hover:text-primary/80">om os</Link>{" "}
          og vores redaktionelle principper, der sikrer uafhængighed i vores anmeldelser uanset kommercielle partnerskaber.
        </>
      ),
    },
    {
      question: "Hvad er jeres redaktionelle politik for casino-anmeldelser?",
      answer: (
        <>
          Vores anmeldelser er uafhængige og baseret på faktisk testning af hvert enkelt casino. Vi modtager provision via affiliate-links, men dette påvirker aldrig vores vurdering, rangering eller anbefalinger. Hvert casino evalueres på seks parametre: licens og sikkerhed,{" "}
          <Link to="/casino-bonus" className="text-primary underline hover:text-primary/80">bonusvilkår</Link>, spiludvalg og{" "}
          <Link to="/spiludviklere" className="text-primary underline hover:text-primary/80">spiludviklere</Link>, betalingsmetoder, udbetalingshastighed og kundeservice. Anmeldelserne opdateres minimum kvartalsvis og straks ved væsentlige ændringer i bonusvilkår eller licensstatus. Vi offentliggør altid vores metodik og eventuelle interessekonflikter.
        </>
      ),
    },
    {
      question: "Kan jeg rapportere fejl eller foreslå forbedringer til jeres indhold?",
      answer:
        "Ja, vi modtager gerne feedback om vores indhold. Hvis du opdager en fejl i en anmeldelse – fx forældede bonusvilkår, forkerte omsætningskrav eller ændrede betalingsmetoder – er du velkommen til at kontakte os via formularen med emnet 'Anden Kommerciel Henvendelse'. Angiv specifikt hvilken side der indeholder fejlen og hvad den korrekte information er. Vi verificerer alle rapporterede fejl og opdaterer indholdet inden for 48 timer. Din feedback hjælper os med at holde alle anmeldelser og guides aktuelle og præcise for danske spillere.",
    },
  ];

  const faqJsonLd = buildFaqSchema(contactFaqs);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const company = formData.get("company") as string;
    const contactPerson = formData.get("contactPerson") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const subject = encodeURIComponent(
      `[${inquiryType}] Henvendelse fra ${company}`
    );
    const body = encodeURIComponent(
      `Virksomhed / Medie: ${company}\nKontaktperson: ${contactPerson}\nEmail: ${email}\nHenvendelsestype: ${inquiryType}\n\nBesked:\n${message}`
    );

    window.location.href = `mailto:info@casinoaftaler.dk?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      toast({
        title: "Tak for din henvendelse",
        description:
          "Vi gennemgår din besked og vender tilbage til dig.",
      });
    }, 500);
  };

  return (
    <>
      <SEO
        title="Kontakt – Erhverv & Presse | Casinoaftaler"
        description="Kontakt Casinoaftaler.dk for partnerskaber, affiliate samarbejde, kommercielle forslag og pressehenvendelser. Vi svarer inden for 48 timer."
        jsonLd={faqJsonLd}
      />

      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: heroBackgroundImage
            ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})`
            : "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Building2 className="mr-1.5 h-3.5 w-3.5" />
              Erhverv & Presse
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Kontakt Casinoaftaler.dk
            </h1>
            <p className="text-lg text-white/80">
              For casino partnerskaber, affiliate henvendelser, kommercielle
              forslag og presseforespørgsler.
            </p>
            <p className="mt-2 text-sm text-white/60">
              Denne kontaktside er ikke beregnet til brugersupport.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="ajse" readTime="3 min" showAffiliateDisclaimer={false} />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={contactHero} alt="Kontakt os – professionelt kontor" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* Intro with internal links */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Samarbejd med os</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Casinoaftaler.dk samarbejder med licenserede og ansvarlige
            casinooperatører, affiliates og mediepartnere. Vi dækker hele
            spektret af bonusser – fra{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>{" "}
            og{" "}
            <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link>{" "}
            til{" "}
            <Link to="/bonus-uden-indbetaling" className="text-primary underline hover:text-primary/80">bonusser uden indbetaling</Link>{" "}
            og{" "}
            <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">indskudsbonusser</Link>.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vi gennemgår alle bonusser grundigt, herunder{" "}
            <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">omsætningskrav</Link>,{" "}
            <Link to="/no-sticky-bonus" className="text-primary underline hover:text-primary/80">no-sticky bonusser</Link>{" "}
            og{" "}
            <Link to="/bonus-uden-omsaetningskrav" className="text-primary underline hover:text-primary/80">bonusser uden omsætningskrav</Link>.
            Læs mere{" "}
            <Link to="/om" className="text-primary underline hover:text-primary/80">om os</Link>{" "}
            og vores anmeldelsesproces.
          </p>
        </section>

        <ReviewScreenshot
          src={spillemyndighedenForside}
          alt="Spillemyndighedens hjemmeside – den officielle danske reguleringsmyndighed for online gambling"
          caption="Vi samarbejder med Spillemyndigheden og følger dansk spillelovgivning – kontakt os ved spørgsmål"
        />

        <ReviewScreenshot
          src={betiniaLobby}
          alt="Betinia casino lobby – eksempel på et af de casinoer vi anmelder og overvåger"
          caption="Vi anmelder og opdaterer løbende information om danske licenserede casinoer som Betinia"
        />

        <Separator className="my-10" />

        {/* Contact form + sidebar */}
        <section className="mb-12">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="mb-4 text-3xl font-bold">Send os en henvendelse</h2>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Udfyld formularen herunder, så vender vi tilbage til dig hurtigst muligt. Alle felter er påkrævede.
              </p>
              <Card className="border-border bg-card">
                <CardContent className="p-6 md:p-8">
                  {submitted ? (
                    <div className="flex flex-col items-center gap-4 py-12 text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <CheckCircle2 className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-semibold">
                        Tak for din henvendelse
                      </h3>
                      <p className="max-w-sm text-muted-foreground">
                        Vi gennemgår din besked og vender tilbage til dig.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setSubmitted(false)}
                        className="mt-4"
                      >
                        Send en ny henvendelse
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="company">Virksomhed / Medienavn</Label>
                          <Input
                            id="company"
                            name="company"
                            placeholder="Dit virksomhedsnavn"
                            required
                            maxLength={100}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contactPerson">Kontaktperson</Label>
                          <Input
                            id="contactPerson"
                            name="contactPerson"
                            placeholder="Fulde navn"
                            required
                            maxLength={100}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">E-mailadresse</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="dig@virksomhed.dk"
                          required
                          maxLength={255}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Henvendelsestype</Label>
                        <Select
                          value={inquiryType}
                          onValueChange={setInquiryType}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Vælg henvendelsestype" />
                          </SelectTrigger>
                          <SelectContent>
                            {INQUIRY_TYPES.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Besked</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Beskriv din henvendelse..."
                          rows={5}
                          required
                          maxLength={2000}
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full gap-2"
                        disabled={sending || !inquiryType}
                      >
                        <Send className="h-4 w-4" />
                        {sending ? "Sender..." : "Send Henvendelse"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4 lg:col-span-2">
              <Card className="border-border bg-card">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-lg">Direkte Kontakt</h3>
                  <a
                    href="mailto:info@casinoaftaler.dk"
                    className="flex items-center gap-3 text-primary hover:underline"
                  >
                    <Mail className="h-5 w-5" />
                    info@casinoaftaler.dk
                  </a>
                   <a
                    href="https://about.me/casinoaftaler"
                    target="_blank"
                    rel="noopener"
                    className="flex items-center gap-3 text-primary hover:underline"
                  >
                    <User className="h-5 w-5" />
                    about.me/casinoaftaler
                  </a>
                  <a
                    href="https://medium.com/@casinoaftaler"
                    target="_blank"
                    rel="noopener"
                    className="flex items-center gap-3 text-primary hover:underline"
                  >
                    <BookOpen className="h-5 w-5" />
                    Følg os på Medium
                  </a>
                  <a
                    href="https://medium.com/@casinoaftaler/how-to-choose-a-safe-online-casino-in-denmark-89e5bbb095a5"
                    target="_blank"
                    rel="noopener"
                    className="flex items-center gap-3 text-primary hover:underline"
                  >
                    <Newspaper className="h-5 w-5" />
                    Vores guide på Medium
                  </a>
                  <a
                    href="https://dk.trustpilot.com/review/casinoaftaler.dk"
                    target="_blank"
                    rel="noopener"
                    className="flex items-center gap-3 text-primary hover:underline"
                  >
                    <BadgeCheck className="h-5 w-5" />
                    Anmeld os på Trustpilot
                  </a>
                  <p className="text-sm text-muted-foreground">
                    Alle seriøse henvendelser bliver gennemgået og besvaret.
                    Læs mere{" "}
                    <Link to="/om" className="text-primary underline hover:text-primary/80">om os</Link>{" "}
                    og vores værdier.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">
                      Samarbejde med Casinoaftaler
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Casinoaftaler samarbejder med licenserede og ansvarlige
                    casinooperatører, affiliates og mediepartnere. Vi dækker alt fra{" "}
                    <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>{" "}
                    til{" "}
                    <Link to="/nye-casinoer" className="text-primary underline hover:text-primary/80">nye casinoer</Link>.
                  </p>
                  <ul className="space-y-3">
                    {COOPERATION_AREAS.map(({ icon: Icon, label }) => (
                      <li
                        key={label}
                        className="flex items-center gap-3 text-sm"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        {label}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <LatestNewsByCategory pagePath="/kontakt" />
        <RelatedGuides currentPath="/kontakt" />
        <FAQSection title="Ofte stillede spørgsmål" faqs={contactFaqs} />
        <AuthorBio author="ajse" showCommunity={false} />
      </div>
    </>
  );
}
