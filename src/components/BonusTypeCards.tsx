import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight } from "lucide-react";

export function BonusTypeCards() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Understanding Bonus Types</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Not all casino bonuses are created equal. Learn the difference
            between the main bonus types to make informed decisions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* No-Sticky Bonus Card */}
          <Card className="border-primary/50">
            <CardHeader>
              <div className="mb-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Recommended
              </div>
              <CardTitle className="text-2xl">No-Sticky Bonus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                With a no-sticky bonus, your real money and bonus funds are kept
                separate. You can withdraw your real money winnings at any time
                without forfeiting the bonus.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Withdraw real money anytime</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Lower risk for players</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Bonus used after real money</span>
                </li>
              </ul>
              <Button asChild variant="outline" className="w-full">
                <Link to="/bonus-guide#no-sticky">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Sticky Bonus Card */}
          <Card>
            <CardHeader>
              <div className="mb-2 inline-flex rounded-full bg-muted px-3 py-1 text-sm font-medium">
                Traditional
              </div>
              <CardTitle className="text-2xl">Sticky Bonus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                A sticky bonus combines your deposit and bonus into one balance.
                You must meet wagering requirements before any withdrawals are
                possible.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <X className="h-5 w-5 text-destructive" />
                  <span>Cannot withdraw until wagering complete</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Often larger bonus amounts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Good for extended play sessions</span>
                </li>
              </ul>
              <Button asChild variant="outline" className="w-full">
                <Link to="/bonus-guide#sticky">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
