import type { ReactNode } from "react";

interface VideoContextBoxProps {
  /** Bold heading, e.g. "Her gennemgår vores streamer …" */
  heading: string;
  /** Rich body with internal links – passed as JSX */
  children: ReactNode;
}

/**
 * Standard context box rendered directly below a YoutubeEmbed.
 * Ensures consistent typography and styling across all guide pages.
 */
export function VideoContextBox({ heading, children }: VideoContextBoxProps) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-5">
      <h3 className="mb-2 text-lg font-semibold">{heading}</h3>
      <p className="text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}
