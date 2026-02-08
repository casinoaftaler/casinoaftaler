import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Shield, Eye, EyeOff } from "lucide-react";

interface ProfilePrivacySectionProps {
  formData: {
    stats_public: boolean;
    hide_amounts: boolean;
  };
  onChange: (field: string, value: boolean) => void;
}

export function ProfilePrivacySection({ formData, onChange }: ProfilePrivacySectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Privatliv & Synlighed
        </CardTitle>
        <CardDescription>
          Kontrollér hvad andre kan se på din profil
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats Public Toggle */}
        <div className="flex items-center justify-between p-4 rounded-lg border">
          <div className="space-y-1">
            <Label htmlFor="stats_public" className="flex items-center gap-2 cursor-pointer">
              {formData.stats_public ? (
                <Eye className="h-4 w-4 text-green-500" />
              ) : (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              )}
              Offentlige statistikker
            </Label>
            <p className="text-xs text-muted-foreground">
              Tillad andre at se dine gambling-statistikker på din profil
            </p>
          </div>
          <Switch
            id="stats_public"
            checked={formData.stats_public}
            onCheckedChange={(checked) => onChange("stats_public", checked)}
          />
        </div>

        {/* Hide Amounts Toggle */}
        <div className="flex items-center justify-between p-4 rounded-lg border">
          <div className="space-y-1">
            <Label htmlFor="hide_amounts" className="flex items-center gap-2 cursor-pointer">
              <EyeOff className="h-4 w-4 text-muted-foreground" />
              Skjul beløb
            </Label>
            <p className="text-xs text-muted-foreground">
              Vis spil og præferencer, men skjul specifikke beløb fra andre
            </p>
          </div>
          <Switch
            id="hide_amounts"
            checked={formData.hide_amounts}
            onCheckedChange={(checked) => onChange("hide_amounts", checked)}
          />
        </div>

        {/* Privacy info */}
        <div className="p-4 rounded-lg bg-muted/50 text-sm text-muted-foreground">
          <p>
            <strong>Bemærk:</strong> Dit display-navn og profilbillede er altid synlige på leaderboards. 
            Disse indstillinger påvirker kun visningen af dine detaljerede statistikker og beløb.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
