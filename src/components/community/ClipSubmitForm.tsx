import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSubmitClip, CLIP_CATEGORIES, ClipCategory } from "@/hooks/useCommunityClips";
import { Plus, Link as LinkIcon, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { EmojiPicker } from "./EmojiPicker";

interface ClipSubmitFormProps {
  trigger?: React.ReactNode;
}

export function ClipSubmitForm({ trigger }: ClipSubmitFormProps) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<ClipCategory[]>([]);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleDescriptionEmojiSelect = (emoji: string) => {
    const textarea = descriptionRef.current;
    if (!textarea) {
      setDescription((prev) => prev + emoji);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue = description.slice(0, start) + emoji + description.slice(end);
    setDescription(newValue);

    // Restore cursor position after emoji insertion
    requestAnimationFrame(() => {
      textarea.focus();
      const newPos = start + emoji.length;
      textarea.setSelectionRange(newPos, newPos);
    });
  };

  const { user } = useAuth();
  const submitClip = useSubmitClip();

  // Basic client-side validation (real validation happens server-side)
  const validateUrlFormat = (value: string): boolean => {
    if (!value.trim()) {
      setUrlError("URL er påkrævet");
      return false;
    }

    // Try to parse as URL (add protocol if missing)
    try {
      const urlToValidate = value.startsWith('http') ? value : `https://${value}`;
      new URL(urlToValidate);
      setUrlError(null);
      return true;
    } catch {
      setUrlError("Ugyldig URL format");
      return false;
    }
  };

  const validateCategories = (): boolean => {
    if (selectedCategories.length === 0) {
      setCategoryError("Vælg mindst én kategori");
      return false;
    }
    setCategoryError(null);
    return true;
  };

  const toggleCategory = (category: ClipCategory) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      }
      return [...prev, category];
    });
    if (categoryError) setCategoryError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const urlValid = validateUrlFormat(url);
    const categoriesValid = validateCategories();

    if (!urlValid || !categoriesValid) return;

    try {
      await submitClip.mutateAsync({
        url: url.trim(),
        title: title.trim() || undefined,
        description: description.trim() || undefined,
        categories: selectedCategories,
      });

      // Reset form and close on success
      setUrl("");
      setTitle("");
      setDescription("");
      setSelectedCategories([]);
      setOpen(false);
    } catch {
      // Error is handled by the mutation's onError
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Indsend Clip
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Indsend en Clip</DialogTitle>
          <DialogDescription>
            Del dit bedste øjeblik med communityet! Clips skal godkendes før de
            bliver synlige. Maksimal længde: 2 minutter.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="clip-url">
              Clip URL <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="clip-url"
                type="url"
                placeholder="https://clips.twitch.tv/... eller https://youtube.com/..."
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (urlError) validateUrlFormat(e.target.value);
                }}
                onBlur={() => url && validateUrlFormat(url)}
                className="pl-10"
                required
              />
            </div>
            {urlError && (
              <p className="text-sm text-destructive">{urlError}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Understøtter Twitch og YouTube clips (inkl. korte URLs og redirects)
            </p>
          </div>

          <div className="space-y-2">
            <Label>
              Kategori <span className="text-destructive">*</span>
            </Label>
            <div className="flex flex-col gap-3">
              {CLIP_CATEGORIES.map((cat) => (
                <div key={cat.value} className="flex items-center space-x-3">
                  <Checkbox
                    id={`category-${cat.value}`}
                    checked={selectedCategories.includes(cat.value)}
                    onCheckedChange={() => toggleCategory(cat.value)}
                  />
                  <label
                    htmlFor={`category-${cat.value}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {cat.emoji} {cat.label}
                  </label>
                </div>
              ))}
            </div>
            {categoryError && (
              <p className="text-sm text-destructive">{categoryError}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Vælg mindst én kategori. Du kan vælge begge hvis clip'en passer til flere.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="clip-title">Titel (valgfri)</Label>
            <Input
              id="clip-title"
              placeholder="Giv din clip en titel..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="clip-description">Beskrivelse (valgfri)</Label>
              <EmojiPicker onEmojiSelect={handleDescriptionEmojiSelect} />
            </div>
            <Textarea
              id="clip-description"
              ref={descriptionRef}
              placeholder="Fortæl lidt om denne clip..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              rows={3}
            />
            <p className="text-xs text-muted-foreground text-right">
              {description.length}/500
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Annuller
            </Button>
            <Button type="submit" disabled={submitClip.isPending}>
              {submitClip.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Indsend Clip
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
