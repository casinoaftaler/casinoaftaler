import { Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export function BannedScreen() {
  const handleSignOut = async () => {
    await (supabase.auth as any).signOut();
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="text-center max-w-md space-y-4">
        <div className="mx-auto h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
          <Ban className="h-8 w-8 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          Din konto er suspenderet
        </h1>
        <p className="text-muted-foreground">
          Din adgang til siden er blevet fjernet af en administrator. Kontakt
          support hvis du mener dette er en fejl.
        </p>
        <Button variant="outline" onClick={handleSignOut}>
          Log ud
        </Button>
      </div>
    </div>
  );
}
