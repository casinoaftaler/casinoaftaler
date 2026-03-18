import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BonusClusterPriorityLinksProps {
  currentPath: string;
  title?: string;
  description?: string;
}

const priorityLinks = [
  {
    to: "/casino-bonus",
    label: "Casino Bonus",
    tag: "Hub",
    description:
      "Det brede overblik over alle bonustyper, bonusfælder og reel værdi i det danske marked.",
  },
  {
    to: "/velkomstbonus",
    label: "Velkomstbonus",
    tag: "Money page",
    description:
      "Guiden til første indbetaling, bonuspakker og hvilke vilkår der faktisk giver værdi for nye spillere.",
  },
  {
    to: "/free-spins",
    label: "Free Spins",
    tag: "Money page",
    description:
      "Fokus på spinværdi, spilvalg, wager-free vs. standard spins og hvordan du sammenligner tilbud korrekt.",
  },
  {
    to: "/bonus-uden-indbetaling",
    label: "Bonus uden indbetaling",
    tag: "Money page",
    description:
      "Risiko-frie tilbud, gevinstlofter og hvad du realistisk kan forvente af no deposit bonusser i Danmark.",
  },
  {
    to: "/no-sticky-bonus",
    label: "No-Sticky Bonus",
    tag: "Strategisk spoke",
    description:
      "Den stærkeste guide til bonusstruktur, adskilte saldi og hvornår fleksibiliteten slår klassiske alternativer.",
  },
  {
    to: "/sticky-bonus",
    label: "Sticky Bonus",
    tag: "Strategisk spoke",
    description:
      "Forstå hvorfor sticky bonusser låser saldoen, og hvornår de er dårligere eller bedre end no-sticky modeller.",
  },
  {
    to: "/cashback-bonus",
    label: "Cashback Bonus",
    tag: "Retention",
    description:
      "Analyse af nettotab, kontant cashback og tilbagevendende værdi for spillere med stabil aktivitet.",
  },
  {
    to: "/reload-bonus",
    label: "Reload Bonus",
    tag: "Retention",
    description:
      "Tilbagevendende indbetalingsbonusser for eksisterende spillere med fokus på frekvens, EV og timing.",
  },
] as const;

export function BonusClusterPriorityLinks({
  currentPath,
  title = "Vigtige bonus-sider i samme cluster",
  description = "Disse sider er vores vigtigste bonus-guides og støtter hinanden med tydeligt adskilte søgeintentioner.",
}: BonusClusterPriorityLinksProps) {
  const items = priorityLinks.filter((item) => item.to !== currentPath);

  return (
    <section className="mb-12">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl space-y-2">
          <Badge variant="outline">Bonus-cluster</Badge>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <Card key={item.to} className="group border-border bg-card transition-colors hover:border-primary/40">
            <CardHeader className="space-y-3 pb-3">
              <div className="flex items-center justify-between gap-3">
                <Badge variant="secondary" className="text-xs">
                  {item.tag}
                </Badge>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </div>
              <CardTitle className="text-xl leading-snug">
                <Link to={item.to} className="transition-colors hover:text-primary">
                  {item.label}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
