import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Star,
  Zap,
  Gift,
  Tv,
  Gamepad2,
  ArrowRight,
  CheckCircle2,
  Flame,
  PartyPopper,
  Trophy,
  BookOpen,
  Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import "@/styles/community-micro.css";

const ALL_LINKS = [
  { href: "/nye-casinoer", label: "Nye Casinoer", icon: Star },
  { href: "/velkomstbonus", label: "Velkomstbonus", icon: PartyPopper },
  { href: "/free-spins", label: "Free Spins", icon: Zap },
  { href: "/casino-bonus", label: "Casino Bonus", icon: Gift },
  { href: "/live-casino", label: "Live Casino", icon: Tv },
  { href: "/casinospil/spillemaskiner", label: "Spillemaskiner", icon: Gamepad2 },
  { href: "/top-10-casino-online", label: "Top 10 Casinoer", icon: Trophy },
  { href: "/casino-anmeldelser", label: "Casino Anmeldelser", icon: BookOpen },
  { href: "/omsaetningskrav", label: "Omsætningskrav", icon: Scale },
  { href: "/statistik", label: "Bonus Hunt Statistik", icon: Flame },
];

const TRUST_POINTS = [
  "Danske licenserede casinoer",
  "Eksklusive free spins",
  "Opdateret dagligt",
];

function getISOWeek(): number {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const week1 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
}

function trackClick(label: string) {
  try {
    supabase
      .from("page_views")
      .insert({
        path: `/community_to_seo_click/${label}`,
        visitor_id: crypto.randomUUID(),
      })
      .then(() => {});
  } catch {
    // silent
  }
}

export function CommunitySeoBridge() {
  const { pathname } = useLocation();
  const isSlotPage = pathname.startsWith("/community/slots");
  const isBonusHuntPage = pathname.startsWith("/bonus-hunt");

  const { primaryLink, secondaryLinks } = useMemo(() => {
    const week = getISOWeek();

    // Context-aware pool: slot pages prioritise slot links, bonus-hunt → bonus links
    let pool: typeof ALL_LINKS;
    if (isSlotPage) {
      pool = [ALL_LINKS[5], ALL_LINKS[0], ALL_LINKS[1], ALL_LINKS[2], ALL_LINKS[3], ALL_LINKS[4], ALL_LINKS[6], ALL_LINKS[7], ALL_LINKS[8]];
    } else if (isBonusHuntPage) {
      pool = [ALL_LINKS[3], ALL_LINKS[1], ALL_LINKS[2], ALL_LINKS[0], ALL_LINKS[4], ALL_LINKS[5], ALL_LINKS[6], ALL_LINKS[7], ALL_LINKS[8]];
    } else {
      pool = [...ALL_LINKS];
    }

    // Rotate primary based on ISO week
    const primaryIdx = week % pool.length;
    const primary = pool[primaryIdx];
    const rest = pool.filter((_, i) => i !== primaryIdx).slice(0, 5);

    return { primaryLink: primary, secondaryLinks: rest };
  }, [isSlotPage, isBonusHuntPage]);

  return (
    <nav
      aria-label="Udforsk casinoer"
      className="community-panel-vertical rounded-xl p-4 transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.12)] relative overflow-hidden"
    >
      {/* Subtle casino illustration overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 90% 30%, hsl(260 60% 50% / 0.08) 0%, transparent 60%),
            radial-gradient(circle at 80% 70%, hsl(220 70% 50% / 0.06) 0%, transparent 50%)`,
        }}
      />
      {/* Right side gradient glow */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{
          background: "linear-gradient(270deg, hsl(260 60% 50% / 0.06), transparent)",
        }}
      />

      <div className="relative flex items-center gap-2 mb-1">
        <Flame className="h-4 w-4 text-orange-400 animate-seo-fire-pulse" />
        <h3 className="text-base font-bold text-foreground">
          Klar til at spille på nye casinoer?
        </h3>
      </div>
      <p className="relative text-xs text-muted-foreground mb-4 leading-relaxed">
        Find nye online casinoer, free spins og eksklusive bonusser.
      </p>

      <Link
        to={primaryLink.href}
        onClick={() => trackClick(primaryLink.label)}
        className="relative block mb-4"
      >
        <Button
          className="w-full gap-2 font-semibold shadow-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-[1.02]"
          style={{
            background:
              "linear-gradient(135deg, hsl(260 70% 50%), hsl(220 80% 50%))",
          }}
        >
          <primaryLink.icon className="h-4 w-4" />
          {primaryLink.label}
          <ArrowRight className="h-3.5 w-3.5 ml-auto" />
        </Button>
      </Link>

      <ul className="relative space-y-0.5">
        {secondaryLinks.map((link) => {
          const Icon = link.icon;
          return (
            <li key={link.href}>
              <Link
                to={link.href}
                onClick={() => trackClick(link.label)}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50 group"
              >
                <Icon className="h-4 w-4 shrink-0 text-primary/70" />
                <span className="flex-1">{link.label}</span>
                <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-60 group-hover:translate-x-0" />
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="relative my-3 border-t border-border/30" />

      <ul className="relative space-y-1.5">
        {TRUST_POINTS.map((point) => (
          <li key={point} className="flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500/70" />
            {point}
          </li>
        ))}
      </ul>
    </nav>
  );
}
