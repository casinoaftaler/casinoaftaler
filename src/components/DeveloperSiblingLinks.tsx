import { Link } from "react-router-dom";
import { Code2 } from "lucide-react";

/**
 * Sibling cross-links for spiludvikler guide pages.
 * Adds ~10 links per page × 12 pages = ~120 new internal links.
 */

interface DeveloperSiblingLinksProps {
  currentPath: string;
}

const DEVELOPER_SIBLINGS = [
  { to: "/spiludviklere", label: "Alle Spiludviklere" },
  { to: "/spiludviklere/evolution-gaming", label: "Evolution Gaming" },
  { to: "/spiludviklere/pragmatic-play", label: "Pragmatic Play" },
  { to: "/spiludviklere/netent", label: "NetEnt" },
  { to: "/spiludviklere/play-n-go", label: "Play'n GO" },
  { to: "/spiludviklere/hacksaw-gaming", label: "Hacksaw Gaming" },
  { to: "/spiludviklere/nolimit-city", label: "Nolimit City" },
  { to: "/spiludviklere/big-time-gaming", label: "Big Time Gaming" },
  { to: "/spiludviklere/red-tiger", label: "Red Tiger" },
  { to: "/spiludviklere/elk-studios", label: "ELK Studios" },
  { to: "/spiludviklere/yggdrasil", label: "Yggdrasil" },
  { to: "/spiludviklere/microgaming", label: "Microgaming" },
  { to: "/spiludviklere/relax-gaming", label: "Relax Gaming" },
];

export function DeveloperSiblingLinks({ currentPath }: DeveloperSiblingLinksProps) {
  const siblings = DEVELOPER_SIBLINGS.filter((s) => s.to !== currentPath);

  return (
    <div className="rounded-lg border border-border bg-card p-4 mb-8">
      <p className="text-xs text-muted-foreground uppercase mb-2 flex items-center gap-1.5">
        <Code2 className="h-3.5 w-3.5" />
        Udforsk andre spiludviklere
      </p>
      <div className="flex flex-wrap gap-2">
        {siblings.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="inline-block rounded-md bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground hover:bg-primary/10 hover:text-primary transition-colors"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
