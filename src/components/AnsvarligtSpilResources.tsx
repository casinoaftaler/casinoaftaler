import { Link } from "react-router-dom";
import { ShieldCheck, Heart, Phone, Lock, Gauge, BookOpen, ArrowRight } from "lucide-react";
import { LucideIcon } from "lucide-react";

/**
 * Shared cross-link widget for ansvarligt spil spoke pages.
 * Binds all 6 spokes + hub + trust pages together for maximum
 * E-E-A-T signal and YMYL internal equity distribution.
 * 
 * No casino cards or affiliate links per compliance rules.
 */

interface SpilResource {
  to: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}

const ALL_RESOURCES: SpilResource[] = [
  { to: "/ansvarligt-spil", title: "Ansvarligt Spil", desc: "Komplet guide til ansvarligt casinospil i Danmark", icon: ShieldCheck },
  { to: "/ansvarligt-spil/rofus", title: "ROFUS Guide", desc: "Selvudelukkelse via Danmarks officielle register", icon: Lock },
  { to: "/ansvarligt-spil/ludomani", title: "Ludomani", desc: "Symptomer, behandling og hjælp ved spilleafhængighed", icon: Heart },
  { to: "/ansvarligt-spil/stopspillet", title: "StopSpillet", desc: "Gratis og fortrolig rådgivning – 70 22 28 25", icon: Phone },
  { to: "/ansvarligt-spil/spillegraenser", title: "Spillegrænser", desc: "Sæt indbetalings- og tabsgrænser hos danske casinoer", icon: Gauge },
  { to: "/ansvarligt-spil/selvudelukkelse-guide", title: "Selvudelukkelse", desc: "Trin-for-trin guide til midlertidig og permanent udelukkelse", icon: Lock },
  { to: "/ansvarligt-spil/hjaelpelinjer", title: "Hjælpelinjer", desc: "Alle hjælpemuligheder for spillere og pårørende", icon: Phone },
  { to: "/spillemyndigheden", title: "Spillemyndigheden", desc: "Danmarks tilsynsmyndighed for spil og licenser", icon: ShieldCheck },
  { to: "/casino-licenser", title: "Casino Licenser", desc: "Forstå det danske licenssystem", icon: BookOpen },
];

interface AnsvarligtSpilResourcesProps {
  currentPath: string;
}

export function AnsvarligtSpilResources({ currentPath }: AnsvarligtSpilResourcesProps) {
  const resources = ALL_RESOURCES.filter((r) => r.to !== currentPath);

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
        <ShieldCheck className="h-6 w-6 text-primary" />
        Udforsk mere om ansvarligt spil
      </h2>
      <p className="text-muted-foreground mb-6 leading-relaxed">
        Ansvarligt spil omfatter flere vigtige områder – fra selvudelukkelse og grænser til professionel hjælp og lovgivning. Udforsk vores guides herunder.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map(({ to, title, desc, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="group flex items-start gap-3 rounded-lg border border-border bg-card p-3 text-sm transition-colors hover:border-primary/50 hover:bg-accent/50"
          >
            <Icon className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold group-hover:text-primary transition-colors">{title}</h3>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
            <ArrowRight className="mt-0.5 h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  );
}
