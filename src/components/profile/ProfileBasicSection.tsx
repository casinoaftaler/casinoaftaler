import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;
import { ProfileData } from "@/hooks/useProfile";

interface ProfileBasicSectionProps {
  profile: ProfileData;
  formData: {
    display_name: string;
    bio: string;
  };
  onChange: (field: string, value: string) => void;
}

export function ProfileBasicSection({ profile, formData, onChange }: ProfileBasicSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MenuIcon iconName="user" className="h-5 w-5 text-primary" />
          Grundlæggende Info
        </CardTitle>
        <CardDescription>
          Din gambling-persona og offentlige profil
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar display */}
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile.avatar_url || undefined} alt={formData.display_name || "Bruger"} />
            <AvatarFallback className="text-2xl">
              <MenuIcon iconName="user" className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-muted-foreground">Profilbillede</p>
            <p className="text-xs text-muted-foreground">
              {profile.twitch_username ? `Synkroniseret fra Twitch (@${profile.twitch_username})` : "Intet billede"}
            </p>
          </div>
        </div>

        {/* Display name - read only from Twitch */}
        <div className="space-y-2">
          <Label htmlFor="display_name">Brugernavn</Label>
          <Input
            id="display_name"
            value={profile.twitch_username || profile.display_name || ""}
            disabled
            className="bg-muted"
          />
          <p className="text-xs text-muted-foreground">
            Dit brugernavn kommer fra din Twitch-konto og kan ikke ændres
          </p>
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => onChange("bio", e.target.value)}
            placeholder="Fortæl lidt om din spillestil, hvad du jagter, og dine yndlingsspil..."
            rows={4}
            maxLength={500}
          />
          <p className="text-xs text-muted-foreground">
            {formData.bio.length}/500 tegn
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
