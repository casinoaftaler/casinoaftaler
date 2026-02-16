const filters = [
  { id: "all", label: "Alle Bonusser" },
  { id: "no-sticky", label: "No-Sticky" },
  { id: "free-spins", label: "Gratis Spins" },
  { id: "fast-payout", label: "Hurtig Udbetaling" },
  { id: "mobile", label: "Mobil" },
];

interface FilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  return (
    <div className="flex h-auto flex-wrap justify-start gap-2" role="tablist" aria-label="Filtrer casinoer">
      {filters.map((filter) => (
        <button
          key={filter.id}
          role="tab"
          aria-selected={activeFilter === filter.id}
          id={`filter-tab-${filter.id}`}
          aria-controls={`filter-panel-${filter.id}`}
          onClick={() => onFilterChange(filter.id)}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            activeFilter === filter.id
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-foreground hover:border-primary/50"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
