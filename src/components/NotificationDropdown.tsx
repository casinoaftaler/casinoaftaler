import { useState } from "react";
import { Bell, Check, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useNotifications } from "@/hooks/useNotifications";
import { formatDistanceToNow } from "date-fns";
import { da } from "date-fns/locale";

export function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead, isLoading } =
    useNotifications();

  const handleMarkAsRead = (notificationId: string) => {
    markAsRead.mutate(notificationId);
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead.mutate();
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifikationer">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b border-border p-3">
          <h3 className="font-semibold">Notifikationer</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="h-auto py-1 text-xs"
              disabled={markAllAsRead.isPending}
            >
              <CheckCheck className="mr-1 h-3 w-3" />
              Marker alle som læst
            </Button>
          )}
        </div>

        <ScrollArea className="max-h-80">
          {isLoading ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Indlæser...
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Ingen notifikationer
            </div>
          ) : (
            <div className="divide-y divide-border">
              {notifications.map((item) => (
                <div
                  key={item.notification_id}
                  className={`relative p-3 transition-colors ${
                    !item.is_read ? "bg-primary/5" : ""
                  }`}
                >
                  {!item.is_read && (
                    <div className="absolute left-1.5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary" />
                  )}
                  <div className="pl-3">
                    {item.notification.title && (
                      <p className="mb-1 font-medium text-sm">
                        {item.notification.title}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {item.notification.message}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(
                          new Date(item.notification.created_at),
                          { addSuffix: true, locale: da }
                        )}
                      </span>
                      {!item.is_read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleMarkAsRead(item.notification_id)
                          }
                          className="h-auto py-1 text-xs"
                          disabled={markAsRead.isPending}
                        >
                          <Check className="mr-1 h-3 w-3" />
                          Marker som læst
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
