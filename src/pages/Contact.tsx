import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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
      question: "Hvem kan kontakte jer?",
      answer: (
        <>
          Vores kontaktside er primært beregnet til casino partnerskaber, affiliate henvendelser, kommercielle forslag og presseforespørgsler. Denne kontaktside er ikke beregnet til brugersupport. For information om bonusser, se vores guides til{" "}
          <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>,{" "}
          <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link> og{" "}
          <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">omsætningskrav</Link>.
        </>
      ),
    },
    {
      question: "Hvor hurtigt svarer I?",
      answer:
        "Vi bestræber os på at besvare alle seriøse henvendelser inden for 1-3 hverdage. I travle perioder kan svartiden dog være lidt længere.",
    },
    {
      question: "Kan jeg anmelde mit casino hos jer?",
      answer: (
        <>
          Ja, vi er altid åbne for at anmelde nye casinoer. Casinoet skal have gyldig dansk licens fra Spillemyndigheden. Send os en henvendelse via formularen, og vi vender tilbage med mere information. Vi anmelder bl.a.{" "}
          <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>,{" "}
          <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">indskudsbonusser</Link>,{" "}
          <Link to="/bonus-uden-indbetaling" className="text-primary underline hover:text-primary/80">bonusser uden indbetaling</Link> og{" "}
          <Link to="/live-casino" className="text-primary underline hover:text-primary/80">live casino</Link>-tilbud. Se også vores{" "}
          <Link to="/nye-casinoer" className="text-primary underline hover:text-primary/80">oversigt over nye casinoer</Link>.
        </>
      ),
    },
    {
      question: "Tilbyder I affiliate samarbejder?",
      answer: (
        <>
          Ja, vi samarbejder med udvalgte affiliates og mediepartnere. Kontakt os via formularen med information om dit forslag, så gennemgår vi det. Læs mere{" "}
          <Link to="/about" className="text-primary underline hover:text-primary/80">om os</Link>{" "}
          og vores tilgang til anmeldelser.
        </>
      ),
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Hvem kan kontakte jer?", acceptedAnswer: { "@type": "Answer", text: "Vores kontaktside er primært beregnet til casino partnerskaber, affiliate henvendelser, kommercielle forslag og presseforespørgsler. Denne kontaktside er ikke beregnet til brugersupport." } },
      { "@type": "Question", name: "Hvor hurtigt svarer I?", acceptedAnswer: { "@type": "Answer", text: "Vi bestræber os på at besvare alle seriøse henvendelser inden for 1-3 hverdage. I travle perioder kan svartiden dog være lidt længere." } },
      { "@type": "Question", name: "Kan jeg anmelde mit casino hos jer?", acceptedAnswer: { "@type": "Answer", text: "Ja, vi er altid åbne for at anmelde nye casinoer. Casinoet skal have gyldig dansk licens fra Spillemyndigheden. Send os en henvendelse via formularen, og vi vender tilbage med mere information." } },
      { "@type": "Question", name: "Tilbyder I affiliate samarbejder?", acceptedAnswer: { "@type": "Answer", text: "Ja, vi samarbejder med udvalgte affiliates og mediepartnere. Kontakt os via formularen med information om dit forslag, så gennemgår vi det." } },
    ],
  };

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
      <Helmet>
        <title>Kontakt – Casinoaftaler.dk | Erhverv & Presse</title>
        <meta
          name="description"
          content="Kontakt Casinoaftaler.dk for casino partnerskaber, affiliate henvendelser, kommercielle forslag og presseforespørgsler."
        />
        <link rel="canonical" href="https://casinoaftaler.dk/contact" />
        <meta property="og:title" content="Kontakt – Casinoaftaler.dk" />
        <meta
          property="og:description"
          content="Kontakt Casinoaftaler.dk for casino partnerskaber, affiliate henvendelser og presseforespørgsler."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://casinoaftaler.dk/contact" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

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
        {/* Meta info bar */}
        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            <span>
              Kontakt:{" "}
              <span className="font-medium text-foreground">Casinoaftaler</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            <span>
              Siden opdateret:{" "}
              <span className="font-medium text-foreground">11-02-2026</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>
              Svartid:{" "}
              <span className="font-medium text-foreground">1-3 hverdage</span>
            </span>
          </div>
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
            <Link to="/about" className="text-primary underline hover:text-primary/80">om os</Link>{" "}
            og vores anmeldelsesproces.
          </p>
        </section>

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
                  <p className="text-sm text-muted-foreground">
                    Alle seriøse henvendelser bliver gennemgået og besvaret.
                    Læs mere{" "}
                    <Link to="/about" className="text-primary underline hover:text-primary/80">om os</Link>{" "}
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

        <Separator className="my-10" />

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            <HelpCircle className="mr-2 inline h-7 w-7 text-primary" />
            Ofte stillede spørgsmål
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {contactFaqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="rounded-lg border border-border bg-card px-6"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <RelatedGuides currentPath="/contact" />
      </div>
    </>
  );
}
