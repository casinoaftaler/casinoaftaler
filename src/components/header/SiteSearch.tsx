import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { supabase } from "@/integrations/supabase/client";
import {
  CASINO_LINKS, NYE_CASINOER_LINKS, SLOT_LINKS, SLOT_CATEGORY_LINKS,
  BLACKJACK_LINKS, BLACKJACK_STRATEGY_LINKS, ROULETTE_LINKS, ROULETTE_STRATEGY_LINKS,
  POKER_LINKS, OTHER_CASINOSPIL_LINKS, LIVE_CASINO_LINKS, BONUS_LINKS,
  PAYMENT_LINKS, PROVIDER_LINKS, REVIEW_TOP_LINKS, REVIEW_ALL_LINKS,
  COMMUNITY_LINKS, MORE_LINKS, FORFATTER_LINKS,
} from "./navData";

interface SearchItem {
  label: string;
  to: string;
  category: string;
}

// Build static index once (WITHOUT glossary – loaded on demand)
const STATIC_ITEMS: SearchItem[] = [
  // Top-level pages
  { label: "Forsiden", to: "/", category: "Sider" },
  { label: "Casinoer", to: "/casinoer", category: "Sider" },
  { label: "Nye Casinoer", to: "/nye-casinoer", category: "Sider" },
  { label: "Casinospil", to: "/casinospil", category: "Sider" },
  { label: "Spillemaskiner", to: "/casinospil/spillemaskiner", category: "Sider" },
  { label: "Blackjack Guide", to: "/casinospil/blackjack", category: "Sider" },
  { label: "Roulette Guide", to: "/casinospil/roulette", category: "Sider" },
  { label: "Poker Guide", to: "/casinospil/poker", category: "Sider" },
  { label: "Live Casino", to: "/live-casino", category: "Sider" },
  { label: "Casino Bonus", to: "/casino-bonus", category: "Sider" },
  { label: "Casino Anmeldelser", to: "/casino-anmeldelser", category: "Sider" },
  { label: "Betalingsmetoder", to: "/betalingsmetoder", category: "Sider" },
  { label: "Spiludviklere", to: "/spiludviklere", category: "Sider" },
  { label: "Community", to: "/community", category: "Sider" },
  { label: "Casino Ordbog", to: "/ordbog", category: "Sider" },
  { label: "Top 10 Online Casino", to: "/top-10-casino-online", category: "Sider" },
  { label: "Casino Nyheder", to: "/casino-nyheder", category: "Sider" },
  { label: "Slot Database", to: "/slot-database", category: "Sider" },
  { label: "Statistik", to: "/statistik", category: "Sider" },
  // Nav data arrays mapped to categories
  ...CASINO_LINKS.map(l => ({ label: l.label, to: l.to, category: "Casinoer" })),
  ...NYE_CASINOER_LINKS.map(l => ({ label: l.label, to: l.to, category: "Nye Casinoer" })),
  ...SLOT_LINKS.map(l => ({ label: l.label, to: l.to, category: "Spillemaskiner" })),
  ...SLOT_CATEGORY_LINKS.map(l => ({ label: l.label, to: l.to, category: "Spillemaskiner" })),
  ...BLACKJACK_LINKS.map(l => ({ label: l.label, to: l.to, category: "Casinospil" })),
  ...BLACKJACK_STRATEGY_LINKS.map(l => ({ label: l.label, to: l.to, category: "Casinospil" })),
  ...ROULETTE_LINKS.map(l => ({ label: l.label, to: l.to, category: "Casinospil" })),
  ...ROULETTE_STRATEGY_LINKS.map(l => ({ label: l.label, to: l.to, category: "Casinospil" })),
  ...POKER_LINKS.map(l => ({ label: l.label, to: l.to, category: "Casinospil" })),
  ...OTHER_CASINOSPIL_LINKS.map(l => ({ label: l.label, to: l.to, category: "Casinospil" })),
  ...LIVE_CASINO_LINKS.map(l => ({ label: l.label, to: l.to, category: "Live Casino" })),
  ...BONUS_LINKS.map(l => ({ label: l.label, to: l.to, category: "Bonusser" })),
  ...PAYMENT_LINKS.map(l => ({ label: l.label, to: l.to, category: "Betalingsmetoder" })),
  ...PROVIDER_LINKS.map(l => ({ label: l.label, to: l.to, category: "Spiludviklere" })),
  ...REVIEW_TOP_LINKS.map(l => ({ label: l.label, to: l.to, category: "Casino Anmeldelser" })),
  ...REVIEW_ALL_LINKS.map(l => ({ label: l.label, to: l.to, category: "Casino Anmeldelser" })),
  ...COMMUNITY_LINKS.map(l => ({ label: l.label, to: l.to, category: "Community" })),
  ...MORE_LINKS.map(l => ({ label: l.label, to: l.to, category: "Sider" })),
  ...FORFATTER_LINKS.map(l => ({ label: l.label, to: l.to, category: "Forfattere" })),
];

// Deduplicate by path
const DEDUPED_STATIC = Array.from(
  new Map(STATIC_ITEMS.map(item => [item.to, item])).values()
);

export function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [dynamicItems, setDynamicItems] = useState<SearchItem[]>([]);
  const navigate = useNavigate();

  // Keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(prev => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Fetch dynamic content when dialog opens
  const fetchDynamic = useCallback(async () => {
    const [newsRes, casinosRes] = await Promise.all([
      supabase
        .from("casino_news")
        .select("title, slug")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(50),
      supabase
        .from("casinos")
        .select("name, slug")
        .eq("is_active", true)
        .order("position", { ascending: true })
        .limit(100),
    ]);

    const items: SearchItem[] = [];
    if (newsRes.data) {
      for (const n of newsRes.data) {
        items.push({ label: n.title, to: `/casino-nyheder/${n.slug}`, category: "Nyheder" });
      }
    }
    if (casinosRes.data) {
      for (const c of casinosRes.data) {
        // Only add if not already in static reviews
        const path = `/casino-anmeldelser/${c.slug}`;
        if (!DEDUPED_STATIC.some(s => s.to === path)) {
          items.push({ label: c.name, to: path, category: "Casino Anmeldelser" });
        }
      }
    }
    setDynamicItems(items);
  }, []);

  useEffect(() => {
    if (open) {
      fetchDynamic();
    }
  }, [open, fetchDynamic]);

  const allItems = useMemo(() => [...DEDUPED_STATIC, ...dynamicItems], [dynamicItems]);

  // Group items by category
  const grouped = useMemo(() => {
    const map = new Map<string, SearchItem[]>();
    for (const item of allItems) {
      const list = map.get(item.category) || [];
      list.push(item);
      map.set(item.category, list);
    }
    return map;
  }, [allItems]);

  // Category display order
  const categoryOrder = [
    "Sider", "Casinoer", "Nye Casinoer", "Casino Anmeldelser", "Bonusser",
    "Spillemaskiner", "Casinospil", "Live Casino", "Betalingsmetoder",
    "Spiludviklere", "Community", "Nyheder", "Ordbog", "Forfattere",
  ];

  const handleSelect = (to: string) => {
    setOpen(false);
    navigate(to);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        className="h-9 w-9"
        aria-label="Søg (Ctrl+K)"
      >
        <Search className="h-4 w-4" />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Søg på hele sitet..." />
        <CommandList className="max-h-[60vh]">
          <CommandEmpty>Ingen resultater fundet.</CommandEmpty>
          {categoryOrder.map(cat => {
            const items = grouped.get(cat);
            if (!items?.length) return null;
            return (
              <CommandGroup key={cat} heading={cat}>
                {items.map(item => (
                  <CommandItem
                    key={item.to}
                    value={`${item.label} ${item.category}`}
                    onSelect={() => handleSelect(item.to)}
                  >
                    <Search className="mr-2 h-3 w-3 text-muted-foreground" />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
}
