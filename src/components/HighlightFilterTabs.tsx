import { useHighlightCategories } from "@/hooks/useHighlightCategories";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Loader2, Youtube } from "lucide-react";

interface HighlightFilterTabsProps {
  activeCategory: string;
  activePlatform: string;
  onCategoryChange: (categoryId: string) => void;
  onPlatformChange: (platform: string) => void;
}

export function HighlightFilterTabs({
  activeCategory,
  activePlatform,
  onCategoryChange,
  onPlatformChange,
}: HighlightFilterTabsProps) {
  const { data: categories, isLoading } = useHighlightCategories();

  return (
    <div className="space-y-4">
      {/* Platform filter */}
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => onPlatformChange("all")}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            activePlatform === "all"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card hover:bg-accent"
          }`}
        >
          <Filter className="mr-1.5 inline-block h-4 w-4" />
          Alle Platforme
        </button>
        <button
          onClick={() => onPlatformChange("youtube")}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            activePlatform === "youtube"
              ? "border-destructive bg-destructive text-destructive-foreground"
              : "border-border bg-card hover:bg-accent"
          }`}
        >
          <Youtube className="mr-1.5 inline-block h-4 w-4" />
          YouTube
        </button>
        <button
          onClick={() => onPlatformChange("twitch")}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            activePlatform === "twitch"
              ? "border-secondary bg-secondary text-secondary-foreground"
              : "border-border bg-card hover:bg-accent"
          }`}
        >
          <svg
            className="mr-1.5 inline-block h-4 w-4"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
          </svg>
          Twitch
        </button>
      </div>

      {/* Category filter */}
      {isLoading ? (
        <div className="flex justify-center py-2">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : categories && categories.length > 0 ? (
        <Tabs value={activeCategory} onValueChange={onCategoryChange} className="w-full">
          <TabsList className="flex h-auto flex-wrap justify-center gap-2 bg-transparent p-0">
            <TabsTrigger
              value="all"
              className="rounded-full border border-border bg-card px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Alle Kategorier
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
      ) : null}
    </div>
  );
}
