import { useEffect, useState } from "react";
import { List } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Generates a URL-friendly slug from heading text.
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "oe")
    .replace(/å/g, "aa")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface TableOfContentsProps {
  /** CSS selector for the container to scan for headings. Defaults to "main" */
  containerSelector?: string;
  /** Heading levels to include. Defaults to ["h2"] */
  levels?: ("h2" | "h3")[];
  /** Optional title override */
  title?: string;
}

/**
 * Auto-generated Table of Contents.
 * Scans the DOM for h2/h3 headings within a container,
 * injects `id` attributes for anchor linking, and renders
 * a clickable navigation list.
 *
 * SEO benefit: enables jump-link sitelinks in Google SERP.
 */
export function TableOfContents({
  containerSelector = "main",
  levels = ["h2"],
  title = "Indholdsfortegnelse",
}: TableOfContentsProps) {
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    // Small delay to ensure content has rendered
    const timer = setTimeout(() => {
      const container = document.querySelector(containerSelector);
      if (!container) return;

      const selector = levels.join(", ");
      const headings = container.querySelectorAll(selector);
      const tocItems: TocItem[] = [];
      const usedIds = new Set<string>();

      headings.forEach((heading) => {
        const text = heading.textContent?.trim();
        if (!text) return;

        // Skip the ToC's own heading
        if (heading.closest("[aria-label='Indholdsfortegnelse']")) return;

        // Skip headings that are already the page H1 or inside hero sections
        if (heading.tagName === "H1") return;
        const closestSection = heading.closest("[class*='hero'], [class*='Hero']");
        if (closestSection) return;

        // Generate unique ID
        let id = heading.id || slugify(text);
        if (usedIds.has(id)) {
          let counter = 2;
          while (usedIds.has(`${id}-${counter}`)) counter++;
          id = `${id}-${counter}`;
        }
        usedIds.add(id);

        // Inject ID onto the heading element for anchor linking
        if (!heading.id) {
          heading.id = id;
        }

        const level = heading.tagName === "H2" ? 2 : 3;
        tocItems.push({ id, text, level });
      });

      if (tocItems.length >= 3) {
        setItems(tocItems);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [containerSelector, levels]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Indholdsfortegnelse"
      className="my-8 rounded-xl border border-border bg-card p-5 md:p-6"
    >
      <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
        <List className="h-5 w-5 text-primary" />
        {title}
      </h2>
      <ol className="space-y-1.5 list-none pl-0">
        {items.map((item, index) => (
          <li key={item.id} className={item.level === 3 ? "pl-5" : ""}>
            <a
              href={`#${item.id}`}
              className="group flex items-start gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.id);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                  // Update URL without scroll jump
                  window.history.replaceState(null, "", `#${item.id}`);
                }
              }}
            >
              <span className="shrink-0 font-mono text-xs text-muted-foreground/60 mt-0.5">
                {item.level === 2
                  ? `${items.filter((i, idx) => idx <= index && i.level === 2).length}.`
                  : "–"}
              </span>
              <span className="group-hover:underline">{item.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
