import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCasinos, useCreateCasino, useUpdateCasino, useDeleteCasino, useUpdateCasinoPositions, type Casino, type CasinoInsert } from "@/hooks/useCasinos";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { LogoUpload } from "@/components/LogoUpload";
import { HeaderIconUpload } from "@/components/HeaderIconUpload";
import { SiteNameInput } from "@/components/SiteNameInput";
import { HeroSettingsInput } from "@/components/HeroSettingsInput";
import { SocialLinksInput } from "@/components/SocialLinksInput";
import { DisclaimerInput } from "@/components/DisclaimerInput";
import { GameProvidersInput, type GameProvider } from "@/components/GameProvidersInput";
import { FeatureSelector } from "@/components/FeatureSelector";
import { ShopAdminSection } from "@/components/ShopAdminSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Plus, Trash2, LogOut, Star, Loader2, Pencil, GripVertical, Gift, ShoppingBag, BarChart3, Settings, Users, Video, Gamepad2, Bell, Sparkles, Ticket, Menu, ChevronDown, Shield, Target, Database, Trophy, Link2 } from "lucide-react";
import { LinkDensityMonitor } from "@/components/LinkDensityMonitor";
import { AdminUserManagement } from "@/components/AdminUserManagement";
import { HighlightsAdminSection } from "@/components/HighlightsAdminSection";
import { CombinedAnalyticsDashboard } from "@/components/CombinedAnalyticsDashboard";
import { SlotMachineAdminSection } from "@/components/SlotMachineAdminSection";
import { StorageCleanupSection } from "@/components/StorageCleanupSection";
import { NotificationsAdminSection } from "@/components/NotificationsAdminSection";
import { ProfileCompletionOverview } from "@/components/ProfileCompletionStatsCard";
import { CommunityClipsAdminSection } from "@/components/CommunityClipsAdminSection";


import { SpinManagementSection } from "@/components/SpinManagementSection";
import { SlotPointsManagement } from "@/components/slots/SlotPointsManagement";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import { ThemeToggle } from "@/components/ThemeToggle";
import { RedeemCodesAdminSection } from "@/components/RedeemCodesAdminSection";
import { NewsAdminSection } from "@/components/NewsAdminSection";
import { FactCheckAdminSection } from "@/components/FactCheckAdminSection";
import { BonusHuntAdminSection } from "@/components/BonusHuntAdminSection";
import { SlotCatalogAdminSection } from "@/components/admin/SlotCatalogAdminSection";
import { MonthlyTournamentAdmin } from "@/components/admin/MonthlyTournamentAdmin";
import { PageMetadataAdminSection } from "@/components/PageMetadataAdminSection";
import { PageMetadataSyncSection } from "@/components/admin/PageMetadataSyncSection";
import { ErrorLogsSection } from "@/components/admin/ErrorLogsSection";
import { CacheClearSection } from "@/components/admin/CacheClearSection";
import { useQueryClient } from "@tanstack/react-query";
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


function AdminLoginForm() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@eksempel.dk"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Adgangskode</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Log Ind
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function AddCasinoForm({ onClose }: { onClose: () => void }) {
  const createCasino = useCreateCasino();
  const [formData, setFormData] = useState({
    name: "",
    rating: "4.5",
    bonus_amount: "",
    bonus_type: "No-sticky",
    wagering_requirements: "10x",
    validity: "30 dage",
    min_deposit: "100 kr.",
    payout_time: "24 timer",
    free_spins: "N/A",
    features: [] as string[],
    pros: "",
    cons: "",
    description: "",
    is_active: true,
    is_recommended: false,
    is_hot: false,
    affiliate_url: "",
    logo_url: null as string | null,
    game_providers: [] as GameProvider[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const casinoData: CasinoInsert = {
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/\s+/g, "-"),
      rating: parseFloat(formData.rating),
      bonus_title: formData.bonus_amount,
      bonus_amount: formData.bonus_amount,
      logo_url: formData.logo_url,
      bonus_type: formData.bonus_type,
      wagering_requirements: formData.wagering_requirements,
      validity: formData.validity,
      min_deposit: formData.min_deposit,
      payout_time: formData.payout_time,
      free_spins: formData.free_spins,
      features: formData.features,
      pros: formData.pros.split(",").map((s) => s.trim()).filter(Boolean),
      cons: formData.cons.split(",").map((s) => s.trim()).filter(Boolean),
      description: formData.description || null,
      is_active: formData.is_active,
      is_recommended: formData.is_recommended,
      is_hot: formData.is_hot,
      affiliate_url: formData.affiliate_url || null,
      game_providers: formData.game_providers,
    };

    await createCasino.mutateAsync(casinoData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      <div className="space-y-2">
        <Label htmlFor="name">Casino Navn *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Casino Logo (valgfrit)</Label>
        <LogoUpload
          currentLogoUrl={formData.logo_url}
          onLogoChange={(url) => setFormData({ ...formData, logo_url: url })}
          casinoSlug={formData.name.toLowerCase().replace(/\s+/g, "-") || `new-casino-${Date.now()}`}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bonus_amount">Bonusbeløb *</Label>
        <Input
          id="bonus_amount"
          value={formData.bonus_amount}
          onChange={(e) => setFormData({ ...formData, bonus_amount: e.target.value })}
          placeholder="100% op til 1.000 kr."
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="rating">Vurdering (0-5)</Label>
          <Input
            id="rating"
            type="number"
            step="0.5"
            min="0"
            max="5"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bonus_type">Bonustype</Label>
          <Input
            id="bonus_type"
            value={formData.bonus_type}
            onChange={(e) => setFormData({ ...formData, bonus_type: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="wagering">Gennemspil</Label>
          <Input
            id="wagering"
            value={formData.wagering_requirements}
            onChange={(e) => setFormData({ ...formData, wagering_requirements: e.target.value })}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="validity">Gyldighed</Label>
          <Input
            id="validity"
            value={formData.validity}
            onChange={(e) => setFormData({ ...formData, validity: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="min_deposit">Min. Indbetaling</Label>
          <Input
            id="min_deposit"
            value={formData.min_deposit}
            onChange={(e) => setFormData({ ...formData, min_deposit: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="payout_time">Udbetalingstid</Label>
          <Input
            id="payout_time"
            value={formData.payout_time}
            onChange={(e) => setFormData({ ...formData, payout_time: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="free_spins">Gratis Spins</Label>
        <Input
          id="free_spins"
          value={formData.free_spins}
          onChange={(e) => setFormData({ ...formData, free_spins: e.target.value })}
          placeholder="N/A eller fx 100"
        />
      </div>
      <FeatureSelector
        selectedFeatures={formData.features}
        onChange={(features) => setFormData({ ...formData, features })}
      />

      <div className="space-y-2">
        <Label htmlFor="pros">Fordele (kommasepareret)</Label>
        <Input
          id="pros"
          value={formData.pros}
          onChange={(e) => setFormData({ ...formData, pros: e.target.value })}
          placeholder="Hurtige udbetalinger, God support"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cons">Ulemper (kommasepareret)</Label>
        <Input
          id="cons"
          value={formData.cons}
          onChange={(e) => setFormData({ ...formData, cons: e.target.value })}
          placeholder="Højt gennemspil, Begrænsede spil"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Beskrivelse</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <GameProvidersInput
        providers={formData.game_providers}
        onChange={(providers) => setFormData({ ...formData, game_providers: providers })}
        casinoSlug={formData.name.toLowerCase().replace(/\s+/g, "-") || `new-casino-${Date.now()}`}
      />

      <div className="space-y-2">
        <Label htmlFor="affiliate_url">Affiliate Link</Label>
        <Input
          id="affiliate_url"
          type="url"
          value={formData.affiliate_url}
          onChange={(e) => setFormData({ ...formData, affiliate_url: e.target.value })}
          placeholder="https://..."
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="is_recommended"
            checked={formData.is_recommended}
            onChange={(e) => setFormData({ ...formData, is_recommended: e.target.checked })}
            className="h-4 w-4"
          />
          <Label htmlFor="is_recommended">Anbefalet</Label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="is_hot"
            checked={formData.is_hot}
            onChange={(e) => setFormData({ ...formData, is_hot: e.target.checked })}
            className="h-4 w-4"
          />
          <Label htmlFor="is_hot">Hot 🔥</Label>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={createCasino.isPending}>
        {createCasino.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Tilføj Casino
      </Button>
    </form>
  );
}

function EditCasinoForm({ casino, onClose }: { casino: Casino; onClose: () => void }) {
  const updateCasino = useUpdateCasino();
  const [logoUrl, setLogoUrl] = useState<string | null>(casino.logo_url);
  const [formData, setFormData] = useState({
    name: casino.name,
    slug: casino.slug,
    rating: casino.rating.toString(),
    bonus_amount: casino.bonus_amount,
    bonus_type: casino.bonus_type,
    wagering_requirements: casino.wagering_requirements,
    validity: casino.validity,
    min_deposit: casino.min_deposit,
    payout_time: casino.payout_time,
    free_spins: casino.free_spins,
    features: casino.features || [],
    pros: casino.pros?.join(", ") || "",
    cons: casino.cons?.join(", ") || "",
    description: casino.description || "",
    is_active: casino.is_active,
    is_recommended: casino.is_recommended,
    is_hot: casino.is_hot,
    affiliate_url: casino.affiliate_url || "",
    game_providers: casino.game_providers || [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await updateCasino.mutateAsync({
      id: casino.id,
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
      rating: parseFloat(formData.rating),
      bonus_title: formData.bonus_amount,
      bonus_amount: formData.bonus_amount,
      bonus_type: formData.bonus_type,
      wagering_requirements: formData.wagering_requirements,
      validity: formData.validity,
      min_deposit: formData.min_deposit,
      payout_time: formData.payout_time,
      free_spins: formData.free_spins,
      features: formData.features,
      pros: formData.pros.split(",").map((s) => s.trim()).filter(Boolean),
      cons: formData.cons.split(",").map((s) => s.trim()).filter(Boolean),
      description: formData.description || null,
      is_active: formData.is_active,
      is_recommended: formData.is_recommended,
      is_hot: formData.is_hot,
      logo_url: logoUrl,
      affiliate_url: formData.affiliate_url || null,
      game_providers: formData.game_providers,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      <div className="space-y-2">
        <Label>Logo</Label>
        <LogoUpload
          currentLogoUrl={logoUrl}
          onLogoChange={setLogoUrl}
          casinoSlug={formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="edit-name">Casino Navn *</Label>
        <Input
          id="edit-name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="edit-bonus_amount">Bonusbeløb *</Label>
        <Input
          id="edit-bonus_amount"
          value={formData.bonus_amount}
          onChange={(e) => setFormData({ ...formData, bonus_amount: e.target.value })}
          placeholder="100% op til 1.000 kr."
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="edit-rating">Vurdering (0-5)</Label>
          <Input
            id="edit-rating"
            type="number"
            step="0.5"
            min="0"
            max="5"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-bonus_type">Bonustype</Label>
          <Input
            id="edit-bonus_type"
            value={formData.bonus_type}
            onChange={(e) => setFormData({ ...formData, bonus_type: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-wagering">Gennemspil</Label>
          <Input
            id="edit-wagering"
            value={formData.wagering_requirements}
            onChange={(e) => setFormData({ ...formData, wagering_requirements: e.target.value })}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="edit-validity">Gyldighed</Label>
          <Input
            id="edit-validity"
            value={formData.validity}
            onChange={(e) => setFormData({ ...formData, validity: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-min_deposit">Min. Indbetaling</Label>
          <Input
            id="edit-min_deposit"
            value={formData.min_deposit}
            onChange={(e) => setFormData({ ...formData, min_deposit: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-payout_time">Udbetalingstid</Label>
          <Input
            id="edit-payout_time"
            value={formData.payout_time}
            onChange={(e) => setFormData({ ...formData, payout_time: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="edit-free_spins">Gratis Spins</Label>
        <Input
          id="edit-free_spins"
          value={formData.free_spins}
          onChange={(e) => setFormData({ ...formData, free_spins: e.target.value })}
          placeholder="N/A eller fx 100"
        />
      </div>

      <FeatureSelector
        selectedFeatures={formData.features}
        onChange={(features) => setFormData({ ...formData, features })}
      />

      <div className="space-y-2">
        <Label htmlFor="edit-pros">Fordele (kommasepareret)</Label>
        <Input
          id="edit-pros"
          value={formData.pros}
          onChange={(e) => setFormData({ ...formData, pros: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="edit-cons">Ulemper (kommasepareret)</Label>
        <Input
          id="edit-cons"
          value={formData.cons}
          onChange={(e) => setFormData({ ...formData, cons: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="edit-description">Beskrivelse</Label>
        <Textarea
          id="edit-description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <GameProvidersInput
        providers={formData.game_providers}
        onChange={(providers) => setFormData({ ...formData, game_providers: providers })}
        casinoSlug={formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-")}
      />

      <div className="space-y-2">
        <Label htmlFor="edit-affiliate_url">Affiliate Link</Label>
        <Input
          id="edit-affiliate_url"
          type="url"
          value={formData.affiliate_url}
          onChange={(e) => setFormData({ ...formData, affiliate_url: e.target.value })}
          placeholder="https://..."
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="edit-is_active"
            checked={formData.is_active}
            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
            className="h-4 w-4"
          />
          <Label htmlFor="edit-is_active">Aktiv</Label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="edit-is_recommended"
            checked={formData.is_recommended}
            onChange={(e) => setFormData({ ...formData, is_recommended: e.target.checked })}
            className="h-4 w-4"
          />
          <Label htmlFor="edit-is_recommended">Anbefalet</Label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="edit-is_hot"
            checked={formData.is_hot}
            onChange={(e) => setFormData({ ...formData, is_hot: e.target.checked })}
            className="h-4 w-4"
          />
          <Label htmlFor="edit-is_hot">Hot 🔥</Label>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={updateCasino.isPending}>
        {updateCasino.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Gem Ændringer
      </Button>
    </form>
  );
}

function SortableCasinoCard({
  casino,
  onEdit,
  onDelete,
}: {
  casino: Casino;
  onEdit: (casino: Casino) => void;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: casino.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card ref={setNodeRef} style={style}>
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab touch-none rounded p-1 hover:bg-muted active:cursor-grabbing"
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </button>
          {casino.logo_url ? (
            <img
              src={casino.logo_url}
              alt={casino.name}
              className="h-12 w-12 rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-lg font-bold text-primary">
              {casino.name.substring(0, 2).toUpperCase()}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{casino.name}</h3>
              {casino.is_recommended && (
                <Badge className="bg-destructive text-destructive-foreground">Anbefalet</Badge>
              )}
              {!casino.is_active && (
                <Badge variant="secondary">Inaktiv</Badge>
              )}
              <Badge variant={casino.bonus_type === "No-sticky" ? "default" : "outline"}>
                {casino.bonus_type === "No-sticky" ? "No-Sticky Bonus" : casino.bonus_type}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {casino.bonus_amount}
            </p>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-3 w-3 fill-primary text-primary" />
              <span>{casino.rating}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onEdit(casino)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Slet Casino</AlertDialogTitle>
                <AlertDialogDescription>
                  Er du sikker på, at du vil slette "{casino.name}"? Denne handling kan ikke fortrydes.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuller</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(casino.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Slet
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}


function AdminDashboard() {
  const { user, isAdmin, signOut } = useAuth();
  const { data: casinos, isLoading } = useCasinos(true);
  const { data: siteSettings } = useSiteSettings();
  const deleteCasino = useDeleteCasino();
  const updatePositions = useUpdateCasinoPositions();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCasino, setEditingCasino] = useState<Casino | null>(null);
  const [orderedCasinos, setOrderedCasinos] = useState<Casino[]>([]);
  const [headerIconUrl, setHeaderIconUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("content");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contentSubTab, setContentSubTab] = useState("casinos");

  const navItems = [
    { value: "content", label: "Indhold", icon: Gift },
    { value: "news", label: "Nyheder", icon: Bell },
    { value: "community-clips", label: "Community", icon: Sparkles },
    { value: "slotmachine", label: "Spillemaskine", icon: Gamepad2 },
    
    { value: "tournaments", label: "Turneringer", icon: Trophy },
    { value: "bonus-hunt", label: "Bonus Hunt", icon: Target },
    { value: "slot-catalog", label: "Slot Katalog", icon: Database },
    { value: "codes", label: "Koder", icon: Ticket },
    { value: "notifications", label: "Notifikationer", icon: Bell },
    { value: "analytics", label: "Analytics", icon: BarChart3 },
    { value: "factcheck", label: "Fact-Check", icon: Shield },
    { value: "link-density", label: "Link Monitor", icon: Link2 },
    { value: "settings", label: "Indstillinger", icon: Settings },
    { value: "users", label: "Brugere", icon: Users },
  ];

  useEffect(() => {
    if (siteSettings?.header_icon) {
      setHeaderIconUrl(siteSettings.header_icon);
    }
  }, [siteSettings]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (casinos) {
      setOrderedCasinos(casinos);
    }
  }, [casinos]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin");
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setOrderedCasinos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        
        const updates = newItems.map((item, index) => ({
          id: item.id,
          position: index + 1,
        }));
        updatePositions.mutate(updates);
        
        return newItems;
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <LinkDensityMonitor />
      <header className="border-b border-border bg-card">
        <div className="container flex h-16 items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-bold lg:text-xl">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-2 lg:gap-4">
            <span className="hidden text-sm text-muted-foreground sm:inline">{user?.email}</span>
            <ThemeToggle />
            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">Log Ud</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile sidebar sheet */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetHeader className="border-b border-border p-4">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 p-2">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  setActiveTab(item.value);
                  setSidebarOpen(false);
                }}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === item.value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <main className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="hidden lg:grid w-full grid-cols-14 mb-8 h-auto">
              {navItems.map((item) => (
                <TabsTrigger key={item.value} value={item.value} className="flex items-center gap-2 py-3">
                  <item.icon className="h-4 w-4" />
                  <span className="hidden xl:inline">{item.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Indhold Tab (Casino Tilbud + Butik + Highlights) */}
          <TabsContent value="content">
            <Tabs value={contentSubTab} onValueChange={setContentSubTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="casinos" className="flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  Casino Tilbud
                </TabsTrigger>
                <TabsTrigger value="shop" className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Butik
                </TabsTrigger>
                <TabsTrigger value="highlights" className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Highlights
                </TabsTrigger>
              </TabsList>

              <TabsContent value="casinos">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Casino Tilbud</h2>
                    <p className="text-muted-foreground">
                      Administrer casinobonusser og tilbud. Træk for at ændre rækkefølge.
                    </p>
                  </div>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" /> Tilføj Casino
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Tilføj Nyt Casino</DialogTitle>
                      </DialogHeader>
                      <AddCasinoForm onClose={() => setDialogOpen(false)} />
                    </DialogContent>
                  </Dialog>
                </div>

                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={orderedCasinos.map((c) => c.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-4">
                        {orderedCasinos.map((casino) => (
                          <SortableCasinoCard
                            key={casino.id}
                            casino={casino}
                            onEdit={setEditingCasino}
                            onDelete={(id) => deleteCasino.mutate(id)}
                          />
                        ))}

                        {orderedCasinos.length === 0 && (
                          <Card>
                            <CardContent className="py-12 text-center">
                              <p className="text-muted-foreground">
                                Ingen casinoer fundet. Tilføj dit første casino!
                              </p>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    </SortableContext>
                  </DndContext>
                )}

                {/* Edit Casino Dialog */}
                <Dialog open={!!editingCasino} onOpenChange={(open) => !open && setEditingCasino(null)}>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Rediger Casino</DialogTitle>
                    </DialogHeader>
                    {editingCasino && (
                      <EditCasinoForm casino={editingCasino} onClose={() => setEditingCasino(null)} />
                    )}
                  </DialogContent>
                </Dialog>
              </TabsContent>

              <TabsContent value="shop">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold">Butik Administration</h2>
                  <p className="text-muted-foreground">Administrer produkter i butikken.</p>
                </div>
                <ShopAdminSection embedded />
              </TabsContent>

              <TabsContent value="highlights">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold">Highlights Administration</h2>
                  <p className="text-muted-foreground">Administrer Twitch clips og YouTube videoer.</p>
                </div>
                <HighlightsAdminSection />
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* News Tab */}
          <TabsContent value="news">
            <NewsAdminSection />
          </TabsContent>

          {/* Community Clips Tab */}
          <TabsContent value="community-clips">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Community Highlights</h2>
              <p className="text-muted-foreground">Godkend eller afvis brugerindsendte clips.</p>
            </div>
            <CommunityClipsAdminSection />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <CombinedAnalyticsDashboard />
          </TabsContent>

          {/* Spillemaskine Tab */}
          <TabsContent value="slotmachine">
            <SlotMachineAdminSection />
          </TabsContent>

          {/* Turneringer Tab */}
          <TabsContent value="tournaments">
            <MonthlyTournamentAdmin />
          </TabsContent>


          {/* Bonus Hunt Tab */}
          <TabsContent value="bonus-hunt">
            <BonusHuntAdminSection />
          </TabsContent>

          {/* Slot Katalog Tab */}
          <TabsContent value="slot-catalog">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Slot Katalog</h2>
              <p className="text-muted-foreground">Administrer slot-database og provider overrides.</p>
            </div>
            <SlotCatalogAdminSection />
          </TabsContent>

          {/* Koder Tab */}
          <TabsContent value="codes">
            <RedeemCodesAdminSection />
          </TabsContent>

          {/* Notifikationer Tab */}
          <TabsContent value="notifications">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Notifikationer</h2>
              <p className="text-muted-foreground">Send notifikationer til alle brugere.</p>
            </div>
            <NotificationsAdminSection />
          </TabsContent>

          {/* Fact-Check Tab */}
          <TabsContent value="factcheck">
            <FactCheckAdminSection />
          </TabsContent>

          {/* Indstillinger Tab */}
          <TabsContent value="settings">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Site Indstillinger</h2>
              <p className="text-muted-foreground">Tilpas hjemmesidens udseende og indhold.</p>
            </div>
            <Card>
              <CardContent className="space-y-6 pt-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">Site Navn</h3>
                  <SiteNameInput />
                </div>
                <div className="pt-4 border-t border-border">
                  <h3 className="text-sm font-medium mb-3">Header Ikon</h3>
                  <HeaderIconUpload
                    currentIconUrl={headerIconUrl}
                    onIconChange={(url) => {
                      setHeaderIconUrl(url);
                      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
                    }}
                  />
                </div>
                <div className="pt-4 border-t border-border">
                  <h3 className="text-sm font-medium mb-3">Hero Sektion</h3>
                  <HeroSettingsInput />
                </div>
                <div className="pt-4 border-t border-border">
                  <h3 className="text-sm font-medium mb-3">Sociale Medier Links</h3>
                  <SocialLinksInput />
                </div>
                <div className="pt-4 border-t border-border">
                  <h3 className="text-sm font-medium mb-3">Casino Kort Disclaimer</h3>
                  <DisclaimerInput />
                </div>
                <div className="pt-4 border-t border-border">
                  <h3 className="text-sm font-medium mb-3">Storage Oprydning</h3>
                  <StorageCleanupSection />
                </div>
              </CardContent>
            </Card>
            <div className="mt-6">
              <PageMetadataAdminSection />
            </div>
            <div className="mt-6">
              <PageMetadataSyncSection />
            </div>
            <div className="mt-6">
              <ErrorLogsSection />
            </div>
            <div className="mt-6">
              <CacheClearSection />
            </div>
          </TabsContent>

          {/* Link Density Monitor Tab */}
          <TabsContent value="link-density">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link2 className="h-5 w-5 text-primary" />
                  Link Density Monitor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Monitoren viser antal interne og eksterne links på den aktuelle side. Brug den ved at navigere til en side i preview og aktivere monitoren der.
                </p>
                <div className="rounded-lg border border-border p-4 space-y-3">
                  <h3 className="font-semibold text-sm">Retningslinjer for link-densitet</h3>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="rounded-md bg-emerald-500/10 p-3 text-center">
                      <div className="text-lg font-bold text-emerald-600">&lt; 40</div>
                      <div className="text-muted-foreground text-xs">Optimal</div>
                    </div>
                    <div className="rounded-md bg-yellow-500/10 p-3 text-center">
                      <div className="text-lg font-bold text-yellow-600">40–60</div>
                      <div className="text-muted-foreground text-xs">Grænseområde</div>
                    </div>
                    <div className="rounded-md bg-destructive/10 p-3 text-center">
                      <div className="text-lg font-bold text-destructive">&gt; 60</div>
                      <div className="text-muted-foreground text-xs">Over-optimeret</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Link Density Monitor er en floating widget der vises på alle sider for admin-brugere. Klik på badget for at se en komplet liste over alle links på den aktuelle side.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Brugere Tab */}
          <TabsContent value="users">
            <div className="space-y-8">
              {/* Profile Completion Statistics Overview */}
              <ProfileCompletionOverview />

              <div className="pt-4 border-t border-border">
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center gap-2 text-2xl font-bold w-full group">
                    Admin Brugere
                    <ChevronDown className="h-5 w-5 transition-transform group-data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <p className="text-muted-foreground mb-4">Opret og administrer admin brugere.</p>
                  <CollapsibleContent>
                    <AdminUserManagement embedded />
                  </CollapsibleContent>
                </Collapsible>
              </div>
              
              <div className="pt-4 border-t border-border">
                <SpinManagementSection />
              </div>

              <div className="pt-4 border-t border-border">
                <SlotPointsManagement />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default function Admin() {
  const { user, loading, isAdmin, signOut } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <AdminLoginForm />;
  }

  // Only allow admins
  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <Card className="max-w-md text-center">
          <CardContent className="pt-6">
            <h2 className="mb-4 text-xl font-bold">Adgang Nægtet</h2>
            <p className="mb-4 text-muted-foreground">
              Du har ikke admin rettigheder.
            </p>
            <p className="mb-4 text-sm text-muted-foreground">
              Logget ind som: {user?.email}
            </p>
            <Button
              onClick={async () => {
                await signOut();
              }}
              className="w-full"
            >
              Log ud og log ind som admin
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <AdminDashboard />;
}
