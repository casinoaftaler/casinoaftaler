import { useState, useEffect, useRef, Fragment } from "react";
import { Link } from "react-router-dom";
import { Bell, Megaphone, Sparkles } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotifications, UserNotificationWithDetails } from "@/hooks/useNotifications";
import { formatDistanceToNow } from "date-fns";
import { da } from "date-fns/locale";

/** Parse markdown-style links [text](url) into JSX with <Link> */
function RichMessage({ text }: { text: string }) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: (string | { label: string; url: string })[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push({ label: match[1], url: match[2] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return (
    <span>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          <Fragment key={i}>{part}</Fragment>
        ) : part.url.startsWith("/") ? (
          <Link
            key={i}
            to={part.url}
            className="font-medium text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
          >
            {part.label}
          </Link>
        ) : (
          <a
            key={i}
            href={part.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
          >
            {part.label}
          </a>
        )
      )}
    </span>
  );
}

function NotificationItem({ item }: { item: UserNotificationWithDetails }) {
  const isNew = !item.is_read;
  const timeAgo = formatDistanceToNow(new Date(item.notification.created_at), {
    addSuffix: true,
    locale: da,
  });

  return (
    <div
      className={`relative px-4 py-3.5 transition-all duration-300 ${
        isNew
          ? "bg-gradient-to-r from-primary/8 to-primary/3"
          : "hover:bg-muted/30"
      }`}
    >
      {/* Unread indicator */}
      {isNew && (
        <div className="absolute left-1.5 top-1/2 -translate-y-1/2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
          </span>
        </div>
      )}

      <div className="pl-4">
        {item.notification.title && (
          <p className={`text-sm font-semibold mb-0.5 ${isNew ? "text-foreground" : "text-foreground/80"}`}>
            {item.notification.title}
          </p>
        )}
        <p className={`text-[13px] leading-relaxed ${isNew ? "text-foreground/90" : "text-muted-foreground"}`}>
          <RichMessage text={item.notification.message} />
        </p>
        <p className="text-[11px] text-muted-foreground/60 mt-1.5">{timeAgo}</p>
      </div>
    </div>
  );
}

export function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markAllAsRead, isLoading } =
    useNotifications();
  const hasAutoMarked = useRef(false);

  // Auto-mark all as read when dropdown opens
  useEffect(() => {
    if (open && unreadCount > 0 && !hasAutoMarked.current && !markAllAsRead.isPending) {
      hasAutoMarked.current = true;
      markAllAsRead.mutate();
    }
    if (!open) {
      hasAutoMarked.current = false;
    }
  }, [open, unreadCount]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative group"
          aria-label="Notifikationer"
          data-notification-trigger
        >
          <Bell
            className={`h-5 w-5 transition-all duration-300 ${
              unreadCount > 0
                ? "text-amber-500 animate-[bell-ring_1s_ease-in-out_infinite]"
                : "group-hover:scale-110"
            }`}
          />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex items-center justify-center">
              <span className="absolute inline-flex h-5 w-5 animate-ping rounded-full bg-red-500 opacity-30" />
              <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-lg">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-96 p-0 rounded-xl border-border/50 shadow-2xl overflow-hidden"
        sideOffset={8}
      >
        {/* Header */}
        <div
          className="flex items-center gap-2.5 px-4 py-3.5 border-b border-border/50"
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary) / 0.08) 0%, transparent 100%)",
          }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Megaphone className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-foreground">Notifikationer</h3>
            {unreadCount > 0 && (
              <p className="text-[11px] text-primary font-medium">
                {unreadCount} ulæst{unreadCount !== 1 ? "e" : ""}
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="max-h-[400px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-2">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <p className="text-xs text-muted-foreground">Indlæser...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted/50">
                <Sparkles className="h-6 w-6 text-muted-foreground/50" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Ingen notifikationer</p>
                <p className="text-xs text-muted-foreground/60 mt-0.5">
                  Vi sender dig en besked her når der er nyt!
                </p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-border/30">
              {notifications.map((item) => (
                <NotificationItem key={item.notification_id} item={item} />
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="border-t border-border/50 px-4 py-2.5 text-center">
            <p className="text-[11px] text-muted-foreground/50">
              {notifications.length} notifikation{notifications.length !== 1 ? "er" : ""}
            </p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
