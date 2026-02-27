import { useEffect, useState, useCallback } from "react";
import { List, ChevronDown, ChevronRight } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/** Headings containing any of these strings are excluded from ToC */
const EXCLUDED_PATTERNS = [
  "indholdsfortegnelse",
  "relaterede guides",
  "udforsk mere",
  "ofte stillede",
  "faq",
  "seneste opdateringer",
  "anbefalet læsning",
  "læs også",
  "relaterede anmeldelser",
  "populære anmeldelser",
];

const MAX_H2 = 15;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "oe")
    .replace(/å/g, "aa")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function isExcluded(text: string): boolean {
  const lower = text.toLowerCase();
  return EXCLUDED_PATTERNS.some((p) => lower.includes(p));
}

interface TableOfContentsProps {
  containerSelector?: string;
  title?: string;
}

/**
 * Minimalist, collapsed-by-default Table of Contents.
 * - Only shows H2 headings (H3 expand per-section via accordion)
 * - Excludes FAQ, related guides, etc.
 * - Hard cap at 15 H2s
 * - Auto-generates anchor IDs
 */
export function TableOfContents({
  containerSelector = "main",
  title = "Indholdsfortegnelse",
}: TableOfContentsProps) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [expandedH2, setExpandedH2] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const container = document.querySelector(containerSelector);
      if (!container) return;

      const headings = container.querySelectorAll("h2, h3");
      const tocItems: TocItem[] = [];
      const usedIds = new Set<string>();
      let h2Count = 0;

      headings.forEach((heading) => {
        const text = heading.textContent?.trim();
        if (!text) return;

        // Skip ToC's own heading
        if (heading.closest("[aria-label='Indholdsfortegnelse']")) return;
        // Skip hero sections
        if (heading.closest("[class*='hero'], [class*='Hero']")) return;
        // Skip excluded patterns
        if (isExcluded(text)) return;

        const level = heading.tagName === "H2" ? 2 : 3;

        // Hard cap on H2s
        if (level === 2) {
          h2Count++;
          if (h2Count > MAX_H2) return;
        }
        // Skip orphan H3s before any H2
        if (level === 3 && h2Count === 0) return;
        // Skip H3s beyond the cap
        if (level === 3 && h2Count > MAX_H2) return;

        // Generate unique ID
        let id = heading.id || slugify(text);
        if (usedIds.has(id)) {
          let c = 2;
          while (usedIds.has(`${id}-${c}`)) c++;
          id = `${id}-${c}`;
        }
        usedIds.add(id);
        if (!heading.id) heading.id = id;

        tocItems.push({ id, text, level });
      });

      // Only show if at least 3 H2s
      const h2Items = tocItems.filter((i) => i.level === 2);
      if (h2Items.length >= 3) {
        setItems(tocItems);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [containerSelector]);

  const handleClick = useCallback((id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${id}`);
    }
  }, []);

  const toggleH2 = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedH2((prev) => (prev === id ? null : id));
  }, []);

  if (items.length === 0) return null;

  // Group items: each H2 with its child H3s
  const groups: { h2: TocItem; h3s: TocItem[] }[] = [];
  for (const item of items) {
    if (item.level === 2) {
      groups.push({ h2: item, h3s: [] });
    } else if (groups.length > 0) {
      groups[groups.length - 1].h3s.push(item);
    }
  }

  return (
    <nav
      aria-label="Indholdsfortegnelse"
      className="my-6 rounded-lg border border-border bg-card overflow-hidden"
    >
      {/* Collapsed header — always visible */}
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 p-4 text-left transition-colors hover:bg-muted/50"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2 text-sm font-semibold">
          <List className="h-4 w-4 text-primary" />
          {title}
          <span className="text-xs font-normal text-muted-foreground">
            ({groups.length} sektioner)
          </span>
        </span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Expandable content */}
      <div
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ol className="space-y-0.5 border-t border-border px-4 pb-4 pt-2 list-none">
            {groups.map((group, idx) => {
              const hasChildren = group.h3s.length > 0;
              const isExpanded = expandedH2 === group.h2.id;

              return (
                <li key={group.h2.id}>
                  <div className="flex items-start gap-1.5">
                    {/* Expand toggle for H3s */}
                    {hasChildren ? (
                      <button
                        type="button"
                        onClick={(e) => toggleH2(group.h2.id, e)}
                        className="mt-1.5 shrink-0 rounded p-0.5 text-muted-foreground hover:text-primary transition-colors"
                        aria-label={isExpanded ? "Skjul undersektioner" : "Vis undersektioner"}
                      >
                        <ChevronRight
                          className={`h-3 w-3 transition-transform duration-150 ${
                            isExpanded ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                    ) : (
                      <span className="mt-1.5 w-4 shrink-0" />
                    )}

                    <a
                      href={`#${group.h2.id}`}
                      onClick={(e) => handleClick(group.h2.id, e)}
                      className="flex-1 py-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      <span className="mr-1.5 font-mono text-xs text-muted-foreground/50">
                        {idx + 1}.
                      </span>
                      <span className="hover:underline">{group.h2.text}</span>
                    </a>
                  </div>

                  {/* H3 accordion */}
                  {hasChildren && (
                    <div
                      className={`grid transition-[grid-template-rows] duration-150 ease-out ${
                        isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <ul className="overflow-hidden pl-8 list-none space-y-0.5">
                        {group.h3s.map((h3) => (
                          <li key={h3.id}>
                            <a
                              href={`#${h3.id}`}
                              onClick={(e) => handleClick(h3.id, e)}
                              className="block py-0.5 text-xs text-muted-foreground/80 transition-colors hover:text-primary hover:underline"
                            >
                              – {h3.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </nav>
  );
}
