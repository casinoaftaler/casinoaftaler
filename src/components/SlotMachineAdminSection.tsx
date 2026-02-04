import { useState, useEffect, useMemo } from "react";
import { useSlotSymbols } from "@/hooks/useSlotSymbols";
import { useSlotSettings } from "@/hooks/useSlotSettings";
import { useSlotAdminStatistics, type StatPeriod } from "@/hooks/useSlotAdminStatistics";
import { useSlotSymbolsAdmin } from "@/hooks/useSlotSymbolsAdmin";
import { SlotSymbolImageUpload } from "@/components/SlotSymbolImageUpload";
import { SlotTitleImageUpload } from "@/components/SlotTitleImageUpload";
import { SlotBackgroundImageUpload } from "@/components/SlotBackgroundImageUpload";
import { SpinManagementSection } from "@/components/SpinManagementSection";
import { SlotFrameAdminControls } from "@/components/slots/SlotFrameAdminControls";
import { SlotSoundAdminSection } from "@/components/slots/SlotSoundAdminSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, LineChart, Line } from "recharts";
import { GripVertical, Pencil, Loader2, Trophy, Sparkles, TrendingUp, BarChart3, Lock, Wand2, Users, Calendar, Percent, Calculator, ArrowUp, ArrowDown, Timer } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { SlotSymbol } from "@/lib/slotGameLogic";
import { calculateTheoreticalRTP, calculateRTPWithModifiedSymbol } from "@/lib/slotRTPCalculation";

interface SortableSymbolRowProps {
  symbol: SlotSymbol;
  onEdit: (symbol: SlotSymbol) => void;
  spawnPercentage: number;
}

function SortableSymbolRow({ symbol, onEdit, spawnPercentage }: SortableSymbolRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: symbol.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-4 p-3 bg-card border rounded-lg"
    >
      <button
        className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-5 w-5" />
      </button>

      <div className="w-12 h-12 flex items-center justify-center bg-muted rounded-md overflow-hidden">
        {symbol.image_url ? (
          <img src={symbol.image_url} alt={symbol.name} className="w-full h-full object-contain" />
        ) : (
          <span className="text-2xl">🎰</span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium truncate">{symbol.name}</span>
          {symbol.is_wild && <Badge variant="secondary" className="text-xs">Wild</Badge>}
          {symbol.is_scatter && <Badge variant="outline" className="text-xs">Scatter</Badge>}
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="text-amber-500 font-medium">Vægt: {symbol.weight}</span>
          <span className="text-primary font-medium ml-2">({spawnPercentage.toFixed(2)}%)</span>
          {" | "}
          {symbol.rarity === 'premium' && `2×: ${symbol.multiplier_2}x | `}3×: {symbol.multiplier_3}x | 4×: {symbol.multiplier_4}x | 5×: {symbol.multiplier_5}x
        </div>
      </div>

      <Button variant="ghost" size="icon" onClick={() => onEdit(symbol)}>
        <Pencil className="h-4 w-4" />
      </Button>
    </div>
  );
}

interface EditSymbolDialogProps {
  symbol: SlotSymbol | null;
  open: boolean;
  onClose: () => void;
  allSymbols: SlotSymbol[];
}

function EditSymbolDialog({ symbol, open, onClose, allSymbols }: EditSymbolDialogProps) {
  const { updateSymbol } = useSlotSymbolsAdmin();
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image_url: null as string | null,
    multiplier_2: "0",
    multiplier_3: "5",
    multiplier_4: "10",
    multiplier_5: "25",
    is_scatter: false,
    is_wild: false,
    weight: "10",
  });

  useEffect(() => {
    if (symbol) {
      setFormData({
        name: symbol.name,
        image_url: symbol.image_url,
        multiplier_2: String(symbol.multiplier_2),
        multiplier_3: String(symbol.multiplier_3),
        multiplier_4: String(symbol.multiplier_4),
        multiplier_5: String(symbol.multiplier_5),
        is_scatter: symbol.is_scatter,
        is_wild: symbol.is_wild,
        weight: String(symbol.weight || 10),
      });
    }
  }, [symbol]);

  const handleSave = () => {
    if (!symbol) return;
    updateSymbol.mutate({
      id: symbol.id,
      name: formData.name,
      image_url: formData.image_url,
      multiplier_2: parseFloat(formData.multiplier_2) || 0,
      multiplier_3: parseFloat(formData.multiplier_3) || 0.1,
      multiplier_4: parseFloat(formData.multiplier_4) || 0.1,
      multiplier_5: parseFloat(formData.multiplier_5) || 0.1,
      is_scatter: formData.is_scatter,
      is_wild: formData.is_wild,
      weight: parseFloat(formData.weight) || 10,
    }, {
      onSuccess: () => onClose(),
    });
  };

  const handleGenerateAI = async () => {
    if (!symbol) return;
    setIsGeneratingAI(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("generate-slot-symbol", {
        body: { symbolId: symbol.id },
      });

      if (error) {
        console.error("Edge function error:", error);
        toast.error("Kunne ikke generere symbol: " + error.message);
        return;
      }

      if (data?.error) {
        if (data.error.includes("Rate limit")) {
          toast.error("Rate limit nået. Prøv igen senere.");
        } else if (data.error.includes("Payment required")) {
          toast.error("Ikke nok kreditter. Tilføj kreditter til din workspace.");
        } else {
          toast.error(data.error);
        }
        return;
      }

      if (data?.imageUrl) {
        setFormData({ ...formData, image_url: data.imageUrl });
        toast.success("AI-symbol genereret!");
      }
    } catch (err) {
      console.error("AI generation error:", err);
      toast.error("Der opstod en fejl under generering");
    } finally {
      setIsGeneratingAI(false);
    }
  };

  if (!symbol) return null;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rediger Symbol: {symbol.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="symbol-name">Navn</Label>
            <Input
              id="symbol-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <SlotSymbolImageUpload
            currentImageUrl={formData.image_url}
            onImageUploaded={(url) => setFormData({ ...formData, image_url: url })}
            onImageRemoved={() => setFormData({ ...formData, image_url: null })}
            symbolId={symbol.id}
          />

          <Button
            variant="outline"
            onClick={handleGenerateAI}
            disabled={isGeneratingAI}
            className="w-full"
          >
            {isGeneratingAI ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Genererer med AI... (10-30 sek)
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4 mr-2" />
                Generer nyt billede med AI
              </>
            )}
          </Button>

          {/* Spawn percentage preview */}
          {(() => {
            const currentWeight = parseFloat(formData.weight) || 0;
            const otherSymbolsWeight = allSymbols
              .filter(s => s.id !== symbol?.id)
              .reduce((sum, s) => sum + (s.weight || 0), 0);
            const totalWeight = otherSymbolsWeight + currentWeight;
            const percentage = totalWeight > 0 ? (currentWeight / totalWeight) * 100 : 0;
            
            return (
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border">
                <Percent className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">
                    Spawn sandsynlighed: <span className="text-primary">{percentage.toFixed(2)}%</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Baseret på total vægt: {totalWeight} (dette symbol: {currentWeight})
                  </p>
                </div>
              </div>
            );
          })()}

          {/* RTP Impact Preview */}
          {(() => {
            const currentRTP = calculateTheoreticalRTP(allSymbols);
            const modifiedSymbol = {
              id: symbol.id,
              weight: parseFloat(formData.weight) || 0,
              multiplier_2: parseFloat(formData.multiplier_2) || 0,
              multiplier_3: parseFloat(formData.multiplier_3) || 0,
              multiplier_4: parseFloat(formData.multiplier_4) || 0,
              multiplier_5: parseFloat(formData.multiplier_5) || 0,
            };
            const projectedRTP = calculateRTPWithModifiedSymbol(allSymbols, modifiedSymbol);
            const rtpDelta = projectedRTP.totalRTP - currentRTP.totalRTP;
            
            return (
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border">
                <Calculator className="h-5 w-5 text-amber-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium flex items-center gap-2">
                    RTP Effekt: 
                    <span className="text-muted-foreground">{currentRTP.totalRTP.toFixed(2)}%</span>
                    <span className="text-muted-foreground">→</span>
                    <span className={projectedRTP.totalRTP >= 90 && projectedRTP.totalRTP <= 96 ? 'text-green-500' : 'text-amber-500'}>
                      {projectedRTP.totalRTP.toFixed(2)}%
                    </span>
                    {rtpDelta !== 0 && (
                      <span className={`flex items-center text-xs ${rtpDelta > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {rtpDelta > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                        {Math.abs(rtpDelta).toFixed(2)}%
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Forventet tilbagebetalingsprocent ved ændringer
                  </p>
                </div>
              </div>
            );
          })()}

          <div className="grid grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight" className="flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-amber-500" />
                Vægt (Odds)
              </Label>
              <Input
                id="weight"
                type="number"
                step="1"
                min="1"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">Højere = oftere</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mult-2">2× Multiplier</Label>
              <Input
                id="mult-2"
                type="number"
                step="0.1"
                min="0"
                value={formData.multiplier_2}
                onChange={(e) => setFormData({ ...formData, multiplier_2: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">Kun premium</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mult-3">3× Multiplier</Label>
              <Input
                id="mult-3"
                type="number"
                step="0.1"
                min="0.1"
                value={formData.multiplier_3}
                onChange={(e) => setFormData({ ...formData, multiplier_3: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mult-4">4× Multiplier</Label>
              <Input
                id="mult-4"
                type="number"
                step="0.1"
                min="0.1"
                value={formData.multiplier_4}
                onChange={(e) => setFormData({ ...formData, multiplier_4: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mult-5">5× Multiplier</Label>
              <Input
                id="mult-5"
                type="number"
                step="0.1"
                min="0.1"
                value={formData.multiplier_5}
                onChange={(e) => setFormData({ ...formData, multiplier_5: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Switch
                id="is-wild"
                checked={formData.is_wild}
                onCheckedChange={(checked) => setFormData({ ...formData, is_wild: checked })}
              />
              <Label htmlFor="is-wild">Wild Symbol</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="is-scatter"
                checked={formData.is_scatter}
                onCheckedChange={(checked) => setFormData({ ...formData, is_scatter: checked })}
              />
              <Label htmlFor="is-scatter">Scatter Symbol</Label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Annuller
            </Button>
            <Button onClick={handleSave} disabled={updateSymbol.isPending}>
              {updateSymbol.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Gem
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SymbolsTab() {
  const { data: symbols, isLoading } = useSlotSymbols();
  const { updatePositions } = useSlotSymbolsAdmin();
  const [orderedSymbols, setOrderedSymbols] = useState<SlotSymbol[]>([]);
  const [editingSymbol, setEditingSymbol] = useState<SlotSymbol | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (symbols) {
      setOrderedSymbols(symbols);
    }
  }, [symbols]);

  // Calculate RTP - MUST be called before any early returns to respect rules of hooks
  const rtpResult = useMemo(() => {
    if (orderedSymbols.length === 0) return null;
    return calculateTheoreticalRTP(orderedSymbols);
  }, [orderedSymbols]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setOrderedSymbols((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        
        const updates = newItems.map((item, index) => ({
          id: item.id,
          position: index,
        }));
        updatePositions.mutate(updates);
        
        return newItems;
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Calculate total weight for percentage calculation
  const totalWeight = orderedSymbols.reduce((sum, s) => sum + (s.weight || 0), 0);

  // Separate symbols by rarity for the overview
  const premiumSymbols = orderedSymbols.filter(s => s.rarity === 'premium');
  const commonSymbols = orderedSymbols.filter(s => s.rarity === 'common');
  const scatterSymbols = orderedSymbols.filter(s => s.is_scatter);

  // Determine RTP health status
  const getRTPStatus = (rtp: number) => {
    if (rtp >= 92 && rtp <= 96) return { color: 'text-green-500', status: 'Optimal' };
    if (rtp >= 88 && rtp < 92) return { color: 'text-amber-500', status: 'Lav' };
    if (rtp > 96 && rtp <= 98) return { color: 'text-amber-500', status: 'Høj' };
    return { color: 'text-red-500', status: 'Advarsel' };
  };

  return (
    <div className="space-y-6">
      {/* RTP Overview Card */}
      {rtpResult && (
        <Card className="border-2 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calculator className="h-5 w-5 text-amber-500" />
              Teoretisk RTP (Return to Player)
            </CardTitle>
            <CardDescription>
              Den forventede tilbagebetalingsprocent baseret på symbolernes vægte og multiplikatorer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {/* Main RTP Display */}
              <div className="flex items-center justify-center">
                <div className="text-center p-6 bg-muted/50 rounded-xl border-2 border-primary/10">
                  <p className={`text-5xl font-bold ${getRTPStatus(rtpResult.totalRTP).color}`}>
                    {rtpResult.totalRTP.toFixed(2)}%
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Return to Player
                  </p>
                  <Badge 
                    variant={getRTPStatus(rtpResult.totalRTP).status === 'Optimal' ? 'default' : 'secondary'}
                    className="mt-2"
                  >
                    {getRTPStatus(rtpResult.totalRTP).status}
                  </Badge>
                </div>
              </div>

              {/* RTP Breakdown */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-xl font-bold text-primary">{rtpResult.lineRTP.toFixed(2)}%</p>
                  <p className="text-xs text-muted-foreground">Linje-gevinster</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-xl font-bold text-purple-500">{rtpResult.scatterRTP.toFixed(4)}%</p>
                  <p className="text-xs text-muted-foreground">Scatter-gevinster</p>
                </div>
              </div>

              {/* Industry Standard Reference */}
              <div className="text-center text-sm text-muted-foreground border-t pt-4">
                <p>Industri standard: <span className="font-medium text-foreground">92-96%</span></p>
                <p className="text-xs mt-1">Lavere RTP = mere profit for huset, højere RTP = mere til spilleren</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Probability Overview Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Percent className="h-5 w-5 text-primary" />
            Sandsynlighedsoversigt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {/* Visual bar chart */}
            <div className="space-y-2">
              {orderedSymbols.map((symbol) => {
                const percentage = totalWeight > 0 ? ((symbol.weight || 0) / totalWeight) * 100 : 0;
                const barColor = symbol.is_scatter 
                  ? 'bg-purple-500' 
                  : symbol.rarity === 'premium' 
                    ? 'bg-amber-500' 
                    : 'bg-primary';
                
                return (
                  <div key={symbol.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-muted rounded overflow-hidden">
                      {symbol.image_url ? (
                        <img src={symbol.image_url} alt={symbol.name} className="w-full h-full object-contain" />
                      ) : (
                        <span className="text-sm">🎰</span>
                      )}
                    </div>
                    <div className="w-20 text-sm font-medium truncate">{symbol.name}</div>
                    <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${barColor} transition-all duration-300`}
                        style={{ width: `${Math.max(percentage, 1)}%` }}
                      />
                    </div>
                    <div className="w-20 text-right">
                      <span className="text-sm font-medium">{percentage.toFixed(2)}%</span>
                      <span className="text-xs text-muted-foreground ml-1">({symbol.weight})</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">{totalWeight}</p>
                <p className="text-xs text-muted-foreground">Total Vægt</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-amber-500">
                  {premiumSymbols.reduce((sum, s) => sum + ((s.weight || 0) / totalWeight) * 100, 0).toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground">Premium Symboler</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold">
                  {commonSymbols.reduce((sum, s) => sum + ((s.weight || 0) / totalWeight) * 100, 0).toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground">Almindelige Symboler</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-purple-500">
                  {scatterSymbols.reduce((sum, s) => sum + ((s.weight || 0) / totalWeight) * 100, 0).toFixed(2)}%
                </p>
                <p className="text-xs text-muted-foreground">Scatter (Bonus)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Symbol list */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={orderedSymbols.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {orderedSymbols.map((symbol) => (
              <SortableSymbolRow
                key={symbol.id}
                symbol={symbol}
                onEdit={setEditingSymbol}
                spawnPercentage={totalWeight > 0 ? ((symbol.weight || 0) / totalWeight) * 100 : 0}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <EditSymbolDialog
        symbol={editingSymbol}
        open={!!editingSymbol}
        onClose={() => setEditingSymbol(null)}
        allSymbols={orderedSymbols}
      />
    </div>
  );
}

function SettingsTab() {
  const { settings, isLoading, updateSettings } = useSlotSettings();
  const [formData, setFormData] = useState({
    dailySpins: 100,
    minBet: 1,
    maxBet: 10,
    pageLocked: true,
    pagePassword: "",
    spinLoopMs: 600,
    reelStaggerMs: 150,
    reelSlowdownMs: 300,
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        dailySpins: settings.dailySpins,
        minBet: settings.minBet,
        maxBet: settings.maxBet,
        pageLocked: settings.pageLocked,
        pagePassword: settings.pagePassword,
        spinLoopMs: settings.spinLoopMs,
        reelStaggerMs: settings.reelStaggerMs,
        reelSlowdownMs: settings.reelSlowdownMs,
      });
    }
  }, [settings]);

  const handleSave = () => {
    updateSettings.mutate(formData);
  };

  const handleLockToggle = (checked: boolean) => {
    setFormData({ ...formData, pageLocked: checked });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Access Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Adgangskontrol
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="page-locked" className="font-medium">Lås Spillemaskine-siden</Label>
              <p className="text-sm text-muted-foreground">
                Når aktiveret, skal brugere indtaste et password for at få adgang til siden.
              </p>
            </div>
            <Switch
              id="page-locked"
              checked={formData.pageLocked}
              onCheckedChange={handleLockToggle}
            />
          </div>

          {formData.pageLocked && (
            <div className="space-y-2 pt-2 border-t">
              <Label htmlFor="page-password">Adgangskode</Label>
              <Input
                id="page-password"
                type="text"
                value={formData.pagePassword}
                onChange={(e) => setFormData({ ...formData, pagePassword: e.target.value })}
                placeholder="Indtast adgangskode..."
              />
              <p className="text-sm text-muted-foreground">
                Brugere skal indtaste denne adgangskode for at få adgang til spillemaskinen.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Animation Timing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Timer className="h-5 w-5" />
            Animation Timing
          </CardTitle>
          <CardDescription>
            Juster hastigheden på hjulenes rotation og landing.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="spin-loop-ms">Spin Hastighed</Label>
                <span className="text-sm text-muted-foreground font-mono">{formData.spinLoopMs}ms</span>
              </div>
              <Slider
                id="spin-loop-ms"
                min={200}
                max={800}
                step={50}
                value={[formData.spinLoopMs]}
                onValueChange={(value) => setFormData({ ...formData, spinLoopMs: value[0] })}
              />
              <p className="text-xs text-muted-foreground">
                Lavere værdi = hurtigere spinning. Standard: 400ms
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="reel-stagger-ms">Hjul Landing Forsinkelse</Label>
                <span className="text-sm text-muted-foreground font-mono">{formData.reelStaggerMs}ms</span>
              </div>
              <Slider
                id="reel-stagger-ms"
                min={0}
                max={500}
                step={25}
                value={[formData.reelStaggerMs]}
                onValueChange={(value) => setFormData({ ...formData, reelStaggerMs: value[0] })}
              />
              <p className="text-xs text-muted-foreground">
                Tid mellem hvert hjul stopper. 0 = samtidigt, 150ms = kaskade effekt
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="reel-slowdown-ms">Hjul Slowdown Hastighed</Label>
                <span className="text-sm text-muted-foreground font-mono">{formData.reelSlowdownMs}ms</span>
              </div>
              <Slider
                id="reel-slowdown-ms"
                min={100}
                max={800}
                step={50}
                value={[formData.reelSlowdownMs]}
                onValueChange={(value) => setFormData({ ...formData, reelSlowdownMs: value[0] })}
              />
              <p className="text-xs text-muted-foreground">
                Hvor lang tid hvert hjul bruger på at bremse ned. Lavere = hurtigere landing.
              </p>
            </div>
          </div>

          <Button 
            onClick={handleSave} 
            disabled={updateSettings.isPending}
            variant="outline"
            className="w-full"
          >
            {updateSettings.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Gem Animation Indstillinger
          </Button>
        </CardContent>
      </Card>

      {/* Egyptian Frame Generator */}
      <SlotFrameAdminControls />

      {/* Sound Settings */}
      <SlotSoundAdminSection />

      <Card>
        <CardHeader>
          <CardTitle>Billeder</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <SlotTitleImageUpload />
          <SlotBackgroundImageUpload />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Spil Indstillinger</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="daily-spins">Daglige Spins per Bruger</Label>
            <Input
              id="daily-spins"
              type="number"
              min="1"
              max="1000"
              value={formData.dailySpins}
              onChange={(e) => setFormData({ ...formData, dailySpins: parseInt(e.target.value) || 100 })}
            />
            <p className="text-sm text-muted-foreground">
              Antal gratis spins hver bruger får per dag. Nulstilles ved midnat.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="min-bet">Minimum Indsats</Label>
              <Input
                id="min-bet"
                type="number"
                min="1"
                value={formData.minBet}
                onChange={(e) => setFormData({ ...formData, minBet: parseInt(e.target.value) || 1 })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-bet">Maximum Indsats</Label>
              <Input
                id="max-bet"
                type="number"
                min="1"
                value={formData.maxBet}
                onChange={(e) => setFormData({ ...formData, maxBet: parseInt(e.target.value) || 10 })}
              />
            </div>
          </div>

          <Button onClick={handleSave} disabled={updateSettings.isPending}>
            {updateSettings.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Gem Indstillinger
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

const periodLabels: Record<StatPeriod, string> = {
  today: "I dag",
  week: "Denne uge",
  month: "Denne måned",
  alltime: "Alt tid",
};

const chartConfig = {
  spins: {
    label: "Spins",
    color: "hsl(var(--chart-1))",
  },
  winnings: {
    label: "Gevinster",
    color: "hsl(var(--chart-2))",
  },
  players: {
    label: "Spillere",
    color: "hsl(var(--chart-3))",
  },
  rtp: {
    label: "RTP %",
    color: "hsl(var(--chart-4))",
  },
};

function StatisticsTab() {
  const [period, setPeriod] = useState<StatPeriod>("today");
  const { data: stats, isLoading } = useSlotAdminStatistics(period);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("da-DK", { day: "numeric", month: "short" });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="flex flex-wrap gap-2">
        {(["today", "week", "month", "alltime"] as StatPeriod[]).map((p) => (
          <Button
            key={p}
            variant={period === p ? "default" : "outline"}
            size="sm"
            onClick={() => setPeriod(p)}
          >
            <Calendar className="h-4 w-4 mr-1" />
            {periodLabels[p]}
          </Button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              Total Spins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(stats?.totalSpins || 0).toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Total Gevinster
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(stats?.totalWinnings || 0).toLocaleString()} pts</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-500" />
              Største Gevinst
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(stats?.biggestWin || 0).toLocaleString()} pts</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              Unikke Spillere
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.uniquePlayers || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calculator className="h-4 w-4 text-purple-500" />
              Gns. Gevinst/Spin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(stats?.avgWinPerSpin || 0).toFixed(1)} pts</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Percent className="h-4 w-4 text-orange-500" />
              RTP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.totalBets && stats.totalBets > 0
                ? ((stats.totalWinnings / stats.totalBets) * 100).toFixed(1)
                : "0.0"}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">Return to Player</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      {stats?.dailyStats && stats.dailyStats.length > 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Spins Over Time */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Spins Over Tid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <BarChart data={stats.dailyStats}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDate}
                    tick={{ fontSize: 12 }}
                    className="text-muted-foreground"
                  />
                  <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    labelFormatter={(label) => formatDate(label as string)}
                  />
                  <Bar dataKey="spins" fill="var(--color-spins)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Winnings Over Time */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Gevinster Over Tid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <AreaChart data={stats.dailyStats}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDate}
                    tick={{ fontSize: 12 }}
                    className="text-muted-foreground"
                  />
                  <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    labelFormatter={(label) => formatDate(label as string)}
                  />
                  <Area
                    type="monotone"
                    dataKey="winnings"
                    stroke="var(--color-winnings)"
                    fill="var(--color-winnings)"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* RTP Over Time */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Percent className="h-4 w-4" />
                RTP Over Tid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <LineChart data={stats.dailyStats}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDate}
                    tick={{ fontSize: 12 }}
                    className="text-muted-foreground"
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    className="text-muted-foreground"
                    domain={[0, 'auto']}
                    tickFormatter={(value) => `${value.toFixed(0)}%`}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    labelFormatter={(label) => formatDate(label as string)}
                    formatter={(value: number) => [`${value.toFixed(1)}%`, "RTP"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="rtp"
                    stroke="var(--color-rtp)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-rtp)", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Top Winners */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            Top 10 Vindere - {periodLabels[period]}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {stats?.topWinners && stats.topWinners.length > 0 ? (
            <div className="space-y-3">
              {stats.topWinners.map((winner, index) => (
                <div
                  key={winner.user_id}
                  className="flex items-center gap-3 p-2 rounded-lg bg-muted/50"
                >
                  <span className="font-bold text-muted-foreground w-6">#{index + 1}</span>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={winner.avatar_url || undefined} />
                    <AvatarFallback>{winner.display_name?.charAt(0) || "?"}</AvatarFallback>
                  </Avatar>
                  <span className="flex-1 font-medium">{winner.display_name}</span>
                  <span className="font-bold text-amber-500">{winner.total_winnings.toLocaleString()} pts</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">
              Ingen spins i denne periode
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function SlotMachineAdminSection() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Spillemaskine Administration</h2>
        <p className="text-muted-foreground">Administrer symboler, indstillinger og se statistik.</p>
      </div>

      <Tabs defaultValue="symbols">
        <TabsList className="mb-4">
          <TabsTrigger value="symbols">Symboler</TabsTrigger>
          <TabsTrigger value="settings">Indstillinger</TabsTrigger>
          <TabsTrigger value="spins">Spins</TabsTrigger>
          <TabsTrigger value="statistics">Statistik</TabsTrigger>
        </TabsList>

        <TabsContent value="symbols">
          <SymbolsTab />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsTab />
        </TabsContent>

        <TabsContent value="spins">
          <SpinManagementSection />
        </TabsContent>

        <TabsContent value="statistics">
          <StatisticsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
