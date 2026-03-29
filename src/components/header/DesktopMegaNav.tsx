import { useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronRight, Landmark, Sparkles, Dices, Tv, BookOpen,
  MoreHorizontal, Users, CreditCard, Gamepad2, Star, User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CASINO_LINKS, NYE_CASINOER_LINKS, SLOT_LINKS, SLOT_CATEGORY_LINKS,
  BLACKJACK_LINKS, BLACKJACK_STRATEGY_LINKS, ROULETTE_LINKS, ROULETTE_STRATEGY_LINKS,
  POKER_LINKS, OTHER_CASINOSPIL_LINKS, LIVE_CASINO_LINKS, BONUS_LINKS,
  PAYMENT_LINKS, PROVIDER_LINKS, REVIEW_TOP_LINKS, REVIEW_ALL_LINKS,
  COMMUNITY_LINKS, MORE_LINKS, FORFATTER_LINKS, type NavLink,
} from "./navData";

/* ─── Card item ─── */
function MegaCard({ to, label, onClick }: { to: string; label: string; onClick: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-all hover:bg-accent hover:shadow-sm group"
    >
      <span className="flex-1 text-sm font-medium">{label}</span>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

/* ─── Section header with optional hub link ─── */
function SectionHeader({ title, hubTo, hubLabel, onNavigate }: {
  title: string;
  hubTo?: string;
  hubLabel?: string;
  onNavigate: () => void;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      {hubTo && (
        <Link
          to={hubTo}
          onClick={onNavigate}
          className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
        >
          {hubLabel || "Se alle"} <ChevronRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
}

/* ─── Grid of cards ─── */
function CardGrid({ items, onNavigate }: { items: NavLink[]; onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2.5">
      {items.map(item => (
        <MegaCard key={item.to} to={item.to} label={item.label} onClick={onNavigate} />
      ))}
    </div>
  );
}

/* ─── Sub-section with heading ─── */
function SubSection({ heading, items, hubTo, onNavigate }: {
  heading: string;
  items: NavLink[];
  hubTo?: string;
  onNavigate: () => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{heading}</h4>
        {hubTo && (
          <Link to={hubTo} onClick={onNavigate} className="text-xs text-primary hover:underline">
            Se alle →
          </Link>
        )}
      </div>
      <div className="grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
        {items.map(item => (
          <MegaCard key={item.to} to={item.to} label={item.label} onClick={onNavigate} />
        ))}
      </div>
    </div>
  );
}

/* ─── Menu trigger items ─── */
const TRIGGERS = [
  { key: "casinoer", label: "Casinoer", icon: Landmark },
  { key: "nye-casinoer", label: "Nye Casinoer", icon: Sparkles },
  { key: "casinospil", label: "Casinospil", icon: Dices },
  { key: "live-casino", label: "Live Casino", icon: Tv },
  { key: "casino-bonus", label: "Casino Bonus", icon: BookOpen },
  { key: "mere", label: "Mere", icon: MoreHorizontal },
  { key: "community", label: "Community", icon: Users },
] as const;

type MenuKey = (typeof TRIGGERS)[number]["key"];

/* ─── Main component ─── */
export function DesktopMegaNav() {
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const timeoutRef = useRef<number>();
  const navigate = useNavigate();

  const handleEnter = useCallback((key: MenuKey) => {
    clearTimeout(timeoutRef.current);
    setActiveMenu(key);
  }, []);

  const handleLeave = useCallback(() => {
    timeoutRef.current = window.setTimeout(() => setActiveMenu(null), 200);
  }, []);

  const handlePanelEnter = useCallback(() => {
    clearTimeout(timeoutRef.current);
  }, []);

  const close = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setActiveMenu(null);
  }, []);

  const renderContent = (key: MenuKey) => {
    switch (key) {
      case "casinoer":
        return (
          <>
            <SectionHeader title="Casinoer" hubTo="/casinoer" hubLabel="Alle Casinoer →" onNavigate={close} />
            <CardGrid items={CASINO_LINKS} onNavigate={close} />
          </>
        );

      case "nye-casinoer":
        return (
          <>
            <SectionHeader title="Nye Casinoer" hubTo="/nye-casinoer" hubLabel="Alle Nye Casinoer →" onNavigate={close} />
            <CardGrid items={NYE_CASINOER_LINKS} onNavigate={close} />
          </>
        );

      case "casinospil":
        return (
          <>
            <SectionHeader title="Casinospil" hubTo="/casinospil" hubLabel="Casinospil Oversigt →" onNavigate={close} />
            <div className="space-y-5">
              <SubSection heading="Spillemaskiner" items={[...SLOT_CATEGORY_LINKS, ...SLOT_LINKS.slice(0, 7)]} hubTo="/casinospil/spillemaskiner" onNavigate={close} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <SubSection heading="Blackjack" items={BLACKJACK_LINKS} hubTo="/casinospil/blackjack" onNavigate={close} />
                </div>
                <div>
                  <SubSection heading="Roulette" items={ROULETTE_LINKS} hubTo="/casinospil/roulette" onNavigate={close} />
                </div>
                <div>
                  <SubSection heading="Poker" items={POKER_LINKS.slice(0, 4)} hubTo="/casinospil/poker" onNavigate={close} />
                  <div className="mt-4">
                    <SubSection heading="Andre Spil" items={OTHER_CASINOSPIL_LINKS} onNavigate={close} />
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case "live-casino":
        return (
          <>
            <SectionHeader title="Live Casino" hubTo="/live-casino" hubLabel="Live Casino Oversigt →" onNavigate={close} />
            <CardGrid items={LIVE_CASINO_LINKS} onNavigate={close} />
          </>
        );

      case "casino-bonus":
        return (
          <>
            <SectionHeader title="Casino Bonus" hubTo="/casino-bonus" hubLabel="Casino Bonus Oversigt →" onNavigate={close} />
            <CardGrid items={BONUS_LINKS} onNavigate={close} />
          </>
        );

      case "mere":
        return (
          <>
            <SectionHeader title="Mere" onNavigate={close} />
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <SubSection heading="Betalingsmetoder" items={PAYMENT_LINKS} hubTo="/betalingsmetoder" onNavigate={close} />
                </div>
                <div>
                  <SubSection heading="Spiludviklere" items={PROVIDER_LINKS.slice(0, 10)} hubTo="/spiludviklere" onNavigate={close} />
                </div>
                <div>
                  <SubSection heading="Casino Anmeldelser" items={[...REVIEW_TOP_LINKS, ...REVIEW_ALL_LINKS.slice(0, 5)]} hubTo="/casino-anmeldelser" onNavigate={close} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SubSection heading="Info & Om" items={MORE_LINKS} onNavigate={close} />
                <SubSection heading="Forfattere" items={FORFATTER_LINKS} onNavigate={close} />
              </div>
            </div>
          </>
        );

      case "community":
        return (
          <>
            <SectionHeader title="Community" hubTo="/community" hubLabel="Community Hub →" onNavigate={close} />
            <CardGrid items={COMMUNITY_LINKS} onNavigate={close} />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Nav triggers */}
      <nav
        className="hidden lg:flex items-center flex-1 justify-evenly gap-1 whitespace-nowrap"
        style={{ contain: "layout style" }}
      >
        {TRIGGERS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onMouseEnter={() => handleEnter(key)}
            onMouseLeave={handleLeave}
            onClick={() => {
              const hubMap: Record<MenuKey, string> = {
                casinoer: "/casinoer",
                "nye-casinoer": "/nye-casinoer",
                casinospil: "/casinospil",
                "live-casino": "/live-casino",
                "casino-bonus": "/casino-bonus",
                mere: "/ordbog",
                community: "/community",
              };
              close();
              navigate(hubMap[key]);
            }}
            className={cn(
              "flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary px-1 py-2",
              activeMenu === key && "text-primary"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </nav>

      {/* Mega menu panel */}
      {activeMenu && (
        <>
          {/* Backdrop to close on click outside */}
          <div className="fixed inset-0 top-16 z-40" onClick={close} />

          {/* Panel */}
          <div
            className="fixed left-0 right-0 z-50 border-b border-border bg-popover/98 backdrop-blur-xl shadow-2xl"
            style={{ top: "64px" }}
            onMouseEnter={handlePanelEnter}
            onMouseLeave={handleLeave}
          >
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 2xl:px-12 py-6 max-h-[70vh] overflow-y-auto">
              {renderContent(activeMenu)}
            </div>
          </div>
        </>
      )}
    </>
  );
}
