import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { CommunityNav } from "./CommunityNav";
import { type LucideIcon } from "lucide-react";

interface CommunityPageLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  badgeText: string;
  badgeIcon: LucideIcon;
  /** Set false to skip the hero (e.g. GameLibrary has its own) */
  showHero?: boolean;
}

export function CommunityPageLayout({
  children,
  title,
  description,
  badgeText,
  badgeIcon: BadgeIcon,
  showHero = true,
}: CommunityPageLayoutProps) {
  return (
    <>
      {showHero && (
        <section
          className="relative overflow-hidden py-12 text-white md:py-20"
          style={{
            backgroundImage:
              "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4">
                <BadgeIcon className="mr-1.5 h-3.5 w-3.5" />
                {badgeText}
              </Badge>
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                {title}
              </h1>
              <p className="text-lg text-white/80">{description}</p>
            </div>
          </div>
        </section>
      )}
      <CommunityNav />
      {children}
    </>
  );
}
