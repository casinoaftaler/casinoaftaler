import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

interface TestLogEntry {
  title: string;
  content: string;
}

interface CasinoTestLogProps {
  casinoName: string;
  intro: string;
  entries: TestLogEntry[];
}

/**
 * Reusable TestLog component for casino reviews.
 * Displays a day-by-day test log as an E-E-A-T "Experience" signal.
 */
export function CasinoTestLog({ casinoName, intro, entries }: CasinoTestLogProps) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-3xl font-bold">14 dages intensiv test – Dag-for-dag-log</h2>
      <p className="mb-6 text-muted-foreground leading-relaxed">{intro}</p>
      <Card className="border-border bg-card mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            Testlog – {casinoName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            {entries.map((entry, idx) => (
              <div
                key={idx}
                className={idx < entries.length - 1 ? "border-b border-border pb-3" : ""}
              >
                <p className="font-semibold text-foreground">{entry.title}</p>
                <p className="text-muted-foreground">{entry.content}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
