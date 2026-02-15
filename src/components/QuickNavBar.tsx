import { Link } from "react-router-dom";
import spillehalIcon from "@/assets/nav-icons/spillehal-icon.jpg";
import nyeCasinoerIcon from "@/assets/nav-icons/nye-casinoer-icon.jpg";
import anmeldelserIcon from "@/assets/nav-icons/anmeldelser-icon.jpg";
import casinospilIcon from "@/assets/nav-icons/casinospil-icon.jpg";
import liveCasinoIcon from "@/assets/nav-icons/live-casino-icon.jpg";

const navItems = [
  { label: "Spillehal", to: "/community/slots", icon: spillehalIcon },
  { label: "Nye Casinoer", to: "/nye-casinoer", icon: nyeCasinoerIcon },
  { label: "Casino Anmeldelser", to: "/casino-anmeldelser", icon: anmeldelserIcon },
  { label: "Casinospil", to: "/casinospil", icon: casinospilIcon },
  { label: "Live Casino", to: "/live-casino", icon: liveCasinoIcon },
];

export function QuickNavBar() {
  return (
    <section className="py-6 md:py-8">
      <div className="container">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group relative flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-4 text-center transition-all hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="relative h-14 w-14 md:h-16 md:w-16 overflow-hidden rounded-lg">
                <img
                  src={item.icon}
                  alt={item.label}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
