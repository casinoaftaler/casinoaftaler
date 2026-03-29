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

/* ─── Logo imports (Vite static) ─── */
const providerLogos = import.meta.glob<{ default: string }>(
  "/src/assets/providers/*.{webp,png,jpg}",
  { eager: true }
);
const casinoLogos = import.meta.glob<{ default: string }>(
  "/src/assets/casino-logos/*.{webp,png,jpg}",
  { eager: true }
);

function resolveLogoUrl(item: NavLink): string | undefined {
  if (!item.logoUrl) return undefined;
  if (item.logoUrl.startsWith("/src/assets/providers/")) {
    return providerLogos[item.logoUrl]?.default;
  }
  if (item.logoUrl.startsWith("/src/assets/casino-logos/")) {
    return casinoLogos[item.logoUrl]?.default;
  }
  // Remote URLs (casino logos from storage)
  return item.logoUrl;
}

/* ─── Logo card item ─── */
const BOOSTED_PROVIDER_LOGOS = new Set([
  "Yggdrasil",
  "Microgaming",
  "Red Tiger",
  "Pragmatic Play",
  "Booming Games",
]);


function MegaLogoCard({
  to,
  label,
  logoUrl,
  onClick,
  isReview,
}: {
  to: string;
  label: string;
  logoUrl: string;
  onClick: () => void;
  isReview?: boolean;
}) {
  const needsBoost = BOOSTED_PROVIDER_LOGOS.has(label);

  return (
    <Link
      to={to}
      onClick={onClick}
      className="group relative flex items-center justify-center rounded-xl border border-border/30 bg-muted/50 p-3 h-16 transition-all duration-150 hover:border-primary/40 hover:shadow-[0_0_16px_-4px_hsl(var(--primary)/0.3)] hover:scale-[1.03]"
    >
      <img
        src={logoUrl}
        alt={label}
        className={cn(
          "object-contain",
          (isReview || needsBoost) ? "h-12 max-w-[96%]" : "h-10 max-w-[85%]"
        )}
        loading="lazy"
      />
      <span className="absolute inset-x-0 -bottom-0.5 text-center text-[10px] font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity truncate px-1">
        {label}
      </span>
    </Link>
  );
}

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

/* ─── Smart link: renders logo card if logoUrl available, otherwise text ─── */
function SmartLink({ item, onClick }: { item: NavLink; onClick: () => void }) {
  const resolvedUrl = resolveLogoUrl(item);
  if (resolvedUrl) {
    const isReview = item.to.startsWith("/casino-anmeldelser/");
    return <MegaLogoCard to={item.to} label={item.label} logoUrl={resolvedUrl} onClick={onClick} isReview={isReview} />;
  }
  return <MegaLink to={item.to} label={item.label} onClick={onClick} />;
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
function ExpandableGrid({ items, initialCount, cols = 5, onNavigate, onShowAll }: {
  items: NavLink[]; initialCount: number; cols?: number; onNavigate: () => void; onShowAll?: () => void;
}) {
  const hasMore = items.length > initialCount;
  const visibleItems = items.slice(0, initialCount);
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
          onClick={(e) => { e.stopPropagation(); onShowAll?.(); }}
          className="mt-2 text-[11px] font-medium text-primary hover:underline flex items-center gap-1 transition-colors"
        >
          Vis alle ({items.length}) <ChevronDown className="h-3 w-3 transition-transform" />
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
function ExpandableColumn({ title, items, allItems, hubTo, onNavigate, onShowAll }: {
  title: string; items: NavLink[]; allItems?: NavLink[]; hubTo?: string; onNavigate: () => void; onShowAll?: () => void;
}) {
  const full = allItems || items;
  const hasMore = full.length > items.length;
  const hasLogos = items.some(i => i.logoUrl);

  return (
    <div>
      <SubLabel title={title} hubTo={hubTo} onNavigate={onNavigate} />
      <div className={hasLogos ? "grid grid-cols-2 gap-1.5" : "space-y-1.5"}>
        {items.map(item => (
          <SmartLink key={item.to} item={item} onClick={onNavigate} />
        ))}
      </div>
      {hasMore && (
        <button
          onClick={(e) => { e.stopPropagation(); onShowAll?.(); }}
          className="mt-1.5 text-[11px] font-medium text-primary hover:underline flex items-center gap-1"
        >
          Vis alle ({full.length}) <ChevronDown className="h-3 w-3 transition-transform" />
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
  const [focusedSection, setFocusedSection] = useState<string | null>(null);
  const timeoutRef = useRef<number>();
  const navigate = useNavigate();

  const handleEnter = useCallback((key: MenuKey) => {
    clearTimeout(timeoutRef.current);
    setActiveMenu(key);
    setFocusedSection(null);
  }, []);

  const handleLeave = useCallback(() => {
    timeoutRef.current = window.setTimeout(() => {
      setActiveMenu(null);
      setFocusedSection(null);
    }, 400);
  }, []);

  const handlePanelEnter = useCallback(() => {
    clearTimeout(timeoutRef.current);
  }, []);

  const close = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setActiveMenu(null);
    setFocusedSection(null);
  }, []);

  const expandSection = useCallback((sectionKey: string) => {
    clearTimeout(timeoutRef.current);
    setFocusedSection(prev => prev === sectionKey ? null : sectionKey);
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
        if (focusedSection) {
          const sections: Record<string, { title: string; hubTo?: string; items: NavLink[] }> = {
            slots: { title: "Spillemaskiner", hubTo: "/casinospil/spillemaskiner", items: [...SLOT_CATEGORY_LINKS, ...SLOT_LINKS] },
            blackjack: { title: "Blackjack", hubTo: "/casinospil/blackjack", items: [...BLACKJACK_LINKS, ...BLACKJACK_STRATEGY_LINKS] },
            roulette: { title: "Roulette", hubTo: "/casinospil/roulette", items: [...ROULETTE_LINKS, ...ROULETTE_STRATEGY_LINKS] },
            poker: { title: "Poker", hubTo: "/casinospil/poker", items: POKER_LINKS },
            other: { title: "Andre Spil", items: OTHER_CASINOSPIL_LINKS },
          };
          const sec = sections[focusedSection];
          if (sec) {
            return (
              <>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); setFocusedSection(null); }}
                      className="text-xs font-medium text-primary hover:underline flex items-center gap-0.5"
                    >
                      ← Tilbage
                    </button>
                    <h3 className="text-sm font-semibold text-foreground">{sec.title}</h3>
                  </div>
                  {sec.hubTo && (
                    <Link to={sec.hubTo} onClick={close} className="text-xs font-medium text-primary hover:underline flex items-center gap-0.5">
                      Oversigt <ChevronRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
                <div className="grid gap-1.5 grid-cols-5">
                  {sec.items.map(item => (
                    <MegaLink key={item.to} to={item.to} label={item.label} onClick={close} />
                  ))}
                </div>
              </>
            );
          }
        }
        return (
          <>
            <PanelHeader title="Casinospil" hubTo="/casinospil" hubLabel="Casinospil Oversigt →" onNavigate={close} />
            <div className="mb-3">
              <SubLabel title="Spillemaskiner" hubTo="/casinospil/spillemaskiner" onNavigate={close} />
              <ExpandableGrid items={[...SLOT_CATEGORY_LINKS, ...SLOT_LINKS]} initialCount={10} onNavigate={close} onShowAll={() => expandSection("slots")} />
            </div>
            <div className="border-t border-border/40 my-3" />
            <div className="grid grid-cols-4 gap-5">
              <ExpandableColumn title="Blackjack" items={BLACKJACK_LINKS} allItems={[...BLACKJACK_LINKS, ...BLACKJACK_STRATEGY_LINKS]} hubTo="/casinospil/blackjack" onNavigate={close} onShowAll={() => expandSection("blackjack")} />
              <ExpandableColumn title="Roulette" items={ROULETTE_LINKS} allItems={[...ROULETTE_LINKS, ...ROULETTE_STRATEGY_LINKS]} hubTo="/casinospil/roulette" onNavigate={close} onShowAll={() => expandSection("roulette")} />
              <ExpandableColumn title="Poker" items={POKER_LINKS.slice(0, 4)} allItems={POKER_LINKS} hubTo="/casinospil/poker" onNavigate={close} onShowAll={() => expandSection("poker")} />
              <ExpandableColumn title="Andre Spil" items={OTHER_CASINOSPIL_LINKS} onNavigate={close} />
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
        if (focusedSection) {
          const sections: Record<string, { title: string; hubTo?: string; items: NavLink[] }> = {
            payment: { title: "Betalingsmetoder", hubTo: "/betalingsmetoder", items: PAYMENT_LINKS },
            providers: { title: "Spiludviklere", hubTo: "/spiludviklere", items: PROVIDER_LINKS },
            reviews: { title: "Anmeldelser", hubTo: "/casino-anmeldelser", items: [...REVIEW_TOP_LINKS, ...REVIEW_ALL_LINKS] },
            more: { title: "Info & Om", items: MORE_LINKS },
            authors: { title: "Forfattere", items: FORFATTER_LINKS },
          };
          const sec = sections[focusedSection];
          if (sec) {
            return (
              <>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); setFocusedSection(null); }}
                      className="text-xs font-medium text-primary hover:underline flex items-center gap-0.5"
                    >
                      ← Tilbage
                    </button>
                    <h3 className="text-sm font-semibold text-foreground">{sec.title}</h3>
                  </div>
                  {sec.hubTo && (
                    <Link to={sec.hubTo} onClick={close} className="text-xs font-medium text-primary hover:underline flex items-center gap-0.5">
                      Oversigt <ChevronRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
                <div className="grid gap-2 grid-cols-5 sm:grid-cols-6 lg:grid-cols-8">
                  {sec.items.map(item => (
                    <SmartLink key={item.to} item={item} onClick={close} />
                  ))}
                </div>
              </>
            );
          }
        }
        return (
          <>
            <PanelHeader title="Mere" onNavigate={close} />
            <div className="grid grid-cols-5 gap-5">
              <ExpandableColumn title="Betalingsmetoder" items={PAYMENT_LINKS.slice(0, 5)} allItems={PAYMENT_LINKS} hubTo="/betalingsmetoder" onNavigate={close} onShowAll={() => expandSection("payment")} />
              <ExpandableColumn title="Spiludviklere" items={PROVIDER_LINKS.slice(0, 5)} allItems={PROVIDER_LINKS} hubTo="/spiludviklere" onNavigate={close} onShowAll={() => expandSection("providers")} />
              <ExpandableColumn title="Anmeldelser" items={REVIEW_TOP_LINKS.slice(0, 5)} allItems={[...REVIEW_TOP_LINKS, ...REVIEW_ALL_LINKS]} hubTo="/casino-anmeldelser" onNavigate={close} onShowAll={() => expandSection("reviews")} />
              <ExpandableColumn title="Info & Om" items={MORE_LINKS.slice(0, 5)} allItems={MORE_LINKS} onNavigate={close} onShowAll={() => expandSection("more")} />
              <ExpandableColumn title="Forfattere" items={FORFATTER_LINKS} onNavigate={close} />
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
