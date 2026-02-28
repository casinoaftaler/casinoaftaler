import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Target, Radio } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  huntNumber: number;
  huntDate: string;
  latestHuntNumber: number;
  maxHuntNumber: number;
  isLive: boolean;
  onNavigate?: (direction: 'first' | 'prev' | 'next' | 'last') => void;
  onJumpToHunt?: (huntNumber: number) => void;
}

export function BonusHuntHeroBar({
  huntNumber,
  huntDate,
  latestHuntNumber,
  maxHuntNumber,
  isLive,
  onNavigate,
  onJumpToHunt,
}: Props) {
  const fullDate = huntDate || '';

  return (
    <div className="relative w-full rounded-2xl overflow-hidden px-6 py-5 md:px-8 md:py-6 mb-6">
      {/* Gradient background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(135deg, hsl(var(--primary) / 0.15) 0%, hsl(var(--background)) 40%, hsl(var(--primary) / 0.1) 100%)',
        }}
      />
      {/* Subtle glow */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-48 h-48 rounded-full -z-10 blur-3xl"
        style={{ background: 'hsl(var(--primary) / 0.12)' }}
      />
      {/* Border */}
      <div className="absolute inset-0 rounded-2xl border border-primary/20 pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left: Title + date + badge */}
        <div className="flex items-center gap-3">
          <Target className="h-6 w-6 text-primary shrink-0" />
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-2xl md:text-[28px] font-bold tracking-wide uppercase text-foreground leading-none">
                BONUS HUNT #{huntNumber}
              </h2>
              {isLive ? (
                <Badge variant="destructive" className="text-[10px] px-2 py-0.5 gap-1 uppercase font-semibold">
                  <Radio className="h-2.5 w-2.5 animate-pulse" />
                  Live
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-[10px] px-2 py-0.5 gap-1 uppercase font-semibold">
                  Arkiv
                </Badge>
              )}
            </div>
            {fullDate && (
              <p className="text-sm text-muted-foreground mt-0.5 tracking-wide">
                {fullDate}
              </p>
            )}
          </div>
        </div>

        {/* Right: Navigation */}
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => onNavigate?.('first')}>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => onNavigate?.('prev')}>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Select
            value={String(huntNumber)}
            onValueChange={(val) => onJumpToHunt?.(parseInt(val, 10))}
          >
            <SelectTrigger className="w-auto min-w-[100px] h-8 text-xs font-semibold px-3 rounded-lg border-border/40 bg-background/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {Array.from({ length: maxHuntNumber - 1 }, (_, i) => maxHuntNumber - i).map(num => (
                <SelectItem key={num} value={String(num)} className="text-xs">
                  #{num} {num > latestHuntNumber ? '🔴 LIVE' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => onNavigate?.('next')}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => onNavigate?.('last')}>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
