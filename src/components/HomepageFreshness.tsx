import { Link } from "react-router-dom";
import { RefreshCw, Users, ShieldCheck } from "lucide-react";
import { usePageLastmod, formatTimestampDanish } from "@/hooks/usePageLastmod";

/**
 * Displays a visible "Last updated" + editorial attribution bar on the homepage.
 * Provides E-E-A-T freshness signal for users and crawlers.
 */
export function HomepageFreshness() {
  const { data: pageMeta } = usePageLastmod("/");

  const displayDate = pageMeta?.updated_at
    ? formatTimestampDanish(pageMeta.updated_at)
    : null;

  return (
    <div className="container pb-2 pt-6">
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
        {displayDate && (
          <span className="flex items-center gap-1.5">
            <RefreshCw className="h-3.5 w-3.5 text-primary" />
            <span>Sidst opdateret: <time dateTime={pageMeta!.updated_at}>{displayDate}</time></span>
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5 text-primary" />
          <span>
            Redaktion:{" "}
            <Link to="/forfatter/jonas" className="text-primary hover:underline">Jonas</Link>,{" "}
            <Link to="/forfatter/kevin" className="text-primary hover:underline">Kevin</Link>,{" "}
            <Link to="/forfatter/ajse" className="text-primary hover:underline">Ajse</Link>,{" "}
            <Link to="/forfatter/niklas" className="text-primary hover:underline">Niklas</Link> &{" "}
            <Link to="/forfatter/frederik" className="text-primary hover:underline">Frederik</Link>
          </span>
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          <Link to="/saadan-tester-vi-casinoer" className="text-primary hover:underline">Vores testmetode →</Link>
        </span>
      </div>
    </div>
  );
}
