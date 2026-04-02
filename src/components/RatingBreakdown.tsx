import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CATEGORY_WEIGHTS_DISPLAY, type CategoryScores } from "@/lib/reviewScoring";
import { BarChart3 } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;

interface RatingBreakdownProps {
  scores: CategoryScores;
  total: number;
}

export function RatingBreakdown({ scores, total }: RatingBreakdownProps) {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xl">
          <MenuIcon iconName="bar-chart3" className="h-5 w-5 text-primary" />
          Samlet vurdering: {total} / 5
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          Score beregnet ud fra vores{" "}
          <a href="/saadan-tester-vi-casinoer" className="text-primary underline hover:text-primary/80">
            testmetode
          </a>{" "}
          med vægtede kategorier.
        </p>
        <div className="space-y-3">
          {CATEGORY_WEIGHTS_DISPLAY.map((cat) => {
            const value = scores[cat.key];
            return (
              <div key={cat.key}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium">
                    {cat.label}{" "}
                    <span className="text-muted-foreground font-normal">({cat.pct}%)</span>
                  </span>
                  <span className="font-bold">{value.toFixed(1)}</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${(value / 5) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 p-3">
          <span className="text-sm font-medium">Vægtet gennemsnit</span>
          <span className="text-lg font-bold text-primary">{total} / 5</span>
        </div>
      </CardContent>
    </Card>
  );
}
