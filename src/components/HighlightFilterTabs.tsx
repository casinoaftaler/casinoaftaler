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
    <div className="flex flex-wrap items-center gap-2">
      {/* Platform filter */}
      <button
        onClick={() => onPlatformChange("all")}
        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
          activePlatform === "all"
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-card hover:bg-accent"
        }`}
      >
        <Filter className="mr-1 inline-block h-3.5 w-3.5" />
        Alle
      </button>
      <button
        onClick={() => onPlatformChange("youtube")}
        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
          activePlatform === "youtube"
            ? "border-destructive bg-destructive text-destructive-foreground"
            : "border-border bg-card hover:bg-accent"
        }`}
      >
        <Youtube className="mr-1 inline-block h-3.5 w-3.5" />
        YouTube
      </button>
      <button
        onClick={() => onPlatformChange("twitch")}
        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
          activePlatform === "twitch"
            ? "border-secondary bg-secondary text-secondary-foreground"
            : "border-border bg-card hover:bg-accent"
        }`}
      >
        <svg className="mr-1 inline-block h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
        </svg>
        Twitch
      </button>

      <span className="mx-1 h-5 w-px bg-border hidden sm:block" />

      {/* Category filter */}
      {!isLoading && categories && categories.length > 0 && (
        <>
          <button
            onClick={() => onCategoryChange("all")}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === "all"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:bg-accent"
            }`}
          >
            Alle Kategorier
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === category.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:bg-accent"
              }`}
            >
              {category.name}
            </button>
          ))}
        </>
      )}
    </div>
  );
}
