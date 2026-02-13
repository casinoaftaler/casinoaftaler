import { Link } from "react-router-dom";
import { Gamepad2, Star, Newspaper, Radio, Gift } from "lucide-react";

const navItems = [
  { icon: Gamepad2, label: "Spillehal", to: "/community/slots" },
  { icon: Star, label: "Highlights", to: "/highlights" },
  { icon: Newspaper, label: "Nye Casinoer", to: "/nye-casinoer" },
  { icon: Radio, label: "Live Casinoer", to: "/live-casino" },
  { icon: Gift, label: "Velkomstbonus", to: "/velkomstbonus" },
];

export const SidebarNav = () => {
  return (
    <nav className="hidden xl:block fixed left-6 top-1/2 -translate-y-1/2 z-40 w-52">
      <div className="rounded-xl border border-border bg-card/95 backdrop-blur-sm p-5 shadow-lg">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">
          Naviger til
        </h3>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground"
              >
                <item.icon className="h-5 w-5 text-primary" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
