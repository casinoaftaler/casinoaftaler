import { Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Gift,
  Star,
  Sparkles,
  Tv,
  Gamepad2,
  ArrowRight,
} from "lucide-react";

const BASE_LINKS = [
  { href: "/casinoer/casino-bonus", label: "Casino Bonus", icon: Gift },
  { href: "/nye-casinoer", label: "Nye Casinoer", icon: Star },
  { href: "/top-10-casino-online", label: "Casino Anmeldelser", icon: Sparkles },
  { href: "/live-casino", label: "Live Casino", icon: Tv },
  { href: "/casinoer/spillemaskiner", label: "Spillemaskiner", icon: Gamepad2 },
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
    ? [BASE_LINKS[4], BASE_LINKS[0], BASE_LINKS[1], BASE_LINKS[2], BASE_LINKS[3]]
    : BASE_LINKS;

  return (
    <nav
      aria-label="Udforsk casinoer"
      className="rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm p-4"
    >
      <h2 className="text-sm font-semibold mb-1">
        Klar til at spille for rigtige penge?
      </h2>
      <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
        Udforsk danske online casinoer, bonusser og anmeldelser.
      </p>
      <ul className="space-y-1">
        {links.map((link) => {
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
    </nav>
  );
}
