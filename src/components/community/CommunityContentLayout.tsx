import { ReactNode } from "react";
import { CommunitySeoBridge } from "./CommunitySeoBridge";

/**
 * Shared 2-column grid layout for community pages.
 * Sidebar (280px) + main content (1fr), centered with max-width.
 * On mobile: single column, sidebar stacks above content.
 */
export function CommunityContentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full mx-auto px-4 sm:px-6 py-8 md:py-12" style={{ maxWidth: "1320px" }}>
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
        {/* Sidebar */}
        <div className="lg:sticky lg:top-[120px] h-fit">
          <CommunitySeoBridge />
        </div>
        {/* Main content */}
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
