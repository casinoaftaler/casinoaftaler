import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

interface GPWASealBadgeProps {
  /** "inline" = compact for review intros, "block" = larger for trust pages */
  variant?: "inline" | "block";
  /** Custom microcopy – defaults to "Godkendt af GPWA" */
  microcopy?: string;
  /** Show link to trust page */
  showTrustLink?: boolean;
}

const SEAL_IMG = "https://certify.gpwa.org/seal/casinoaftaler.dk/";
const VERIFY_URL = "https://certify.gpwa.org/verify/casinoaftaler.dk/";

function openVerification(e: React.MouseEvent) {
  e.preventDefault();
  window.open(VERIFY_URL, "GPWAVerification", "height=560,width=480,toolbar=no,menubar=no,scrollbars=yes");
}

export function GPWASealBadge({
  variant = "inline",
  microcopy = "Godkendt af GPWA",
  showTrustLink = false,
}: GPWASealBadgeProps) {
  const isBlock = variant === "block";
  const imgSize = isBlock ? 64 : 40;

  return (
    <div
      className={`flex items-center gap-2.5 ${
        isBlock
          ? "rounded-xl border border-border bg-card p-4 shadow-sm"
          : "rounded-lg border border-border/50 bg-muted/30 px-3 py-2"
      }`}
    >
      <a
        href={VERIFY_URL}
        onClick={openVerification}
        className="shrink-0"
        aria-label="Verificér GPWA godkendelse"
      >
        <img
          src={SEAL_IMG}
          alt="GPWA Seal of Approval – verificeret affiliate portal"
          style={{ height: imgSize, width: "auto" }}
          loading="eager"
          onError={(e) => {
            const img = e.currentTarget;
            img.width = 0;
            img.height = 0;
          }}
        />
      </a>
      <div className="flex flex-col gap-0.5">
        <span className={`flex items-center gap-1 font-medium text-foreground ${isBlock ? "text-sm" : "text-xs"}`}>
          <ShieldCheck className={isBlock ? "h-4 w-4 text-primary" : "h-3.5 w-3.5 text-primary"} />
          {microcopy}
        </span>
        {isBlock && (
          <span className="text-xs text-muted-foreground">
            Uafhængigt verificeret casino-portal
          </span>
        )}
        {showTrustLink && (
          <Link
            to="/er-casinoaftaler-trovaerdig"
            className="text-xs text-primary hover:underline"
          >
            Læs mere om vores troværdighed →
          </Link>
        )}
      </div>
      <noscript>
        <a href={VERIFY_URL} target="_blank" rel="noopener noreferrer">
          GPWA Approved Portal
        </a>
      </noscript>
    </div>
  );
}
