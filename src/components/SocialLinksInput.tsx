import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Save, Instagram, MessageCircle, Coins } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export function SocialLinksInput() {
  const { data: siteSettings } = useSiteSettings();
  const queryClient = useQueryClient();
  const [discordUrl, setDiscordUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [twitchUrl, setTwitchUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [xUrl, setXUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [snapchatUrl, setSnapchatUrl] = useState("");
  const [streamElementsChannelId, setStreamElementsChannelId] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (siteSettings) {
      setDiscordUrl(siteSettings.discord_url || "");
      setInstagramUrl(siteSettings.instagram_url || "");
      setTwitchUrl(siteSettings.twitch_url || "");
      setYoutubeUrl(siteSettings.youtube_url || "");
      setLinkedinUrl(siteSettings.linkedin_url || "");
      setXUrl(siteSettings.x_url || "");
      setFacebookUrl(siteSettings.facebook_url || "");
      setSnapchatUrl(siteSettings.snapchat_url || "");
      setStreamElementsChannelId(siteSettings.streamelements_channel_id || "");
    }
  }, [siteSettings]);

  const saveSetting = async (key: string, value: string) => {
    const { data: existing } = await supabase
      .from("site_settings")
      .select("id")
      .eq("key", key)
      .maybeSingle();

    if (existing) {
      await supabase
        .from("site_settings")
        .update({ value, updated_at: new Date().toISOString() })
        .eq("key", key);
    } else {
      await supabase
        .from("site_settings")
        .insert({ key, value });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await Promise.all([
        saveSetting("discord_url", discordUrl),
        saveSetting("instagram_url", instagramUrl),
        saveSetting("twitch_url", twitchUrl),
        saveSetting("youtube_url", youtubeUrl),
        saveSetting("linkedin_url", linkedinUrl),
        saveSetting("x_url", xUrl),
        saveSetting("facebook_url", facebookUrl),
        saveSetting("snapchat_url", snapchatUrl),
        saveSetting("streamelements_channel_id", streamElementsChannelId),
      ]);
      
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast({
        title: "Gemt",
        description: "Sociale medier links er opdateret.",
      });
    } catch (error) {
      toast({
        title: "Fejl",
        description: "Kunne ikke gemme indstillingerne.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="discord_url" className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          Discord URL
        </Label>
        <Input
          id="discord_url"
          value={discordUrl}
          onChange={(e) => setDiscordUrl(e.target.value)}
          placeholder="https://discord.gg/..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="instagram_url" className="flex items-center gap-2">
          <Instagram className="h-4 w-4" />
          Instagram URL
        </Label>
        <Input
          id="instagram_url"
          value={instagramUrl}
          onChange={(e) => setInstagramUrl(e.target.value)}
          placeholder="https://instagram.com/..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="twitch_url" className="flex items-center gap-2">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
          </svg>
          Twitch URL
        </Label>
        <Input
          id="twitch_url"
          value={twitchUrl}
          onChange={(e) => setTwitchUrl(e.target.value)}
          placeholder="https://twitch.tv/..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="youtube_url" className="flex items-center gap-2">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          YouTube URL
        </Label>
        <Input
          id="youtube_url"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder="https://youtube.com/@..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="facebook_url" className="flex items-center gap-2">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Facebook URL
        </Label>
        <Input
          id="facebook_url"
          value={facebookUrl}
          onChange={(e) => setFacebookUrl(e.target.value)}
          placeholder="https://facebook.com/..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="x_url" className="flex items-center gap-2">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          X (Twitter) URL
        </Label>
        <Input
          id="x_url"
          value={xUrl}
          onChange={(e) => setXUrl(e.target.value)}
          placeholder="https://x.com/..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkedin_url" className="flex items-center gap-2">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn URL
        </Label>
        <Input
          id="linkedin_url"
          value={linkedinUrl}
          onChange={(e) => setLinkedinUrl(e.target.value)}
          placeholder="https://linkedin.com/in/..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="snapchat_url" className="flex items-center gap-2">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .299.04.451.123.076.042.18.12.18.12.061.036.12.074.165.12.226.209.195.504.089.69-.135.227-.405.45-.736.614-.18.09-.39.15-.615.195l-.122.03c-.27.06-.57.12-.795.24-.225.12-.39.3-.45.51-.06.195-.015.42.12.63.255.375.51.705.81 1.02.33.345.72.66 1.17.93 1.005.6 1.485.81 1.875 1.215.21.21.315.435.285.69-.03.27-.225.48-.495.615-.375.195-.855.3-1.335.33a5.11 5.11 0 0 1-.57-.015c-.12-.015-.255-.03-.39-.03-.18 0-.33.045-.48.135-.165.09-.315.225-.435.39-.24.33-.555.645-.93.855-.39.21-.855.33-1.365.33-.12 0-.24-.015-.345-.03-.285-.045-.525-.105-.72-.165a4.5 4.5 0 0 0-.555-.12c-.12-.015-.24-.03-.375-.03s-.27.015-.39.03c-.165.03-.345.075-.555.12-.195.06-.435.12-.72.165a2.46 2.46 0 0 1-.345.03c-.51 0-.975-.12-1.365-.33a2.7 2.7 0 0 1-.93-.855c-.12-.165-.27-.3-.435-.39a.96.96 0 0 0-.48-.135c-.135 0-.27.015-.39.03-.12.015-.255.03-.57.015-.48-.03-.96-.135-1.335-.33-.27-.135-.465-.345-.495-.615-.03-.255.075-.48.285-.69.39-.405.87-.615 1.875-1.215.45-.27.84-.585 1.17-.93.3-.315.555-.645.81-1.02.135-.21.18-.435.12-.63-.06-.21-.225-.39-.45-.51-.225-.12-.525-.18-.795-.24l-.122-.03a3.3 3.3 0 0 1-.615-.195c-.33-.165-.6-.387-.736-.614-.105-.186-.136-.481.089-.69.045-.046.104-.084.165-.12 0 0 .104-.078.18-.12.152-.083.269-.123.451-.123.12 0 .3.016.464.104.374.181.733.285 1.033.301.198 0 .326-.045.401-.09a8.34 8.34 0 0 1-.033-.57c-.104-1.628-.23-3.654.299-4.847C7.86 1.069 11.216.793 12.206.793z"/>
          </svg>
          Snapchat URL
        </Label>
        <Input
          id="snapchat_url"
          value={snapchatUrl}
          onChange={(e) => setSnapchatUrl(e.target.value)}
          placeholder="https://snapchat.com/..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="streamelements_channel_id" className="flex items-center gap-2">
          <Coins className="h-4 w-4" />
          StreamElements Channel ID
        </Label>
        <Input
          id="streamelements_channel_id"
          value={streamElementsChannelId}
          onChange={(e) => setStreamElementsChannelId(e.target.value)}
          placeholder="Dit StreamElements channel ID"
        />
        <p className="text-xs text-muted-foreground">
          Find dit channel ID på streamelements.com/dashboard under Account Settings
        </p>
      </div>

      <Button onClick={handleSave} disabled={saving} className="w-full">
        {saving ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Save className="mr-2 h-4 w-4" />
        )}
        Gem Links
      </Button>
    </div>
  );
}
