import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { getCategoryVisual } from "@/lib/categoryThumbnails";
import { getCategoryLabel } from "@/lib/newsCategoryLabels";
import {
  BookOpen,
  Gamepad2,
  Star,
  FileText,
  Users,
  Wrench,
  ShieldCheck,
  Newspaper,
  CreditCard,
  Scale,
  Pen,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  "book-open": BookOpen,
  "gamepad-2": Gamepad2,
  star: Star,
  "file-text": FileText,
  users: Users,
  wrench: Wrench,
  "shield-check": ShieldCheck,
  newspaper: Newspaper,
  "credit-card": CreditCard,
  scale: Scale,
  pen: Pen,
};

interface AuthorArticleCardProps {
  path: string;
  title: string;
  category: string;
  excerpt: string;
}

export function AuthorArticleCard({ path, title, category, excerpt }: AuthorArticleCardProps) {
  const visual = getCategoryVisual(category);
  const IconComp = ICON_MAP[visual.iconName] ?? Pen;

  return (
    <Link
      to={path}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30"
    >
      {/* Gradient thumbnail */}
      <div
        className="flex aspect-video items-center justify-center"
        style={{ background: visual.gradient }}
      >
        <IconComp className="h-10 w-10 text-white/80" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <Badge variant="secondary" className="w-fit text-xs">
          {getCategoryLabel(category)}
        </Badge>
        <h3 className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2">{excerpt}</p>
      </div>
    </Link>
  );
}
