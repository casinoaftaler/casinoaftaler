import { AlertTriangle } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;

export function ResponsibleGamingBanner() {
  return (
    <div className="bg-secondary text-secondary-foreground">
      <div className="container flex flex-wrap items-center justify-center gap-2 py-2 text-xs md:text-sm">
        <MenuIcon iconName="alert-triangle" className="h-4 w-4" />
        <span className="font-medium">18+</span>
        <span className="hidden md:inline">|</span>
        <span>Spil kan være vanedannende. Spil venligst ansvarligt.</span>
        <a
          href="https://www.stopspillet.dk/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:no-underline"
        >
          StopSpillet.dk
        </a>
      </div>
    </div>
  );
}
