import { useRef, useState, useEffect, type ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  /** Vertical margin for IntersectionObserver (default: "200px" = preload 200px before visible) */
  rootMargin?: string;
  /** Minimum height placeholder to prevent layout shift */
  minHeight?: string;
  /** Fallback shown while not yet visible */
  fallback?: ReactNode;
}

/**
 * Defers rendering of heavy sections until they enter (or are near) the viewport.
 * Reduces initial DOM node count on long pages.
 */
export function LazySection({
  children,
  rootMargin = "200px",
  minHeight = "200px",
  fallback,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={{ minHeight: isVisible ? undefined : minHeight }}>
      {isVisible ? children : (fallback ?? null)}
    </div>
  );
}
