import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Volume2, VolumeX, Volume1, Music, Sparkles, Cat } from "lucide-react";
import { slotSounds } from "@/lib/slotSoundEffects";
import { cn } from "@/lib/utils";

interface VolumeControlProps {
  className?: string;
}

export function VolumeControl({ className }: VolumeControlProps) {
  const [enabled, setEnabled] = useState(slotSounds.isEnabled());
  const [volume, setVolume] = useState(slotSounds.getVolume() * 100);
  const [musicEnabled, setMusicEnabled] = useState(slotSounds.isMusicEnabled());
  const [effectsEnabled, setEffectsEnabled] = useState(slotSounds.isEffectsEnabled());
  const [bonusSoundsOnly, setBonusSoundsOnly] = useState(slotSounds.isBonusSoundsOnly());

  useEffect(() => {
    slotSounds.setEnabled(enabled);
  }, [enabled]);

  useEffect(() => {
    slotSounds.setVolume(volume / 100);
  }, [volume]);

  useEffect(() => {
    slotSounds.setMusicEnabled(musicEnabled);
  }, [musicEnabled]);

  useEffect(() => {
    slotSounds.setEffectsEnabled(effectsEnabled);
  }, [effectsEnabled]);

  useEffect(() => {
    slotSounds.setBonusSoundsOnly(bonusSoundsOnly);
  }, [bonusSoundsOnly]);

  const handleToggle = () => {
    const newEnabled = !enabled;
    setEnabled(newEnabled);
    if (newEnabled && volume > 0) {
      slotSounds.playButtonClick();
    }
  };

  const handleMusicToggle = (checked: boolean) => {
    setMusicEnabled(checked);
  };

  const handleEffectsToggle = (checked: boolean) => {
    setEffectsEnabled(checked);
    if (checked) {
      slotSounds.playButtonClick();
    }
  };

  const handleBonusSoundsOnlyToggle = (checked: boolean) => {
    setBonusSoundsOnly(checked);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    slotSounds.setVolume(newVolume / 100);
    if (newVolume > 0 && !enabled) {
      setEnabled(true);
      slotSounds.setEnabled(true);
    } else if (newVolume === 0) {
      setEnabled(false);
      slotSounds.setEnabled(false);
    }
  };

  const getVolumeIcon = () => {
    if (!enabled || volume === 0) {
      return <VolumeX className="h-5 w-5" />;
    } else if (volume < 50) {
      return <Volume1 className="h-5 w-5" />;
    }
    return <Volume2 className="h-5 w-5" />;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("text-muted-foreground hover:text-foreground", className)}
          onClick={(e) => {
            // Right-click or long press could toggle, normal click opens popover
            if (e.shiftKey) {
              e.preventDefault();
              handleToggle();
            }
          }}
        >
          {getVolumeIcon()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Lydstyrke</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2"
              onClick={handleToggle}
            >
              {enabled ? "Sluk alt" : "Tænd"}
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <VolumeX className="h-4 w-4 text-muted-foreground" />
            <Slider
              value={[volume]}
              onValueChange={handleVolumeChange}
              max={100}
              step={5}
              disabled={!enabled}
              className="flex-1"
            />
            <Volume2 className="h-4 w-4 text-muted-foreground" />
          </div>
          
          <div className="text-center mb-2">
            <span className="text-sm text-muted-foreground">
              {enabled ? `${Math.round(volume)}%` : "Slukket"}
            </span>
          </div>

          {/* Music toggle */}
          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Music className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium">Musik</span>
              </div>
              <Switch
                checked={musicEnabled && enabled}
                onCheckedChange={handleMusicToggle}
                disabled={!enabled}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Egyptisk baggrundsmusik
            </p>
          </div>

          {/* Effects toggle */}
          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium">Lydeffekter</span>
              </div>
              <Switch
                checked={effectsEnabled && enabled}
                onCheckedChange={handleEffectsToggle}
                disabled={!enabled}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Spin, gevinst og bonus lyde
            </p>
          </div>

          {/* Bonus sounds only toggle */}
          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cat className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium">Kun bonus lyde</span>
              </div>
              <Switch
                checked={bonusSoundsOnly && enabled && effectsEnabled}
                onCheckedChange={handleBonusSoundsOnlyToggle}
                disabled={!enabled || !effectsEnabled}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Kun scatter, tease og bonus lyde
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
