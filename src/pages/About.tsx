import { Shield, Users, Award, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="py-16">
      <div className="container">
        {/* Hero */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold">About Casino Bonus Hub</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            We're dedicated to helping players find the best casino bonuses with
            transparent, unbiased reviews and comparisons.
          </p>
        </div>

        {/* Mission */}
        <div className="mb-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold">Our Mission</h2>
            <p className="mb-4 text-muted-foreground">
              Casino Bonus Hub was founded with a simple goal: to cut through
              the noise and help players make informed decisions about online
              casino bonuses. We know that navigating the world of casino
              promotions can be overwhelming, with complex terms and conditions
              that aren't always easy to understand.
            </p>
            <p className="text-muted-foreground">
              That's why our team of experts carefully reviews every bonus,
              breaks down the key details, and presents them in a clear,
              user-friendly format. We believe that every player deserves to
              know exactly what they're signing up for.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold">What We Stand For</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We clearly explain all bonus terms, including wagering
                  requirements, game restrictions, and withdrawal limits.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Player First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our reviews prioritize the player experience, focusing on
                  bonuses that offer genuine value and fair conditions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our team has years of experience in the iGaming industry,
                  bringing deep knowledge to every review.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Independence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our reviews are unbiased. We may receive commissions, but this
                  never influences our ratings or recommendations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Review Process */}
        <div className="mb-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold">How We Review Casinos</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  1
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">License & Security Check</h3>
                  <p className="text-muted-foreground">
                    We verify that every casino holds valid licenses from
                    reputable gambling authorities and uses industry-standard
                    security measures.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  2
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Bonus Analysis</h3>
                  <p className="text-muted-foreground">
                    We thoroughly analyze bonus terms, wagering requirements,
                    game contributions, and time limits to assess the real value
                    for players.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  3
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Player Experience Test</h3>
                  <p className="text-muted-foreground">
                    We test the registration process, deposit methods, game
                    selection, and customer support to ensure a quality
                    experience.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  4
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Ongoing Monitoring</h3>
                  <p className="text-muted-foreground">
                    We continuously update our reviews to reflect changes in
                    bonus terms, player feedback, and casino reputation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <Card className="mx-auto max-w-3xl bg-muted/50">
          <CardContent className="p-6">
            <h3 className="mb-2 font-semibold">Affiliate Disclosure</h3>
            <p className="text-sm text-muted-foreground">
              Casino Bonus Hub may receive compensation when you click on links
              to casinos and/or create an account. This helps us maintain and
              improve our service. However, our reviews and ratings are always
              based on our honest assessment and are never influenced by
              potential commissions. We only recommend casinos that meet our
              strict quality standards.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
