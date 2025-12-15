import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCasinos, useCreateCasino, useUpdateCasino, useDeleteCasino, useUpdateCasinoPositions, type Casino, type CasinoInsert } from "@/hooks/useCasinos";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { LogoUpload } from "@/components/LogoUpload";
import { HeaderIconUpload } from "@/components/HeaderIconUpload";
import { SiteNameInput } from "@/components/SiteNameInput";
import { HeroSettingsInput } from "@/components/HeroSettingsInput";
import { SocialLinksInput } from "@/components/SocialLinksInput";
import { GameProvidersInput, type GameProvider } from "@/components/GameProvidersInput";
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
import { Plus, Trash2, LogOut, Star, Loader2, Pencil, GripVertical, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useQueryClient } from "@tanstack/react-query";
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
  const { signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = isLogin
      ? await signIn(email, password)
      : await signUp(email, password);

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
            {isLogin ? "Admin Login" : "Opret Admin Konto"}
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
              {isLogin ? "Log Ind" : "Opret Konto"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Har du ikke en konto? Opret en" : "Har du en konto? Log ind"}
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
    slug: "",
    rating: "4.5",
    bonus_amount: "",
    bonus_type: "No-sticky",
    wagering_requirements: "35x",
    validity: "30 dage",
    min_deposit: "100 kr.",
    payout_time: "24 timer",
    free_spins: "N/A",
    features: "",
    pros: "",
    cons: "",
    description: "",
    is_active: true,
    is_recommended: false,
    affiliate_url: "",
    logo_url: null as string | null,
    game_providers: [] as GameProvider[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const casinoData: CasinoInsert = {
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
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
      features: formData.features.split(",").map((s) => s.trim()).filter(Boolean),
      pros: formData.pros.split(",").map((s) => s.trim()).filter(Boolean),
      cons: formData.cons.split(",").map((s) => s.trim()).filter(Boolean),
      description: formData.description || null,
      is_active: formData.is_active,
      is_recommended: formData.is_recommended,
      affiliate_url: formData.affiliate_url || null,
      game_providers: formData.game_providers,
    };

    await createCasino.mutateAsync(casinoData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      <div className="grid gap-4 md:grid-cols-2">
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
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="auto-genereret fra navn"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Casino Logo (valgfrit)</Label>
        <LogoUpload
          currentLogoUrl={formData.logo_url}
          onLogoChange={(url) => setFormData({ ...formData, logo_url: url })}
          casinoSlug={formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-") || `new-casino-${Date.now()}`}
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
            step="0.1"
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
      <div className="space-y-2">
        <Label htmlFor="features">Funktioner (kommasepareret)</Label>
        <Input
          id="features"
          value={formData.features}
          onChange={(e) => setFormData({ ...formData, features: e.target.value })}
          placeholder="Live betting, Populære slots, Mobilvenlig"
        />
      </div>

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
        casinoSlug={formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-") || `new-casino-${Date.now()}`}
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
    bonus_title: casino.bonus_title,
    bonus_amount: casino.bonus_amount,
    bonus_type: casino.bonus_type,
    wagering_requirements: casino.wagering_requirements,
    validity: casino.validity,
    min_deposit: casino.min_deposit,
    payout_time: casino.payout_time,
    free_spins: casino.free_spins,
    features: casino.features?.join(", ") || "",
    pros: casino.pros?.join(", ") || "",
    cons: casino.cons?.join(", ") || "",
    description: casino.description || "",
    is_active: casino.is_active,
    is_recommended: casino.is_recommended,
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
      bonus_title: formData.bonus_title,
      bonus_amount: formData.bonus_amount,
      bonus_type: formData.bonus_type,
      wagering_requirements: formData.wagering_requirements,
      validity: formData.validity,
      min_deposit: formData.min_deposit,
      payout_time: formData.payout_time,
      free_spins: formData.free_spins,
      features: formData.features.split(",").map((s) => s.trim()).filter(Boolean),
      pros: formData.pros.split(",").map((s) => s.trim()).filter(Boolean),
      cons: formData.cons.split(",").map((s) => s.trim()).filter(Boolean),
      description: formData.description || null,
      is_active: formData.is_active,
      is_recommended: formData.is_recommended,
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

      <div className="grid gap-4 md:grid-cols-2">
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
          <Label htmlFor="edit-slug">Slug</Label>
          <Input
            id="edit-slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="edit-bonus_title">Bonus Titel *</Label>
          <Input
            id="edit-bonus_title"
            value={formData.bonus_title}
            onChange={(e) => setFormData({ ...formData, bonus_title: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-bonus_amount">Bonusbeløb *</Label>
          <Input
            id="edit-bonus_amount"
            value={formData.bonus_amount}
            onChange={(e) => setFormData({ ...formData, bonus_amount: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="edit-rating">Vurdering (0-5)</Label>
          <Input
            id="edit-rating"
            type="number"
            step="0.1"
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

      <div className="space-y-2">
        <Label htmlFor="edit-features">Funktioner (kommasepareret)</Label>
        <Input
          id="edit-features"
          value={formData.features}
          onChange={(e) => setFormData({ ...formData, features: e.target.value })}
        />
      </div>

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
                {casino.bonus_type === "No-sticky" ? "Ikke-klæbende" : casino.bonus_type}
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
  const { user, isAdmin, signOut, loading: authLoading } = useAuth();
  const { data: casinos, isLoading } = useCasinos(true);
  const { data: siteSettings } = useSiteSettings();
  const deleteCasino = useDeleteCasino();
  const updatePositions = useUpdateCasinoPositions();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCasino, setEditingCasino] = useState<Casino | null>(null);
  const [orderedCasinos, setOrderedCasinos] = useState<Casino[]>([]);
  const [headerIconUrl, setHeaderIconUrl] = useState<string | null>(null);

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

  useEffect(() => {
    if (!authLoading && user && !isAdmin) {
      // User is logged in but not admin - show message
    }
  }, [authLoading, user, isAdmin]);

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
        
        // Update positions in database
        const updates = newItems.map((item, index) => ({
          id: item.id,
          position: index + 1,
        }));
        updatePositions.mutate(updates);
        
        return newItems;
      });
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <Card className="max-w-md text-center">
          <CardContent className="pt-6">
            <h2 className="mb-4 text-xl font-bold">Adgang Nægtet</h2>
            <p className="mb-4 text-muted-foreground">
              Du har ikke administratorrettigheder. Kontakt venligst en administrator for at få adgang.
            </p>
            <p className="mb-4 text-sm text-muted-foreground">
              Logget ind som: {user?.email}
            </p>
            <Button onClick={handleSignOut} variant="outline">
              <LogOut className="mr-2 h-4 w-4" /> Log Ud
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <ThemeToggle />
            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" /> Log Ud
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Site Settings Section */}
        <Collapsible>
          <Card className="mb-8">
            <CollapsibleTrigger className="w-full">
              <CardHeader className="flex flex-row items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors [&[data-state=open]>svg]:rotate-180">
                <CardTitle>Site Indstillinger</CardTitle>
                <ChevronDown className="h-5 w-5 transition-transform duration-200" />
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6">
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
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Casino Tilbud</h2>
            <p className="text-muted-foreground">Administrer casinobonusser og tilbud. Træk for at ændre rækkefølge.</p>
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
                      <p className="text-muted-foreground">Ingen casinoer fundet. Tilføj dit første casino!</p>
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
      </main>
    </div>
  );
}

export default function Admin() {
  const { user, loading } = useAuth();

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

  return <AdminDashboard />;
}
