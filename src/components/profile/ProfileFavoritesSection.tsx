import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Gamepad2, Building2, Coins } from "lucide-react";

interface ProfileFavoritesSectionProps {
  formData: {
    favorite_slot: string;
    favorite_provider: string;
    favorite_casino: string;
    typical_bet_size: string;
  };
  onChange: (field: string, value: string) => void;
}

const BET_SIZE_OPTIONS = [
  { value: "micro", label: "Micro (0.10-1 DKK)" },
  { value: "low", label: "Lav (1-5 DKK)" },
  { value: "medium", label: "Medium (5-20 DKK)" },
  { value: "high", label: "Høj (20-50 DKK)" },
  { value: "very_high", label: "Meget høj (50-100 DKK)" },
  { value: "whale", label: "High Roller (100+ DKK)" },
];

export function ProfileFavoritesSection({ formData, onChange }: ProfileFavoritesSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          Favoritter
        </CardTitle>
        <CardDescription>
          Dine foretrukne spil, udbydere og casinos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Favorite Slot */}
        <div className="space-y-2">
          <Label htmlFor="favorite_slot" className="flex items-center gap-2">
            <Gamepad2 className="h-4 w-4 text-muted-foreground" />
            Yndlings Slot
          </Label>
          <Input
            id="favorite_slot"
            value={formData.favorite_slot}
            onChange={(e) => onChange("favorite_slot", e.target.value)}
            placeholder="f.eks. Book of Dead, Sweet Bonanza..."
            maxLength={100}
          />
        </div>

        {/* Favorite Provider */}
        <div className="space-y-2">
          <Label htmlFor="favorite_provider" className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            Yndlings Spiludbyder
          </Label>
          <Input
            id="favorite_provider"
            value={formData.favorite_provider}
            onChange={(e) => onChange("favorite_provider", e.target.value)}
            placeholder="f.eks. Pragmatic Play, NetEnt..."
            maxLength={100}
          />
        </div>

        {/* Favorite Casino */}
        <div className="space-y-2">
          <Label htmlFor="favorite_casino" className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            Yndlings Casino
          </Label>
          <Input
            id="favorite_casino"
            value={formData.favorite_casino}
            onChange={(e) => onChange("favorite_casino", e.target.value)}
            placeholder="f.eks. LeoVegas, Unibet..."
            maxLength={100}
          />
        </div>

        {/* Typical Bet Size */}
        <div className="space-y-2">
          <Label htmlFor="typical_bet_size" className="flex items-center gap-2">
            <Coins className="h-4 w-4 text-muted-foreground" />
            Typisk Indsats pr. Spin
          </Label>
          <Select
            value={formData.typical_bet_size}
            onValueChange={(value) => onChange("typical_bet_size", value)}
          >
            <SelectTrigger id="typical_bet_size">
              <SelectValue placeholder="Vælg dit typiske indsatsniveau" />
            </SelectTrigger>
            <SelectContent>
              {BET_SIZE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
