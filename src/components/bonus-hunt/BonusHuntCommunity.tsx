import { Users, ExternalLink } from "lucide-react";

interface Props {
  huntNumber: number;
  twitchVideoId?: string;
}

export function BonusHuntCommunity({ huntNumber, twitchVideoId }: Props) {
  return (
    <section className="rounded-xl border border-border/50 bg-card p-5 space-y-3" aria-label="Community aktivitet">
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold text-foreground">Community</h2>
      </div>

      <p className="text-sm text-muted-foreground">
        Community følger live med på Twitch under hver bonus hunt.
        Bonus Hunt #{huntNumber} blev streamet live med chat-interaktion.
      </p>

      {twitchVideoId && (
        <a
          href={`https://www.twitch.tv/videos/${twitchVideoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Se VOD på Twitch
        </a>
      )}
    </section>
  );
}
