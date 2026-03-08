import { useState, useEffect, useCallback } from "react";
import { Link2, X, ExternalLink, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SITE_URL } from "@/lib/seo";

interface LinkInfo {
  href: string;
  text: string;
  isInternal: boolean;
  isExternal: boolean;
}

/**
 * Floating admin tool that counts all links on the current page.
 * Shows a badge with link count + color-coded warning.
 * Click to expand full link list with destinations.
 */
export function LinkDensityMonitor() {
  const [links, setLinks] = useState<LinkInfo[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [hidden, setHidden] = useState(false);

  const scanLinks = useCallback(() => {
    const anchors = document.querySelectorAll("a[href]");
    const results: LinkInfo[] = [];

    anchors.forEach((a) => {
      const href = a.getAttribute("href") || "";
      const text = (a.textContent || "").trim().slice(0, 60);
      
      // Skip the monitor's own links
      if (a.closest("[data-link-monitor]")) return;

      const isInternal =
        href.startsWith("/") ||
        href.startsWith(SITE_URL) ||
        href.startsWith(window.location.origin);
      const isExternal = href.startsWith("http") && !isInternal;

      results.push({ href, text, isInternal, isExternal });
    });

    setLinks(results);
  }, []);

  useEffect(() => {
    // Initial scan after render
    const timer = setTimeout(scanLinks, 1000);
    return () => clearTimeout(timer);
  }, [scanLinks]);

  // Re-scan on route changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTimeout(scanLinks, 500);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [scanLinks]);

  if (hidden) return null;

  const internalCount = links.filter((l) => l.isInternal).length;
  const externalCount = links.filter((l) => l.isExternal).length;
  const totalCount = links.length;

  const getColor = () => {
    if (internalCount > 60) return "text-destructive";
    if (internalCount > 40) return "text-yellow-500";
    return "text-emerald-500";
  };

  const getIcon = () => {
    if (internalCount > 60) return <AlertTriangle className="h-3.5 w-3.5" />;
    if (internalCount > 40) return <AlertTriangle className="h-3.5 w-3.5" />;
    return <CheckCircle2 className="h-3.5 w-3.5" />;
  };

  return (
    <div
      data-link-monitor
      className="fixed bottom-4 right-4 z-[9999]"
    >
      {!expanded ? (
        <button
          onClick={() => setExpanded(true)}
          className={`flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs font-medium shadow-lg hover:shadow-xl transition-shadow ${getColor()}`}
          title="Link Density Monitor – klik for detaljer"
        >
          <Link2 className="h-3.5 w-3.5" />
          <span>{internalCount} int</span>
          <span className="text-muted-foreground">/ {externalCount} ext</span>
          {getIcon()}
        </button>
      ) : (
        <div className="w-80 max-h-[70vh] rounded-lg border border-border bg-card shadow-xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Link2 className="h-4 w-4 text-primary" />
              Link Density Monitor
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={scanLinks}
                className="rounded p-1 text-xs text-muted-foreground hover:text-foreground"
                title="Scan igen"
              >
                ↻
              </button>
              <button
                onClick={() => setExpanded(false)}
                className="rounded p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-2 px-3 py-2 border-b border-border text-center text-xs">
            <div>
              <div className="text-lg font-bold">{totalCount}</div>
              <div className="text-muted-foreground">Total</div>
            </div>
            <div>
              <div className={`text-lg font-bold ${getColor()}`}>{internalCount}</div>
              <div className="text-muted-foreground">Interne</div>
            </div>
            <div>
              <div className="text-lg font-bold">{externalCount}</div>
              <div className="text-muted-foreground">Eksterne</div>
            </div>
          </div>

          {/* Status */}
          <div className="px-3 py-2 border-b border-border">
            {internalCount > 60 ? (
              <Badge variant="destructive" className="text-xs">
                ⚠️ Over 60 interne links – risiko for over-optimering
              </Badge>
            ) : internalCount > 40 ? (
              <Badge variant="secondary" className="text-xs">
                ⚡ 40-60 interne links – grænseområde
              </Badge>
            ) : (
              <Badge variant="secondary" className="text-xs bg-emerald-500/10 text-emerald-600">
                ✓ Under 40 interne links – optimal
              </Badge>
            )}
          </div>

          {/* Link list */}
          <div className="overflow-y-auto flex-1 max-h-[40vh]">
            <div className="px-3 py-1 text-xs font-semibold text-muted-foreground bg-muted/50">
              Interne links ({internalCount})
            </div>
            {links
              .filter((l) => l.isInternal)
              .map((link, i) => (
                <div
                  key={`int-${i}`}
                  className="flex items-start gap-2 px-3 py-1.5 text-xs border-b border-border/50 hover:bg-muted/30"
                >
                  <Link2 className="h-3 w-3 mt-0.5 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="truncate text-foreground">{link.text || "(tom)"}</div>
                    <div className="truncate text-muted-foreground">{link.href}</div>
                  </div>
                </div>
              ))}

            <div className="px-3 py-1 text-xs font-semibold text-muted-foreground bg-muted/50">
              Eksterne links ({externalCount})
            </div>
            {links
              .filter((l) => l.isExternal)
              .map((link, i) => (
                <div
                  key={`ext-${i}`}
                  className="flex items-start gap-2 px-3 py-1.5 text-xs border-b border-border/50 hover:bg-muted/30"
                >
                  <ExternalLink className="h-3 w-3 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="truncate text-foreground">{link.text || "(tom)"}</div>
                    <div className="truncate text-muted-foreground">{link.href}</div>
                  </div>
                </div>
              ))}
          </div>

          {/* Footer */}
          <div className="border-t border-border px-3 py-1.5 text-center">
            <button
              onClick={() => setHidden(true)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Skjul monitor
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
