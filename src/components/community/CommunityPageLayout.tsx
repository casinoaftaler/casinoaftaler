import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { CommunityNav } from "./CommunityNav";
import { CommunitySeoBridge } from "./CommunitySeoBridge";
import { CommunityConversionCard } from "./CommunityConversionCard";
import { SidebarLeaderboard } from "@/components/games/SidebarLeaderboard";
import { SidebarShopLeaderboard } from "@/components/games/SidebarShopLeaderboard";
import { type LucideIcon } from "lucide-react";
import communityHero from "@/assets/community/community-hero.jpg";

interface CommunityPageLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  badgeText: string;
  badgeIcon: LucideIcon;
  showHero?: boolean;
  hideSidebar?: boolean;
  heroExtra?: ReactNode;
}

export function CommunityPageLayout({
  children,
  title,
  description,
  badgeText,
  badgeIcon: BadgeIcon,
  showHero = true,
  hideSidebar = false,
  heroExtra,
}: CommunityPageLayoutProps) {
  return (
    <>
      {showHero && (
        <section className="relative overflow-hidden text-white">
          {/* Hero background image */}
          <img
            src={communityHero}
            alt="Community hero baggrund"
            width={1920}
            height={1080}
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(135deg, hsl(260 70% 25% / 0.85), hsl(250 60% 20% / 0.8) 40%, hsl(210 80% 25% / 0.85))",
            }}
          />
          <div className="relative container py-12 md:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4">
                <BadgeIcon className="mr-1.5 h-3.5 w-3.5" />
                {badgeText}
              </Badge>
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                {title}
              </h1>
              <p className="text-lg text-white/80">{description}</p>
              {heroExtra && <div className="mt-4">{heroExtra}</div>}
            </div>
          </div>
        </section>
      )}
      <CommunityNav />
      <div className="container relative">
        {/* Sidebar - positioned to the left, outside content flow */}
        {!hideSidebar && (
          <div className="hidden xl:block absolute right-full top-0 mr-6 w-[260px] pt-8 md:pt-12">
            <div className="sticky top-24 h-fit flex flex-col gap-4">
              <CommunitySeoBridge />
              <CommunityConversionCard />
              <SidebarLeaderboard />
              <SidebarShopLeaderboard />
            </div>
          </div>
        )}
        {/* Main content - completely unaffected by sidebar */}
        <div>{children}</div>
      </div>
    </>
  );
}
