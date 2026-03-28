import { type ReactNode } from "react";
import { ContentSidebar } from "./ContentSidebar";

interface ContentPageLayoutProps {
  children: ReactNode;
}

/**
 * Wraps money/content page content in a 2-column grid:
 * main content on the left, categorized sidebar on the right.
 * Sidebar is hidden below xl breakpoint.
 */
export function ContentPageLayout({ children }: ContentPageLayoutProps) {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex gap-8 xl:gap-10">
        <div className="min-w-0 flex-1">{children}</div>
        <ContentSidebar />
      </div>
    </div>
  );
}
