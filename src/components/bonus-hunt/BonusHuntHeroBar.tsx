import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Target, Radio } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  huntNumber: number;
  huntDate: string;
  huntDateLong?: string;
  casinoName?: string;
  avgX?: number | null;
  latestHuntNumber: number;
  maxHuntNumber: number;
  isLive: boolean;
  isArchived: boolean;
  availableHuntNumbers: number[];
  onNavigate?: (direction: 'first' | 'prev' | 'next' | 'last') => void;
  onJumpToHunt?: (huntNumber: number) => void;
}

export function BonusHuntHeroBar({
  huntNumber,
  huntDate,
  huntDateLong,
  casinoName,
  avgX,
  latestHuntNumber,
  maxHuntNumber,
  isLive,
  isArchived,
  availableHuntNumbers,
  onNavigate,
  onJumpToHunt,
}: Props) {
  const subtitle = [
    casinoName && `hos ${casinoName}`,
    avgX && `${avgX.toFixed(1)}x snit`,
    huntDateLong,
  ].filter(Boolean).join(' · ');
  return (
    <div className="relative w-full rounded-2xl overflow-hidden px-4 py-3 md:px-5 md:py-4">
      {/* Subtle gradient background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(135deg, hsl(var(--primary) / 0.1) 0%, hsl(var(--background)) 50%, hsl(var(--primary) / 0.06) 100%)',
        }}
      />
      {/* Border */}
      <div className="absolute inset-0 rounded-2xl border border-primary/15 pointer-events-none" />

      <div className="flex items-center justify-between gap-3">
        {/* Left: Title + date + badge */}
        <div className="flex items-center gap-2.5 min-w-0">
          <Target className="h-5 w-5 text-primary shrink-0" />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-bold tracking-wide uppercase text-foreground leading-none truncate">
                BONUS HUNT #{huntNumber}
              </h1>
              {isLive ? (
                <Badge variant="destructive" className="text-[10px] px-1.5 py-0 gap-1 uppercase font-semibold shrink-0">
                  <Radio className="h-2.5 w-2.5 animate-pulse" />
                  Live
                </Badge>
              ) : isArchived ? (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 gap-1 uppercase font-semibold shrink-0">
                  Arkiv
                </Badge>
              ) : (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 gap-1 uppercase font-semibold shrink-0">
                  Aktiv
                </Badge>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-0.5 tracking-wide">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right: Navigation */}
        <div className="flex items-center gap-1 shrink-0">
          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => onNavigate?.('first')} aria-label="Første hunt">
            <ChevronsLeft className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => onNavigate?.('prev')} aria-label="Forrige hunt">
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>

          <Select
            value={String(huntNumber)}
            onValueChange={(val) => onJumpToHunt?.(parseInt(val, 10))}
          >
            <SelectTrigger className="w-auto min-w-[70px] h-7 text-[11px] font-semibold px-2 rounded-md border-border/40 bg-background/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {availableHuntNumbers.map(num => (
                <SelectItem key={num} value={String(num)} className="text-xs">
                  #{num} {num > latestHuntNumber ? '🔴 LIVE' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => onNavigate?.('next')} aria-label="Næste hunt">
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => onNavigate?.('last')} aria-label="Sidste hunt">
            <ChevronsRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
