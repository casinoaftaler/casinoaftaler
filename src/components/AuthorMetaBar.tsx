import { useMemo, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CalendarDays, BookOpen, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TableOfContents } from "@/components/TableOfContents";
import { getRouteMetadata, formatLastmodDanish, getRouteFactChecker } from "@/lib/seoRoutes";
import { usePageLastmod, formatTimestampDanish } from "@/hooks/usePageLastmod";

/**
 * Auto-calculate read time from page content.
 * Scans the closest <main> or container for text, strips HTML, counts words at ~200 words/min.
 */
function useAutoReadTime(minMinutes = 3): string {
  const [readTime, setReadTime] = useState<string>(`${minMinutes} min`);

  useEffect(() => {
    // Delay slightly to ensure page content has rendered
    const timer = setTimeout(() => {
      const main = document.querySelector("main") || document.querySelector(".container");
      if (!main) return;
      const text = main.innerText || main.textContent || "";
      const wordCount = text.split(/\s+/).filter(Boolean).length;
      const minutes = Math.max(minMinutes, Math.ceil(wordCount / 200));
      setReadTime(`${minutes} min`);
    }, 100);
    return () => clearTimeout(timer);
  }, [minMinutes]);

  return readTime;
}

const DISCLAIMER_VARIANTS = [
  <>Denne side indeholder affiliate-links. Vi modtager provision, hvis du opretter en konto via vores links – det påvirker ikke vores vurdering. <Link to="/forretningsmodel" className="underline hover:text-primary">Læs mere om vores model</Link>.</>,
  <>Indholdet er uafhængigt, men vi modtager kompensation via affiliate-samarbejder. Det har ingen indflydelse på vores anbefalinger. <Link to="/forretningsmodel" className="underline hover:text-primary">Læs mere</Link>.</>,
  <>Vi finansieres delvist gennem affiliate-links på denne side. Vores vurderinger er redaktionelt uafhængige. <Link to="/forretningsmodel" className="underline hover:text-primary">Se vores forretningsmodel</Link>.</>,
  <>Nogle links på denne side er affiliate-links. Det betyder, at vi kan modtage provision – uden ekstra omkostning for dig. <Link to="/forretningsmodel" className="underline hover:text-primary">Sådan fungerer det</Link>.</>,
  <>Denne artikel kan indeholde kommercielle links. Provisionen påvirker aldrig vores redaktionelle vurdering. <Link to="/forretningsmodel" className="underline hover:text-primary">Læs om vores uafhængighed</Link>.</>,
];

function hashPath(path: string): number {
  let hash = 0;
  for (let i = 0; i < path.length; i++) {
    hash = ((hash << 5) - hash + path.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function AffiliateDisclaimer() {
  const { pathname } = useLocation();
  const variant = useMemo(
    () => DISCLAIMER_VARIANTS[hashPath(pathname) % DISCLAIMER_VARIANTS.length],
    [pathname]
  );

  return (
    <p className="mb-8 text-xs text-muted-foreground italic">
      {variant}
    </p>
  );
}

const authorConfig = {
  jonas: { name: "Jonas", image: "/jonas-avatar.webp", alt: "Jonas – Fedesvinsejer", link: "/forfatter/jonas" },
  kevin: { name: "Kevin", image: "/kevin-avatar.webp", alt: "Kevin – Casino-streamer", link: "/forfatter/kevin" },
  ajse: { name: "Ajse", image: "/ajse-avatar.webp", alt: "Ajse – Juridisk redaktør", link: "/forfatter/ajse" },
  niklas: { name: "Niklas", image: "/niklas-avatar.webp", alt: "Niklas – Finansøkonom", link: "/forfatter/niklas" },
  frederik: { name: "Frederik", image: "/frederik-avatar.webp", alt: "Frederik – Casino-streamer", link: "/forfatter/frederik" },
} as const;

interface AuthorMetaBarProps {
  author: "jonas" | "kevin" | "ajse" | "niklas" | "frederik" | "redaktionen";
  /**
   * @deprecated Read time is now auto-calculated from page content.
   * This prop is ignored – kept only for backwards compatibility.
   */
  readTime?: string;
  showFactCheck?: boolean;
  showVerified?: boolean;
  showAffiliateDisclaimer?: boolean;
  /** Override which author is shown as fact-checker. Defaults to seoRoutes lookup, then cross-check logic. */
  factCheckBy?: "jonas" | "kevin" | "ajse" | "niklas" | "frederik";
  /** Hide the Table of Contents (e.g. on community pages). */
  hideTableOfContents?: boolean;
}

export function AuthorMetaBar({ author, showFactCheck = true, showVerified = false, showAffiliateDisclaimer = true, factCheckBy }: AuthorMetaBarProps) {
  const { pathname } = useLocation();
  const authorInfo = author !== "redaktionen" ? authorConfig[author] : null;
  const autoReadTime = useAutoReadTime();

  // Fetch dynamic date from DB (single source of truth)
  const { data: dbMeta } = usePageLastmod(pathname);

  // Resolve display date: prefer DB (dynamic), then seoRoutes (static fallback)
  const routeMeta = getRouteMetadata(pathname);
  const shouldShowDate = dbMeta?.show_updated_date ?? routeMeta?.showUpdatedDate !== false;

  const displayDate = useMemo(() => {
    if (dbMeta?.updated_at) {
      return formatTimestampDanish(dbMeta.updated_at);
    }
    if (routeMeta?.lastmod) {
      return formatLastmodDanish(routeMeta.lastmod);
    }
    return null;
  }, [dbMeta?.updated_at, routeMeta?.lastmod]);

  return (
    <>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-y-3 text-sm text-muted-foreground">
        {/* Left side: author + date + read time */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <div className="flex items-center gap-2">
            <span>Skrevet af:</span>
            {authorInfo ? (
              <Link to={authorInfo.link} className="flex items-center gap-1.5 group">
                <img
                  src={authorInfo.image}
                  alt={authorInfo.alt}
                  width={24}
                  height={24}
                  loading="lazy"
                  fetchPriority="low"
                  className="h-6 w-6 rounded-full object-cover object-top ring-1 ring-border group-hover:ring-primary transition-colors"
                />
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {authorInfo.name}
                </span>
              </Link>
            ) : (
              <span className="font-medium text-foreground">Casinoaftaler Redaktionen</span>
            )}
          </div>
          {shouldShowDate && displayDate && (
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              <span>
                Opdateret: <span className="font-medium text-foreground">{displayDate}</span>
              </span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>
              Læsetid: <span className="font-medium text-foreground">{autoReadTime}</span>
            </span>
          </div>
          {showVerified && (
            <div className="flex items-center gap-1.5 opacity-85">
              <CheckCircle className="h-3.5 w-3.5 text-primary" />
              <span className="text-sm text-muted-foreground">Verificeret ekspertprofil</span>
            </div>
          )}
        </div>

        {/* Right side: fact-check badge */}
        {showFactCheck && (() => {
          // Determine fact-checker: explicit prop > seoRoutes lookup > default cross-check
          const routeChecker = getRouteFactChecker(pathname);
          const resolvedChecker = factCheckBy
            ?? routeChecker
            ?? (author === "niklas" ? "ajse" : (author === "kevin" || author === "redaktionen") ? "jonas" : "kevin");
          const checkerInfo = authorConfig[resolvedChecker as keyof typeof authorConfig];
          return checkerInfo ? (
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="gap-1 relative overflow-hidden border-emerald-600/40 text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950/40 dark:border-emerald-500/30 before:absolute before:inset-0 before:bg-emerald-500/20 dark:before:bg-emerald-500/15 before:translate-x-[-100%] before:animate-[factcheck-sweep_1.2s_ease-out_0.3s_forwards]"
              >
                <CheckCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                Faktatjekket
              </Badge>
              <Link to={checkerInfo.link} className="flex items-center gap-1.5 group">
                <span>Af:</span>
                <img
                  src={checkerInfo.image}
                  alt={checkerInfo.alt}
                  width={24}
                  height={24}
                  className="h-6 w-6 rounded-full object-cover object-top ring-1 ring-border group-hover:ring-primary transition-colors"
                />
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {checkerInfo.name}
                </span>
              </Link>
            </div>
          ) : null;
        })()}
      </div>
      {showAffiliateDisclaimer && <AffiliateDisclaimer />}
      {!showAffiliateDisclaimer && <div className="mb-6" />}
      <TableOfContents />
    </>
  );
}
