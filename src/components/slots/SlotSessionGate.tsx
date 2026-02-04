import { Button } from "@/components/ui/button";
import { Gamepad2, RefreshCw, MonitorSmartphone } from "lucide-react";

interface SlotSessionGateProps {
  backgroundImage: string;
  otherDeviceInfo: string | null;
  timeSinceActive: string | null;
  isLoading: boolean;
  onTakeOver: () => void;
  onRefresh: () => void;
}

export function SlotSessionGate({
  backgroundImage,
  otherDeviceInfo,
  timeSinceActive,
  isLoading,
  onTakeOver,
  onRefresh,
}: SlotSessionGateProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] relative">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 -z-10" />
      
      <div className="container py-16">
        <div className="max-w-md mx-auto text-center space-y-6 bg-card/80 backdrop-blur-sm p-8 rounded-xl border border-amber-500/20">
          <div className="h-20 w-20 mx-auto rounded-full bg-amber-500/20 flex items-center justify-center">
            <MonitorSmartphone className="h-10 w-10 text-amber-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-foreground">Aktiv på anden enhed</h1>
          
          <div className="space-y-2 text-muted-foreground">
            <p>Du spiller allerede på:</p>
            <p className="text-lg font-semibold text-amber-500">
              {otherDeviceInfo || "En anden enhed"}
            </p>
            {timeSinceActive && (
              <p className="text-sm">
                Sidst aktiv: {timeSinceActive}
              </p>
            )}
          </div>
          
          <div className="pt-4 space-y-3">
            <Button 
              onClick={onTakeOver}
              disabled={isLoading}
              size="lg"
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Overtager...
                </>
              ) : (
                <>
                  <Gamepad2 className="h-4 w-4 mr-2" />
                  Spil her i stedet
                </>
              )}
            </Button>
            
            <Button
              variant="ghost"
              onClick={onRefresh}
              disabled={isLoading}
              className="text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Tjek igen
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground pt-4">
            For at forhindre misbrug kan du kun spille på én enhed ad gangen.
            Hvis du skifter enhed, stopper spillet automatisk på den anden.
          </p>
        </div>
      </div>
    </div>
  );
}
