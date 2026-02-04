import { useState } from "react";
import { Lock, KeyRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SlotPageLockGateProps {
  backgroundImage: string;
  onVerify: (password: string) => boolean;
  error: string | null;
}

export function SlotPageLockGate({ backgroundImage, onVerify, error }: SlotPageLockGateProps) {
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    
    if (!password.trim()) {
      setLocalError("Indtast venligst et password");
      return;
    }

    const success = onVerify(password);
    if (!success) {
      setPassword("");
    }
  };

  const displayError = error || localError;

  return (
    <div className="min-h-[calc(100vh-4rem)] relative flex items-center justify-center">
      {/* Egyptian themed background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/95 -z-10" />
      
      <div className="w-full max-w-md mx-4">
        <div className="bg-card/90 backdrop-blur-md border border-amber-500/30 rounded-2xl p-8 shadow-2xl">
          {/* Lock Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-amber-500/30 to-amber-600/20 flex items-center justify-center border-2 border-amber-500/50">
                <Lock className="h-10 w-10 text-amber-500" />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-xl -z-10" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-center mb-2 text-foreground">
            Spillemaskinen er lukket
          </h1>
          <p className="text-muted-foreground text-center mb-6">
            Indtast password for at få adgang til Book of Fedesvin
          </p>

          {/* Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Indtast password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-11 h-12 bg-background/50 border-amber-500/30 focus:border-amber-500 text-foreground"
                autoFocus
              />
            </div>

            {displayError && (
              <p className="text-destructive text-sm text-center animate-in fade-in">
                {displayError}
              </p>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold"
            >
              Få adgang
            </Button>
          </form>

          {/* Decorative Egyptian elements */}
          <div className="mt-6 flex justify-center gap-2 opacity-40">
            <span className="text-2xl">𓂀</span>
            <span className="text-2xl">𓃭</span>
            <span className="text-2xl">𓆣</span>
          </div>
        </div>
      </div>
    </div>
  );
}
