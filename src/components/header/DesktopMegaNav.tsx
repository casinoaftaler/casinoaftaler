import { useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, ChevronDown, Landmark, Sparkles, Dices, Tv, BookOpen, MoreHorizontal, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CASINO_LINKS, NYE_CASINOER_LINKS, SLOT_LINKS, SLOT_CATEGORY_LINKS,
  BLACKJACK_LINKS, BLACKJACK_STRATEGY_LINKS, ROULETTE_LINKS, ROULETTE_STRATEGY_LINKS,
  POKER_LINKS, OTHER_CASINOSPIL_LINKS, LIVE_CASINO_LINKS, BONUS_LINKS,
  PAYMENT_LINKS, PROVIDER_LINKS, REVIEW_TOP_LINKS, REVIEW_ALL_LINKS,
  COMMUNITY_LINKS, MORE_LINKS, FORFATTER_LINKS, type NavLink,
} from "./navData";

/* ─── Compact link item ─── */
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

/* ─── Panel header ─── */
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

/* ─── Expandable grid: shows `initialCount` items, "Vis alle (N)" expands to full list ─── */
function ExpandableGrid({ items, initialCount, cols = 5, onNavigate }: {
  items: NavLink[]; initialCount: number; cols?: number; onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const visibleItems = expanded ? items : items.slice(0, initialCount);
  const hasMore = items.length > initialCount;
  const colClass = cols === 4 ? "grid-cols-4" : cols === 3 ? "grid-cols-3" : "grid-cols-5";

  return (
    <div>
      <div className={cn("grid gap-1.5", colClass)}>
        {visibleItems.map(item => (
          <MegaLink key={item.to} to={item.to} label={item.label} onClick={onNavigate} />
        ))}
      </div>
      {hasMore && (
        <button
          onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
          className="mt-2 text-[11px] font-medium text-primary hover:underline flex items-center gap-1 transition-colors"
        >
          {expanded ? (
            <>Vis færre <ChevronDown className="h-3 w-3 rotate-180 transition-transform" /></>
          ) : (
            <>Vis alle ({items.length}) <ChevronDown className="h-3 w-3 transition-transform" /></>
          )}
        </button>
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
          Oversigt →
        </Link>
      )}
    </div>
  );
}

/* ─── Expandable column ─── */
function ExpandableColumn({ title, items, allItems, hubTo, onNavigate }: {
  title: string; items: NavLink[]; allItems?: NavLink[]; hubTo?: string; onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const full = allItems || items;
  const visible = expanded ? full : items;
  const hasMore = full.length > items.length;

  return (
    <div>
      <SubLabel title={title} hubTo={hubTo} onNavigate={onNavigate} />
      <div className="space-y-1.5">
        {visible.map(item => (
          <MegaLink key={item.to} to={item.to} label={item.label} onClick={onNavigate} />
        ))}
      </div>
      {hasMore && (
        <button
          onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
          className="mt-1.5 text-[11px] font-medium text-primary hover:underline flex items-center gap-1"
        >
          {expanded ? "Vis færre" : `Vis alle (${full.length})`}
          <ChevronDown className={cn("h-3 w-3 transition-transform", expanded && "rotate-180")} />
        </button>
      )}
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
            <PanelHeader title="Casinoer" hubTo="/casinoer" hubLabel="Casinoer Hub →" onNavigate={close} />
            <ExpandableGrid items={CASINO_LINKS} initialCount={10} onNavigate={close} />
          </>
        );

      case "nye-casinoer":
        return (
          <>
            <PanelHeader title="Nye Casinoer" hubTo="/nye-casinoer" hubLabel="Nye Casinoer Hub →" onNavigate={close} />
            <ExpandableGrid items={NYE_CASINOER_LINKS} initialCount={10} onNavigate={close} />
          </>
        );

      case "casinospil":
        return (
          <>
            <PanelHeader title="Casinospil" hubTo="/casinospil" hubLabel="Casinospil Oversigt →" onNavigate={close} />
            {/* Slots */}
            <div className="mb-3">
              <SubLabel title="Spillemaskiner" hubTo="/casinospil/spillemaskiner" onNavigate={close} />
              <ExpandableGrid
                items={[...SLOT_CATEGORY_LINKS, ...SLOT_LINKS]}
                initialCount={10}
                onNavigate={close}
              />
            </div>
            {/* Separator */}
            <div className="border-t border-border/40 my-3" />
            {/* Table games */}
            <div className="grid grid-cols-4 gap-5">
              <ExpandableColumn
                title="Blackjack"
                items={BLACKJACK_LINKS}
                allItems={[...BLACKJACK_LINKS, ...BLACKJACK_STRATEGY_LINKS]}
                hubTo="/casinospil/blackjack"
                onNavigate={close}
              />
              <ExpandableColumn
                title="Roulette"
                items={ROULETTE_LINKS}
                allItems={[...ROULETTE_LINKS, ...ROULETTE_STRATEGY_LINKS]}
                hubTo="/casinospil/roulette"
                onNavigate={close}
              />
              <ExpandableColumn
                title="Poker"
                items={POKER_LINKS.slice(0, 4)}
                allItems={POKER_LINKS}
                hubTo="/casinospil/poker"
                onNavigate={close}
              />
              <ExpandableColumn
                title="Andre Spil"
                items={OTHER_CASINOSPIL_LINKS}
                onNavigate={close}
              />
            </div>
          </>
        );

      case "live-casino":
        return (
          <>
            <PanelHeader title="Live Casino" hubTo="/live-casino" hubLabel="Live Casino Oversigt →" onNavigate={close} />
            <ExpandableGrid items={LIVE_CASINO_LINKS} initialCount={10} onNavigate={close} />
          </>
        );

      case "casino-bonus":
        return (
          <>
            <PanelHeader title="Casino Bonus" hubTo="/casino-bonus" hubLabel="Casino Bonus Oversigt →" onNavigate={close} />
            <ExpandableGrid items={BONUS_LINKS} initialCount={10} onNavigate={close} />
          </>
        );

      case "mere":
        return (
          <>
            <PanelHeader title="Mere" onNavigate={close} />
            <div className="grid grid-cols-5 gap-5">
              <ExpandableColumn
                title="Betalingsmetoder"
                items={PAYMENT_LINKS.slice(0, 5)}
                allItems={PAYMENT_LINKS}
                hubTo="/betalingsmetoder"
                onNavigate={close}
              />
              <ExpandableColumn
                title="Spiludviklere"
                items={PROVIDER_LINKS.slice(0, 5)}
                allItems={PROVIDER_LINKS}
                hubTo="/spiludviklere"
                onNavigate={close}
              />
              <ExpandableColumn
                title="Anmeldelser"
                items={REVIEW_TOP_LINKS.slice(0, 5)}
                allItems={[...REVIEW_TOP_LINKS, ...REVIEW_ALL_LINKS]}
                hubTo="/casino-anmeldelser"
                onNavigate={close}
              />
              <ExpandableColumn
                title="Info & Om"
                items={MORE_LINKS.slice(0, 5)}
                allItems={MORE_LINKS}
                onNavigate={close}
              />
              <ExpandableColumn
                title="Forfattere"
                items={FORFATTER_LINKS}
                onNavigate={close}
              />
            </div>
          </>
        );

      case "community":
        return (
          <>
            <PanelHeader title="Community" hubTo="/community" hubLabel="Community Hub →" onNavigate={close} />
            <ExpandableGrid items={COMMUNITY_LINKS} initialCount={10} onNavigate={close} />
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
            <div className="max-w-[1600px] mx-auto px-6 2xl:px-12 py-4 max-h-[75vh] overflow-y-auto">
              {renderContent(activeMenu)}
            </div>
          </div>
        </>
      )}
    </>
  );
}
