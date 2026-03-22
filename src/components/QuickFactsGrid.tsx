interface QuickFact {
  label: string;
  value: string;
}

interface QuickFactsGridProps {
  facts: QuickFact[];
  className?: string;
}

/**
 * Responsive grid for "Hurtige Fakta" stat boxes in casino reviews.
 * Handles text overflow gracefully on small mobile screens.
 */
export function QuickFactsGrid({ facts, className = "" }: QuickFactsGridProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center ${className}`}>
      {facts.map((f) => (
        <div key={f.label} className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
          <p className="text-[10px] sm:text-xs text-muted-foreground uppercase mb-1 truncate">{f.label}</p>
          <p className="text-sm sm:text-lg font-bold text-foreground break-words leading-tight">{f.value}</p>
        </div>
      ))}
    </div>
  );
}
