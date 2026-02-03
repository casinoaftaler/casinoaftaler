import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2, Loader2, ImageOff, Check, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UnusedFile {
  bucket: string;
  fileName: string;
  publicUrl: string;
}

interface CleanupResult {
  success: boolean;
  dryRun: boolean;
  totalFilesInStorage: number;
  totalReferencedFiles: number;
  unusedFilesCount: number;
  unusedFiles: UnusedFile[];
  deletedCount: number;
  deletedFiles: UnusedFile[];
}

export function StorageCleanupSection() {
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState<CleanupResult | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleScan = async () => {
    setLoading(true);
    setScanResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("cleanup-unused-images", {
        body: { dryRun: true },
      });

      if (error) {
        console.error("Scan error:", error);
        toast.error("Kunne ikke scanne for ubrugte billeder");
        return;
      }

      setScanResult(data as CleanupResult);
      
      if (data.unusedFilesCount === 0) {
        toast.success("Ingen ubrugte billeder fundet!");
      } else {
        toast.info(`Fandt ${data.unusedFilesCount} ubrugte billeder`);
      }
    } catch (err) {
      console.error("Scan error:", err);
      toast.error("En fejl opstod under scanning");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    setShowConfirmDialog(false);

    try {
      const { data, error } = await supabase.functions.invoke("cleanup-unused-images", {
        body: { dryRun: false },
      });

      if (error) {
        console.error("Delete error:", error);
        toast.error("Kunne ikke slette ubrugte billeder");
        return;
      }

      const result = data as CleanupResult;
      setScanResult(result);
      toast.success(`${result.deletedCount} billeder blev slettet`);
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("En fejl opstod under sletning");
    } finally {
      setDeleting(false);
    }
  };

  const groupedByBucket = scanResult?.unusedFiles.reduce((acc, file) => {
    if (!acc[file.bucket]) {
      acc[file.bucket] = [];
    }
    acc[file.bucket].push(file);
    return acc;
  }, {} as Record<string, UnusedFile[]>);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageOff className="h-5 w-5" />
          Ryd Op i Billeder
        </CardTitle>
        <CardDescription>
          Find og slet billeder i storage som ikke længere bruges i databasen.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleScan}
            disabled={loading || deleting}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scanner...
              </>
            ) : (
              <>
                <ImageOff className="mr-2 h-4 w-4" />
                Scan for Ubrugte Billeder
              </>
            )}
          </Button>

          {scanResult && scanResult.unusedFilesCount > 0 && (
            <Button
              variant="destructive"
              onClick={() => setShowConfirmDialog(true)}
              disabled={loading || deleting}
            >
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sletter...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Slet {scanResult.unusedFilesCount} Billeder
                </>
              )}
            </Button>
          )}
        </div>

        {scanResult && (
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="p-3 rounded-lg bg-muted">
                <div className="text-2xl font-bold">{scanResult.totalFilesInStorage}</div>
                <div className="text-muted-foreground">Filer i storage</div>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <div className="text-2xl font-bold">{scanResult.totalReferencedFiles}</div>
                <div className="text-muted-foreground">Refereret i DB</div>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-destructive">{scanResult.unusedFilesCount}</div>
                <div className="text-muted-foreground">Ubrugte filer</div>
              </div>
            </div>

            {scanResult.deletedCount > 0 && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400">
                <Check className="h-5 w-5" />
                <span>{scanResult.deletedCount} billeder blev slettet succesfuldt</span>
              </div>
            )}

            {scanResult.unusedFilesCount > 0 && scanResult.dryRun && groupedByBucket && (
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  Ubrugte billeder der kan slettes:
                </h4>
                {Object.entries(groupedByBucket).map(([bucket, files]) => (
                  <div key={bucket} className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">
                      {bucket} ({files.length} filer)
                    </div>
                    <ul className="text-sm space-y-1 pl-4">
                      {files.slice(0, 10).map((file) => (
                        <li key={file.fileName} className="text-muted-foreground truncate">
                          • {file.fileName}
                        </li>
                      ))}
                      {files.length > 10 && (
                        <li className="text-muted-foreground italic">
                          ... og {files.length - 10} mere
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {scanResult.unusedFilesCount === 0 && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400">
                <Check className="h-5 w-5" />
                <span>Alle billeder i storage er i brug!</span>
              </div>
            )}
          </div>
        )}

        <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Slet ubrugte billeder?</AlertDialogTitle>
              <AlertDialogDescription>
                Du er ved at slette {scanResult?.unusedFilesCount} billeder permanent fra storage.
                Denne handling kan ikke fortrydes.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuller</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Ja, slet billeder
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
