import { useHighlightCategories } from "@/hooks/useHighlightCategories";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Loader2 } from "lucide-react";

interface HighlightFilterTabsProps {
  activeFilter: string;
  onFilterChange: (categoryId: string) => void;
}

export function HighlightFilterTabs({
  activeFilter,
  onFilterChange,
}: HighlightFilterTabsProps) {
  const { data: categories, isLoading } = useHighlightCategories();

  if (isLoading) {
    return (
      <div className="flex justify-center py-2">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Don't show filter tabs if no categories exist
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <Tabs value={activeFilter} onValueChange={onFilterChange} className="w-full">
      <TabsList className="flex h-auto flex-wrap justify-center gap-2 bg-transparent p-0">
        <TabsTrigger
          value="all"
          className="rounded-full border border-border bg-card px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <Filter className="mr-1.5 h-4 w-4" />
          Alle
        </TabsTrigger>
        {categories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.id}
            className="rounded-full border border-border bg-card px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
