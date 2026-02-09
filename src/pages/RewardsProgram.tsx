import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift, Video, UserCircle, Sparkles, Info, ArrowRight, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function RewardsProgram() {
  const { user, loading } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4rem)] relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent -z-10" />

      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-14 md:py-20"
        style={{
          background: "linear-gradient(135deg, hsl(260 70% 20%), hsl(250 60% 15%) 40%, hsl(210 80% 20%))",
        }}
      >
        <div className="container relative z-10">
          <div className="mx-auto max-w-2xl text-center space-y-4">
            <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-primary/15 backdrop-blur-sm border border-primary/20 flex items-center justify-center">
              <Gift className="h-10 w-10 text-primary" />
            </div>
            <Badge className="bg-primary/20 text-primary border-primary/30 text-sm px-4 py-1">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Optjen Bonus Spins
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Rewards Program
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-lg mx-auto">
              Optjen ekstra spins ved at bidrage til fællesskabet og udfylde din profil.
            </p>
          </div>
        </div>

        {/* Decorative blur circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-primary opacity-10 blur-3xl"
            style={{ animation: "float 6s ease-in-out infinite" }}
          />
          <div
            className="absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-purple-500 opacity-10 blur-3xl"
            style={{ animation: "float 8s ease-in-out infinite 1s" }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-32 w-32 rounded-full bg-blue-500 opacity-10 blur-3xl"
            style={{ animation: "float 7s ease-in-out infinite 0.5s" }}
          />
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-15px) translateX(5px); }
            50% { transform: translateY(-8px) translateX(-5px); }
            75% { transform: translateY(-20px) translateX(3px); }
          }
        `}</style>
      </section>

      {/* Content */}
      <div className="container py-10 md:py-16 space-y-10 md:space-y-16 max-w-4xl mx-auto">
        {/* Section: Community Highlights Rewards */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10">
              <Video className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Community Highlights Rewards</h2>
              <p className="text-muted-foreground text-sm">Upload klips og optjen bonus spins</p>
            </div>
          </div>

          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-transparent">
            <CardContent className="p-6 md:p-8 space-y-5">
              <p className="text-muted-foreground leading-relaxed">
                Del dine bedste øjeblikke med fællesskabet! Når du uploader et videoklip til{" "}
                <span className="text-foreground font-medium">Community Highlights</span>, og det
                bliver godkendt, optjener du bonus spins som belønning.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Hvert godkendt klip giver +50 bonus spins",
                  "Op til 5 klips kan belønnes (maks 250 spins)",
                  "Belønningerne er engangsbonusser",
                  "Dine klips hjælper fællesskabet med at vokse",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <Button asChild size="lg" className="w-full sm:w-auto gap-2">
                <Link to="/community/highlights">
                  <Video className="h-5 w-5" />
                  Upload til Community Highlights
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Section: Profile Completion Rewards */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10">
              <UserCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Profile Completion Rewards</h2>
              <p className="text-muted-foreground text-sm">Udfyld din profil og få ekstra spins</p>
            </div>
          </div>

          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-transparent">
            <CardContent className="p-6 md:p-8 space-y-5">
              <p className="text-muted-foreground leading-relaxed">
                Gør din profil komplet og bliv belønnet! For hver profilsektion du udfylder, optjener
                du <span className="text-foreground font-medium">+5 permanente bonus spins</span> til
                din daglige pulje.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { section: "Profil", desc: "Bio og grundlæggende info" },
                  { section: "Stats", desc: "Dine største gevinster" },
                  { section: "Favoritter", desc: "Yndlings slots og casinoer" },
                  { section: "Spillestil", desc: "Volatilitet og præferencer" },
                ].map((item) => (
                  <div key={item.section} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-medium text-foreground">{item.section}</span>
                      <span className="text-sm text-muted-foreground"> — {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-sm text-muted-foreground">
                Fuldfør alle 4 sektioner og optjen op til{" "}
                <span className="text-foreground font-semibold">+20 ekstra daglige spins</span>.
              </p>

              {!loading && (
                <Button asChild size="lg" className="w-full sm:w-auto gap-2">
                  <Link to={user ? "/profil" : "/auth"}>
                    <UserCircle className="h-5 w-5" />
                    {user ? "Gå til din profil" : "Log ind for at starte"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Info Section */}
        <section>
          <Card className="border-muted-foreground/20 bg-muted/30">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <Info className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Godt at vide</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Bonus spins er adskilt fra dine daglige spins og forbruges først.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Community bonus spins skal aktiveres manuelt fra din profil.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Belønningerne er begrænsede og fair for alle brugere.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Profil-belønninger er permanente og stacker med daglige spins.
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
