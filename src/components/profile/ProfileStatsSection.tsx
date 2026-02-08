import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Sparkles, TrendingUp } from "lucide-react";

interface ProfileStatsSectionProps {
  formData: {
    highest_win_amount: string;
    highest_win_game: string;
    highest_win_casino: string;
    biggest_spin_win: string;
    biggest_x_win: string;
  };
  onChange: (field: string, value: string) => void;
}

export function ProfileStatsSection({ formData, onChange }: ProfileStatsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Gambling Stats
        </CardTitle>
        <CardDescription>
          Dine selvrapporterede gambling-statistikker
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Highest Win Section */}
        <div className="space-y-4 p-4 rounded-lg bg-muted/50">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Trophy className="h-4 w-4 text-yellow-500" />
            Største Gevinst
          </div>
          
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="highest_win_amount">Beløb (DKK)</Label>
              <Input
                id="highest_win_amount"
                type="number"
                value={formData.highest_win_amount}
                onChange={(e) => onChange("highest_win_amount", e.target.value)}
                placeholder="f.eks. 50000"
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="highest_win_game">Spil (valgfrit)</Label>
              <Input
                id="highest_win_game"
                value={formData.highest_win_game}
                onChange={(e) => onChange("highest_win_game", e.target.value)}
                placeholder="f.eks. Book of Dead"
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="highest_win_casino">Casino (valgfrit)</Label>
              <Input
                id="highest_win_casino"
                value={formData.highest_win_casino}
                onChange={(e) => onChange("highest_win_casino", e.target.value)}
                placeholder="f.eks. LeoVegas"
                maxLength={100}
              />
            </div>
          </div>
        </div>

        {/* Single Spin Win */}
        <div className="space-y-4 p-4 rounded-lg bg-muted/50">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Sparkles className="h-4 w-4 text-purple-500" />
            Største Enkelt Spin
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="biggest_spin_win">Beløb (DKK)</Label>
            <Input
              id="biggest_spin_win"
              type="number"
              value={formData.biggest_spin_win}
              onChange={(e) => onChange("biggest_spin_win", e.target.value)}
              placeholder="f.eks. 25000"
              min={0}
            />
          </div>
        </div>

        {/* X-Win */}
        <div className="space-y-4 p-4 rounded-lg bg-muted/50">
          <div className="flex items-center gap-2 text-sm font-medium">
            <TrendingUp className="h-4 w-4 text-green-500" />
            Største X-Gevinst
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="biggest_x_win">Multiplikator</Label>
            <div className="flex items-center gap-2">
              <Input
                id="biggest_x_win"
                type="number"
                value={formData.biggest_x_win}
                onChange={(e) => onChange("biggest_x_win", e.target.value)}
                placeholder="f.eks. 1200"
                min={0}
                step={0.1}
              />
              <span className="text-muted-foreground font-medium">x</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Indtast tallet uden "x" (f.eks. 1200 for en 1200x gevinst)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
