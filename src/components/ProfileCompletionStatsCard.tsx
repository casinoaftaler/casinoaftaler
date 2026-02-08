import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Users, UserCheck, UserX, TrendingUp, Check, X, ChevronDown, ChevronUp } from "lucide-react";
import { useProfileCompletionStats, UserProfileStatus } from "@/hooks/useProfileCompletionStats";

function StatCard({
  icon: Icon,
  label,
  value,
  subValue,
  variant = "default",
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  subValue?: string;
  variant?: "default" | "success" | "warning";
}) {
  const iconColors = {
    default: "text-primary",
    success: "text-green-500",
    warning: "text-amber-500",
  };

  return (
    <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border">
      <div className={`p-2 rounded-full bg-background ${iconColors[variant]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
        {subValue && <p className="text-xs text-muted-foreground">{subValue}</p>}
      </div>
    </div>
  );
}

function SectionIndicator({ completed }: { completed: boolean }) {
  return completed ? (
    <Check className="h-4 w-4 text-primary" />
  ) : (
    <X className="h-4 w-4 text-muted-foreground/50" />
  );
}

function UserProfileRow({ user }: { user: UserProfileStatus }) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar_url || undefined} />
            <AvatarFallback className="text-xs">
              {user.display_name?.slice(0, 2).toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium truncate max-w-[150px]">
            {user.display_name || "Unavngivet"}
          </span>
        </div>
      </TableCell>
      <TableCell className="text-center">
        <SectionIndicator completed={user.profile_completed} />
      </TableCell>
      <TableCell className="text-center">
        <SectionIndicator completed={user.stats_completed} />
      </TableCell>
      <TableCell className="text-center">
        <SectionIndicator completed={user.favorites_completed} />
      </TableCell>
      <TableCell className="text-center">
        <SectionIndicator completed={user.playstyle_completed} />
      </TableCell>
      <TableCell className="text-center">
        <Badge
          variant={user.is_fully_completed ? "default" : "secondary"}
        >
          {user.sections_completed}/4
        </Badge>
      </TableCell>
    </TableRow>
  );
}

const INITIAL_DISPLAY_COUNT = 10;

export function ProfileCompletionStatsCard() {
  const [showAll, setShowAll] = useState(false);
  const { data, isLoading, error } = useProfileCompletionStats();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          Kunne ikke indlæse profilstatistik
        </CardContent>
      </Card>
    );
  }

  const { stats, users } = data;

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <Card className="border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-primary" />
            Profilfuldførelse Oversigt
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={Users}
              label="Totalt brugere"
              value={stats.totalUsers.toLocaleString("da-DK")}
            />
            <StatCard
              icon={UserCheck}
              label="Profiler fuldført"
              value={stats.completedProfiles.toLocaleString("da-DK")}
              variant="success"
            />
            <StatCard
              icon={UserX}
              label="Profiler ufuldstændige"
              value={stats.incompleteProfiles.toLocaleString("da-DK")}
              variant="warning"
            />
            <StatCard
              icon={TrendingUp}
              label="Fuldførelsesrate"
              value={`${stats.completionRate.toFixed(1)}%`}
            />
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Overordnet fremskridt</span>
              <span className="font-medium">{stats.completionRate.toFixed(1)}%</span>
            </div>
            <Progress value={stats.completionRate} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* User List */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Brugeroversigt</CardTitle>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Ingen brugere fundet
            </p>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bruger</TableHead>
                    <TableHead className="text-center w-20">Profil</TableHead>
                    <TableHead className="text-center w-20">Stats</TableHead>
                    <TableHead className="text-center w-20">Favoritter</TableHead>
                    <TableHead className="text-center w-20">Spillestil</TableHead>
                    <TableHead className="text-center w-20">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users
                    .sort((a, b) => b.sections_completed - a.sections_completed)
                    .slice(0, showAll ? users.length : INITIAL_DISPLAY_COUNT)
                    .map((user) => (
                      <UserProfileRow key={user.user_id} user={user} />
                    ))}
                </TableBody>
              </Table>
              {users.length > INITIAL_DISPLAY_COUNT && (
                <div className="flex justify-center py-3 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAll(!showAll)}
                    className="gap-2"
                  >
                    {showAll ? (
                      <>
                        <ChevronUp className="h-4 w-4" />
                        Vis færre
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4" />
                        Vis alle {users.length} brugere
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
