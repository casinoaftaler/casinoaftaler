import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Zap, Target, Gauge } from "lucide-react";

interface ProfilePlayStyleSectionProps {
  formData: {
    play_styles: string[];
    preferred_game_type: string;
    volatility_preference: string;
  };
  onChange: (field: string, value: string | string[]) => void;
}

const PLAY_STYLE_OPTIONS = [
  { value: "bonus_hunter", label: "Bonus Hunter", description: "Jagter bonusser og free spins" },
  { value: "high_roller", label: "High Roller", description: "Store indsatser, store gevinster" },
  { value: "low_stakes", label: "Low Stakes Grinder", description: "Konsistent spil med lave indsatser" },
  { value: "slot_spinner", label: "Slot Spinner", description: "Elsker at spinne slots" },
  { value: "live_casino", label: "Live Casino Spiller", description: "Foretrækker live dealer spil" },
];

const GAME_TYPE_OPTIONS = [
  { value: "slots", label: "Slots" },
  { value: "live_casino", label: "Live Casino" },
  { value: "both", label: "Begge dele" },
];

const VOLATILITY_OPTIONS = [
  { value: "low", label: "Lav", description: "Hyppige små gevinster" },
  { value: "medium", label: "Medium", description: "Balanceret gameplay" },
  { value: "high", label: "Høj", description: "Sjældne store gevinster" },
];

export function ProfilePlayStyleSection({ formData, onChange }: ProfilePlayStyleSectionProps) {
  const handlePlayStyleToggle = (value: string, checked: boolean) => {
    const currentStyles = formData.play_styles || [];
    if (checked) {
      onChange("play_styles", [...currentStyles, value]);
    } else {
      onChange("play_styles", currentStyles.filter((s) => s !== value));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Spillestil
        </CardTitle>
        <CardDescription>
          Beskriv hvordan du foretrækker at spille
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Play Styles (multi-select) */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            Spillestil (vælg én eller flere)
          </Label>
          <div className="grid gap-3 sm:grid-cols-2">
            {PLAY_STYLE_OPTIONS.map((option) => (
              <div
                key={option.value}
                className="flex items-start space-x-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <Checkbox
                  id={option.value}
                  checked={formData.play_styles?.includes(option.value) || false}
                  onCheckedChange={(checked) => handlePlayStyleToggle(option.value, checked as boolean)}
                />
                <div className="space-y-1">
                  <label
                    htmlFor={option.value}
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    {option.label}
                  </label>
                  <p className="text-xs text-muted-foreground">{option.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preferred Game Type */}
        <div className="space-y-2">
          <Label htmlFor="preferred_game_type" className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            Foretrukken Spiltype
          </Label>
          <Select
            value={formData.preferred_game_type}
            onValueChange={(value) => onChange("preferred_game_type", value)}
          >
            <SelectTrigger id="preferred_game_type">
              <SelectValue placeholder="Vælg din foretrukne spiltype" />
            </SelectTrigger>
            <SelectContent>
              {GAME_TYPE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Volatility Preference */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-muted-foreground" />
            Volatilitetspræference
          </Label>
          <div className="grid gap-2 sm:grid-cols-3">
            {VOLATILITY_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange("volatility_preference", option.value)}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  formData.volatility_preference === option.value
                    ? "border-primary bg-primary/10"
                    : "border-border hover:bg-accent/50"
                }`}
              >
                <div className="font-medium text-sm">{option.label}</div>
                <div className="text-xs text-muted-foreground">{option.description}</div>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
