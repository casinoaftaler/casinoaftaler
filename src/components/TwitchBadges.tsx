import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Sword, 
  Gem, 
  Star, 
  Heart, 
  Crown, 
  Award 
} from "lucide-react";
import { useTwitchBadges, getBadgeInfo, TwitchBadges as TwitchBadgesType } from "@/hooks/useTwitchBadges";

const ICON_MAP: Record<string, React.ElementType> = {
  sword: Sword,
  gem: Gem,
  star: Star,
  heart: Heart,
  crown: Crown,
  award: Award,
};

interface TwitchBadgesProps {
  userId?: string | null;
  badges?: TwitchBadgesType | null;
  isLoading?: boolean;
  className?: string;
  showLabels?: boolean;
  size?: "sm" | "md" | "lg";
}

export function TwitchBadges({ 
  userId, 
  badges: propBadges, 
  isLoading: propIsLoading,
  className = "",
  showLabels = true,
  size = "md",
}: TwitchBadgesProps) {
  // If badges are passed directly, use them; otherwise fetch
  const { data, isLoading: queryLoading } = useTwitchBadges(
    propBadges !== undefined ? null : userId
  );

  const badges = propBadges !== undefined ? propBadges : data?.badges;
  const isLoading = propIsLoading !== undefined ? propIsLoading : queryLoading;

  if (isLoading) {
    return (
      <div className={`flex flex-wrap gap-1.5 ${className}`}>
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    );
  }

  const badgeList = getBadgeInfo(badges);

  if (badgeList.length === 0) {
    return null;
  }

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-0.5 text-xs",
    lg: "px-3 py-1 text-sm",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-3.5 w-3.5",
    lg: "h-4 w-4",
  };

  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {badgeList.map((badge) => {
        const Icon = ICON_MAP[badge.icon] || Heart;
        return (
          <Badge
            key={badge.key}
            variant="outline"
            className={`${badge.color} ${sizeClasses[size]} font-medium border`}
          >
            <Icon className={`${iconSizes[size]} ${showLabels ? "mr-1" : ""}`} />
            {showLabels && badge.label}
          </Badge>
        );
      })}
    </div>
  );
}

// Compact inline version for headers/smaller spaces
export function TwitchBadgesInline({
  userId,
  badges: propBadges,
  isLoading: propIsLoading,
  className = "",
}: Omit<TwitchBadgesProps, "showLabels" | "size">) {
  return (
    <TwitchBadges
      userId={userId}
      badges={propBadges}
      isLoading={propIsLoading}
      className={className}
      showLabels={false}
      size="sm"
    />
  );
}
