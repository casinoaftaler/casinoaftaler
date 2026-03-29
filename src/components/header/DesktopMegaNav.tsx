import { useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Landmark, Sparkles, Dices, Tv, BookOpen, MoreHorizontal, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CASINO_LINKS, NYE_CASINOER_LINKS, SLOT_LINKS, SLOT_CATEGORY_LINKS,
  BLACKJACK_LINKS, ROULETTE_LINKS, POKER_LINKS, OTHER_CASINOSPIL_LINKS,
  LIVE_CASINO_LINKS, BONUS_LINKS, PAYMENT_LINKS, PROVIDER_LINKS,
  REVIEW_TOP_LINKS, REVIEW_ALL_LINKS, COMMUNITY_LINKS, MORE_LINKS,
  FORFATTER_LINKS, type NavLink,
} from "./navData";

/* ─── Compact link item with brand hover ─── */
function MegaLink({ to, label, onClick }: { to: string; label: string; onClick: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center justify-between gap-2 rounded-lg border border-border/50 bg-card/60 px-3 py-2 text-[13px] font-medium transition-all duration-150 hover:bg-primary/10 hover:border-primary/40 hover:shadow-[0_0_12px_-4px_hsl(var(--primary)/0.3)] group"
    >
      <span className="truncate">{label}</span>
      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50 transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
    </Link>
  );
}

/* ─── Panel header: category title + hub link ─── */
function PanelHeader({ title, hubTo, hubLabel, onNavigate }: {
  title: string; hubTo?: string; hubLabel?: string; onNavigate: () => void;
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      {hubTo && (
        <Link to={hubTo} onClick={onNavigate} className="text-xs font-medium text-primary hover:underline flex items-center gap-0.5">
          {hubLabel || "Se alle"} <ChevronRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
}

/* ─── Sub-section label ─── */
function SubLabel({ title, hubTo, onNavigate }: {
  title: string; hubTo?: string; onNavigate: () => void;
}) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{title}</h4>
      {hubTo && (
        <Link to={hubTo} onClick={onNavigate} className="text-[11px] text-primary hover:underline">
          Se alle →
        </Link>
      )}
    </div>
  );
}

/* ─── Link grid ─── */
function LinkGrid({ items, cols = 5, onNavigate }: { items: NavLink[]; cols?: number; onNavigate: () => void }) {
  const colClass = cols === 4 ? "grid-cols-4" : cols === 3 ? "grid-cols-3" : "grid-cols-5";
  return (
    <div className={cn("grid gap-1.5", colClass)}>
      {items.map(item => (
        <MegaLink key={item.to} to={item.to} label={item.label} onClick={onNavigate} />
      ))}
    </div>
  );
}

/* ─── Column of links ─── */
function LinkColumn({ title, items, hubTo, onNavigate }: {
  title: string; items: NavLink[]; hubTo?: string; onNavigate: () => void;
}) {
  return (
    <div>
      <SubLabel title={title} hubTo={hubTo} onNavigate={onNavigate} />
      <div className="space-y-1.5">
        {items.map(item => (
          <MegaLink key={item.to} to={item.to} label={item.label} onClick={onNavigate} />
        ))}
      </div>
    </div>
  );
}

/* ─── Triggers ─── */
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

/* ─── Main ─── */
export function DesktopMegaNav() {
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const timeoutRef = useRef<number>();
  const navigate = useNavigate();

  const handleEnter = useCallback((key: MenuKey) => {
    clearTimeout(timeoutRef.current);
    setActiveMenu(key);
  }, []);

  const handleLeave = useCallback(() => {
    timeoutRef.current = window.setTimeout(() => setActiveMenu(null), 180);
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
            <PanelHeader title="Casinoer" hubTo="/casinoer" hubLabel="Alle Casinoer →" onNavigate={close} />
            <LinkGrid items={CASINO_LINKS} onNavigate={close} />
          </>
        );

      case "nye-casinoer":
        return (
          <>
            <PanelHeader title="Nye Casinoer" hubTo="/nye-casinoer" hubLabel="Alle Nye Casinoer →" onNavigate={close} />
            <LinkGrid items={NYE_CASINOER_LINKS} onNavigate={close} />
          </>
        );

      case "casinospil":
        return (
          <>
            <PanelHeader title="Casinospil" hubTo="/casinospil" hubLabel="Casinospil Oversigt →" onNavigate={close} />
            {/* Slots */}
            <div className="mb-3">
              <SubLabel title="Spillemaskiner" hubTo="/casinospil/spillemaskiner" onNavigate={close} />
              <LinkGrid items={[...SLOT_CATEGORY_LINKS, ...SLOT_LINKS.slice(0, 7)]} onNavigate={close} />
            </div>
            {/* Separator */}
            <div className="border-t border-border/40 my-3" />
            {/* Table games */}
            <div className="grid grid-cols-4 gap-5">
              <LinkColumn title="Blackjack" items={BLACKJACK_LINKS} hubTo="/casinospil/blackjack" onNavigate={close} />
              <LinkColumn title="Roulette" items={ROULETTE_LINKS} hubTo="/casinospil/roulette" onNavigate={close} />
              <LinkColumn title="Poker" items={POKER_LINKS.slice(0, 4)} hubTo="/casinospil/poker" onNavigate={close} />
              <LinkColumn title="Andre Spil" items={OTHER_CASINOSPIL_LINKS} onNavigate={close} />
            </div>
          </>
        );

      case "live-casino":
        return (
          <>
            <PanelHeader title="Live Casino" hubTo="/live-casino" hubLabel="Live Casino Oversigt →" onNavigate={close} />
            <LinkGrid items={LIVE_CASINO_LINKS} onNavigate={close} />
          </>
        );

      case "casino-bonus":
        return (
          <>
            <PanelHeader title="Casino Bonus" hubTo="/casino-bonus" hubLabel="Casino Bonus Oversigt →" onNavigate={close} />
            <LinkGrid items={BONUS_LINKS} onNavigate={close} />
          </>
        );

      case "mere":
        return (
          <>
            <PanelHeader title="Mere" onNavigate={close} />
            <div className="grid grid-cols-5 gap-5">
              <LinkColumn title="Betalingsmetoder" items={PAYMENT_LINKS.slice(0, 6)} hubTo="/betalingsmetoder" onNavigate={close} />
              <LinkColumn title="Spiludviklere" items={PROVIDER_LINKS.slice(0, 6)} hubTo="/spiludviklere" onNavigate={close} />
              <LinkColumn title="Anmeldelser" items={REVIEW_TOP_LINKS.slice(0, 6)} hubTo="/casino-anmeldelser" onNavigate={close} />
              <LinkColumn title="Info & Om" items={MORE_LINKS.slice(0, 6)} onNavigate={close} />
              <LinkColumn title="Forfattere" items={FORFATTER_LINKS} onNavigate={close} />
            </div>
          </>
        );

      case "community":
        return (
          <>
            <PanelHeader title="Community" hubTo="/community" hubLabel="Community Hub →" onNavigate={close} />
            <LinkGrid items={COMMUNITY_LINKS} onNavigate={close} />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
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

      {activeMenu && (
        <>
          <div className="fixed inset-0 top-16 z-40" onClick={close} />
          <div
            className="fixed left-0 right-0 z-50 border-b border-border/50 bg-popover shadow-xl animate-in fade-in slide-in-from-top-1 duration-150"
            style={{ top: "64px" }}
            onMouseEnter={handlePanelEnter}
            onMouseLeave={handleLeave}
          >
            <div className="max-w-[1600px] mx-auto px-6 2xl:px-12 py-4">
              {renderContent(activeMenu)}
            </div>
          </div>
        </>
      )}
    </>
  );
}
