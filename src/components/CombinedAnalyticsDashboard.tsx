import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, BarChart3, TrendingUp, Users, Eye, Loader2, MousePointerClick } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, BarChart, Bar, LineChart, Line, Cell } from "recharts";

interface AnalyticsData {
  date: string;
  visitors: number;
  pageViews: number;
}

interface ClickEvent {
  id: string;
  casino_id: string;
  casino_slug: string;
  casino_name: string;
  event_type: string;
  created_at: string;
  user_id: string | null;
  profiles: { twitch_username: string | null } | null;
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

const pageChartConfig = {
  visitors: {
    label: "Besøgende",
    color: "hsl(var(--primary))",
  },
  pageViews: {
    label: "Sidevisninger",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

const clickChartConfig = {
  clicks: {
    label: "Klik",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function CombinedAnalyticsDashboard() {
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
    
    return {
      start,
      end,
      startDate: start.toISOString().split("T")[0],
      endDate: end.toISOString().split("T")[0],
      granularity: dateRange === "7d" ? "hourly" : "daily",
    };
  };

  // Page Analytics Query - fetch from page_views table
  const { data: pageViewsData, isLoading: analyticsLoading } = useQuery({
    queryKey: ["page-analytics", dateRange],
    queryFn: async () => {
      const { start } = getDateRange();
      
      const { data, error } = await supabase
        .from("page_views")
        .select("id, path, created_at")
        .gte("created_at", start.toISOString())
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });

  // Process page views into daily/hourly analytics data
  const analyticsData = useMemo(() => {
    if (!pageViewsData || pageViewsData.length === 0) return [];

    const groupedData: Record<string, { visitors: Set<string>; pageViews: number }> = {};

    pageViewsData.forEach((view) => {
      const date = new Date(view.created_at);
      const key = dateRange === "7d" 
        ? date.toISOString().split("T")[0] + "T" + date.getHours().toString().padStart(2, "0") + ":00"
        : date.toISOString().split("T")[0];

      if (!groupedData[key]) {
        groupedData[key] = { visitors: new Set(), pageViews: 0 };
      }
      
      // Use a simple hash of path + hour as visitor approximation
      const visitorKey = `${view.path}-${date.getHours()}`;
      groupedData[key].visitors.add(visitorKey);
      groupedData[key].pageViews++;
    });

    return Object.entries(groupedData)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, data]) => ({
        date,
        visitors: data.visitors.size,
        pageViews: data.pageViews,
      }));
  }, [pageViewsData, dateRange]);

  // Click Analytics Query
  const { data: clickEvents, isLoading: clicksLoading } = useQuery({
    queryKey: ["click-events", dateRange],
    queryFn: async () => {
      const { start } = getDateRange();
      
      // First fetch click events
      const { data: clicks, error: clicksError } = await supabase
        .from("click_events")
        .select("id, casino_id, casino_slug, casino_name, event_type, created_at, user_id")
        .gte("created_at", start.toISOString())
        .order("created_at", { ascending: false });

      if (clicksError) throw clicksError;
      
      // Get unique user IDs that are not null
      const userIds = [...new Set(clicks?.filter(c => c.user_id).map(c => c.user_id) || [])];
      
      // Fetch profiles for those users
      let profilesMap: Record<string, string | null> = {};
      if (userIds.length > 0) {
        const { data: profiles } = await supabase
          .from("profiles")
          .select("user_id, twitch_username")
          .in("user_id", userIds);
        
        if (profiles) {
          profilesMap = profiles.reduce((acc, p) => {
            acc[p.user_id] = p.twitch_username;
            return acc;
          }, {} as Record<string, string | null>);
        }
      }
      
      // Merge profiles into click events
      return (clicks || []).map(click => ({
        ...click,
        profiles: click.user_id ? { twitch_username: profilesMap[click.user_id] || null } : null
      })) as ClickEvent[];
    },
  });

  const pageStats = useMemo(() => {
    if (!analyticsData || analyticsData.length === 0) {
      return {
        totalVisitors: 0,
        totalPageViews: 0,
        avgVisitorsPerDay: 0,
        trend: 0,
      };
    }

    const totalVisitors = analyticsData.reduce((sum, d) => sum + d.visitors, 0);
    const totalPageViews = analyticsData.reduce((sum, d) => sum + d.pageViews, 0);
    const avgVisitorsPerDay = Math.round(totalVisitors / analyticsData.length);
    
    const midpoint = Math.floor(analyticsData.length / 2);
    const firstHalf = analyticsData.slice(0, midpoint).reduce((sum, d) => sum + d.visitors, 0);
    const secondHalf = analyticsData.slice(midpoint).reduce((sum, d) => sum + d.visitors, 0);
    const trend = firstHalf > 0 ? Math.round(((secondHalf - firstHalf) / firstHalf) * 100) : 0;

    return { totalVisitors, totalPageViews, avgVisitorsPerDay, trend };
  }, [analyticsData]);

  const clickStats = useMemo(() => {
    if (!clickEvents || clickEvents.length === 0) {
      return {
        totalClicks: 0,
        clicksByCasino: [] as CasinoClickStats[],
        clicksByDay: [] as { date: string; clicks: number }[],
        topCasino: null as string | null,
      };
    }

    const totalClicks = clickEvents.length;

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

    const topCasino = clicksByCasino.length > 0 ? clicksByCasino[0].name : null;

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

  const hasPageData = analyticsData && analyticsData.length > 0;
  const hasClickData = clickEvents && clickEvents.length > 0;

  return (
    <Collapsible defaultOpen>
      <Card className="mb-8">
        <CollapsibleTrigger className="w-full">
          <CardHeader className="flex flex-row items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors [&[data-state=open]>svg]:rotate-180">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Analytik
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

            {/* Tabs for Page Analytics and Click Analytics */}
            <Tabs defaultValue="clicks" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="page" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Side Analytik
                </TabsTrigger>
                <TabsTrigger value="clicks" className="flex items-center gap-2">
                  <MousePointerClick className="h-4 w-4" />
                  Klik Analytik
                </TabsTrigger>
              </TabsList>

              {/* Page Analytics Tab */}
              <TabsContent value="page" className="space-y-6 mt-4">
                {analyticsLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : !hasPageData ? (
                  <div className="text-center py-12">
                    <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Ingen analytik data tilgængelig endnu.
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Analytik vil blive vist her, når din side begynder at modtage trafik.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Users className="h-4 w-4" />
                            <span className="text-xs">Besøgende</span>
                          </div>
                          <p className="text-2xl font-bold">{pageStats.totalVisitors.toLocaleString()}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Eye className="h-4 w-4" />
                            <span className="text-xs">Sidevisninger</span>
                          </div>
                          <p className="text-2xl font-bold">{pageStats.totalPageViews.toLocaleString()}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <BarChart3 className="h-4 w-4" />
                            <span className="text-xs">Gns. Per Dag</span>
                          </div>
                          <p className="text-2xl font-bold">{pageStats.avgVisitorsPerDay.toLocaleString()}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <TrendingUp className="h-4 w-4" />
                            <span className="text-xs">Tendens</span>
                          </div>
                          <p className={`text-2xl font-bold ${pageStats.trend >= 0 ? "text-emerald-500" : "text-destructive"}`}>
                            {pageStats.trend >= 0 ? "+" : ""}{pageStats.trend}%
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-3">Besøgende over tid</h3>
                      <ChartContainer config={pageChartConfig} className="h-[250px] w-full">
                        <AreaChart data={analyticsData}>
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
                          <Area
                            type="monotone"
                            dataKey="visitors"
                            stroke="hsl(var(--primary))"
                            fill="hsl(var(--primary))"
                            fillOpacity={0.2}
                            strokeWidth={2}
                          />
                        </AreaChart>
                      </ChartContainer>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-3">Sidevisninger</h3>
                      <ChartContainer config={pageChartConfig} className="h-[200px] w-full">
                        <BarChart data={analyticsData}>
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
                          <Bar
                            dataKey="pageViews"
                            fill="hsl(var(--accent))"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ChartContainer>
                    </div>
                  </>
                )}
              </TabsContent>

              {/* Click Analytics Tab */}
              <TabsContent value="clicks" className="space-y-6 mt-4">
                {clicksLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : !hasClickData ? (
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
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <MousePointerClick className="h-4 w-4" />
                            <span className="text-xs">Totale Klik</span>
                          </div>
                          <p className="text-2xl font-bold">{clickStats.totalClicks.toLocaleString()}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <TrendingUp className="h-4 w-4" />
                            <span className="text-xs">Top Casino</span>
                          </div>
                          <p className="text-lg font-bold truncate">{clickStats.topCasino || "-"}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <MousePointerClick className="h-4 w-4" />
                            <span className="text-xs">Gns. Per Dag</span>
                          </div>
                          <p className="text-2xl font-bold">
                            {clickStats.clicksByDay.length > 0
                              ? Math.round(clickStats.totalClicks / clickStats.clicksByDay.length)
                              : 0}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-3">Klik per Casino</h3>
                      <ChartContainer config={clickChartConfig} className="h-[250px] w-full">
                        <BarChart data={clickStats.clicksByCasino} layout="vertical">
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
                            {clickStats.clicksByCasino.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ChartContainer>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-3">Klik over tid</h3>
                      <ChartContainer config={clickChartConfig} className="h-[200px] w-full">
                        <LineChart data={clickStats.clicksByDay}>
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

                    <div>
                      <h3 className="text-sm font-medium mb-3">Seneste Klik</h3>
                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-muted/50">
                            <tr>
                              <th className="text-left p-3 font-medium">Casino</th>
                              <th className="text-left p-3 font-medium">Bruger</th>
                              <th className="text-left p-3 font-medium">Tidspunkt</th>
                            </tr>
                          </thead>
                          <tbody>
                            {clickEvents?.slice(0, 10).map((event) => (
                              <tr key={event.id} className="border-t border-border">
                                <td className="p-3">{event.casino_name}</td>
                                <td className="p-3 text-muted-foreground">
                                  {event.profiles?.twitch_username || "Anonym"}
                                </td>
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
              </TabsContent>
            </Tabs>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
