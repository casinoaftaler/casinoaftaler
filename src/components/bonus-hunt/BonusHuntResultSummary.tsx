import { Link } from "react-router-dom";
import { Trophy, TrendingUp, Award } from "lucide-react";

interface HuntVideoData {
  huntNumber: number;
  casinoName: string;
  casinoSlug: string;
  bonusCount: number;
  avgX: number;
  highestWin?: number;
  highestMultiplier?: number;
}

interface Props {
  video: HuntVideoData;
}

export function BonusHuntResultSummary({ video }: Props) {
  return (
    <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card p-4 space-y-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <Trophy className="h-4 w-4 text-primary" />
        </div>
        <h3 className="text-sm font-bold text-foreground">
          Resultat af Hunt #{video.huntNumber}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-muted/50 px-3 py-2 text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Avg X</p>
          <p className="text-lg font-bold text-primary">{video.avgX}x</p>
        </div>
        <div className="rounded-xl bg-muted/50 px-3 py-2 text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Bonusser</p>
          <p className="text-lg font-bold text-foreground">{video.bonusCount}</p>
        </div>
        {video.highestWin != null && (
          <div className="rounded-xl bg-muted/50 px-3 py-2 text-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center justify-center gap-1">
              <Award className="h-2.5 w-2.5" /> Top Win
            </p>
            <p className="text-lg font-bold text-green-500">{video.highestWin} kr</p>
          </div>
        )}
        {video.highestMultiplier != null && (
          <div className="rounded-xl bg-muted/50 px-3 py-2 text-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center justify-center gap-1">
              <TrendingUp className="h-2.5 w-2.5" /> Top X
            </p>
            <p className="text-lg font-bold text-green-500">{video.highestMultiplier}x</p>
          </div>
        )}
      </div>

      <Link
        to={`/casino-anmeldelser/${video.casinoSlug}`}
        className="block text-center text-xs text-primary hover:text-primary/80 underline transition-colors"
        title={`Læs anmeldelse af ${video.casinoName}`}
      >
        Læs {video.casinoName} anmeldelse →
      </Link>
    </div>
  );
}
