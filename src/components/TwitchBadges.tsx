import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
  size?: "sm" | "md" | "lg";
}

export function TwitchBadges({ 
  userId, 
  badges: propBadges, 
  isLoading: propIsLoading,
  className = "",
  size = "md",
}: TwitchBadgesProps) {
  const { data, isLoading: queryLoading } = useTwitchBadges(
    propBadges !== undefined ? null : userId
  );

  const badges = propBadges !== undefined ? propBadges : data?.badges;
  const isLoading = propIsLoading !== undefined ? propIsLoading : queryLoading;

  if (isLoading) {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>
    );
  }

  const badgeList = getBadgeInfo(badges);

  if (badgeList.length === 0) {
    return null;
  }

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <TooltipProvider delayDuration={200}>
      <div className={`flex items-center gap-1.5 ${className}`}>
        {badgeList.map((badge) => {
          const Icon = ICON_MAP[badge.icon] || Heart;
          return (
            <Tooltip key={badge.key}>
              <TooltipTrigger asChild>
                <span className="inline-flex cursor-default">
                  <Icon className={`${iconSizes[size]} ${badge.color}`} />
                </span>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                {badge.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}

// Compact inline version for headers/smaller spaces
export function TwitchBadgesInline({
  userId,
  badges: propBadges,
  isLoading: propIsLoading,
  className = "",
}: Omit<TwitchBadgesProps, "size">) {
  return (
    <TwitchBadges
      userId={userId}
      badges={propBadges}
      isLoading={propIsLoading}
      className={className}
      size="sm"
    />
  );
}
