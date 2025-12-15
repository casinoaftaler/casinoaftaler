import { Link } from "react-router-dom";
import { FileText, Scale, AlertTriangle, Ban, RefreshCw, Gavel } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))',
          }}
        />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-[hsl(210_80%_60%)] blur-xl" />
          <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-[hsl(260_70%_60%)] blur-xl" />
        </div>
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center text-white">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-white/10 p-4">
                <Scale className="h-12 w-12" />
              </div>
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Vilkår og Betingelser</h1>
            <p className="text-lg text-white/80">
              Sidst opdateret: December 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl space-y-8">
            
            {/* Introduction */}
            <Card className="border-border bg-card">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="mb-3 text-2xl font-bold">1. Generelle vilkår</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Ved at bruge Casinoaftaler.dk accepterer du disse vilkår og betingelser. Hvis du ikke accepterer vilkårene, bedes du undlade at bruge vores website. Vi forbeholder os retten til at ændre disse vilkår når som helst uden forudgående varsel.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Website Purpose */}
            <Card className="border-border bg-card">
              <CardContent className="p-6 md:p-8">
                <h2 className="mb-4 text-2xl font-bold">2. Websitets formål</h2>
                <p className="mb-4 text-muted-foreground leading-relaxed">
                  Casinoaftaler.dk er en informationsplatform, der sammenligner og anmelder online casinoer og deres bonustilbud. Vores formål er at:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Give objektive og opdaterede oplysninger om casinobonusser
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Hjælpe brugere med at træffe informerede beslutninger
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Fremme ansvarligt spil
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Levere uddannelsesmæssigt indhold om gambling
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Age Restriction */}
            <Card className="border-border bg-card border-l-4 border-l-destructive">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-destructive/10 p-3">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                  </div>
                  <div>
                    <h2 className="mb-3 text-2xl font-bold">3. Aldersbegrænsning</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Du skal være mindst 18 år for at bruge dette website.</strong> Online gambling er kun lovligt for personer over 18 år i Danmark. Vi opfordrer til ansvarligt spil og anbefaler, at du sætter grænser for dit forbrug og tid brugt på gambling.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Affiliate Disclosure */}
            <Card className="border-border bg-card">
              <CardContent className="p-6 md:p-8">
                <h2 className="mb-4 text-2xl font-bold">4. Affiliate-oplysning</h2>
                <p className="mb-4 text-muted-foreground leading-relaxed">
                  Casinoaftaler.dk er en affiliate-partner med de casinoer, vi anmelder og anbefaler. Dette betyder:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Vi modtager kommission, når brugere tilmelder sig via vores links
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Vores anmeldelser er dog uafhængige og baseret på objektive kriterier
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Affiliate-relationer påvirker ikke vores vurderinger
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Vi anbefaler kun licenserede og regulerede casinoer
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <Card className="border-border bg-card">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Ban className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-4 text-2xl font-bold">5. Ansvarsfraskrivelse</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p className="leading-relaxed">
                        Informationen på dette website er kun til generel vejledning. Vi gør vores bedste for at sikre nøjagtighed, men:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          Vi garanterer ikke for fuldstændigheden eller nøjagtigheden af oplysningerne
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          Bonusvilkår kan ændres uden varsel af casinoerne
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          Du bør altid verificere vilkår direkte hos casinoet
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          Vi er ikke ansvarlige for tab relateret til gambling
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card className="border-border bg-card">
              <CardContent className="p-6 md:p-8">
                <h2 className="mb-4 text-2xl font-bold">6. Immaterielle rettigheder</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Alt indhold på Casinoaftaler.dk, herunder tekst, grafik, logoer, billeder og software, er beskyttet af ophavsret og tilhører Casinoaftaler.dk eller vores licensgivere. Du må ikke kopiere, distribuere, modificere eller gengive vores indhold uden skriftlig tilladelse.
                </p>
              </CardContent>
            </Card>

            {/* User Conduct */}
            <Card className="border-border bg-card">
              <CardContent className="p-6 md:p-8">
                <h2 className="mb-4 text-2xl font-bold">7. Brugeradfærd</h2>
                <p className="mb-4 text-muted-foreground leading-relaxed">
                  Ved brug af vores website accepterer du at:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Ikke misbruge eller forsøge at hacke websitet
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Ikke bruge automatiserede værktøjer til at indsamle data
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Ikke uploade skadeligt indhold eller malware
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Overholde alle gældende love og regler
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Third Party Links */}
            <Card className="border-border bg-card">
              <CardContent className="p-6 md:p-8">
                <h2 className="mb-4 text-2xl font-bold">8. Tredjepartslinks</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Vores website indeholder links til eksterne casinoer og andre tredjeparter. Vi er ikke ansvarlige for indholdet eller praksis på disse websites. Når du forlader Casinoaftaler.dk, opfordrer vi dig til at læse vilkårene for den pågældende side.
                </p>
              </CardContent>
            </Card>

            {/* Changes */}
            <Card className="border-border bg-card">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <RefreshCw className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="mb-3 text-2xl font-bold">9. Ændringer af vilkår</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Vi forbeholder os retten til at ændre disse vilkår når som helst. Ændringer træder i kraft ved offentliggørelse på denne side. Din fortsatte brug af websitet efter ændringer udgør accept af de nye vilkår.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card className="border-border bg-card">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Gavel className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="mb-3 text-2xl font-bold">10. Lovvalg og værneting</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Disse vilkår er underlagt dansk ret. Eventuelle tvister skal afgøres ved de danske domstole. Ved at bruge dette website accepterer du denne jurisdiktion.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Back Link */}
            <div className="text-center pt-4">
              <Link 
                to="/" 
                className="text-primary hover:underline"
              >
                ← Tilbage til forsiden
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
