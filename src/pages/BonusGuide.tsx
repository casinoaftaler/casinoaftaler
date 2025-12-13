import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, AlertTriangle, ArrowRight } from "lucide-react";

const BonusGuide = () => {
  return (
    <div className="py-16">
      <div className="container">
        {/* Hero */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold">Casino Bonus Guide</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Everything you need to know about casino bonuses, how they work, and
            how to choose the right one for you.
          </p>
        </div>

        {/* Table of Contents */}
        <Card className="mx-auto mb-16 max-w-2xl">
          <CardHeader>
            <CardTitle>In This Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <a href="#what-is-bonus" className="text-primary hover:underline">
                  What is a Casino Bonus?
                </a>
              </li>
              <li>
                <a href="#bonus-types" className="text-primary hover:underline">
                  Types of Casino Bonuses
                </a>
              </li>
              <li>
                <a href="#no-sticky" className="text-primary hover:underline">
                  No-Sticky Bonuses Explained
                </a>
              </li>
              <li>
                <a href="#sticky" className="text-primary hover:underline">
                  Sticky Bonuses Explained
                </a>
              </li>
              <li>
                <a href="#wagering" className="text-primary hover:underline">
                  Understanding Wagering Requirements
                </a>
              </li>
              <li>
                <a href="#tips" className="text-primary hover:underline">
                  Tips for Choosing Bonuses
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Content Sections */}
        <div className="mx-auto max-w-3xl space-y-16">
          {/* What is a Bonus */}
          <section id="what-is-bonus">
            <h2 className="mb-4 text-2xl font-bold">What is a Casino Bonus?</h2>
            <p className="mb-4 text-muted-foreground">
              A casino bonus is a promotional incentive offered by online
              casinos to attract new players or reward loyal customers. These
              bonuses typically come in the form of extra money, free spins, or
              other perks that give players more value when they play.
            </p>
            <p className="text-muted-foreground">
              While bonuses can provide significant value, they always come with
              terms and conditions that you should understand before accepting.
              The most important of these are wagering requirements, which
              determine how much you need to bet before you can withdraw any
              winnings.
            </p>
          </section>

          {/* Bonus Types */}
          <section id="bonus-types">
            <h2 className="mb-4 text-2xl font-bold">Types of Casino Bonuses</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="mb-2 font-semibold">Welcome Bonus</h3>
                  <p className="text-sm text-muted-foreground">
                    Offered to new players upon registration, often matching
                    your first deposit by 100% or more.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="mb-2 font-semibold">No-Deposit Bonus</h3>
                  <p className="text-sm text-muted-foreground">
                    Free bonus given without requiring a deposit, usually
                    smaller but with no financial risk.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="mb-2 font-semibold">Free Spins</h3>
                  <p className="text-sm text-muted-foreground">
                    Complimentary spins on slot games, often included with
                    welcome packages or as standalone offers.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="mb-2 font-semibold">Reload Bonus</h3>
                  <p className="text-sm text-muted-foreground">
                    Bonus for existing players when making additional deposits,
                    typically smaller than welcome bonuses.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* No-Sticky */}
          <section id="no-sticky">
            <h2 className="mb-4 text-2xl font-bold">No-Sticky Bonuses Explained</h2>
            <Card className="border-primary/50">
              <CardContent className="pt-6">
                <p className="mb-4 text-muted-foreground">
                  A no-sticky bonus (also called a "parachute" or "forfeitable"
                  bonus) keeps your real money deposit separate from the bonus
                  funds. You play with your real money first, and the bonus only
                  kicks in if you lose your deposit.
                </p>
                <h4 className="mb-2 font-semibold">Key Benefits:</h4>
                <ul className="mb-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Withdraw your real money winnings at any time</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Lower risk - you only use bonus if deposit is lost</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Bonus acts as a "safety net" for bad sessions</span>
                  </li>
                </ul>
                <h4 className="mb-2 font-semibold">How It Works:</h4>
                <p className="text-sm text-muted-foreground">
                  Example: You deposit $100 and receive a $100 no-sticky bonus.
                  You play with your $100 deposit first. If you win $500, you
                  can withdraw the $500 (minus your original $100 that was
                  played) without touching the bonus. The bonus is forfeited
                  when you withdraw. If you lose your deposit, the $100 bonus
                  activates and you can continue playing.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Sticky */}
          <section id="sticky">
            <h2 className="mb-4 text-2xl font-bold">Sticky Bonuses Explained</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="mb-4 text-muted-foreground">
                  A sticky bonus (also called a "standard" or "integrated"
                  bonus) combines your deposit and bonus funds into a single
                  balance. You cannot withdraw anything until you've completed
                  the wagering requirements.
                </p>
                <h4 className="mb-2 font-semibold">Considerations:</h4>
                <ul className="mb-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 text-destructive" />
                    <span>Cannot withdraw until wagering is complete</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Often larger bonus percentages available</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Good for extended play sessions</span>
                  </li>
                </ul>
                <div className="rounded-lg bg-muted/50 p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 shrink-0 text-primary" />
                    <p className="text-sm text-muted-foreground">
                      <strong>Important:</strong> With sticky bonuses, if you
                      win big early, you still need to complete the wagering
                      requirements before withdrawing. This means you could
                      potentially lose those winnings while trying to meet the
                      requirements.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Wagering */}
          <section id="wagering">
            <h2 className="mb-4 text-2xl font-bold">
              Understanding Wagering Requirements
            </h2>
            <p className="mb-4 text-muted-foreground">
              Wagering requirements (also called playthrough requirements)
              specify how many times you must bet the bonus amount before you
              can withdraw any winnings. This is the most important factor when
              evaluating a bonus.
            </p>
            <Card className="mb-6 bg-muted/30">
              <CardContent className="pt-6">
                <h4 className="mb-2 font-semibold">Calculation Example:</h4>
                <p className="text-muted-foreground">
                  $100 bonus with 35x wagering requirement = $3,500 in total bets
                  required before withdrawal.
                </p>
              </CardContent>
            </Card>
            <h4 className="mb-2 font-semibold">Wagering Requirement Guide:</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <strong className="text-foreground">Under 30x:</strong> Excellent
                - very player-friendly
              </li>
              <li>
                <strong className="text-foreground">30x - 40x:</strong> Good -
                industry average
              </li>
              <li>
                <strong className="text-foreground">40x - 50x:</strong> High -
                harder to complete
              </li>
              <li>
                <strong className="text-foreground">Over 50x:</strong> Very high
                - proceed with caution
              </li>
            </ul>
          </section>

          {/* Tips */}
          <section id="tips">
            <h2 className="mb-4 text-2xl font-bold">Tips for Choosing Bonuses</h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h4 className="mb-2 font-semibold">
                    1. Prefer No-Sticky Over Sticky
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    No-sticky bonuses give you more flexibility and lower risk.
                    You can always walk away with your winnings.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h4 className="mb-2 font-semibold">
                    2. Look for Low Wagering Requirements
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Bonuses with 30x or lower wagering are much easier to clear
                    and offer better real value.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h4 className="mb-2 font-semibold">3. Check the Validity Period</h4>
                  <p className="text-sm text-muted-foreground">
                    Make sure you have enough time to complete the wagering
                    requirements. Look for 30 days or more.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h4 className="mb-2 font-semibold">
                    4. Read the Game Contributions
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Slots usually count 100% towards wagering, while table games
                    may only count 10-20% or be excluded entirely.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA */}
          <div className="rounded-lg bg-primary/10 p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold">Ready to Find Your Bonus?</h2>
            <p className="mb-6 text-muted-foreground">
              Browse our hand-picked selection of top casino bonuses with fair
              terms and conditions.
            </p>
            <Button size="lg" asChild>
              <Link to="/#top-casinos">
                View Top Bonuses <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BonusGuide;
