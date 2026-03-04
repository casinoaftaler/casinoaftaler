import { useState, useRef, useEffect, useCallback } from "react";
import { useSlotChat, type ChatMessage } from "@/hooks/useSlotChat";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Users, Trash2, X, Ban, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { TwitchBadgesInline } from "@/components/TwitchBadges";
import type { TwitchBadges as TwitchBadgesType } from "@/hooks/useTwitchBadges";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface SlotChatProps {
  gameId: string;
  className?: string;
  collapsed?: boolean;
  onToggle?: () => void;
}

const SYSTEM_REACTIONS = ["🔥", "💎", "🐷"];
const EVENT_REACTIONS_MAP: Record<string, string[]> = {
  bonus_buy: ["🔥", "GL", "GG"],
  big_win: ["🔥", "💎", "🐷"],
};

function ReactionBar({
  msg,
  currentUserId,
  onToggleReaction,
  availableReactions,
}: {
  msg: ChatMessage;
  currentUserId: string | null;
  onToggleReaction: (messageId: string, emoji: string) => void;
  availableReactions?: string[];
}) {
  const reactions = (msg.reactions || {}) as Record<string, string[]>;
  const emojis = availableReactions || Object.keys(reactions);
  const allEmojis = [...new Set([...emojis, ...Object.keys(reactions)])];

  if (allEmojis.length === 0) return null;

  return (
    <div className="flex gap-1 mt-0.5 flex-wrap">
      {allEmojis.map(emoji => {
        const users = reactions[emoji] || [];
        const hasReacted = currentUserId ? users.includes(currentUserId) : false;
        return (
          <button
            key={emoji}
            onClick={() => currentUserId && onToggleReaction(msg.id, emoji)}
            className={cn(
              "inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] transition-all border",
              hasReacted
                ? "bg-pink-500/20 border-pink-500/40 text-pink-300"
                : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:border-white/20"
            )}
          >
            <span>{emoji}</span>
            {users.length > 0 && <span className="font-semibold">{users.length}</span>}
          </button>
        );
      })}
    </div>
  );
}

function ChatBubble({
  msg,
  isOwn,
  isAdmin,
  currentUserId,
  onDelete,
  onBan,
  onTimeout,
  onToggleReaction,
}: {
  msg: ChatMessage;
  isOwn: boolean;
  isAdmin: boolean;
  currentUserId: string | null;
  onDelete?: (id: string) => void;
  onBan?: (userId: string) => void;
  onTimeout?: (userId: string, minutes: number) => void;
  onToggleReaction: (messageId: string, emoji: string) => void;
}) {
  const navigate = useNavigate();

  // System event messages (bonus_buy, big_win)
  if (msg.message_type === "system" || msg.message_type === "bonus_buy" || msg.message_type === "big_win") {
    const availableReactions = EVENT_REACTIONS_MAP[msg.message_type] || undefined;
    return (
      <div className="flex flex-col items-center py-1.5 px-2">
        <span className={cn(
          "text-[11px] font-medium italic px-3 py-1 rounded-full text-center",
          msg.message_type === "bonus_buy" && "text-amber-400/90 bg-amber-500/10 border border-amber-500/20",
          msg.message_type === "big_win" && "text-emerald-400/90 bg-emerald-500/10 border border-emerald-500/20",
          msg.message_type === "system" && "text-amber-400/80 bg-amber-500/10"
        )}>
          {msg.message}
        </span>
        {availableReactions && (
          <ReactionBar
            msg={msg}
            currentUserId={currentUserId}
            onToggleReaction={onToggleReaction}
            availableReactions={availableReactions}
          />
        )}
      </div>
    );
  }

  // Deleted / banned / timeout messages
  if (msg.message_type === "deleted" || msg.message_type === "banned" || msg.message_type === "timeout") {
    return (
      <div className="flex justify-center py-1">
        <span className="text-[10px] text-red-400/60 italic px-3 py-0.5">
          {msg.message}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("group flex gap-2 px-2 py-1 hover:bg-white/5 rounded-lg transition-colors", isOwn && "flex-row-reverse")}>
      <button
        onClick={() => navigate(`/u/${msg.display_name}`)}
        className="shrink-0 mt-0.5"
      >
        <Avatar className="h-6 w-6 border border-white/10">
          {msg.avatar_url ? <AvatarImage src={msg.avatar_url} /> : null}
          <AvatarFallback className="text-[10px] bg-white/10 text-white/70">
            {(msg.display_name || "?").charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </button>
      <div className={cn("flex flex-col min-w-0 flex-1", isOwn && "items-end")}>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-semibold text-pink-300/90 truncate max-w-[80px]">
            {msg.display_name || "Anonym"}
          </span>
          <TwitchBadgesInline
            badges={msg.twitch_badges as unknown as TwitchBadgesType | null}
            className="flex-shrink-0"
          />
          <span className="text-[9px] text-white/30">
            {new Date(msg.created_at).toLocaleTimeString("da-DK", { hour: "2-digit", minute: "2-digit" })}
          </span>
          {isAdmin && !isOwn && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400/60 hover:text-red-400">
                  <Trash2 className="h-3 w-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[140px]">
                {onDelete && (
                  <DropdownMenuItem onClick={() => onDelete(msg.id)} className="text-red-400 text-xs">
                    <Trash2 className="h-3 w-3 mr-1.5" /> Slet besked
                  </DropdownMenuItem>
                )}
                {onTimeout && (
                  <>
                    <DropdownMenuItem onClick={() => onTimeout(msg.user_id, 5)} className="text-amber-400 text-xs">
                      <Clock className="h-3 w-3 mr-1.5" /> Timeout 5 min
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onTimeout(msg.user_id, 10)} className="text-amber-400 text-xs">
                      <Clock className="h-3 w-3 mr-1.5" /> Timeout 10 min
                    </DropdownMenuItem>
                  </>
                )}
                {onBan && (
                  <DropdownMenuItem onClick={() => onBan(msg.user_id)} className="text-red-500 text-xs">
                    <Ban className="h-3 w-3 mr-1.5" /> Ban permanent
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <p className={cn(
          "text-[12px] leading-relaxed text-white/85 break-words",
          isOwn ? "text-right" : "text-left"
        )}>
          {msg.message}
        </p>
      </div>
    </div>
  );
}

export function SlotChat({ gameId, className, collapsed = false, onToggle }: SlotChatProps) {
  const { messages, isLoading, onlineCount, isChatBanned, chatTimeout, sendMessage, deleteMessage, banUser, timeoutUser, toggleReaction } = useSlotChat(gameId);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasAcceptedWarning, setHasAcceptedWarning] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get current user
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setCurrentUserId(user?.id || null);
      if (user) {
        supabase.rpc("has_role", { _user_id: user.id, _role: "admin" }).then(({ data }) => {
          setIsAdmin(!!data);
        });
      }
    });
  }, []);

  // Check localStorage for warning acceptance
  useEffect(() => {
    if (currentUserId) {
      const accepted = localStorage.getItem(`chat_warning_accepted_${currentUserId}`);
      setHasAcceptedWarning(!!accepted);
    }
  }, [currentUserId]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (isAtBottomRef.current && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    isAtBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isSending) return;

    if (!hasAcceptedWarning) {
      setHasAcceptedWarning(true);
      localStorage.setItem(`chat_warning_accepted_${currentUserId}`, "true");
    }

    setIsSending(true);
    const success = await sendMessage(input);
    if (success) setInput("");
    setIsSending(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " ") {
      e.stopPropagation();
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleBan = async (userId: string) => {
    const success = await banUser(userId);
    if (success) {
      toast.success("Bruger er bannet fra chatten");
    } else {
      toast.error("Kunne ikke banne brugeren");
    }
  };

  const handleTimeout = async (userId: string, minutes: number) => {
    const success = await timeoutUser(userId, minutes);
    if (success) {
      toast.success(`Bruger har fået timeout i ${minutes} minutter`);
    } else {
      toast.error("Kunne ikke give timeout");
    }
  };

  const isTimedOut = chatTimeout && new Date(chatTimeout).getTime() > Date.now();
  const timeoutRemaining = isTimedOut
    ? Math.ceil((new Date(chatTimeout!).getTime() - Date.now()) / 60000)
    : 0;

  // Collapsed mode
  if (collapsed) {
    return (
      <button
        onClick={onToggle}
        className={cn(
          "relative w-12 h-12 rounded-full flex items-center justify-center",
          "bg-black/40 backdrop-blur-sm border-2 border-white/20 text-white",
          "hover:bg-white/10 hover:border-white/30 transition-all",
          className
        )}
      >
        <MessageCircle className="h-5 w-5" />
        {onlineCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {onlineCount}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className={cn(
      "flex flex-col h-full rounded-2xl overflow-hidden",
      "bg-black/30 backdrop-blur-md border border-white/10",
      className
    )} style={{ width: 280 }}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-pink-400" />
          <span className="text-xs font-bold text-white/90 uppercase tracking-wider">Chat</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3 text-green-400" />
            <span className="text-[10px] text-green-400 font-semibold">{onlineCount}</span>
          </div>
          {onToggle && (
            <button onClick={onToggle} className="text-white/40 hover:text-white/70 transition-colors">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto py-2 space-y-0.5"
        style={{ minHeight: 0 }}
      >
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-xs text-white/30">Indlæser chat...</span>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-1">
            <MessageCircle className="h-8 w-8 text-white/10" />
            <span className="text-xs text-white/30">Ingen beskeder endnu</span>
            <span className="text-[10px] text-white/20">Vær den første!</span>
          </div>
        ) : (
          messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              msg={msg}
              isOwn={msg.user_id === currentUserId}
              isAdmin={isAdmin}
              currentUserId={currentUserId}
              onDelete={deleteMessage}
              onBan={handleBan}
              onTimeout={handleTimeout}
              onToggleReaction={toggleReaction}
            />
          ))
        )}
      </div>

      {/* Input */}
      {currentUserId ? (
        isChatBanned ? (
          <div className="px-3 py-3 border-t border-white/10 text-center">
            <span className="text-[11px] text-red-400">🚫 Du er bannet permanent fra chatten</span>
            <p className="text-[9px] text-red-300/60 mt-1">Hvis du vil appeal din ban - så kontakt os live på Twitch</p>
          </div>
        ) : isTimedOut ? (
          <div className="px-3 py-3 border-t border-white/10 text-center">
            <span className="text-[11px] text-amber-400">⏳ Du har timeout i {timeoutRemaining} min</span>
          </div>
        ) : (
          <div className="px-2 py-2 border-t border-white/10">
            {!hasAcceptedWarning && (
              <div className="mb-2 px-2 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <p className="text-[9px] text-amber-300/90 leading-relaxed">
                  ⚠️ Sørg for at holde en god tone. Racistiske eller andre nedladende beskeder bliver slettet, og admin kan banne dig PERMANENT fra chatfunktionen.
                </p>
              </div>
            )}
            <div className="flex gap-1.5">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, 200))}
                onKeyDown={handleKeyDown}
                placeholder="Skriv en besked..."
                disabled={isSending}
                className="h-8 text-xs bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-pink-500/30"
              />
              <Button
                size="icon"
                variant="ghost"
                onClick={handleSend}
                disabled={!input.trim() || isSending}
                className="h-8 w-8 shrink-0 text-pink-400 hover:text-pink-300 hover:bg-pink-500/10"
              >
                <Send className="h-3.5 w-3.5" />
              </Button>
            </div>
            <span className="text-[9px] text-white/20 mt-0.5 block">{input.length}/200</span>
          </div>
        )
      ) : (
        <div className="px-3 py-3 border-t border-white/10 text-center">
          <span className="text-[11px] text-white/40">Log ind for at chatte</span>
        </div>
      )}
    </div>
  );
}
