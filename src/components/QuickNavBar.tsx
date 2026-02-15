import { Link } from "react-router-dom";
import spillehalIcon from "@/assets/nav-icons/spillehal-icon.jpg";
import nyeCasinoerIcon from "@/assets/nav-icons/nye-casinoer-icon.jpg";
import anmeldelserIcon from "@/assets/nav-icons/anmeldelser-icon.jpg";
import casinospilIcon from "@/assets/nav-icons/casinospil-icon.jpg";
import liveCasinoIcon from "@/assets/nav-icons/live-casino-icon.jpg";
import { SpillehalPromoBanner } from "./SpillehalPromoBanner";

const navItems = [
  { label: "Spillehal", to: "/community/slots", icon: spillehalIcon },
  { label: "Nye Casinoer", to: "/nye-casinoer", icon: nyeCasinoerIcon },
  { label: "Casino Anmeldelser", to: "/casino-anmeldelser", icon: anmeldelserIcon },
  { label: "Casinospil", to: "/casinospil", icon: casinospilIcon },
  { label: "Live Casino", to: "/live-casino", icon: liveCasinoIcon },
];

export function QuickNavBar() {
  return (
    <aside className="hidden xl:block fixed top-1/3 left-[max(0.5rem,calc((100vw-1280px)/2-220px))] z-30 w-[200px]">
      <nav className="flex flex-col gap-1 mb-4">
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
              alt=""
              className="h-8 w-8 rounded-md object-cover flex-shrink-0"
              loading="lazy"
            />
            <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
      <div className="w-full">
        <SpillehalPromoBanner />
      </div>
    </aside>
  );
}
