import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { buildArticleSchema, SITE_URL } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Gift, Video, UserCircle, Sparkles, Info, ArrowRight, CheckCircle2, Gamepad2 } from "lucide-react";
import { SnippetAnswer } from "@/components/SnippetAnswer";
import { CommunityJoinCTA } from "@/components/community/CommunityJoinCTA";
import { SlotRequestForm } from "@/components/SlotRequestForm";
import { useAuth } from "@/hooks/useAuth";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { CommunityNav } from "@/components/community/CommunityNav";
import { ContentSidebar } from "@/components/ContentSidebar";
import { SidebarSocialProof } from "@/components/games/SidebarSocialProof";
import { SidebarLeaderboard } from "@/components/games/SidebarLeaderboard";
import { SidebarShopLeaderboard } from "@/components/games/SidebarShopLeaderboard";
import { CommunityFooterSeo } from "@/components/community/CommunityFooterSeo";
import { RewardsSeoContent } from "@/components/community/RewardsSeoContent";

export default function RewardsProgram() {
  const { user, loading } = useAuth();
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  return (
    <>
      <SEO
        title="Belønningsprogram – Optjen Gratis Spins | Casinoaftaler"
        description="Deltag i Casinoaftalers belønningsprogram. Optjen gratis spins, indsend clips og anmod om nye spilleautomater. Se hvordan du kan blive belønnet."
        jsonLd={[buildArticleSchema({
          headline: "Belønningsprogram – Optjen Gratis Spins",
          description: "Deltag i Casinoaftalers belønningsprogram. Optjen gratis spins, indsend clips og anmod om nye spilleautomater.",
          url: `${SITE_URL}/community/rewards`,
          datePublished: "2026-01-20",
        })]}
        breadcrumbLabel="Rewards"
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
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Optjen Bonus Spins
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Rewards Program
            </h1>
            <p className="text-lg text-white/80">
              Optjen ekstra spins ved at bidrage til fællesskabet og udfylde din profil. Upload clips, udfyld din profil og request slots til livestream. Læs også vores guide til <Link to="/free-spins" className="text-white underline hover:text-white/80">free spins</Link> for flere måder at spille gratis på.
            </p>
          </div>
        </div>
      </section>

      <CommunityNav />

      <div className="container relative">
        {/* Left sidebar - community widgets */}
        <div className="hidden min-[1540px]:block absolute right-full top-0 mr-6 w-[260px] pt-8 md:pt-12">
          <div className="sticky top-24 h-fit flex flex-col gap-4">
            <SidebarSocialProof />
            <SidebarLeaderboard />
            <SidebarShopLeaderboard />
          </div>
        </div>
        <div className="py-8 md:py-12">
        <div className="flex gap-8 xl:gap-10">
          <div className="min-w-0 flex-1">

        {/* Section: Community Highlights Rewards */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
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
                <Link to="/highlights?tab=community" className="text-primary underline hover:text-primary/80">Community Highlights</Link>, og det
                bliver godkendt, optjener du{" "}
                <Link to="/free-spins" className="text-primary underline hover:text-primary/80">bonus spins</Link> som belønning. Dine spins er underlagt de samme{" "}
                <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">bonus-regler</Link> som på rigtige casinoer. Brug dem i vores{" "}
                <Link to="/community/slots" className="text-primary underline hover:text-primary/80">gratis spillehal</Link> og
                konkurrér om topplaceringer på{" "}
                <Link to="/community/turneringer" className="text-primary underline hover:text-primary/80">ranglisten</Link>.
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
                <Link to="/highlights?tab=community">
                  <Video className="h-5 w-5" />
                  Upload til Community Highlights
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        <SnippetAnswer answer="Optjen bonus spins ved at uploade godkendte clips, udfylde din profil og requeste slots til livestream. Alle belønninger er gratis og stacker med dine daglige spins." />

        {!user && <CommunityJoinCTA />}

        <Separator className="my-10" />

        {/* Section: Profile Completion Rewards */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
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
                din daglige pulje – ligesom{" "}
                <Link to="/bonus-uden-indbetaling" className="text-primary underline hover:text-primary/80">gratis spins uden indbetaling</Link> på rigtige casinoer.
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

        <Separator className="my-10" />

        {/* Section: Slot Request Rewards */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Gamepad2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Slot Request Rewards</h2>
              <p className="text-muted-foreground text-sm">Request en slot til livestream og optjen credits</p>
            </div>
          </div>

          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-transparent">
            <CardContent className="p-6 md:p-8 space-y-5">
              <p className="text-muted-foreground leading-relaxed">
                Send en request om hvilken slot vi skal spille på livestream! Hvis vi rammer{" "}
                <span className="text-foreground font-medium">bonus</span> på din valgte slot, får du{" "}
                <span className="text-foreground font-semibold">+20 credits</span> som belønning. Lær mere om{" "}
                <Link to="/casino-bonus" className="text-primary underline hover:text-primary/80">casino bonusser</Link> og{" "}
                <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">omsætningskrav</Link> i vores guides.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Vælg fra populære slots eller skriv din egen",
                  "Bonus hit = +20 credits til dig",
                  "Én aktiv request ad gangen",
                  "Følg status på dine requests herunder",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-border/50">
                <SlotRequestForm />
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Info Section */}
        <section className="mb-12">
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

        {/* Footer SEO – anti-footprint rotated */}
        <CommunityFooterSeo
          currentPath="/community/rewards"
          author="jonas"
          before={<RewardsSeoContent />}
        />

        <div className="pb-12" />
          </div>
          <ContentSidebar />
        </div>
        </div>
      </div>
    </>
  );
}
