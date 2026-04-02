import { Link } from "react-router-dom";
import { MenuIcon } from "@/components/MenuIcon";
import { Link } from "lucide-react";

const pillClass =
  "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 font-medium text-primary transition-colors hover:bg-accent/50 hover:border-primary/40";

interface ReviewMoneyLinksProps {
  showMobilePay?: boolean;
}

export function ReviewMoneyLinks({ showMobilePay = false }: ReviewMoneyLinksProps) {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-2 text-sm">
      <span className="text-muted-foreground font-medium mr-1">Udforsk også:</span>
      <Link to="/top-10-casino-online" className={pillClass}>
        <MenuIcon iconName="trophy" className="h-3.5 w-3.5" />
        Top 10 Casinoer
      </Link>
      <Link to="/casino-bonus" className={pillClass}>
        <MenuIcon iconName="gift" className="h-3.5 w-3.5" />
        Casino Bonusser
      </Link>
      <Link to="/nye-casinoer" className={pillClass}>
        <MenuIcon iconName="sparkles" className="h-3.5 w-3.5" />
        Nye Casinoer
      </Link>
      <Link to="/mobil-casino" className={pillClass}>
        <MenuIcon iconName="smartphone" className="h-3.5 w-3.5" />
        Mobil Casino
      </Link>
      {showMobilePay && (
        <Link to="/casino-med-mobilepay" className={pillClass}>
          <MenuIcon iconName="smartphone" className="h-3.5 w-3.5" />
          MobilePay Casinoer
        </Link>
      )}
    </div>
  );
}
