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
    <div className="flex h-auto flex-wrap justify-start gap-2" role="group" aria-label="Filtrer casinoer" style={{ minHeight: '44px' }}>
      {filters.map((filter) => (
        <button
          key={filter.id}
          aria-pressed={activeFilter === filter.id}
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
