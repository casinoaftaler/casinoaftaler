import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Smile } from "lucide-react";

const EMOJI_CATEGORIES = [
  {
    name: "Smileys",
    emojis: ["😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍", "🥰", "😘", "🤩", "🥳", "😏", "😭", "😤"],
  },
  {
    name: "Gestures",
    emojis: ["👍", "👎", "👏", "🙌", "🤝", "🙏", "💪", "🤞", "✌️", "🤟", "🤘", "👌", "🤙", "👋", "🖐️", "✋", "👊", "✊", "🤛", "🤜"],
  },
  {
    name: "Objects",
    emojis: ["🏆", "🎉", "🎊", "🎁", "💰", "💎", "🎯", "🎰", "🃏", "🎲", "🔥", "⭐", "💥", "💫", "✨", "🌟", "💯", "❤️", "🧡", "💛"],
  },
  {
    name: "Symbols",
    emojis: ["❗", "❓", "💬", "💭", "🗯️", "💢", "💤", "💨", "🎵", "🎶", "➡️", "⬅️", "⬆️", "⬇️", "↗️", "↘️", "↙️", "↖️", "🔄", "✅"],
  },
];

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  disabled?: boolean;
}

export function EmojiPicker({ onEmojiSelect, disabled }: EmojiPickerProps) {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  const handleEmojiClick = (emoji: string) => {
    onEmojiSelect(emoji);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          disabled={disabled}
          aria-label="Indsæt emoji"
        >
          <Smile className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-72 p-2" 
        align="end"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex gap-1 border-b pb-2 mb-2">
          {EMOJI_CATEGORIES.map((category, index) => (
            <Button
              key={category.name}
              type="button"
              variant={activeCategory === index ? "secondary" : "ghost"}
              size="sm"
              className="flex-1 text-xs px-2"
              onClick={() => setActiveCategory(index)}
            >
              {category.emojis[0]}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-10 gap-1">
          {EMOJI_CATEGORIES[activeCategory].emojis.map((emoji) => (
            <button
              key={emoji}
              type="button"
              className="h-7 w-7 flex items-center justify-center text-lg hover:bg-accent rounded cursor-pointer transition-colors"
              onClick={() => handleEmojiClick(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
