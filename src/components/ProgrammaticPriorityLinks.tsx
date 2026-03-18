import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { programmaticPriorityBuckets } from "@/lib/cannibalizationMap";

export function ProgrammaticPriorityLinks() {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-3xl font-bold">Prioriterede slot- og provider-sider</h2>
      <p className="mb-6 max-w-3xl text-muted-foreground leading-relaxed">
        Vi prioriterer de programmatic sider, der faktisk bærer slot-, provider- og bonus-intent videre i clusteret – og nedtoner resten.
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {programmaticPriorityBuckets.strengthen.map((entry) => (
          <Card key={entry.to} className="border-border transition-colors hover:border-primary/50">
            <CardContent className="p-5">
              <Link to={entry.to} className="group block">
                <h3 className="text-base font-semibold text-foreground group-hover:text-primary">
                  {entry.label}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {entry.reason}
                </p>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
