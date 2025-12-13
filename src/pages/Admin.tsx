import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCasinos, useCreateCasino, useDeleteCasino, type CasinoInsert } from "@/hooks/useCasinos";
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
import { Plus, Trash2, LogOut, Star, Loader2 } from "lucide-react";

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
            {isLogin ? "Admin Login" : "Create Admin Account"}
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
                placeholder="admin@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
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
              {isLogin ? "Sign In" : "Sign Up"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Need an account? Sign up" : "Have an account? Sign in"}
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
    bonus_title: "",
    bonus_amount: "",
    bonus_type: "No-sticky",
    wagering_requirements: "35x",
    validity: "30 days",
    min_deposit: "$20",
    payout_time: "24 hours",
    features: "",
    pros: "",
    cons: "",
    description: "",
    is_active: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const casinoData: CasinoInsert = {
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
      features: formData.features.split(",").map((s) => s.trim()).filter(Boolean),
      pros: formData.pros.split(",").map((s) => s.trim()).filter(Boolean),
      cons: formData.cons.split(",").map((s) => s.trim()).filter(Boolean),
      description: formData.description || null,
      is_active: formData.is_active,
    };

    await createCasino.mutateAsync(casinoData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Casino Name *</Label>
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
            placeholder="auto-generated from name"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="bonus_title">Bonus Title *</Label>
          <Input
            id="bonus_title"
            value={formData.bonus_title}
            onChange={(e) => setFormData({ ...formData, bonus_title: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bonus_amount">Bonus Amount *</Label>
          <Input
            id="bonus_amount"
            value={formData.bonus_amount}
            onChange={(e) => setFormData({ ...formData, bonus_amount: e.target.value })}
            placeholder="100% up to $1,000"
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="rating">Rating (0-5)</Label>
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
          <Label htmlFor="bonus_type">Bonus Type</Label>
          <Input
            id="bonus_type"
            value={formData.bonus_type}
            onChange={(e) => setFormData({ ...formData, bonus_type: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="wagering">Wagering</Label>
          <Input
            id="wagering"
            value={formData.wagering_requirements}
            onChange={(e) => setFormData({ ...formData, wagering_requirements: e.target.value })}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="validity">Validity</Label>
          <Input
            id="validity"
            value={formData.validity}
            onChange={(e) => setFormData({ ...formData, validity: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="min_deposit">Min Deposit</Label>
          <Input
            id="min_deposit"
            value={formData.min_deposit}
            onChange={(e) => setFormData({ ...formData, min_deposit: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="payout_time">Payout Time</Label>
          <Input
            id="payout_time"
            value={formData.payout_time}
            onChange={(e) => setFormData({ ...formData, payout_time: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="features">Features (comma-separated)</Label>
        <Input
          id="features"
          value={formData.features}
          onChange={(e) => setFormData({ ...formData, features: e.target.value })}
          placeholder="Live betting, Popular slots, Mobile friendly"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pros">Pros (comma-separated)</Label>
        <Input
          id="pros"
          value={formData.pros}
          onChange={(e) => setFormData({ ...formData, pros: e.target.value })}
          placeholder="Fast withdrawals, Great support"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cons">Cons (comma-separated)</Label>
        <Input
          id="cons"
          value={formData.cons}
          onChange={(e) => setFormData({ ...formData, cons: e.target.value })}
          placeholder="High wagering, Limited games"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full" disabled={createCasino.isPending}>
        {createCasino.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Add Casino
      </Button>
    </form>
  );
}

function AdminDashboard() {
  const { user, isAdmin, signOut, loading: authLoading } = useAuth();
  const { data: casinos, isLoading } = useCasinos(true);
  const deleteCasino = useDeleteCasino();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && user && !isAdmin) {
      // User is logged in but not admin - show message
    }
  }, [authLoading, user, isAdmin]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin");
  };

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <Card className="max-w-md text-center">
          <CardContent className="pt-6">
            <h2 className="mb-4 text-xl font-bold">Access Denied</h2>
            <p className="mb-4 text-muted-foreground">
              You don't have admin privileges. Please contact an administrator to get access.
            </p>
            <p className="mb-4 text-sm text-muted-foreground">
              Logged in as: {user?.email}
            </p>
            <Button onClick={handleSignOut} variant="outline">
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
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
            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Casino Deals</h2>
            <p className="text-muted-foreground">Manage casino bonuses and offers</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Casino
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Casino</DialogTitle>
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
          <div className="space-y-4">
            {casinos?.map((casino) => (
              <Card key={casino.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-lg font-bold text-primary">
                      {casino.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{casino.name}</h3>
                        {!casino.is_active && (
                          <Badge variant="secondary">Inactive</Badge>
                        )}
                        <Badge variant={casino.bonus_type === "No-sticky" ? "default" : "outline"}>
                          {casino.bonus_type}
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
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Casino</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{casino.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteCasino.mutate(casino.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            ))}

            {casinos?.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No casinos found. Add your first casino!</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
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
