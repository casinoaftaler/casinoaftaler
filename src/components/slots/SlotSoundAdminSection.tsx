import { useState, useEffect } from "react";
import { useSlotSoundSettings, type SlotSoundSettings } from "@/hooks/useSlotSoundSettings";
import { slotSounds } from "@/lib/slotSoundEffects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Loader2, Volume2, RotateCcw, Play, Music, Trophy, Coins, Crown, ChevronDown, Cat } from "lucide-react";

export function SlotSoundAdminSection() {
  const { settings, isLoading, updateSettings, resetToDefaults, DEFAULT_SETTINGS } = useSlotSoundSettings();
  const [formData, setFormData] = useState<SlotSoundSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const handleSave = () => {
    updateSettings.mutate(formData);
    slotSounds.updateSoundSettings(formData);
  };

  const handleReset = () => {
    resetToDefaults.mutate(undefined, {
      onSuccess: () => {
        setFormData(DEFAULT_SETTINGS);
        slotSounds.updateSoundSettings(DEFAULT_SETTINGS);
      }
    });
  };

  const handleTestSpin = () => {
    slotSounds.updateSoundSettings(formData);
    slotSounds.setEnabled(true);
    slotSounds.setVolume(0.5);
    
    const stop = slotSounds.playReelSpin();
    setTimeout(() => {
      stop();
      slotSounds.playReelStopSingle(2);
    }, 1500);
  };

  const handleTestStop = () => {
    slotSounds.updateSoundSettings(formData);
    slotSounds.setEnabled(true);
    slotSounds.setVolume(0.5);
    slotSounds.playReelStopSingle(2);
  };

  const handleTestSmallWin = () => {
    slotSounds.updateSoundSettings(formData);
    slotSounds.setEnabled(true);
    slotSounds.setVolume(0.5);
    slotSounds.playSmallWin();
  };

  const handleTestMediumWin = () => {
    slotSounds.updateSoundSettings(formData);
    slotSounds.setEnabled(true);
    slotSounds.setVolume(0.5);
    slotSounds.playMediumWin();
  };

  const handleTestBigWin = () => {
    slotSounds.updateSoundSettings(formData);
    slotSounds.setEnabled(true);
    slotSounds.setVolume(0.5);
    slotSounds.playBigWin();
  };

  const handleTestScatter = () => {
    slotSounds.updateSoundSettings(formData);
    slotSounds.setEnabled(true);
    slotSounds.setVolume(0.5);
    // Play all 3 scatter sounds with delays
    slotSounds.playScatterLand(1);
    setTimeout(() => slotSounds.playScatterLand(2), 600);
    setTimeout(() => slotSounds.playScatterLand(3), 1200);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Collapsible>
      <Card>
        <CollapsibleTrigger className="w-full">
          <CardHeader className="flex flex-row items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors [&[data-state=open]>svg]:rotate-180">
            <CardTitle className="flex items-center gap-2">
              <Music className="h-5 w-5 text-amber-500" />
              Lydindstillinger
            </CardTitle>
            <ChevronDown className="h-5 w-5 transition-transform duration-200" />
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-6">
        {/* Spinning Sound Section */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            Spinning Lyd
          </h4>
          
          <div className="space-y-4 pl-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Klik-interval (ms)</Label>
                <span className="text-sm text-muted-foreground">{formData.spinClickInterval}ms</span>
              </div>
              <Slider
                value={[formData.spinClickInterval]}
                onValueChange={(v) => setFormData({ ...formData, spinClickInterval: v[0] })}
                min={20}
                max={100}
                step={5}
              />
              <p className="text-xs text-muted-foreground">
                Lavere = hurtigere klik (mere intens). Standard: 45ms
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Klik start-frekvens (Hz)</Label>
                <span className="text-sm text-muted-foreground">{formData.spinClickFreqStart}Hz</span>
              </div>
              <Slider
                value={[formData.spinClickFreqStart]}
                onValueChange={(v) => setFormData({ ...formData, spinClickFreqStart: v[0] })}
                min={150}
                max={500}
                step={10}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Klik slut-frekvens (Hz)</Label>
                <span className="text-sm text-muted-foreground">{formData.spinClickFreqEnd}Hz</span>
              </div>
              <Slider
                value={[formData.spinClickFreqEnd]}
                onValueChange={(v) => setFormData({ ...formData, spinClickFreqEnd: v[0] })}
                min={80}
                max={300}
                step={10}
              />
              <p className="text-xs text-muted-foreground">
                Klik-lyden sweeper fra start til slut frekvens
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Klik-volumen</Label>
                <span className="text-sm text-muted-foreground">{Math.round(formData.spinClickVolume * 100)}%</span>
              </div>
              <Slider
                value={[formData.spinClickVolume * 100]}
                onValueChange={(v) => setFormData({ ...formData, spinClickVolume: v[0] / 100 })}
                min={0}
                max={50}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Motor-hum volumen</Label>
                <span className="text-sm text-muted-foreground">{Math.round(formData.spinMotorVolume * 100)}%</span>
              </div>
              <Slider
                value={[formData.spinMotorVolume * 100]}
                onValueChange={(v) => setFormData({ ...formData, spinMotorVolume: v[0] / 100 })}
                min={0}
                max={20}
                step={1}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Mekanisme-ticker</Label>
                <p className="text-xs text-muted-foreground">Højfrekvent accent-lyd</p>
              </div>
              <Switch
                checked={formData.spinTickerEnabled}
                onCheckedChange={(v) => setFormData({ ...formData, spinTickerEnabled: v })}
              />
            </div>

            {formData.spinTickerEnabled && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Ticker-frekvens (Hz)</Label>
                  <span className="text-sm text-muted-foreground">{formData.spinTickerFrequency}Hz</span>
                </div>
                <Slider
                  value={[formData.spinTickerFrequency]}
                  onValueChange={(v) => setFormData({ ...formData, spinTickerFrequency: v[0] })}
                  min={500}
                  max={2000}
                  step={50}
                />
              </div>
            )}
          </div>
        </div>

        {/* Stop Sound Section */}
        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            Stop Lyd
          </h4>
          
          <div className="space-y-4 pl-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Impact-volumen</Label>
                <span className="text-sm text-muted-foreground">{Math.round(formData.stopImpactVolume * 100)}%</span>
              </div>
              <Slider
                value={[formData.stopImpactVolume * 100]}
                onValueChange={(v) => setFormData({ ...formData, stopImpactVolume: v[0] / 100 })}
                min={0}
                max={100}
                step={5}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Gylden klokke</Label>
                <p className="text-xs text-muted-foreground">Chime-accent når hjul stopper</p>
              </div>
              <Switch
                checked={formData.stopChimeEnabled}
                onCheckedChange={(v) => setFormData({ ...formData, stopChimeEnabled: v })}
              />
            </div>

            {formData.stopChimeEnabled && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Klokke-volumen</Label>
                  <span className="text-sm text-muted-foreground">{Math.round(formData.stopChimeVolume * 100)}%</span>
                </div>
                <Slider
                  value={[formData.stopChimeVolume * 100]}
                  onValueChange={(v) => setFormData({ ...formData, stopChimeVolume: v[0] / 100 })}
                  min={0}
                  max={50}
                  step={1}
                />
              </div>
            )}
          </div>
        </div>

        {/* Scatter Sound Section */}
        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium flex items-center gap-2">
            <Cat className="h-4 w-4 text-pink-400" />
            Scatter Lyd (Mjav)
          </h4>
          
          <div className="space-y-4 pl-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Volumen</Label>
                <span className="text-sm text-muted-foreground">{Math.round(formData.scatterVolume * 100)}%</span>
              </div>
              <Slider
                value={[formData.scatterVolume * 100]}
                onValueChange={(v) => setFormData({ ...formData, scatterVolume: v[0] / 100 })}
                min={0}
                max={100}
                step={5}
              />
              <p className="text-xs text-muted-foreground">
                Justerer lydstyrken for scatter-lyde (katte-mjav). Standard: 35%
              </p>
            </div>
          </div>
        </div>

        {/* Small Win Sound Section */}
        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium flex items-center gap-2">
            <Coins className="h-4 w-4 text-amber-400" />
            Lille Gevinst Lyd
          </h4>
          
          <div className="space-y-4 pl-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Volumen</Label>
                <span className="text-sm text-muted-foreground">{Math.round(formData.winSmallVolume * 100)}%</span>
              </div>
              <Slider
                value={[formData.winSmallVolume * 100]}
                onValueChange={(v) => setFormData({ ...formData, winSmallVolume: v[0] / 100 })}
                min={0}
                max={50}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Arpeggio-hastighed (ms)</Label>
                <span className="text-sm text-muted-foreground">{formData.winSmallArpeggioSpeed}ms</span>
              </div>
              <Slider
                value={[formData.winSmallArpeggioSpeed]}
                onValueChange={(v) => setFormData({ ...formData, winSmallArpeggioSpeed: v[0] })}
                min={40}
                max={150}
                step={10}
              />
              <p className="text-xs text-muted-foreground">
                Lavere = hurtigere melodiafspilning
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Antal møntklik</Label>
                <span className="text-sm text-muted-foreground">{formData.winSmallCoinCount}</span>
              </div>
              <Slider
                value={[formData.winSmallCoinCount]}
                onValueChange={(v) => setFormData({ ...formData, winSmallCoinCount: v[0] })}
                min={0}
                max={15}
                step={1}
              />
            </div>
          </div>
        </div>

        {/* Medium Win Sound Section */}
        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium flex items-center gap-2">
            <Trophy className="h-4 w-4 text-amber-500" />
            Medium Gevinst Lyd
          </h4>
          
          <div className="space-y-4 pl-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Volumen</Label>
                <span className="text-sm text-muted-foreground">{Math.round(formData.winMediumVolume * 100)}%</span>
              </div>
              <Slider
                value={[formData.winMediumVolume * 100]}
                onValueChange={(v) => setFormData({ ...formData, winMediumVolume: v[0] / 100 })}
                min={0}
                max={50}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Antal sistrum-rystelser</Label>
                <span className="text-sm text-muted-foreground">{formData.winMediumSistrumCount}</span>
              </div>
              <Slider
                value={[formData.winMediumSistrumCount]}
                onValueChange={(v) => setFormData({ ...formData, winMediumSistrumCount: v[0] })}
                min={0}
                max={25}
                step={1}
              />
              <p className="text-xs text-muted-foreground">
                Egyptisk raslelyd (sistrum)
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Antal guldmønter</Label>
                <span className="text-sm text-muted-foreground">{formData.winMediumCoinCount}</span>
              </div>
              <Slider
                value={[formData.winMediumCoinCount]}
                onValueChange={(v) => setFormData({ ...formData, winMediumCoinCount: v[0] })}
                min={0}
                max={30}
                step={1}
              />
            </div>
          </div>
        </div>

        {/* Big Win Sound Section */}
        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium flex items-center gap-2">
            <Crown className="h-4 w-4 text-yellow-500" />
            Stor Gevinst Lyd
          </h4>
          
          <div className="space-y-4 pl-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Volumen</Label>
                <span className="text-sm text-muted-foreground">{Math.round(formData.winBigVolume * 100)}%</span>
              </div>
              <Slider
                value={[formData.winBigVolume * 100]}
                onValueChange={(v) => setFormData({ ...formData, winBigVolume: v[0] / 100 })}
                min={0}
                max={60}
                step={1}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Episk fanfare</Label>
                <p className="text-xs text-muted-foreground">Triumferende egyptisk melodi</p>
              </div>
              <Switch
                checked={formData.winBigFanfareEnabled}
                onCheckedChange={(v) => setFormData({ ...formData, winBigFanfareEnabled: v })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dybe trommer</Label>
                <p className="text-xs text-muted-foreground">Kraftige trommeslag</p>
              </div>
              <Switch
                checked={formData.winBigDrumEnabled}
                onCheckedChange={(v) => setFormData({ ...formData, winBigDrumEnabled: v })}
              />
            </div>
          </div>
        </div>

        {/* Test and Save Buttons */}
        <div className="flex flex-wrap gap-2 pt-4 border-t">
          <Button variant="outline" onClick={handleTestSpin} className="gap-2">
            <Play className="h-4 w-4" />
            Test Spin
          </Button>
          <Button variant="outline" onClick={handleTestStop} className="gap-2">
            <Play className="h-4 w-4" />
            Test Stop
          </Button>
          <Button variant="outline" onClick={handleTestSmallWin} className="gap-2">
            <Coins className="h-4 w-4 text-amber-400" />
            Lille
          </Button>
          <Button variant="outline" onClick={handleTestMediumWin} className="gap-2">
            <Trophy className="h-4 w-4 text-amber-500" />
            Medium
          </Button>
          <Button variant="outline" onClick={handleTestBigWin} className="gap-2">
            <Crown className="h-4 w-4 text-yellow-500" />
            Stor
          </Button>
          <Button variant="outline" onClick={handleTestScatter} className="gap-2">
            <Cat className="h-4 w-4 text-pink-400" />
            Scatter
          </Button>
          <div className="flex-1" />
          <Button 
            variant="outline" 
            onClick={handleReset}
            disabled={resetToDefaults.isPending}
            className="gap-2"
          >
            {resetToDefaults.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RotateCcw className="h-4 w-4" />
            )}
            Nulstil
          </Button>
          <Button 
            onClick={handleSave}
            disabled={updateSettings.isPending}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
          >
            {updateSettings.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Gem Lydindstillinger
          </Button>
        </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
