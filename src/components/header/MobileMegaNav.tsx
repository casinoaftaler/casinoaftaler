import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Landmark, Sparkles, Dices, Tv, BookOpen, MoreHorizontal, Users, CreditCard, Gamepad2, User, Star, Moon, Sun, icons } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CASINO_LINKS, NYE_CASINOER_LINKS, SLOT_LINKS, SLOT_CATEGORY_LINKS,
  BLACKJACK_LINKS, BLACKJACK_STRATEGY_LINKS, ROULETTE_LINKS, ROULETTE_STRATEGY_LINKS,
  POKER_LINKS, OTHER_CASINOSPIL_LINKS, LIVE_CASINO_LINKS, BONUS_LINKS,
  PAYMENT_LINKS, PROVIDER_LINKS, REVIEW_TOP_LINKS, REVIEW_ALL_LINKS,
  COMMUNITY_LINKS, MORE_LINKS, FORFATTER_LINKS, type NavLink,
} from "./navData";

/* ─── Logo imports (same as desktop) ─── */
const providerLogos = import.meta.glob<{ default: string }>(
  "/src/assets/providers/*.{webp,png,jpg}",
  { eager: true }
);
const casinoLogos = import.meta.glob<{ default: string }>(
  "/src/assets/casino-logos/*.{webp,png,jpg}",
  { eager: true }
);
const reviewLogos = import.meta.glob<{ default: string }>(
  "/src/assets/reviews/*.{webp,png,jpg}",
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
  return item.logoUrl;
}

/* ─── Resolve lucide icon by kebab-case name ─── */
function getLucideIcon(name?: string) {
  if (!name) return null;
  const pascal = name.replace(/(^|-)(.)/g, (_, _dash, char) => char.toUpperCase());
  return (icons as Record<string, any>)[pascal] || null;
}

/* ─── Icon accent colors ─── */
const ICON_COLORS = [
  "bg-purple-500/15 text-purple-400",
  "bg-blue-500/15 text-blue-400",
  "bg-emerald-500/15 text-emerald-400",
  "bg-amber-500/15 text-amber-400",
  "bg-rose-500/15 text-rose-400",
];

/* ─── Mobile link item with icon/logo support ─── */
function MobileSmartLink({ item, colorIndex = 0, onClose, indent = "ml-6" }: {
  item: NavLink; colorIndex?: number; onClose: () => void; indent?: string;
}) {
  const logoUrl = resolveLogoUrl(item);
  const IconComp = getLucideIcon(item.iconName);
  const color = ICON_COLORS[colorIndex % ICON_COLORS.length];

  if (logoUrl) {
    return (
      <Link
        to={item.to}
        onClick={onClose}
        className={cn(indent, "flex items-center gap-3 py-2 text-sm text-muted-foreground transition-colors hover:text-primary")}
      >
        <span className="flex items-center justify-center h-8 w-12 rounded-md border border-border/30 bg-muted/50 shrink-0 overflow-hidden">
          <img src={logoUrl} alt={item.label} className="h-6 max-w-[90%] object-contain" loading="lazy" />
        </span>
        <span className="truncate">{item.label}</span>
      </Link>
    );
  }

  return (
    <Link
      to={item.to}
      onClick={onClose}
      className={cn(indent, "flex items-center gap-2.5 py-2 text-sm text-muted-foreground transition-colors hover:text-primary")}
    >
      {IconComp ? (
        <span className={cn("flex items-center justify-center rounded-md h-6 w-6 shrink-0", color)}>
          <IconComp className="h-3.5 w-3.5" />
        </span>
      ) : (
        <Star className="h-4 w-4 shrink-0 text-muted-foreground/50" />
      )}
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

/* ─── Mobile link list ─── */
function MobileSmartLinks({ links, onClose, indent = "ml-6" }: {
  links: NavLink[]; onClose: () => void; indent?: string;
}) {
  return (
    <>
      {links.map((item, i) => (
        <MobileSmartLink key={item.to} item={item} colorIndex={i} onClose={onClose} indent={indent} />
      ))}
    </>
  );
}

/* ─── Expandable mobile link list with "Vis alle" ─── */
function MobileExpandableLinks({ links, initialCount, onClose, indent = "ml-6" }: {
  links: NavLink[]; initialCount: number; onClose: () => void; indent?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? links : links.slice(0, initialCount);
  const hasMore = links.length > initialCount;

  return (
    <>
      {visible.map((item, i) => (
        <MobileSmartLink key={item.to} item={item} colorIndex={i} onClose={onClose} indent={indent} />
      ))}
      {hasMore && !expanded && (
        <button
          onClick={() => setExpanded(true)}
          className={cn(indent, "flex items-center gap-2 py-2 text-sm font-medium text-primary transition-colors hover:text-primary/80")}
        >
          <ChevronDown className="h-3 w-3" />Vis alle ({links.length - initialCount} mere)
        </button>
      )}
    </>
  );
}

/* ─── Section accordion ─── */
function MobileSection({ label, icon: Icon, sectionKey, expanded, onToggle, children }: {
  label: string; icon: any; sectionKey: string; expanded: boolean; onToggle: (key: string) => void; children: React.ReactNode;
}) {
  return (
    <>
      <button
        onClick={() => onToggle(sectionKey)}
        className="flex items-center justify-between py-3 text-sm font-medium transition-colors hover:text-primary border-b border-border/50"
      >
        <span className="flex items-center gap-2"><Icon className="h-4 w-4" />{label}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", expanded && "rotate-180")} />
      </button>
      {expanded && (
        <div className="flex flex-col border-b border-border/50 bg-muted/30">
          {children}
        </div>
      )}
    </>
  );
}

/* ─── Sub-section accordion ─── */
function MobileSubSection({ label, icon: Icon, expanded, onToggle, children }: {
  label: string; icon: any; expanded: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <>
      <button
        onClick={onToggle}
        className="ml-6 flex w-full items-center justify-between py-2.5 pr-4 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <span className="flex items-center gap-2"><Icon className="h-4 w-4" />{label}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", expanded && "rotate-180")} />
      </button>
      {expanded && <div className="flex flex-col">{children}</div>}
    </>
  );
}

/* ─── Main Mobile Nav ─── */
export function MobileMegaNav({ onClose }: { onClose: () => void }) {
  const [section, setSection] = useState<string | null>(null);
  const [expandedMobileSlots, setExpandedMobileSlots] = useState(false);
  const [paymentsExpanded, setPaymentsExpanded] = useState(false);
  const [providersExpanded, setProvidersExpanded] = useState(false);
  const [reviewsExpanded, setReviewsExpanded] = useState(false);
  const [forfattereExpanded, setForfattereExpanded] = useState(false);
  const [allReviewsExpanded, setAllReviewsExpanded] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");

  const toggleSection = (key: string) => setSection(section === key ? null : key);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  const allSlots: NavLink[] = [
    { to: "/casinospil/spillemaskiner/hoej-rtp", label: "Høj RTP Spillemaskiner", iconName: "trending-up" },
    ...SLOT_CATEGORY_LINKS,
    ...SLOT_LINKS,
  ];

  return (
    <nav className="container flex flex-col py-3">
      {/* Casinoer */}
      <MobileSection label="Casinoer" icon={Landmark} sectionKey="casino" expanded={section === "casino"} onToggle={toggleSection}>
        <Link to="/casinoer" className="ml-6 flex items-center gap-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary" onClick={onClose}>
          <Landmark className="h-4 w-4" />Alle Casinoer
        </Link>
        <MobileSmartLinks links={CASINO_LINKS} onClose={onClose} />
      </MobileSection>

      {/* Nye Casinoer */}
      <MobileSection label="Nye Casinoer" icon={Sparkles} sectionKey="nye" expanded={section === "nye"} onToggle={toggleSection}>
        <Link to="/nye-casinoer" className="ml-6 flex items-center gap-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary" onClick={onClose}>
          <Sparkles className="h-4 w-4" />Alle Nye Casinoer
        </Link>
        <MobileSmartLinks links={NYE_CASINOER_LINKS} onClose={onClose} />
      </MobileSection>

      {/* Casinospil */}
      <MobileSection label="Casinospil" icon={Dices} sectionKey="casinospil" expanded={section === "casinospil"} onToggle={toggleSection}>
        <Link to="/casinospil" className="ml-6 flex items-center gap-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary" onClick={onClose}>
          <Dices className="h-4 w-4" />Casinospil Oversigt
        </Link>
        <Link to="/casinospil/spillemaskiner" className="ml-6 flex items-center gap-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary" onClick={onClose}>
          <Star className="h-4 w-4" />Spillemaskiner
        </Link>
        <MobileExpandableLinks links={allSlots} initialCount={8} onClose={onClose} indent="ml-10" />

        <div className="ml-6 flex flex-col">
          <Link to="/casinospil/blackjack" className="flex items-center gap-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary" onClick={onClose}>
            <Star className="h-4 w-4" />Blackjack Guide
          </Link>
          <MobileSmartLinks links={[...BLACKJACK_LINKS, ...BLACKJACK_STRATEGY_LINKS]} onClose={onClose} indent="ml-4" />
        </div>

        <div className="ml-6 flex flex-col">
          <Link to="/casinospil/roulette" className="flex items-center gap-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary" onClick={onClose}>
            <Star className="h-4 w-4" />Roulette Guide
          </Link>
          <MobileSmartLinks links={[...ROULETTE_LINKS, ...ROULETTE_STRATEGY_LINKS]} onClose={onClose} indent="ml-4" />
        </div>

        <div className="ml-6 flex flex-col">
          <Link to="/casinospil/poker" className="flex items-center gap-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary" onClick={onClose}>
            <Star className="h-4 w-4" />Poker Guide
          </Link>
          <MobileSmartLinks links={POKER_LINKS} onClose={onClose} indent="ml-4" />
        </div>

        <MobileSmartLinks links={OTHER_CASINOSPIL_LINKS} onClose={onClose} />
      </MobileSection>

      {/* Live Casino */}
      <MobileSection label="Live Casino" icon={Tv} sectionKey="live" expanded={section === "live"} onToggle={toggleSection}>
        <Link to="/live-casino" className="ml-6 flex items-center gap-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary" onClick={onClose}>
          <Tv className="h-4 w-4" />Live Casino Oversigt
        </Link>
        <MobileSmartLinks links={LIVE_CASINO_LINKS} onClose={onClose} />
      </MobileSection>

      {/* Casino Bonus */}
      <MobileSection label="Casino Bonus" icon={BookOpen} sectionKey="bonus" expanded={section === "bonus"} onToggle={toggleSection}>
        <Link to="/casino-bonus" className="ml-6 flex items-center gap-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary" onClick={onClose}>
          <BookOpen className="h-4 w-4" />Casino Bonus Oversigt
        </Link>
        <MobileSmartLinks links={BONUS_LINKS} onClose={onClose} />
      </MobileSection>

      {/* Mere */}
      <MobileSection label="Mere" icon={MoreHorizontal} sectionKey="more" expanded={section === "more"} onToggle={toggleSection}>
        <MobileSmartLinks links={MORE_LINKS} onClose={onClose} />

        <MobileSubSection label="Forfattere" icon={User} expanded={forfattereExpanded} onToggle={() => setForfattereExpanded(!forfattereExpanded)}>
          <MobileSmartLinks links={FORFATTER_LINKS} onClose={onClose} indent="ml-12" />
        </MobileSubSection>

        <MobileSubSection label="Betalingsmetoder" icon={CreditCard} expanded={paymentsExpanded} onToggle={() => setPaymentsExpanded(!paymentsExpanded)}>
          <Link to="/betalingsmetoder" className="ml-10 flex items-center gap-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary" onClick={onClose}>
            <CreditCard className="h-3 w-3" />Alle betalingsmetoder
          </Link>
          <MobileSmartLinks links={PAYMENT_LINKS} onClose={onClose} indent="ml-10" />
        </MobileSubSection>

        <MobileSubSection label="Spiludviklere" icon={Gamepad2} expanded={providersExpanded} onToggle={() => setProvidersExpanded(!providersExpanded)}>
          <Link to="/spiludviklere" className="ml-10 flex items-center gap-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary" onClick={onClose}>
            <Gamepad2 className="h-3 w-3" />Alle spiludviklere
          </Link>
          <MobileSmartLinks links={PROVIDER_LINKS} onClose={onClose} indent="ml-10" />
        </MobileSubSection>

        <MobileSubSection label="Casino Anmeldelser" icon={Star} expanded={reviewsExpanded} onToggle={() => setReviewsExpanded(!reviewsExpanded)}>
          <Link to="/casino-anmeldelser" className="ml-10 flex items-center gap-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary" onClick={onClose}>
            <Star className="h-3 w-3" />Alle anmeldelser
          </Link>
          <MobileSmartLinks links={REVIEW_TOP_LINKS} onClose={onClose} indent="ml-10" />
          {!allReviewsExpanded ? (
            <button onClick={() => setAllReviewsExpanded(true)} className="ml-10 flex items-center gap-2 py-2 text-sm font-medium text-primary transition-colors hover:text-primary/80">
              <ChevronDown className="h-3 w-3" />Vis alle anmeldelser
            </button>
          ) : (
            <MobileSmartLinks links={REVIEW_ALL_LINKS} onClose={onClose} indent="ml-10" />
          )}
        </MobileSubSection>
      </MobileSection>

      {/* Community */}
      <MobileSection label="Community" icon={Users} sectionKey="community" expanded={section === "community"} onToggle={toggleSection}>
        <Link to="/community" className="ml-6 flex items-center gap-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary" onClick={onClose}>
          <Users className="h-4 w-4" />Community Hub
        </Link>
        <MobileSmartLinks links={COMMUNITY_LINKS} onClose={onClose} />
      </MobileSection>

      {/* Theme toggle */}
      <button onClick={toggleTheme} className="flex items-center gap-2 py-3 text-sm font-medium transition-colors hover:text-primary">
        {isDark ? <><Sun className="h-4 w-4" />Lys tilstand</> : <><Moon className="h-4 w-4" />Mørk tilstand</>}
      </button>
    </nav>
  );
}
