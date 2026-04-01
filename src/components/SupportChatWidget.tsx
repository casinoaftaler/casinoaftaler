import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSupportChat } from "@/hooks/useSupportChat";
import { useBroadcastChat } from "@/hooks/useBroadcastChat";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import casinoaftalerLogo from "@/assets/casinoaftaler-logo.webp";

export function SupportChatWidget() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [broadcastExpanded, setBroadcastExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const {
    conversation,
    messages,
    isLoading,
    unreadCount,
    userProfile,
    adminProfile,
    startConversation,
    sendMessage,
    markAsRead,
    deleteConversation,
  } = useSupportChat();

  const { broadcast, dismissBroadcast } = useBroadcastChat();
  // Auto-scroll on new messages
  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  // Mark as read when opened
  useEffect(() => {
    if (isOpen && unreadCount > 0) {
      markAsRead();
    }
  }, [isOpen, unreadCount, markAsRead]);

  if (!user) return null;

  const handleOpen = async () => {
    setIsOpen(true);
    if (!conversation) {
      await startConversation("Support");
    }
    markAsRead();
  };

  const handleClose = () => setIsOpen(false);

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    setSending(true);
    if (!conversation) {
      await startConversation("Support");
    }
    await sendMessage(input.trim());
    setInput("");
    setSending(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Panel */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-4 z-[60] w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl border border-border bg-card shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
          style={{ height: "min(500px, 70vh)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
            <div className="flex items-center gap-3">
              {adminProfile ? (
                <div className="relative">
                  <Avatar className="h-9 w-9 border-2 border-primary-foreground/30">
                    <AvatarImage src={adminProfile.avatar_url || undefined} />
                    <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground text-xs">
                      {adminProfile.display_name?.[0]?.toUpperCase() || "A"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-primary" />
                </div>
              ) : (
                <img src={casinoaftalerLogo} alt="Casinoaftaler" className="h-9 w-9 rounded-full object-cover" />
              )}
              <div className="flex items-center gap-2">
                <div>
                  <h3 className="font-bold text-sm">
                    {adminProfile ? adminProfile.display_name || "Support Agent" : "Casinoaftaler Support"}
                  </h3>
                  <p className="text-xs opacity-80">
                    {adminProfile ? "Support Agent" : "Vi svarer hurtigst muligt"}
                  </p>
                </div>
                <img src={casinoaftalerLogo} alt="Casinoaftaler" className="h-6 w-6 rounded-full object-cover opacity-80" />
              </div>
            </div>
            <div className="flex items-center gap-1">
              {conversation && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                  onClick={async () => {
                    if (confirm("Er du sikker på du vil slette samtalen?")) {
                      await deleteConversation();
                      setIsOpen(false);
                    }
                  }}
                  title="Slet samtale"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* Welcome message */}
            <div className="flex justify-start gap-2">
              <img src={casinoaftalerLogo} alt="Casinoaftaler" className="h-7 w-7 rounded-full object-cover mt-1 shrink-0" />
              <div className="max-w-[75%] rounded-2xl rounded-bl-sm px-4 py-2.5 bg-muted text-foreground text-sm">
                👋 Velkommen! Hvad kan vi hjælpe dig med?
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : (
              messages.map((msg) => {
                const isUser = msg.sender_role === "user";
                const isSystem = msg.sender_role === "system";

                if (isSystem) {
                  return (
                    <div key={msg.id} className="flex justify-center">
                      <div className="text-xs text-muted-foreground bg-muted/50 rounded-full px-3 py-1.5 italic">
                        {msg.message}
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={msg.id}
                    className={cn("flex gap-2", isUser ? "justify-end" : "justify-start")}
                  >
                    {/* Admin avatar on left */}
                    {!isUser && (
                      adminProfile?.avatar_url ? (
                        <Avatar className="h-7 w-7 mt-1 shrink-0">
                          <AvatarImage src={adminProfile.avatar_url} />
                          <AvatarFallback className="bg-muted text-muted-foreground text-[10px]">
                            {adminProfile.display_name?.[0]?.toUpperCase() || "S"}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <img src={casinoaftalerLogo} alt="Casinoaftaler" className="h-7 w-7 rounded-full object-cover mt-1 shrink-0" />
                      )
                    )}
                    <div
                      className={cn(
                        "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
                        isUser
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-muted text-foreground rounded-bl-sm"
                      )}
                    >
                      {msg.message}
                      <div
                        className={cn(
                          "text-[10px] mt-1",
                          isUser ? "text-primary-foreground/60" : "text-muted-foreground"
                        )}
                      >
                        {new Date(msg.created_at).toLocaleTimeString("da-DK", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                    {/* User avatar on right */}
                    {isUser && (
                      <Avatar className="h-7 w-7 mt-1 shrink-0">
                        <AvatarImage src={userProfile?.avatar_url || undefined} />
                        <AvatarFallback className="bg-primary/20 text-primary text-[10px]">
                          <User className="h-3.5 w-3.5" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Input */}
          <div className="border-t border-border p-3 bg-card">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Skriv en besked..."
                className="flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[40px] max-h-[100px]"
                rows={1}
                maxLength={2000}
              />
              <Button
                size="icon"
                className="h-10 w-10 shrink-0 rounded-xl"
                onClick={handleSend}
                disabled={!input.trim() || sending}
              >
                {sending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={isOpen ? handleClose : handleOpen}
        className="fixed bottom-4 right-4 z-[60] h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center justify-center"
        aria-label="Support chat"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs font-bold">
                {unreadCount}
              </span>
            )}
          </>
        )}
      </button>
    </>
  );
}
