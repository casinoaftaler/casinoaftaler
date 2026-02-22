import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Loader2, Plus, Trophy, Target, Coins, Users, CheckCircle, XCircle } from "lucide-react";
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

function useBonusHuntSessions() {
  return useQuery({
    queryKey: ['admin-bonus-hunt-sessions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bonus_hunt_sessions' as any)
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []) as any[];
    },
  });
}

function useBonusHuntBetCounts(sessionId?: string) {
  return useQuery({
    queryKey: ['admin-bonus-hunt-bet-counts', sessionId],
    queryFn: async () => {
      if (!sessionId) return { gtw: 0, avgx: 0, avgxPot: 0 };
      const [gtwRes, avgxRes] = await Promise.all([
        supabase.from('bonus_hunt_gtw_bets' as any).select('id', { count: 'exact' }).eq('session_id', sessionId),
        supabase.from('bonus_hunt_avgx_bets' as any).select('bet_amount').eq('session_id', sessionId),
      ]);
      const avgxBets = (avgxRes.data || []) as any[];
      return {
        gtw: gtwRes.count || 0,
        avgx: avgxBets.length,
        avgxPot: avgxBets.reduce((sum: number, b: any) => sum + b.bet_amount, 0),
      };
    },
    enabled: !!sessionId,
  });
}

function CreateSessionForm({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    streamsystem_hunt_id: "",
    hunt_number: "",
    gtw_min_bet: "1",
    gtw_max_bet: "50",
    avgx_min_bet: "1",
    avgx_max_bet: "50",
    prizes: [
      { place: 1, points: 300 },
      { place: 2, points: 200 },
      { place: 3, points: 100 },
      { place: 4, points: 75 },
      { place: 5, points: 50 },
    ],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await (supabase.from('bonus_hunt_sessions' as any) as any).insert({
        streamsystem_hunt_id: form.streamsystem_hunt_id,
        hunt_number: parseInt(form.hunt_number),
        gtw_min_bet: parseInt(form.gtw_min_bet),
        gtw_max_bet: parseInt(form.gtw_max_bet),
        avgx_min_bet: parseInt(form.avgx_min_bet),
        avgx_max_bet: parseInt(form.avgx_max_bet),
        gtw_prizes: form.prizes,
        created_by: user.id,
        status: 'upcoming',
      });

      if (error) throw error;
      toast.success("Bonus Hunt session oprettet!");
      queryClient.invalidateQueries({ queryKey: ['admin-bonus-hunt-sessions'] });
      onClose();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const updatePrize = (index: number, points: number) => {
    const prizes = [...form.prizes];
    prizes[index] = { ...prizes[index], points };
    setForm({ ...form, prizes });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>StreamSystem Hunt ID</Label>
          <Input value={form.streamsystem_hunt_id} onChange={e => setForm({ ...form, streamsystem_hunt_id: e.target.value })} required placeholder="f.eks. abc123..." />
        </div>
        <div className="space-y-2">
          <Label>Hunt Nummer</Label>
          <Input type="number" value={form.hunt_number} onChange={e => setForm({ ...form, hunt_number: e.target.value })} required placeholder="f.eks. 1367" />
        </div>
      </div>

      <Separator />
      <h4 className="font-semibold text-sm">Bet Grænser</h4>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>GTW Min Bet</Label>
          <Input type="number" value={form.gtw_min_bet} onChange={e => setForm({ ...form, gtw_min_bet: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>GTW Max Bet</Label>
          <Input type="number" value={form.gtw_max_bet} onChange={e => setForm({ ...form, gtw_max_bet: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>AVG X Min Bet</Label>
          <Input type="number" value={form.avgx_min_bet} onChange={e => setForm({ ...form, avgx_min_bet: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>AVG X Max Bet</Label>
          <Input type="number" value={form.avgx_max_bet} onChange={e => setForm({ ...form, avgx_max_bet: e.target.value })} />
        </div>
      </div>

      <Separator />
      <h4 className="font-semibold text-sm">GTW Præmier (SE Points)</h4>
      <div className="space-y-2">
        {form.prizes.map((p, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-sm w-12">{p.place}. plads</span>
            <Input type="number" value={p.points} onChange={e => updatePrize(i, parseInt(e.target.value) || 0)} className="w-24" />
            <span className="text-xs text-muted-foreground">points</span>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={() => setForm({ ...form, prizes: [...form.prizes, { place: form.prizes.length + 1, points: 25 }] })}>
          <Plus className="h-3 w-3 mr-1" /> Tilføj plads
        </Button>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
        Opret Session
      </Button>
    </form>
  );
}

function SessionCard({ session }: { session: any }) {
  const queryClient = useQueryClient();
  const { data: counts } = useBonusHuntBetCounts(session.id);
  const [loading, setLoading] = useState<string | null>(null);
  const [endBalance, setEndBalance] = useState("");
  const [averageX, setAverageX] = useState("");

  const toggleBetting = async (type: 'gtw' | 'avgx', value: boolean) => {
    setLoading(type);
    try {
      const update = type === 'gtw' ? { gtw_betting_open: value } : { avgx_betting_open: value };
      const { error } = await (supabase.from('bonus_hunt_sessions' as any) as any).update(update).eq('id', session.id);
      if (error) throw error;
      toast.success(`${type.toUpperCase()} betting ${value ? 'åbnet' : 'lukket'}`);
      queryClient.invalidateQueries({ queryKey: ['admin-bonus-hunt-sessions'] });
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(null);
    }
  };

  const handleSettle = async () => {
    setLoading('settle');
    try {
      const body: any = { sessionId: session.id };
      if (endBalance) body.endBalance = parseFloat(endBalance);
      if (averageX) body.averageX = parseFloat(averageX);

      if (!body.endBalance && !body.averageX) {
        toast.error("Angiv mindst end balance eller average X");
        return;
      }

      const { data, error } = await supabase.functions.invoke('bonus-hunt-settle', { body });
      if (error) throw error;
      if (data?.error) { toast.error(data.error); return; }

      toast.success("Hunt settled!");
      queryClient.invalidateQueries({ queryKey: ['admin-bonus-hunt-sessions'] });
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(null);
    }
  };

  const statusColor = {
    upcoming: 'bg-blue-500/20 text-blue-400',
    betting_open: 'bg-green-500/20 text-green-400',
    betting_closed: 'bg-yellow-500/20 text-yellow-400',
    completed: 'bg-muted text-muted-foreground',
  }[session.status] || 'bg-muted text-muted-foreground';

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Bonus Hunt #{session.hunt_number}</CardTitle>
          <Badge className={statusColor}>{session.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="flex items-center gap-1.5">
            <Trophy className="h-4 w-4 text-muted-foreground" />
            <span>GTW: {counts?.gtw || 0} bets</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span>AVG X: {counts?.avgx || 0} bets</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Coins className="h-4 w-4 text-muted-foreground" />
            <span>Pot: {counts?.avgxPot || 0}</span>
          </div>
        </div>

        {/* Betting toggles */}
        {session.status !== 'completed' && (
          <>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm">GTW Betting</Label>
                <Switch
                  checked={session.gtw_betting_open}
                  onCheckedChange={v => toggleBetting('gtw', v)}
                  disabled={loading === 'gtw'}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">AVG X Betting</Label>
                <Switch
                  checked={session.avgx_betting_open}
                  onCheckedChange={v => toggleBetting('avgx', v)}
                  disabled={loading === 'avgx'}
                />
              </div>
            </div>

            {/* Bet limits info */}
            <div className="text-xs text-muted-foreground grid grid-cols-2 gap-2">
              <span>GTW: {session.gtw_min_bet}-{session.gtw_max_bet} credits</span>
              <span>AVG X: {session.avgx_min_bet}-{session.avgx_max_bet} credits</span>
            </div>

            {/* Settlement */}
            <Separator />
            <h4 className="font-semibold text-sm">Settle Hunt</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">End Balance</Label>
                <Input type="number" step="0.01" value={endBalance} onChange={e => setEndBalance(e.target.value)} placeholder="f.eks. 45000" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Average X</Label>
                <Input type="number" step="0.01" value={averageX} onChange={e => setAverageX(e.target.value)} placeholder="f.eks. 95.5" />
              </div>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="default" className="w-full" disabled={loading === 'settle'}>
                  {loading === 'settle' ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CheckCircle className="h-4 w-4 mr-2" />}
                  Settle & Afslut Hunt
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Settle Bonus Hunt #{session.hunt_number}?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Dette vil beregne vindere, fordele præmier og lukke betting. Handlingen kan ikke fortrydes.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuller</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSettle}>Settle</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}

        {/* Completed info */}
        {session.status === 'completed' && (
          <div className="text-sm space-y-1">
            {session.end_balance && <p>End Balance: <strong>{session.end_balance}</strong></p>}
            {session.average_x && <p>Average X: <strong>{session.average_x}x</strong></p>}
            {session.winning_group && <p>Vindende Gruppe: <strong>{session.winning_group}</strong></p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function BonusHuntAdminSection() {
  const { data: sessions, isLoading } = useBonusHuntSessions();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Bonus Hunt</h2>
          <p className="text-muted-foreground">Administrer bonus hunt sessions og betting.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" /> Ny Session</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Opret Bonus Hunt Session</DialogTitle>
            </DialogHeader>
            <CreateSessionForm onClose={() => setDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="space-y-4">
          {sessions?.map((s: any) => <SessionCard key={s.id} session={s} />)}
          {sessions?.length === 0 && (
            <Card><CardContent className="py-12 text-center text-muted-foreground">Ingen sessions endnu. Opret en ny!</CardContent></Card>
          )}
        </div>
      )}
    </div>
  );
}
