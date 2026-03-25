import { Zap } from "lucide-react";

interface SnippetAnswerProps {
  /** The short direct answer (2-3 lines) */
  answer: string;
}

/**
 * Compact TL;DR block for featured snippet eligibility.
 * Placed immediately after H1/AuthorMetaBar on money pages.
 */
export function SnippetAnswer({ answer }: SnippetAnswerProps) {
  return (
    <div className="mb-8 rounded-lg border border-primary/30 bg-primary/5 p-4 md:p-5">
      <p className="flex items-start gap-2.5 text-sm md:text-base leading-relaxed text-foreground">
        <Zap className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
        <span>{answer}</span>
      </p>
    </div>
  );
}
