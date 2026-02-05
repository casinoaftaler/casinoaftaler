import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SlotPageLayoutProps {
  children: ReactNode;
  sidePanel?: ReactNode;
  className?: string;
}

/**
 * Three-column layout for the slot machine page.
 * Desktop (xl+): Side panel on left, game in center, empty right for balance
 * Mobile/Tablet: Single column stack
 */
export function SlotPageLayout({ children, sidePanel, className }: SlotPageLayoutProps) {
  return (
    <div className={cn("w-full flex justify-center", className)}>
      {/* Three-column grid for desktop */}
      <div className="w-full max-w-[1600px] grid grid-cols-1 xl:grid-cols-[300px_1fr_300px] gap-4 xl:gap-6">
        {/* Left column - Side panel (Leaderboard + Promo) */}
        <aside className="hidden xl:flex flex-col gap-4 order-1">
          {sidePanel}
        </aside>

        {/* Center column - Main game area */}
        <main className="flex flex-col items-center order-2">
          {children}
        </main>

        {/* Right column - Empty for visual balance on desktop */}
        <div className="hidden xl:block order-3" aria-hidden="true" />
      </div>
    </div>
  );
}
