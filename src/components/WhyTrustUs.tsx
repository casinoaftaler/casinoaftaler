import { Link } from "react-router-dom";
import { MenuIcon } from "@/components/MenuIcon";
import { SLOT_COUNT_LABEL } from "@/hooks/useSlotCountLabel";

const trustPoints = [
  {
    iconName: "shield-check",
    title: "Kun dansk licens",
    description: "Vi anbefaler udelukkende casinoer med aktiv licens fra Spillemyndigheden. Hver licens verificeres direkte mod det officielle register.",
    stat: "30+ casinoer testet",
  },
  {
    iconName: "chart-bar",
    title: "Matematisk bonusanalyse",
    description: "Vi beregner EV (expected value) og RTP-justering for hver bonus – ikke bare omsætningskrav, men reel spillerværdi i kroner og øre.",
    stat: "${SLOT_COUNT_LABEL} slots i database",
  },
  {
    iconName: "scale",
    title: "Uafhængig redaktion",
    description: "Vores anmeldelser er udarbejdet af forfattere med 5+ års erfaring i den danske gambling-branche. Affiliate-links påvirker aldrig vurderinger.",
    stat: "330+ indexerede sider",
    link: { to: "/saadan-tester-vi-casinoer", label: "Læs vores metode →" },
  },
  {
    iconName: "eye",
    title: "Løbende compliance-overvågning",
    description: "Vi scanner casinoers bonusvilkår og licensstatus automatisk og dagligt, så vi opdager ændringer før du gør.",
    stat: "Daglig scanning",
  },
  {
    iconName: "award",
    title: "GPWA-godkendt portal",
    description: "Vi er officielt godkendt af GPWA (Gambling Portal Webmasters Association) – branchens ældste tillidsmærke for casino-affiliates.",
    stat: "Verified Seal of Approval",
    link: { to: "/om", label: "Verificér os →" },
  },
];

export function WhyTrustUs() {
  return (
    <section className="py-12 md:py-16">
      <div>
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-3">🛡️ Hvorfor stole på Casinoaftaler?</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Vi er ikke endnu en affiliate-side med copy-paste bonuslister. Vores redaktion tester, beregner og verificerer – så du kan træffe informerede valg.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {trustPoints.map((point) => (
            <div
              key={point.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <MenuIcon iconName={point.iconName} className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{point.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {point.description}
              </p>
              <p className="text-xs font-semibold text-primary">{point.stat}</p>
              {point.link && (
                <Link
                  to={point.link.to}
                  className="mt-2 inline-block text-xs text-primary hover:underline font-medium"
                >
                  {point.link.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
