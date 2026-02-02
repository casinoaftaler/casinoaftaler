import { useState, useEffect } from "react";
import { useSlotSymbols } from "@/hooks/useSlotSymbols";
import { useSlotSettings } from "@/hooks/useSlotSettings";
import { useSlotStatistics } from "@/hooks/useSlotStatistics";
import { useSlotSymbolsAdmin } from "@/hooks/useSlotSymbolsAdmin";
import { SlotSymbolImageUpload } from "@/components/SlotSymbolImageUpload";
import { SlotTitleImageUpload } from "@/components/SlotTitleImageUpload";
import { SlotBackgroundImageUpload } from "@/components/SlotBackgroundImageUpload";
import { SpinManagementSection } from "@/components/SpinManagementSection";
import { SlotFrameAdminControls } from "@/components/slots/SlotFrameAdminControls";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GripVertical, Pencil, Loader2, Trophy, Sparkles, TrendingUp, BarChart3, Lock } from "lucide-react";
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

interface SortableSymbolRowProps {
  symbol: SlotSymbol;
  onEdit: (symbol: SlotSymbol) => void;
}

function SortableSymbolRow({ symbol, onEdit }: SortableSymbolRowProps) {
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
          3×: {symbol.multiplier_3}x | 4×: {symbol.multiplier_4}x | 5×: {symbol.multiplier_5}x
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
}

function EditSymbolDialog({ symbol, open, onClose }: EditSymbolDialogProps) {
  const { updateSymbol } = useSlotSymbolsAdmin();
  const [formData, setFormData] = useState({
    name: "",
    image_url: null as string | null,
    multiplier_3: 5,
    multiplier_4: 10,
    multiplier_5: 25,
    is_scatter: false,
    is_wild: false,
  });

  useEffect(() => {
    if (symbol) {
      setFormData({
        name: symbol.name,
        image_url: symbol.image_url,
        multiplier_3: symbol.multiplier_3,
        multiplier_4: symbol.multiplier_4,
        multiplier_5: symbol.multiplier_5,
        is_scatter: symbol.is_scatter,
        is_wild: symbol.is_wild,
      });
    }
  }, [symbol]);

  const handleSave = () => {
    if (!symbol) return;
    updateSymbol.mutate({
      id: symbol.id,
      ...formData,
    }, {
      onSuccess: () => onClose(),
    });
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

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mult-3">3× Multiplier</Label>
              <Input
                id="mult-3"
                type="number"
                min="1"
                value={formData.multiplier_3}
                onChange={(e) => setFormData({ ...formData, multiplier_3: parseInt(e.target.value) || 1 })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mult-4">4× Multiplier</Label>
              <Input
                id="mult-4"
                type="number"
                min="1"
                value={formData.multiplier_4}
                onChange={(e) => setFormData({ ...formData, multiplier_4: parseInt(e.target.value) || 1 })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mult-5">5× Multiplier</Label>
              <Input
                id="mult-5"
                type="number"
                min="1"
                value={formData.multiplier_5}
                onChange={(e) => setFormData({ ...formData, multiplier_5: parseInt(e.target.value) || 1 })}
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

  return (
    <>
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
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <EditSymbolDialog
        symbol={editingSymbol}
        open={!!editingSymbol}
        onClose={() => setEditingSymbol(null)}
      />
    </>
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
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        dailySpins: settings.dailySpins,
        minBet: settings.minBet,
        maxBet: settings.maxBet,
        pageLocked: settings.pageLocked,
        pagePassword: settings.pagePassword,
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

      {/* Egyptian Frame Generator */}
      <SlotFrameAdminControls />

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

function StatisticsTab() {
  const { data: stats, isLoading } = useSlotStatistics();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              Spins i Dag
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalSpinsToday || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Gevinster i Dag
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalWinningsToday || 0} pts</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-blue-500" />
              Gns. Gevinst/Spin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(stats?.avgWinPerSpin || 0).toFixed(1)} pts</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            Top 10 Vindere i Dag
          </CardTitle>
        </CardHeader>
        <CardContent>
          {stats?.topWinnersToday && stats.topWinnersToday.length > 0 ? (
            <div className="space-y-3">
              {stats.topWinnersToday.map((winner, index) => (
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
                  <span className="font-bold text-amber-500">{winner.total_winnings} pts</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">
              Ingen spins endnu i dag
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
