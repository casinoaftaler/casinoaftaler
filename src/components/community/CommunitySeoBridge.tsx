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
} from "lucide-react";
import { Button } from "@/components/ui/button";

const LINKS = [
  { href: "/nye-casinoer", label: "Nye Casinoer", icon: Star, primary: true },
  { href: "/casinoer/free-spins", label: "Free Spins", icon: Zap },
  { href: "/casinoer/casino-bonus", label: "Casino Bonus", icon: Gift },
  { href: "/live-casino", label: "Live Casino", icon: Tv },
  { href: "/casinoer/spillemaskiner", label: "Spillemaskiner", icon: Gamepad2 },
];

const TRUST_POINTS = [
  "Danske licenserede casinoer",
  "Eksklusive free spins",
  "Opdateret dagligt",
];

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

  const links = isSlotPage
    ? [LINKS[4], LINKS[0], LINKS[1], LINKS[2], LINKS[3]]
    : LINKS;

  const primaryLink = links.find((l) => l.primary) || links[0];
  const secondaryLinks = links.filter((l) => l !== primaryLink);

  return (
    <nav
      aria-label="Udforsk casinoer"
      className="rounded-xl p-4 transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.12)]"
      style={{
        border: "1px solid rgba(139,92,246,0.35)",
        boxShadow: "0 0 30px rgba(139,92,246,0.08)",
        background:
          "linear-gradient(180deg, hsl(260 30% 16%) 0%, hsl(250 25% 13%) 100%)",
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <Flame className="h-4 w-4 text-orange-400" />
        <h2 className="text-base font-bold text-foreground">
          Klar til at spille på nye casinoer?
        </h2>
      </div>
      <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
        Find nye online casinoer, free spins og eksklusive bonusser.
      </p>

      <Link
        to={primaryLink.href}
        onClick={() => trackClick(primaryLink.label)}
        className="block mb-4"
      >
        <Button
          className="w-full gap-2 font-semibold shadow-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-[1.02]"
          style={{
            background:
              "linear-gradient(135deg, hsl(260 70% 50%), hsl(220 80% 50%))",
          }}
        >
          <Star className="h-4 w-4" />
          {primaryLink.label}
          <ArrowRight className="h-3.5 w-3.5 ml-auto" />
        </Button>
      </Link>

      <ul className="space-y-0.5">
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

      <div className="my-3 border-t border-border/30" />

      <ul className="space-y-1.5">
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
