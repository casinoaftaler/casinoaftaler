import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Plus, Loader2, Trophy, Clock, Trash2, Square, Gift, Pencil } from "lucide-react";
import { useTournaments, useCreateTournament, useEndTournament, useDeleteTournament, useUpdateTournament, type Tournament } from "@/hooks/useTournaments";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { format } from "date-fns";
import { da } from "date-fns/locale";

const GAME_OPTIONS = [
  { id: "book-of-fedesvin", label: "Book of Fedesvin" },
  { id: "rise-of-fedesvin", label: "Rise of Fedesvin" },
];

function getStatusBadge(status: string) {
  if (status === "active") return <Badge className="bg-green-500/20 text-green-400 border-green-500/40">Aktiv</Badge>;
  if (status === "upcoming") return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/40">Kommende</Badge>;
  return <Badge variant="secondary">Afsluttet</Badge>;
}

function CreateTournamentDialog() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const createTournament = useCreateTournament();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [gameIds, setGameIds] = useState<string[]>(["book-of-fedesvin"]);
  const [separateLeaderboards, setSeparateLeaderboards] = useState(false);
  const [prizeText, setPrizeText] = useState("");
  const [maxCredits, setMaxCredits] = useState("");
  const [maxBet, setMaxBet] = useState("");
  const [excludeFromGlobalLeaderboard, setExcludeFromGlobalLeaderboard] = useState(false);
  const [isMonthly, setIsMonthly] = useState(false);
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (gameIds.length === 0) {
      toast.error("Vælg mindst én spillemaskine");
      return;
    }
    try {
      await createTournament.mutateAsync({
        title,
        description: description || undefined,
        prize_text: prizeText || undefined,
        game_ids: gameIds,
        separate_leaderboards: separateLeaderboards,
        starts_at: new Date(startsAt).toISOString(),
        ends_at: new Date(endsAt).toISOString(),
        created_by: user.id,
        max_credits: maxCredits ? parseInt(maxCredits) : null,
        max_bet: maxBet ? parseInt(maxBet) : null,
        exclude_from_global_leaderboard: excludeFromGlobalLeaderboard,
        is_monthly: isMonthly,
      } as any);
      toast.success("Turnering oprettet!");
      setOpen(false);
      setTitle("");
      setDescription("");
      setGameIds(["book-of-fedesvin"]);
      setSeparateLeaderboards(false);
      setPrizeText("");
      setMaxCredits("");
      setMaxBet("");
      setExcludeFromGlobalLeaderboard(false);
      setIsMonthly(false);
      setStartsAt("");
      setEndsAt("");
    } catch {
      toast.error("Fejl ved oprettelse af turnering");
    }
  };

  const toggleGame = (id: string) => {
    setGameIds((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><Plus className="mr-2 h-4 w-4" /> Opret Turnering</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Opret Ny Turnering</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="t-title">Titel *</Label>
            <Input id="t-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Fx "Vind et headset!"' required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="t-desc">Beskrivelse</Label>
            <Textarea id="t-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Præmieinformation, regler osv." rows={3} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="t-prize">Præmie</Label>
            <Input id="t-prize" value={prizeText} onChange={(e) => setPrizeText(e.target.value)} placeholder='Fx "Gaming Headset" eller "500 kr. gavekort"' />
          </div>
          <div className="space-y-2">
            <Label htmlFor="t-maxcredits">Maks credits per deltager</Label>
            <Input id="t-maxcredits" type="number" value={maxCredits} onChange={(e) => setMaxCredits(e.target.value)} placeholder="Ingen begrænsning" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="t-maxbet">Maks bet per spin</Label>
            <Input id="t-maxbet" type="number" min={1} max={100} value={maxBet} onChange={(e) => setMaxBet(e.target.value)} placeholder="Ingen begrænsning (fx 2)" />
          </div>
          <div className="space-y-2">
            <Label>Spillemaskiner *</Label>
            <div className="flex flex-col gap-2">
              {GAME_OPTIONS.map((game) => (
                <div key={game.id} className="flex items-center gap-2">
                  <Checkbox
                    id={`game-${game.id}`}
                    checked={gameIds.includes(game.id)}
                    onCheckedChange={() => toggleGame(game.id)}
                  />
                  <Label htmlFor={`game-${game.id}`} className="cursor-pointer">{game.label}</Label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={excludeFromGlobalLeaderboard} onCheckedChange={setExcludeFromGlobalLeaderboard} id="exclude-global" />
            <div>
              <Label htmlFor="exclude-global" className="cursor-pointer">Ekskluder fra globalt leaderboard</Label>
              <p className="text-xs text-muted-foreground">Turneringsspins tæller ikke med i det globale leaderboard. Når maks credits er brugt, tæller spins igen.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={isMonthly} onCheckedChange={setIsMonthly} id="is-monthly" />
            <div>
              <Label htmlFor="is-monthly" className="cursor-pointer">Månedsturnering (auto-join)</Label>
              <p className="text-xs text-muted-foreground">Alle spillere deltager automatisk – ingen "Deltag" knap.</p>
            </div>
          </div>
          {gameIds.length > 1 && (
            <div className="flex items-center gap-3">
              <Switch checked={separateLeaderboards} onCheckedChange={setSeparateLeaderboards} id="separate-lb" />
              <Label htmlFor="separate-lb" className="cursor-pointer">Separate leaderboards per slot</Label>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="t-start">Starttidspunkt *</Label>
              <Input id="t-start" type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="t-end">Sluttidspunkt *</Label>
              <Input id="t-end" type="datetime-local" value={endsAt} onChange={(e) => setEndsAt(e.target.value)} required />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={createTournament.isPending}>
            {createTournament.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Opret Turnering
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function EditTournamentDialog({ tournament }: { tournament: Tournament }) {
  const [open, setOpen] = useState(false);
  const updateTournament = useUpdateTournament();
  const [title, setTitle] = useState(tournament.title);
  const [description, setDescription] = useState(tournament.description || "");
  const [prizeText, setPrizeText] = useState(tournament.prize_text || "");
  const [maxCredits, setMaxCredits] = useState(tournament.max_credits?.toString() || "");
  const [maxBet, setMaxBet] = useState((tournament as any).max_bet?.toString() || "");
  const [excludeFromGlobalLeaderboard, setExcludeFromGlobalLeaderboard] = useState(tournament.exclude_from_global_leaderboard ?? false);
  const [isMonthly, setIsMonthly] = useState(tournament.is_monthly ?? false);
  const [gameIds, setGameIds] = useState<string[]>(tournament.game_ids);
  const [separateLeaderboards, setSeparateLeaderboards] = useState(tournament.separate_leaderboards);
  const [startsAt, setStartsAt] = useState(new Date(tournament.starts_at).toISOString().slice(0, 16));
  const [endsAt, setEndsAt] = useState(new Date(tournament.ends_at).toISOString().slice(0, 16));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (gameIds.length === 0) {
      toast.error("Vælg mindst én spillemaskine");
      return;
    }
    try {
      await updateTournament.mutateAsync({
        id: tournament.id,
        title,
        description: description || null,
        prize_text: prizeText || null,
        game_ids: gameIds,
        separate_leaderboards: separateLeaderboards,
        starts_at: new Date(startsAt).toISOString(),
        ends_at: new Date(endsAt).toISOString(),
        max_credits: maxCredits ? parseInt(maxCredits) : null,
        max_bet: maxBet ? parseInt(maxBet) : null,
        exclude_from_global_leaderboard: excludeFromGlobalLeaderboard,
        is_monthly: isMonthly,
      } as any);
      toast.success("Turnering opdateret!");
      setOpen(false);
    } catch {
      toast.error("Fejl ved opdatering af turnering");
    }
  };

  const toggleGame = (id: string) => {
    setGameIds((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon"><Pencil className="h-4 w-4" /></Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Rediger Turnering</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="e-title">Titel *</Label>
            <Input id="e-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="e-desc">Beskrivelse</Label>
            <Textarea id="e-desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="e-prize">Præmie</Label>
            <Input id="e-prize" value={prizeText} onChange={(e) => setPrizeText(e.target.value)} placeholder='Fx "Gaming Headset"' />
          </div>
          <div className="space-y-2">
            <Label htmlFor="e-maxcredits">Maks credits per deltager</Label>
            <Input id="e-maxcredits" type="number" value={maxCredits} onChange={(e) => setMaxCredits(e.target.value)} placeholder="Ingen begrænsning" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="e-maxbet">Maks bet per spin</Label>
            <Input id="e-maxbet" type="number" min={1} max={100} value={maxBet} onChange={(e) => setMaxBet(e.target.value)} placeholder="Ingen begrænsning (fx 2)" />
          </div>
          <div className="space-y-2">
            <Label>Spillemaskiner *</Label>
            <div className="flex flex-col gap-2">
              {GAME_OPTIONS.map((game) => (
                <div key={game.id} className="flex items-center gap-2">
                  <Checkbox
                    id={`edit-game-${game.id}`}
                    checked={gameIds.includes(game.id)}
                    onCheckedChange={() => toggleGame(game.id)}
                  />
                  <Label htmlFor={`edit-game-${game.id}`} className="cursor-pointer">{game.label}</Label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={excludeFromGlobalLeaderboard} onCheckedChange={setExcludeFromGlobalLeaderboard} id="edit-exclude-global" />
            <div>
              <Label htmlFor="edit-exclude-global" className="cursor-pointer">Ekskluder fra globalt leaderboard</Label>
              <p className="text-xs text-muted-foreground">Turneringsspins tæller ikke med i det globale leaderboard. Når maks credits er brugt, tæller spins igen.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={isMonthly} onCheckedChange={setIsMonthly} id="edit-is-monthly" />
            <div>
              <Label htmlFor="edit-is-monthly" className="cursor-pointer">Månedsturnering (auto-join)</Label>
              <p className="text-xs text-muted-foreground">Alle spillere deltager automatisk – ingen "Deltag" knap.</p>
            </div>
          </div>
          {gameIds.length > 1 && (
            <div className="flex items-center gap-3">
              <Switch checked={separateLeaderboards} onCheckedChange={setSeparateLeaderboards} id="edit-separate-lb" />
              <Label htmlFor="edit-separate-lb" className="cursor-pointer">Separate leaderboards per slot</Label>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="e-start">Starttidspunkt *</Label>
              <Input id="e-start" type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="e-end">Sluttidspunkt *</Label>
              <Input id="e-end" type="datetime-local" value={endsAt} onChange={(e) => setEndsAt(e.target.value)} required />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={updateTournament.isPending}>
            {updateTournament.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Gem Ændringer
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function TournamentRow({ tournament }: { tournament: Tournament }) {
  const endTournament = useEndTournament();
  const deleteTournament = useDeleteTournament();

  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold truncate">{tournament.title}</h3>
            {getStatusBadge(tournament.status)}
            {tournament.is_monthly && <Badge variant="outline" className="text-[10px]">Månedlig</Badge>}
          </div>
          <p className="text-xs text-muted-foreground">
            {format(new Date(tournament.starts_at), "d. MMM yyyy HH:mm", { locale: da })} — {format(new Date(tournament.ends_at), "d. MMM yyyy HH:mm", { locale: da })}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Spil: {tournament.game_ids.map(id => GAME_OPTIONS.find(g => g.id === id)?.label || id).join(", ")}
            {tournament.separate_leaderboards && " · Separate leaderboards"}
            {tournament.exclude_from_global_leaderboard && " · Ekskl. globalt LB"}
          </p>
          {tournament.prize_text && (
            <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
              <Gift className="h-3 w-3" /> Præmie: {tournament.prize_text}
            </p>
          )}
          {tournament.max_credits && (
            <p className="text-xs text-muted-foreground mt-0.5">
              💰 Maks {tournament.max_credits.toLocaleString()} credits per deltager
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <EditTournamentDialog tournament={tournament} />
          {tournament.status === "active" && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm"><Square className="h-3 w-3 mr-1" /> Afslut</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Afslut turnering?</AlertDialogTitle>
                  <AlertDialogDescription>Dette afslutter "{tournament.title}" med det samme.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuller</AlertDialogCancel>
                  <AlertDialogAction onClick={() => endTournament.mutate(tournament.id)}>Afslut</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Slet turnering?</AlertDialogTitle>
                <AlertDialogDescription>Er du sikker? Alle turneringsdata slettes permanent.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuller</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteTournament.mutate(tournament.id)} className="bg-destructive text-destructive-foreground">Slet</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}

export function TournamentAdminSection() {
  const { data: tournaments, isLoading } = useTournaments();

  const active = tournaments?.filter((t) => t.status === "active") || [];
  const upcoming = tournaments?.filter((t) => t.status === "upcoming") || [];
  const ended = tournaments?.filter((t) => t.status === "ended") || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="h-6 w-6" /> Turneringer
          </h2>
          <p className="text-muted-foreground">Opret og administrer slot-turneringer.</p>
        </div>
        <CreateTournamentDialog />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-6">
          {active.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Aktive ({active.length})</h3>
              <div className="space-y-2">{active.map((t) => <TournamentRow key={t.id} tournament={t} />)}</div>
            </div>
          )}
          {upcoming.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Kommende ({upcoming.length})</h3>
              <div className="space-y-2">{upcoming.map((t) => <TournamentRow key={t.id} tournament={t} />)}</div>
            </div>
          )}
          {ended.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Afsluttede ({ended.length})</h3>
              <div className="space-y-2">{ended.map((t) => <TournamentRow key={t.id} tournament={t} />)}</div>
            </div>
          )}
          {!active.length && !upcoming.length && !ended.length && (
            <Card>
              <CardContent className="py-8 text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                <p className="text-muted-foreground">Ingen turneringer endnu</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
