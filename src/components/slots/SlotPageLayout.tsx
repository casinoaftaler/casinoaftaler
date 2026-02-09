import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SlotPageLayoutProps {
  children: ReactNode;
  sidePanel?: ReactNode;
  sidePanelGap?: number;
  className?: string;
}

/**
 * Layout for the slot machine page.
 * Game is truly centered, side panel is positioned to the left without affecting center.
 */
export function SlotPageLayout({ children, sidePanel, sidePanelGap = 24, className }: SlotPageLayoutProps) {
  return (
    <div className={cn("w-full flex justify-center", className)}>
      {/* Centered game container with relative positioning for side panel */}
      <div className="relative flex justify-center w-full">
        {/* Left side panel - absolutely positioned on desktop, vertically centered */}
        {sidePanel && (
          <aside
            className="hidden xl:flex flex-col gap-4 absolute right-full top-1/2 -translate-y-1/2 w-[300px] z-10"
            style={{ marginRight: `${sidePanelGap}px` }}
          >
            {sidePanel}
          </aside>
        )}

        {/* Center column - Main game area (truly centered) */}
        <main className="flex flex-col items-center">
          {children}
        </main>
      </div>
    </div>
  );
}
