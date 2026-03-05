import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, Plus, Trophy, Target, Coins, CheckCircle, Zap, Pencil, Save, Ticket, Archive } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useBonusHuntData } from "@/hooks/useBonusHuntData";
import { BonusHuntCouponAdmin } from "@/components/admin/BonusHuntCouponAdmin";
import { BonusHuntCouponSubmissions } from "@/components/admin/BonusHuntCouponSubmissions";
import { BonusHuntArchiveAdmin } from "@/components/admin/BonusHuntArchiveAdmin";
import { useCasinos } from "@/hooks/useCasinos";



// Fetch the session matching the current hunt number (if any)
function useSessionForHunt(huntNumber?: number) {
  return useQuery({
    queryKey: ['admin-bonus-hunt-session-for-hunt', huntNumber],
    queryFn: async () => {
      if (!huntNumber) return null;
      const { data, error } = await supabase
        .from('bonus_hunt_sessions' as any)
        .select('*')
        .eq('hunt_number', huntNumber)
        .maybeSingle();
      if (error) throw error;
      return data as any;
    },
    enabled: !!huntNumber,
    refetchInterval: 10000,
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

// Simplified form — only bet limits and prizes
function CreateSessionForm({ huntNumber, huntId, onClose }: { huntNumber: number; huntId: string; onClose: () => void }) {
  const queryClient = useQueryClient();
  const { data: casinos } = useCasinos(true);
  const [loading, setLoading] = useState(false);
  const [casinoSlug, setCasinoSlug] = useState("spildansknu");
  const [host, setHost] = useState("kevin");
  const [form, setForm] = useState({
    gtw_min_bet: "1",
    gtw_max_bet: "50",
    avgx_min_bet: "1",
    avgx_max_bet: "50",
    prizes: [
      { place: 1, points: 300, credits: 0 },
      { place: 2, points: 200, credits: 0 },
      { place: 3, points: 100, credits: 0 },
      { place: 4, points: 75, credits: 0 },
      { place: 5, points: 50, credits: 0 },
    ],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await (supabase.from('bonus_hunt_sessions' as any) as any).insert({
        streamsystem_hunt_id: huntId,
        hunt_number: huntNumber,
        gtw_min_bet: parseInt(form.gtw_min_bet),
        gtw_max_bet: parseInt(form.gtw_max_bet),
        avgx_min_bet: parseInt(form.avgx_min_bet),
        avgx_max_bet: parseInt(form.avgx_max_bet),
        gtw_prizes: form.prizes,
        casino_slug: casinoSlug,
        host: host,
        created_by: user.id,
        status: 'upcoming',
      });

      if (error) throw error;
      toast.success(`Betting session for Hunt #${huntNumber} oprettet!`);
      queryClient.invalidateQueries({ queryKey: ['admin-bonus-hunt-session-for-hunt'] });
      onClose();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const updatePrize = (index: number, field: 'points' | 'credits', value: number) => {
    const prizes = [...form.prizes];
    prizes[index] = { ...prizes[index], [field]: value };
    setForm({ ...form, prizes });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Casino til denne hunt</Label>
          <Select value={casinoSlug} onValueChange={setCasinoSlug}>
            <SelectTrigger>
              <SelectValue placeholder="Vælg casino" />
            </SelectTrigger>
            <SelectContent>
              {(casinos || []).map((c) => (
                <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Vært</Label>
          <Select value={host} onValueChange={setHost}>
            <SelectTrigger>
              <SelectValue placeholder="Vælg vært" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kevin">Kevin</SelectItem>
              <SelectItem value="jonas">Jonas</SelectItem>
            </SelectContent>
          </Select>
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
      <h4 className="font-semibold text-sm">GTW Præmier</h4>
      <div className="space-y-2">
        {form.prizes.map((p, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-sm w-12">{p.place}. plads</span>
            <Input type="number" value={p.points} onChange={e => updatePrize(i, 'points', parseInt(e.target.value) || 0)} className="w-20" />
            <span className="text-xs text-muted-foreground">SE pts</span>
            <Input type="number" value={p.credits} onChange={e => updatePrize(i, 'credits', parseInt(e.target.value) || 0)} className="w-20" />
            <span className="text-xs text-muted-foreground">credits</span>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={() => setForm({ ...form, prizes: [...form.prizes, { place: form.prizes.length + 1, points: 25, credits: 0 }] })}>
          <Plus className="h-3 w-3 mr-1" /> Tilføj plads
        </Button>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
        Opret Betting Session
      </Button>
    </form>
  );
}

function SessionControls({ session }: { session: any }) {
  const queryClient = useQueryClient();
  const { data: casinos } = useCasinos(true);
  const { data: counts } = useBonusHuntBetCounts(session.id);
  const [loading, setLoading] = useState<string | null>(null);
  const [endBalance, setEndBalance] = useState("");
  const [averageX, setAverageX] = useState("");
  const [editingPrizes, setEditingPrizes] = useState(false);
  const [editPrizes, setEditPrizes] = useState<{ place: number; points: number; credits: number }[]>([]);
  const [editCasinoSlug, setEditCasinoSlug] = useState(session.casino_slug || "spildansknu");
  const [editHost, setEditHost] = useState(session.host || "kevin");
  const [editBetLimits, setEditBetLimits] = useState({
    gtw_min_bet: "",
    gtw_max_bet: "",
    avgx_min_bet: "",
    avgx_max_bet: "",
  });

  const startEditing = () => {
    const prizes = Array.isArray(session.gtw_prizes) ? session.gtw_prizes : [];
    setEditPrizes(prizes.map((p: any) => ({ place: p.place, points: p.points || 0, credits: p.credits || 0 })));
    setEditBetLimits({
      gtw_min_bet: String(session.gtw_min_bet),
      gtw_max_bet: String(session.gtw_max_bet),
      avgx_min_bet: String(session.avgx_min_bet),
      avgx_max_bet: String(session.avgx_max_bet),
    });
    setEditCasinoSlug(session.casino_slug || "spildansknu");
    setEditHost(session.host || "kevin");
    setEditingPrizes(true);
  };

  const saveEdits = async () => {
    setLoading('edit');
    try {
      const { error } = await (supabase.from('bonus_hunt_sessions' as any) as any).update({
        gtw_prizes: editPrizes,
        casino_slug: editCasinoSlug,
        host: editHost,
        gtw_min_bet: parseInt(editBetLimits.gtw_min_bet),
        gtw_max_bet: parseInt(editBetLimits.gtw_max_bet),
        avgx_min_bet: parseInt(editBetLimits.avgx_min_bet),
        avgx_max_bet: parseInt(editBetLimits.avgx_max_bet),
      }).eq('id', session.id);
      if (error) throw error;
      toast.success("Indstillinger opdateret!");
      queryClient.invalidateQueries({ queryKey: ['admin-bonus-hunt-session-for-hunt'] });
      setEditingPrizes(false);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(null);
    }
  };

  const updateEditPrize = (index: number, field: 'points' | 'credits', value: number) => {
    const prizes = [...editPrizes];
    prizes[index] = { ...prizes[index], [field]: value };
    setEditPrizes(prizes);
  };

  const toggleBetting = async (type: 'gtw' | 'avgx', value: boolean) => {
    setLoading(type);
    try {
      const update = type === 'gtw' ? { gtw_betting_open: value } : { avgx_betting_open: value };
      const { error } = await (supabase.from('bonus_hunt_sessions' as any) as any).update(update).eq('id', session.id);
      if (error) throw error;
      toast.success(`${type.toUpperCase()} betting ${value ? 'åbnet' : 'lukket'}`);
      queryClient.invalidateQueries({ queryKey: ['admin-bonus-hunt-session-for-hunt'] });
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
      queryClient.invalidateQueries({ queryKey: ['admin-bonus-hunt-session-for-hunt'] });
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-4">
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

          <div className="text-xs text-muted-foreground space-y-1">
            <span className="block">Casino: <strong>{casinos?.find(c => c.slug === session.casino_slug)?.name || session.casino_slug || 'Ikke valgt'}</strong></span>
            <span className="block">Vært: <strong>{session.host === 'jonas' ? 'Jonas' : 'Kevin'}</strong></span>
            <div className="grid grid-cols-2 gap-2">
              <span>GTW: {session.gtw_min_bet}-{session.gtw_max_bet} credits</span>
              <span>AVG X: {session.avgx_min_bet}-{session.avgx_max_bet} credits</span>
            </div>
          </div>

          <Separator />
          {!editingPrizes ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">GTW Præmier</h4>
                <Button variant="outline" size="sm" onClick={startEditing}>
                  <Pencil className="h-3 w-3 mr-1" /> Rediger
                </Button>
              </div>
              <div className="space-y-1 text-sm">
                {Array.isArray(session.gtw_prizes) && session.gtw_prizes.map((p: any, i: number) => (
                  <div key={i} className="flex gap-2 text-muted-foreground">
                    <span>{p.place}. plads:</span>
                    <span>{p.points} SE pts</span>
                    {p.credits > 0 && <span>+ {p.credits} credits</span>}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs font-semibold">Casino</Label>
                  <Select value={editCasinoSlug} onValueChange={setEditCasinoSlug}>
                    <SelectTrigger>
                      <SelectValue placeholder="Vælg casino" />
                    </SelectTrigger>
                    <SelectContent>
                      {(casinos || []).map((c) => (
                        <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-semibold">Vært</Label>
                  <Select value={editHost} onValueChange={setEditHost}>
                    <SelectTrigger>
                      <SelectValue placeholder="Vælg vært" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kevin">Kevin</SelectItem>
                      <SelectItem value="jonas">Jonas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator />
              <h4 className="font-semibold text-sm">Rediger Bet Grænser</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">GTW Min</Label>
                  <Input type="number" value={editBetLimits.gtw_min_bet} onChange={e => setEditBetLimits({ ...editBetLimits, gtw_min_bet: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">GTW Max</Label>
                  <Input type="number" value={editBetLimits.gtw_max_bet} onChange={e => setEditBetLimits({ ...editBetLimits, gtw_max_bet: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">AVG X Min</Label>
                  <Input type="number" value={editBetLimits.avgx_min_bet} onChange={e => setEditBetLimits({ ...editBetLimits, avgx_min_bet: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">AVG X Max</Label>
                  <Input type="number" value={editBetLimits.avgx_max_bet} onChange={e => setEditBetLimits({ ...editBetLimits, avgx_max_bet: e.target.value })} />
                </div>
              </div>

              <h4 className="font-semibold text-sm">Rediger GTW Præmier</h4>
              <div className="space-y-2">
                {editPrizes.map((p, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-sm w-12">{p.place}. plads</span>
                    <Input type="number" value={p.points} onChange={e => updateEditPrize(i, 'points', parseInt(e.target.value) || 0)} className="w-20" />
                    <span className="text-xs text-muted-foreground">SE pts</span>
                    <Input type="number" value={p.credits} onChange={e => updateEditPrize(i, 'credits', parseInt(e.target.value) || 0)} className="w-20" />
                    <span className="text-xs text-muted-foreground">credits</span>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => setEditPrizes([...editPrizes, { place: editPrizes.length + 1, points: 25, credits: 0 }])}>
                  <Plus className="h-3 w-3 mr-1" /> Tilføj plads
                </Button>
              </div>

              <div className="flex gap-2">
                <Button onClick={saveEdits} disabled={loading === 'edit'} className="flex-1">
                  {loading === 'edit' ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                  Gem ændringer
                </Button>
                <Button variant="outline" onClick={() => setEditingPrizes(false)}>Annuller</Button>
              </div>
            </div>
          )}

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

      {session.status === 'completed' && (
        <div className="text-sm space-y-1">
          {session.end_balance && <p>End Balance: <strong>{session.end_balance}</strong></p>}
          {session.average_x && <p>Average X: <strong>{session.average_x}x</strong></p>}
          {session.winning_group && <p>Vindende Gruppe: <strong>{session.winning_group}</strong></p>}
        </div>
      )}
    </div>
  );
}

export function BonusHuntAdminSection() {
  const { data: huntData, isLoading: huntLoading } = useBonusHuntData();
  const huntNumber = huntData?.visibleId;
  const { data: session, isLoading: sessionLoading } = useSessionForHunt(huntNumber);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const isLoading = huntLoading || sessionLoading;

  const statusLabel = huntData?.status === 'completed' ? 'Afsluttet' : 'Aktiv';
  const statusColor = huntData?.status === 'completed'
    ? 'bg-muted text-muted-foreground'
    : 'bg-green-500/20 text-green-400';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Bonus Hunt</h2>
        <p className="text-muted-foreground">Administrer betting for den aktive bonus hunt.</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : !huntData ? (
        <Card><CardContent className="py-12 text-center text-muted-foreground">Kunne ikke hente aktiv hunt fra StreamSystem.</CardContent></Card>
      ) : (
        <Tabs defaultValue="betting" className="space-y-4">
          <TabsList>
            <TabsTrigger value="betting" className="gap-1.5">
              <Zap className="h-3.5 w-3.5" /> Betting
            </TabsTrigger>
            <TabsTrigger value="coupon" className="gap-1.5">
              <Ticket className="h-3.5 w-3.5" /> Slot Kupon
            </TabsTrigger>
            <TabsTrigger value="archive" className="gap-1.5">
              <Archive className="h-3.5 w-3.5" /> Arkiv
            </TabsTrigger>
          </TabsList>

          <TabsContent value="betting">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Bonus Hunt #{huntNumber}
                  </CardTitle>
                  <Badge className={statusColor}>{statusLabel}</Badge>
                </div>
                <div className="text-sm text-muted-foreground grid grid-cols-3 gap-2 pt-2">
                  <span>Slots: {huntData.stats.totalBonuses}</span>
                  <span>Åbnet: {huntData.stats.openedBonuses}/{huntData.stats.totalBonuses}</span>
                  <span>Start: {huntData.stats.startBalance.toLocaleString()}</span>
                </div>
              </CardHeader>
              <CardContent>
                {session ? (
                  <SessionControls session={session} />
                ) : showCreateForm ? (
                  <CreateSessionForm
                    huntNumber={huntNumber!}
                    huntId={huntData.id}
                    onClose={() => setShowCreateForm(false)}
                  />
                ) : (
                  <Button onClick={() => setShowCreateForm(true)} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Opret Betting Session for Hunt #{huntNumber}
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coupon" className="space-y-4">
            {session ? (
              <>
                <BonusHuntCouponAdmin session={session} />
                <BonusHuntCouponSubmissions session={session} />
              </>
            
            ) : (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  Opret først en betting session for at administrere Slot Kupon.
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
