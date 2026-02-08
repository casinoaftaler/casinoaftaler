import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSubmitClip } from "@/hooks/useCommunityClips";
import { Plus, Link as LinkIcon, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface ClipSubmitFormProps {
  trigger?: React.ReactNode;
}

export function ClipSubmitForm({ trigger }: ClipSubmitFormProps) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [urlError, setUrlError] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateUrlFormat(url)) return;

    try {
      await submitClip.mutateAsync({
        url: url.trim(),
        title: title.trim() || undefined,
        description: description.trim() || undefined,
      });

      // Reset form and close on success
      setUrl("");
      setTitle("");
      setDescription("");
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
            <Label htmlFor="clip-description">Beskrivelse (valgfri)</Label>
            <Textarea
              id="clip-description"
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
