import { Badge } from "@/components/ui/badge";
import { ClipCategory, CLIP_CATEGORIES } from "@/hooks/useCommunityClips";

interface ClipCategoryBadgesProps {
  categories: ClipCategory[];
  size?: "sm" | "default";
}

export function ClipCategoryBadges({ categories, size = "default" }: ClipCategoryBadgesProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1">
      {categories.map((cat) => {
        const categoryInfo = CLIP_CATEGORIES.find((c) => c.value === cat);
        if (!categoryInfo) return null;

        return (
          <Badge
            key={cat}
            variant="secondary"
            className={size === "sm" ? "text-xs px-1.5 py-0" : ""}
          >
            {categoryInfo.emoji} {categoryInfo.label}
          </Badge>
        );
      })}
    </div>
  );
}
