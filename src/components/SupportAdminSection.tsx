import { useState, useRef, useEffect } from "react";
import { Send, Loader2, CheckCircle, User, Clock, X as CloseIcon, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useSupportAdmin } from "@/hooks/useSupportChat";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function SupportAdminSection() {
  const {
    conversations,
    selectedConv,
    setSelectedConv,
    messages,
    isLoading,
    totalUnread,
    sendReply,
    markUserMessagesRead,
    closeConversation,
    assignToMe,
    deleteConversation,
  } = useSupportAdmin();

  const { user } = useAuth();
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [broadcastText, setBroadcastText] = useState("");
  const [broadcastSending, setBroadcastSending] = useState(false);
  const [broadcastOpen, setBroadcastOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Mark as read when selecting
  useEffect(() => {
    if (selectedConv) {
      markUserMessagesRead(selectedConv);
    }
  }, [selectedConv, markUserMessagesRead]);

  const handleSend = async () => {
    if (!selectedConv || !replyText.trim() || sending) return;
    setSending(true);
    await sendReply(selectedConv, replyText.trim());
    setReplyText("");
    setSending(false);
  };

  const handleSendBroadcast = async () => {
    if (!broadcastText.trim() || broadcastSending || !user) return;
    setBroadcastSending(true);
    const { error } = await supabase
      .from("chat_broadcasts")
      .insert({ admin_id: user.id, message: broadcastText.trim() });
    if (error) {
      toast({ title: "Fejl", description: "Kunne ikke sende broadcast", variant: "destructive" });
    } else {
      toast({ title: "Sendt!", description: "Broadcast-besked sendt til alle brugere" });
      setBroadcastText("");
      setBroadcastOpen(false);
    }
    setBroadcastSending(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Support Chat</h2>
          <p className="text-muted-foreground">
            {totalUnread > 0
              ? `${totalUnread} ubesvarede beskeder`
              : "Administrer brugerhenvendelser"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[500px]">
        {/* Conversation List */}
        <Card className="lg:col-span-1 overflow-hidden">
          <CardContent className="p-0">
            <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground text-sm">
                  Ingen samtaler endnu
                </div>
              ) : (
                conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConv(conv.id)}
                    className={cn(
                      "w-full text-left p-4 hover:bg-muted/50 transition-colors",
                      selectedConv === conv.id && "bg-primary/5 border-l-2 border-l-primary"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={conv.avatar_url || undefined} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm truncate">
                            {conv.display_name}
                          </span>
                          <Badge
                            variant={conv.status === "open" ? "default" : "secondary"}
                            className="text-[10px] px-1.5 py-0"
                          >
                            {conv.status === "open" ? "Åben" : "Lukket"}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {conv.subject || "Support"}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {new Date(conv.last_message_at).toLocaleString("da-DK", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Chat Panel */}
        <Card className="lg:col-span-2 flex flex-col overflow-hidden">
          {!selectedConv ? (
            <CardContent className="flex-1 flex items-center justify-center text-muted-foreground">
              Vælg en samtale for at svare
            </CardContent>
          ) : (
            <>
              {/* Actions bar */}
              <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/30">
                <Button size="sm" variant="outline" onClick={() => assignToMe(selectedConv)}>
                  <User className="h-3.5 w-3.5 mr-1" /> Tildel mig
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => closeConversation(selectedConv)}
                >
                  <CheckCircle className="h-3.5 w-3.5 mr-1" /> Luk samtale
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    if (window.confirm("Er du sikker på du vil slette denne samtale permanent?")) {
                      deleteConversation(selectedConv);
                    }
                  }}
                >
                  <CloseIcon className="h-3.5 w-3.5 mr-1" /> Slet samtale
                </Button>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px]">
                {messages.map((msg) => {
                  const isAdmin = msg.sender_role === "admin";
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
                      className={cn("flex", isAdmin ? "justify-end" : "justify-start")}
                    >
                      <div
                        className={cn(
                          "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
                          isAdmin
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-muted text-foreground rounded-bl-sm"
                        )}
                      >
                        {!isAdmin && (
                          <span className="text-[10px] font-medium text-muted-foreground block mb-0.5">
                            Bruger
                          </span>
                        )}
                        {msg.message}
                        <div
                          className={cn(
                            "text-[10px] mt-1 flex items-center gap-1",
                            isAdmin ? "text-primary-foreground/60" : "text-muted-foreground"
                          )}
                        >
                          {new Date(msg.created_at).toLocaleTimeString("da-DK", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          {isAdmin && msg.read_at && (
                            <CheckCircle className="h-3 w-3" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reply input */}
              <div className="border-t border-border p-3">
                <div className="flex items-end gap-2">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Skriv et svar..."
                    className="flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[40px] max-h-[100px]"
                    rows={1}
                    maxLength={2000}
                  />
                  <Button
                    size="icon"
                    className="h-10 w-10 shrink-0 rounded-xl"
                    onClick={handleSend}
                    disabled={!replyText.trim() || sending}
                  >
                    {sending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
