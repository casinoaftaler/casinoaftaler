import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    <Tabs value={activeFilter} onValueChange={onFilterChange} className="w-full">
      <TabsList className="flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
        {filters.map((filter) => (
          <TabsTrigger
            key={filter.id}
            value={filter.id}
            className="rounded-full border border-border bg-card px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            {filter.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
