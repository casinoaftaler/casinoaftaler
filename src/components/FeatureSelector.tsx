import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Plus } from "lucide-react";

const PREDEFINED_FEATURES = [
  "Mobil App",
  "Gratis Spins",
  "Hurtig Udbetaling",
  "Live Casino",
  "Dansk Licens",
  "Ugentlige Kampagner",
  "VIP Program",
  "Sportsbook",
  "24/7 Support",
  "Ingen Omsætningskrav",
];

interface FeatureSelectorProps {
  selectedFeatures: string[];
  onChange: (features: string[]) => void;
}

export function FeatureSelector({ selectedFeatures, onChange }: FeatureSelectorProps) {
  const [customFeature, setCustomFeature] = useState("");

  const toggleFeature = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      onChange(selectedFeatures.filter((f) => f !== feature));
    } else {
      onChange([...selectedFeatures, feature]);
    }
  };

  const addCustomFeature = () => {
    const trimmed = customFeature.trim();
    if (trimmed && !selectedFeatures.includes(trimmed)) {
      onChange([...selectedFeatures, trimmed]);
      setCustomFeature("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCustomFeature();
    }
  };

  // Get custom features (ones not in predefined list)
  const customFeatures = selectedFeatures.filter(
    (f) => !PREDEFINED_FEATURES.includes(f)
  );

  return (
    <div className="space-y-3">
      <Label>Funktioner</Label>
      
      {/* Predefined features */}
      <div className="flex flex-wrap gap-2">
        {PREDEFINED_FEATURES.map((feature) => {
          const isSelected = selectedFeatures.includes(feature);
          return (
            <Badge
              key={feature}
              variant={isSelected ? "default" : "outline"}
              className={`cursor-pointer transition-colors ${
                isSelected
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "hover:bg-muted"
              }`}
              onClick={() => toggleFeature(feature)}
            >
              {feature}
            </Badge>
          );
        })}
      </div>

      {/* Custom features (if any) */}
      {customFeatures.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {customFeatures.map((feature) => (
            <Badge
              key={feature}
              variant="default"
              className="cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80"
              onClick={() => toggleFeature(feature)}
            >
              {feature} ×
            </Badge>
          ))}
        </div>
      )}

      {/* Add custom feature */}
      <div className="flex gap-2">
        <Input
          placeholder="Tilføj brugerdefineret funktion..."
          value={customFeature}
          onChange={(e) => setCustomFeature(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <button
          type="button"
          onClick={addCustomFeature}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background hover:bg-muted"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
