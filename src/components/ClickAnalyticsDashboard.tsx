import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, MousePointerClick, TrendingUp, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, LineChart, Line } from "recharts";

interface ClickEvent {
  id: string;
  casino_id: string;
  casino_slug: string;
  casino_name: string;
  event_type: string;
  created_at: string;
}

interface CasinoClickStats {
  name: string;
  clicks: number;
  fill: string;
}

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "hsl(142, 76%, 36%)",
  "hsl(221, 83%, 53%)",
  "hsl(262, 83%, 58%)",
  "hsl(25, 95%, 53%)",
  "hsl(339, 90%, 51%)",
];

const chartConfig = {
  clicks: {
    label: "Klik",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function ClickAnalyticsDashboard() {
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "90d">("7d");

  const getDateRange = () => {
    const end = new Date();
    const start = new Date();
    
    switch (dateRange) {
      case "7d":
        start.setDate(end.getDate() - 7);
        break;
      case "30d":
        start.setDate(end.getDate() - 30);
        break;
      case "90d":
        start.setDate(end.getDate() - 90);
        break;
    }
    
    return { start, end };
  };

  const { data: clickEvents, isLoading } = useQuery({
    queryKey: ["click-events", dateRange],
    queryFn: async () => {
      const { start } = getDateRange();
      
      const { data, error } = await supabase
        .from("click_events")
        .select("*")
        .gte("created_at", start.toISOString())
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as ClickEvent[];
    },
  });

  const stats = useMemo(() => {
    if (!clickEvents || clickEvents.length === 0) {
      return {
        totalClicks: 0,
        clicksByCasino: [] as CasinoClickStats[],
        clicksByDay: [] as { date: string; clicks: number }[],
        topCasino: null as string | null,
      };
    }

    // Total clicks
    const totalClicks = clickEvents.length;

    // Clicks by casino
    const casinoClicks: Record<string, { name: string; clicks: number }> = {};
    clickEvents.forEach((event) => {
      if (!casinoClicks[event.casino_id]) {
        casinoClicks[event.casino_id] = { name: event.casino_name, clicks: 0 };
      }
      casinoClicks[event.casino_id].clicks++;
    });

    const clicksByCasino = Object.values(casinoClicks)
      .sort((a, b) => b.clicks - a.clicks)
      .map((item, index) => ({
        ...item,
        fill: COLORS[index % COLORS.length],
      }));

    // Top casino
    const topCasino = clicksByCasino.length > 0 ? clicksByCasino[0].name : null;

    // Clicks by day
    const dayClicks: Record<string, number> = {};
    clickEvents.forEach((event) => {
      const date = new Date(event.created_at).toISOString().split("T")[0];
      dayClicks[date] = (dayClicks[date] || 0) + 1;
    });

    const clicksByDay = Object.entries(dayClicks)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, clicks]) => ({ date, clicks }));

    return { totalClicks, clicksByCasino, clicksByDay, topCasino };
  }, [clickEvents]);

  const hasData = clickEvents && clickEvents.length > 0;

  return (
    <Collapsible defaultOpen>
      <Card className="mb-8">
        <CollapsibleTrigger className="w-full">
          <CardHeader className="flex flex-row items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors [&[data-state=open]>svg]:rotate-180">
            <CardTitle className="flex items-center gap-2">
              <MousePointerClick className="h-5 w-5" />
              Klik Analytik
            </CardTitle>
            <ChevronDown className="h-5 w-5 transition-transform duration-200" />
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Date Range Selector */}
            <div className="flex gap-2">
              <Button
                variant={dateRange === "7d" ? "default" : "outline"}
                size="sm"
                onClick={() => setDateRange("7d")}
              >
                7 dage
              </Button>
              <Button
                variant={dateRange === "30d" ? "default" : "outline"}
                size="sm"
                onClick={() => setDateRange("30d")}
              >
                30 dage
              </Button>
              <Button
                variant={dateRange === "90d" ? "default" : "outline"}
                size="sm"
                onClick={() => setDateRange("90d")}
              >
                90 dage
              </Button>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : !hasData ? (
              <div className="text-center py-12">
                <MousePointerClick className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Ingen klik registreret endnu.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Klik vil blive registreret, når brugere klikker på "Hent Bonus" knapperne.
                </p>
              </div>
            ) : (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <MousePointerClick className="h-4 w-4" />
                        <span className="text-xs">Totale Klik</span>
                      </div>
                      <p className="text-2xl font-bold">{stats.totalClicks.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-xs">Top Casino</span>
                      </div>
                      <p className="text-lg font-bold truncate">{stats.topCasino || "-"}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <MousePointerClick className="h-4 w-4" />
                        <span className="text-xs">Gns. Per Dag</span>
                      </div>
                      <p className="text-2xl font-bold">
                        {stats.clicksByDay.length > 0
                          ? Math.round(stats.totalClicks / stats.clicksByDay.length)
                          : 0}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Clicks by Casino - Bar Chart */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Klik per Casino</h3>
                  <ChartContainer config={chartConfig} className="h-[250px] w-full">
                    <BarChart data={stats.clicksByCasino} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />
                      <XAxis type="number" tickLine={false} axisLine={false} />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        tickLine={false} 
                        axisLine={false}
                        width={120}
                        tick={{ fontSize: 12 }}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="clicks" radius={[0, 4, 4, 0]}>
                        {stats.clicksByCasino.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </div>

                {/* Clicks over Time - Line Chart */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Klik over tid</h3>
                  <ChartContainer config={chartConfig} className="h-[200px] w-full">
                    <LineChart data={stats.clicksByDay}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => {
                          const date = new Date(value);
                          return date.toLocaleDateString("da-DK", { day: "numeric", month: "short" });
                        }}
                      />
                      <YAxis tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="clicks"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--primary))", strokeWidth: 0 }}
                      />
                    </LineChart>
                  </ChartContainer>
                </div>

                {/* Recent Clicks Table */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Seneste Klik</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left p-3 font-medium">Casino</th>
                          <th className="text-left p-3 font-medium">Tidspunkt</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clickEvents?.slice(0, 10).map((event) => (
                          <tr key={event.id} className="border-t border-border">
                            <td className="p-3">{event.casino_name}</td>
                            <td className="p-3 text-muted-foreground">
                              {new Date(event.created_at).toLocaleString("da-DK", {
                                day: "numeric",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
