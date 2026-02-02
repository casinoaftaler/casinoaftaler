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
  const [streamElementsChannelId, setStreamElementsChannelId] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (siteSettings) {
      setDiscordUrl(siteSettings.discord_url || "");
      setInstagramUrl(siteSettings.instagram_url || "");
      setTwitchUrl(siteSettings.twitch_url || "");
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
