import { Link } from "react-router-dom";
import spillehalIcon from "@/assets/nav-icons/spillehal-icon.jpg";
import nyeCasinoerIcon from "@/assets/nav-icons/nye-casinoer-icon.jpg";
import anmeldelserIcon from "@/assets/nav-icons/anmeldelser-icon.jpg";
import casinospilIcon from "@/assets/nav-icons/casinospil-icon.jpg";
import liveCasinoIcon from "@/assets/nav-icons/live-casino-icon.jpg";
import { SpillehalPromoBanner } from "./SpillehalPromoBanner";
import { LatestNewsSidebar } from "./LatestNewsSidebar";

const navItems = [
  { label: "Spillehal", to: "/community/slots", icon: spillehalIcon },
  { label: "Turneringer", to: "/community/leaderboard", icon: spillehalIcon },
  { label: "Casino Bonus", to: "/casino-bonus", icon: casinospilIcon },
  { label: "Nye Casinoer", to: "/nye-casinoer", icon: nyeCasinoerIcon },
  { label: "Casino Anmeldelser", to: "/casino-anmeldelser", icon: anmeldelserIcon },
  { label: "Casinospil", to: "/casinospil", icon: casinospilIcon },
  { label: "Live Casino", to: "/live-casino", icon: liveCasinoIcon },
  { label: "Casino Nyheder", to: "/casino-nyheder", icon: anmeldelserIcon },
];

export function QuickNavSidebar() {
  return (
    <div className="sticky top-24 flex flex-col gap-4 w-[200px]">
      <nav className="flex flex-col gap-1">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 px-2">
          Naviger til
        </span>
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="group flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-accent"
          >
            <img
              src={item.icon}
              alt={item.label}
              width={32}
              height={32}
              className="h-8 w-8 rounded-md object-cover flex-shrink-0"
              loading="lazy"
            />
            <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
      <LatestNewsSidebar />
      <SpillehalPromoBanner />
    </div>
  );
}
