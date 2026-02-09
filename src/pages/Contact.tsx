import { useState } from "react";
import { Link } from "react-router-dom";
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
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [inquiryType, setInquiryType] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const company = formData.get("company") as string;
    const contactPerson = formData.get("contactPerson") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    // Build mailto link as fallback since we don't have a backend email service
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
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-muted/30">
        <div className="container py-16 md:py-24 text-center">
          <div className="mx-auto max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4" />
              Erhverv & Presse
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Kontakt
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              For casino partnerskaber, affiliate henvendelser, kommercielle forslag
              og presseforespørgsler.
            </p>
            <p className="text-sm text-muted-foreground/70">
              Denne kontaktside er ikke beregnet til brugersupport.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12 md:py-16">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-5">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6 md:p-8">
                {submitted ? (
                  <div className="flex flex-col items-center gap-4 py-12 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle2 className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">
                      Tak for din henvendelse
                    </h2>
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
                    <div className="space-y-1.5">
                      <h2 className="text-xl font-semibold">
                        Send os en henvendelse
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Alle felter er påkrævede.
                      </p>
                    </div>

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
          <div className="space-y-8 lg:col-span-2">
            {/* Direct Contact */}
            <Card>
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
                </p>
              </CardContent>
            </Card>

            {/* Working With Us */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">
                    Samarbejde med CasinOAftaler
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  CasinOAftaler samarbejder med licenserede og ansvarlige
                  casinooperatører, affiliates og mediepartnere.
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
      </div>
    </div>
  );
}
