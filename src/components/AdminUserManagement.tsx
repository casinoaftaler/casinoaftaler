import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Loader2, ChevronDown, UserPlus, Shield } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const inviteAdminSchema = z.object({
  email: z.string().trim().email({ message: "Ugyldig email adresse" }).max(255, { message: "Email må max være 255 tegn" }),
  password: z.string().min(6, { message: "Adgangskode skal være mindst 6 tegn" }).max(100, { message: "Adgangskode må max være 100 tegn" }),
  role: z.enum(["admin", "moderator"]),
});

interface AdminUser {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
  email?: string;
}

interface AdminUserManagementProps {
  embedded?: boolean;
}

export function AdminUserManagement({ embedded = false }: AdminUserManagementProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<"admin" | "moderator">("admin");
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  // Fetch admin users with email
  const { data: adminUsers, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc("get_admin_users_with_email");

      if (error) throw error;
      return data as AdminUser[];
    },
  });

  // Create admin user mutation
  const createAdmin = useMutation({
    mutationFn: async ({ email, password, role }: { email: string; password: string; role: string }) => {
      const { data, error } = await supabase.functions.invoke("create-admin-user", {
        body: { email, password, role },
      });

      if (error) {
        // Supabase functions errors often hide the response body behind `context`.
        // Extract it so the UI can show the real reason (e.g. duplicate email).
        const anyErr = error as any;
        const body = anyErr?.context?.body;
        if (typeof body === "string") {
          try {
            const parsed = JSON.parse(body);
            if (parsed?.error) throw new Error(parsed.error);
          } catch {
            // ignore JSON parse errors and fall back to generic message
          }
        }
        throw new Error(anyErr?.message || "Kunne ikke oprette admin bruger");
      }
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      toast.success("Admin bruger oprettet!");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      setDialogOpen(false);
      setEmail("");
      setPassword("");
      setSelectedRole("admin");
      setError("");
    },
    onError: (error: Error) => {
      toast.error("Fejl ved oprettelse af admin bruger");
      setError(error.message);
    },
  });

  // Delete admin user mutation
  const deleteAdmin = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      const { data, error } = await supabase.functions.invoke("delete-admin-user", {
        body: { userId, role },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      toast.success("Admin bruger fjernet!");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (error: Error) => {
      toast.error(`Fejl ved fjernelse af admin bruger: ${error.message}`);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validation = inviteAdminSchema.safeParse({ email, password, role: selectedRole });
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    createAdmin.mutate({ email, password, role: selectedRole });
  };

  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Opret og administrer admin brugere
        </p>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <UserPlus className="mr-2 h-4 w-4" /> Opret Admin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Opret Ny Admin Bruger</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@eksempel.dk"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password">Adgangskode</Label>
                <Input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <p className="text-xs text-muted-foreground">
                  Mindst 6 tegn
                </p>
              </div>
              <div className="space-y-2">
                <Label>Rolle</Label>
                <Select value={selectedRole} onValueChange={(v) => setSelectedRole(v as "admin" | "moderator")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <Button type="submit" className="w-full" disabled={createAdmin.isPending}>
                {createAdmin.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Opret Bruger
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-2">
          {adminUsers && adminUsers.length > 0 ? (
            adminUsers.map((admin) => (
              <div
                key={admin.id}
                className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
              >
                <div className="flex items-center gap-3">
                  <Shield className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{admin.email || admin.user_id}</p>
                    <p className="text-xs text-muted-foreground">
                      Oprettet: {new Date(admin.created_at).toLocaleDateString("da-DK")}
                    </p>
                  </div>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Fjern Admin Bruger?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Er du sikker på at du vil fjerne denne admin bruger? 
                        Brugeren vil ikke længere have admin rettigheder.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuller</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteAdmin.mutate(admin.user_id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Fjern
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-muted-foreground py-4">
              Ingen admin brugere fundet
            </p>
          )}
        </div>
      )}
    </div>
  );

  if (embedded) {
    return <Card><CardContent className="pt-6">{content}</CardContent></Card>;
  }

  return (
    <Collapsible>
      <Card className="mb-8">
        <CollapsibleTrigger className="w-full">
          <CardHeader className="flex flex-row items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors [&[data-state=open]>svg]:rotate-180">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Admin Bruger Administration
            </CardTitle>
            <ChevronDown className="h-5 w-5 transition-transform duration-200" />
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent>{content}</CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
