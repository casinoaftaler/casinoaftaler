import { AlertTriangle } from "lucide-react";

export function ResponsibleGamingBanner() {
  return (
    <div className="bg-secondary text-secondary-foreground">
      <div className="container flex flex-wrap items-center justify-center gap-2 py-2 text-xs md:text-sm">
        <AlertTriangle className="h-4 w-4" />
        <span className="font-medium">18+</span>
        <span className="hidden md:inline">|</span>
        <span>Gambling can be addictive. Please play responsibly.</span>
        <a
          href="https://www.begambleaware.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:no-underline"
        >
          BeGambleAware.org
        </a>
      </div>
    </div>
  );
}
