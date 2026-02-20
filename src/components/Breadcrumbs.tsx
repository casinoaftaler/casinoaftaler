import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { getBreadcrumbItems } from "@/lib/breadcrumbs";

/**
 * Renders the visual breadcrumb <nav>.
 * JSON-LD (BreadcrumbList) is now injected via SEO.tsx into the unified @graph.
 */
export function Breadcrumbs() {
  const { pathname } = useLocation();
  const items = getBreadcrumbItems(pathname);

  if (!items) return null;

  return (
    <nav aria-label="Breadcrumb" className="container py-3">
      <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={item.path} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5" />}
            {index === items.length - 1 ? (
              <span className="font-medium text-foreground">{item.name}</span>
            ) : index === 0 ? (
              <Link
                to={item.path}
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <Home className="h-3.5 w-3.5" />
                <span>{item.name}</span>
              </Link>
            ) : (
              <Link
                to={item.path}
                className="hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
