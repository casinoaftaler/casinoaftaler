import { useState } from "react";
import { Bell, Send, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { useAdminNotifications } from "@/hooks/useNotifications";
import { toast } from "sonner";
import { format } from "date-fns";
import { da } from "date-fns/locale";

export function NotificationsAdminSection() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const { notifications, isLoading, createNotification, deleteNotification } =
    useAdminNotifications();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      toast.error("Besked er påkrævet");
      return;
    }

    try {
      await createNotification.mutateAsync({
        title: title.trim() || undefined,
        message: message.trim(),
      });
      toast.success("Notifikation sendt til alle brugere");
      setTitle("");
      setMessage("");
    } catch (error) {
      toast.error("Kunne ikke sende notifikation");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNotification.mutateAsync(id);
      toast.success("Notifikation slettet");
    } catch (error) {
      toast.error("Kunne ikke slette notifikation");
    }
  };

  return (
    <div className="space-y-6">
      {/* Create notification form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Send notifikation
          </CardTitle>
          <CardDescription>
            Send en notifikation til alle brugere på siden
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titel (valgfri)</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Notifikationstitel..."
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Besked *</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Skriv din besked her..."
                rows={4}
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground">
                {message.length}/500 tegn
              </p>
            </div>

            <Button
              type="submit"
              disabled={createNotification.isPending || !message.trim()}
            >
              {createNotification.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sender...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send til alle brugere
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Notifications history */}
      <Card>
        <CardHeader>
          <CardTitle>Sendte notifikationer</CardTitle>
          <CardDescription>
            Oversigt over alle sendte notifikationer
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : notifications.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Ingen notifikationer sendt endnu
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titel</TableHead>
                  <TableHead>Besked</TableHead>
                  <TableHead>Sendt</TableHead>
                  <TableHead className="w-16">Handling</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notifications.map((notif) => (
                  <TableRow key={notif.id}>
                    <TableCell className="font-medium">
                      {notif.title || "-"}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {notif.message}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {format(new Date(notif.created_at), "d. MMM yyyy HH:mm", {
                        locale: da,
                      })}
                    </TableCell>
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Slet notifikation?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Er du sikker på at du vil slette denne notifikation? 
                              Dette vil også fjerne den fra alle brugeres indbakke.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuller</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(notif.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Slet
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
