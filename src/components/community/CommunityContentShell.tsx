import { ReactNode, Suspense, lazy } from "react";
import { cn } from "@/lib/utils";

const LazyContentSidebar = lazy(() =>
  import("@/components/ContentSidebar").then((mod) => ({ default: mod.ContentSidebar }))
);

interface CommunityContentShellProps {
  children: ReactNode;
  leftSidebar?: ReactNode;
  hideLeftSidebar?: boolean;
  mainClassName?: string;
  rightSidebar?: ReactNode;
}

export function CommunityContentShell({
  children,
  leftSidebar,
  hideLeftSidebar = false,
  mainClassName,
  rightSidebar,
}: CommunityContentShellProps) {
  return (
    <div className="mx-auto w-full max-w-[1800px] px-4 md:px-6 lg:px-8">
      <div className="flex justify-center gap-6 xl:gap-8">
        {!hideLeftSidebar && leftSidebar && (
          <aside className="hidden min-[1540px]:block w-[260px] flex-shrink-0 pt-8 md:pt-12">
            <div className="sticky top-24 h-fit flex flex-col gap-4">{leftSidebar}</div>
          </aside>
        )}

        <div className={cn("min-w-0 flex-1 max-w-[960px] pt-8 md:pt-12", mainClassName)}>
          {children}
        </div>

        <Suspense fallback={null}>
          <aside className="flex-shrink-0 pt-8 md:pt-12">
            {rightSidebar ?? <LazyContentSidebar />}
          </aside>
        </Suspense>
      </div>
    </div>
  );
}