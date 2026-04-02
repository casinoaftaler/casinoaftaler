import { useState, useRef, useEffect } from "react";
import { Send, Loader2, CheckCircle, User, Clock, X as CloseIcon, Megaphone, Mail, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSupportAdmin } from "@/hooks/useSupportChat";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ProfileResult {
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
}

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
    loadConversations,
  } = useSupportAdmin();

  const { user } = useAuth();
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [broadcastText, setBroadcastText] = useState("");
  const [broadcastSending, setBroadcastSending] = useState(false);
  const [broadcastOpen, setBroadcastOpen] = useState(false);

  // Private message state
  const [dmOpen, setDmOpen] = useState(false);
  const [dmSearch, setDmSearch] = useState("");
  const [dmResults, setDmResults] = useState<ProfileResult[]>([]);
  const [dmSearching, setDmSearching] = useState(false);
  const [dmSelectedUser, setDmSelectedUser] = useState<ProfileResult | null>(null);
  const [dmMessage, setDmMessage] = useState("");
  const [dmSending, setDmSending] = useState(false);

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
  // Private message search
  const handleDmSearch = async (query: string) => {
    setDmSearch(query);
    if (query.trim().length < 2) { setDmResults([]); return; }
    setDmSearching(true);
    const { data } = await supabase
      .from("profiles")
      .select("user_id, display_name, avatar_url")
      .ilike("display_name", `%${query.trim()}%`)
      .limit(10);
    setDmResults((data || []) as ProfileResult[]);
    setDmSearching(false);
  };

  // Send private message
  const handleSendDm = async () => {
    if (!dmSelectedUser || !dmMessage.trim() || dmSending || !user) return;
    setDmSending(true);
    try {
      // Find or create conversation for this user
      const { data: existing } = await supabase
        .from("support_conversations")
        .select("id")
        .eq("user_id", dmSelectedUser.user_id)
        .eq("status", "open")
        .limit(1);

      let convId: string;
      if (existing && existing.length > 0) {
        convId = existing[0].id;
      } else {
        const { data: newConv, error: convErr } = await supabase
          .from("support_conversations")
          .insert({
            user_id: dmSelectedUser.user_id,
            subject: "Besked fra admin",
            status: "open",
          })
          .select("id")
          .single();
        if (convErr || !newConv) throw new Error("Kunne ikke oprette samtale");
        convId = newConv.id;
      }

      // Insert admin message
      const { error: msgErr } = await supabase
        .from("support_messages")
        .insert({
          conversation_id: convId,
          sender_id: user.id,
          sender_role: "admin",
          message: dmMessage.trim(),
        });
      if (msgErr) throw msgErr;

      await supabase
        .from("support_conversations")
        .update({ last_message_at: new Date().toISOString() })
        .eq("id", convId);

      toast({ title: "Sendt!", description: `Privat besked sendt til ${dmSelectedUser.display_name || "bruger"}` });
      setDmMessage("");
      setDmSelectedUser(null);
      setDmSearch("");
      setDmResults([]);
      setDmOpen(false);
      loadConversations();
      setSelectedConv(convId);
    } catch (err: any) {
      toast({ title: "Fejl", description: err.message || "Kunne ikke sende besked", variant: "destructive" });
    }
    setDmSending(false);
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
        <div className="flex items-center gap-2">
          {/* Private message dialog */}
          <Dialog open={dmOpen} onOpenChange={(open) => {
            setDmOpen(open);
            if (!open) { setDmSelectedUser(null); setDmSearch(""); setDmResults([]); setDmMessage(""); }
          }}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Mail className="h-4 w-4" />
                Skriv privat besked
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Send privat besked</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">
                Beskeden vises i brugerens support-chat.
              </p>

              {!dmSelectedUser ? (
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={dmSearch}
                      onChange={(e) => handleDmSearch(e.target.value)}
                      placeholder="Søg efter brugernavn..."
                      className="pl-9"
                      autoFocus
                    />
                  </div>
                  {dmSearching && (
                    <div className="flex justify-center py-3">
                      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                  )}
                  {dmResults.length > 0 && (
                    <div className="max-h-[240px] overflow-y-auto space-y-1 border rounded-lg p-1">
                      {dmResults.map((p) => (
                        <button
                          key={p.user_id}
                          onClick={() => setDmSelectedUser(p)}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted/60 transition-colors text-left"
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={p.avatar_url || undefined} />
                            <AvatarFallback><User className="h-3.5 w-3.5" /></AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium truncate">
                            {p.display_name || "Anonym"}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                  {dmSearch.length >= 2 && !dmSearching && dmResults.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-3">Ingen brugere fundet</p>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted/40 rounded-lg">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={dmSelectedUser.avatar_url || undefined} />
                      <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <span className="text-sm font-semibold">{dmSelectedUser.display_name || "Anonym"}</span>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => { setDmSelectedUser(null); setDmSearch(""); setDmResults([]); }}>
                      Skift
                    </Button>
                  </div>
                  <textarea
                    value={dmMessage}
                    onChange={(e) => setDmMessage(e.target.value)}
                    placeholder="Skriv din besked her..."
                    className="w-full resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[120px]"
                    maxLength={2000}
                    autoFocus
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setDmOpen(false)}>
                      Annuller
                    </Button>
                    <Button
                      onClick={handleSendDm}
                      disabled={!dmMessage.trim() || dmSending}
                    >
                      {dmSending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                      Send besked
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Broadcast dialog */}
          <Dialog open={broadcastOpen} onOpenChange={setBroadcastOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Megaphone className="h-4 w-4" />
                Skriv besked til alle
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send broadcast-besked</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">
                Beskeden vises som en chat-boble for alle indloggede brugere.
              </p>
              <textarea
                value={broadcastText}
                onChange={(e) => setBroadcastText(e.target.value)}
                placeholder="Skriv din besked her..."
                className="w-full resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[120px]"
                maxLength={2000}
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setBroadcastOpen(false)}>
                  Annuller
                </Button>
                <Button
                  onClick={handleSendBroadcast}
                  disabled={!broadcastText.trim() || broadcastSending}
                >
                  {broadcastSending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                  Send til alle
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
