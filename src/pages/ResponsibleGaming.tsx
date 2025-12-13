import { AlertTriangle, Phone, Globe, HelpCircle, Shield, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ResponsibleGaming = () => {
  return (
    <div className="py-16">
      <div className="container">
        {/* Hero */}
        <div className="mb-16 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-4 text-4xl font-bold">Responsible Gaming</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Gambling should be fun and entertaining. If it stops being enjoyable,
            it's time to stop. Here's how to stay in control.
          </p>
        </div>

        {/* Warning Signs */}
        <Card className="mx-auto mb-16 max-w-3xl border-destructive/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Warning Signs of Problem Gambling
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-destructive" />
                Spending more money than you can afford to lose
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-destructive" />
                Chasing losses by betting more to win back what you've lost
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-destructive" />
                Borrowing money or selling possessions to gamble
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-destructive" />
                Neglecting work, family, or other responsibilities
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-destructive" />
                Feeling anxious, depressed, or irritable when not gambling
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-destructive" />
                Hiding your gambling activities from family and friends
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Tips Grid */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold">
            Tips for Staying in Control
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Set Time Limits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Decide how long you'll play before you start. Use the casino's
                  session time reminders and stick to your limit.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Set Budget Limits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Only gamble with money you can afford to lose. Set deposit
                  limits and never try to win back losses.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Talk to Someone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  If you're worried about your gambling, talk to friends, family,
                  or professional support services.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Self-Exclusion */}
        <div className="mx-auto mb-16 max-w-3xl">
          <h2 className="mb-4 text-2xl font-bold">Self-Exclusion Options</h2>
          <p className="mb-6 text-muted-foreground">
            If you need a break from gambling, most reputable online casinos
            offer self-exclusion options. You can typically:
          </p>
          <ul className="mb-6 space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2">
              • Take a cool-off period (24 hours to 30 days)
            </li>
            <li className="flex items-center gap-2">
              • Self-exclude for a longer period (6 months to 5 years)
            </li>
            <li className="flex items-center gap-2">
              • Permanently close your account
            </li>
            <li className="flex items-center gap-2">
              • Use national self-exclusion schemes like GAMSTOP (UK)
            </li>
          </ul>
          <p className="text-muted-foreground">
            Contact the casino's customer support to learn about their specific
            responsible gaming tools and options.
          </p>
        </div>

        {/* Help Resources */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold">
            Get Help & Support
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Globe className="h-6 w-6 text-primary" />
                  <CardTitle>BeGambleAware</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Free, confidential help and support for anyone who is worried
                  about their or someone else's gambling.
                </p>
                <Button variant="outline" asChild className="w-full">
                  <a
                    href="https://www.begambleaware.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-primary" />
                  <CardTitle>GamCare</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Provides information, advice, and support for anyone affected
                  by gambling. Free helpline available 24/7.
                </p>
                <Button variant="outline" asChild className="w-full">
                  <a
                    href="https://www.gamcare.org.uk/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-6 w-6 text-primary" />
                  <CardTitle>Gamblers Anonymous</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  A fellowship of men and women who have joined together to do
                  something about their gambling problem.
                </p>
                <Button variant="outline" asChild className="w-full">
                  <a
                    href="https://www.gamblersanonymous.org.uk/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Final Message */}
        <Card className="mx-auto max-w-3xl bg-muted/50">
          <CardContent className="p-8 text-center">
            <h3 className="mb-4 text-xl font-bold">Remember</h3>
            <p className="text-muted-foreground">
              Gambling should always be a form of entertainment, not a way to
              make money. The house always has an edge, and in the long run,
              most players will lose. If gambling ever stops being fun, take a
              break. There's no shame in asking for help.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResponsibleGaming;
