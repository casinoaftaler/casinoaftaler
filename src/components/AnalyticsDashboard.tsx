import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Loader2 } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;
import { useQuery } from "@tanstack/react-query";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";

interface AnalyticsData {
  date: string;
  visitors: number;
  pageViews: number;
}

const chartConfig = {
  visitors: {
    label: "Besøgende",
    color: "hsl(var(--primary))",
  },
  pageViews: {
    label: "Sidevisninger",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

export function AnalyticsDashboard() {
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
      startDate: start.toISOString().split("T")[0],
      endDate: end.toISOString().split("T")[0],
      granularity: dateRange === "7d" ? "hourly" : "daily",
    };
  };

  const { data: analyticsData, isLoading, error } = useQuery({
    queryKey: ["analytics", dateRange],
    queryFn: async () => {
      const { startDate, endDate, granularity } = getDateRange();
      
      // This will be populated from the actual analytics API
      // For now, return mock data structure
      const response = await fetch(
        `/api/analytics?start=${startDate}&end=${endDate}&granularity=${granularity}`
      ).catch(() => null);
      
      if (!response || !response.ok) {
        // Return empty data if no analytics available
        return [] as AnalyticsData[];
      }
      
      return response.json() as Promise<AnalyticsData[]>;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });

  const stats = useMemo(() => {
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
    
    // Calculate trend (compare last half to first half)
    const midpoint = Math.floor(analyticsData.length / 2);
    const firstHalf = analyticsData.slice(0, midpoint).reduce((sum, d) => sum + d.visitors, 0);
    const secondHalf = analyticsData.slice(midpoint).reduce((sum, d) => sum + d.visitors, 0);
    const trend = firstHalf > 0 ? Math.round(((secondHalf - firstHalf) / firstHalf) * 100) : 0;

    return { totalVisitors, totalPageViews, avgVisitorsPerDay, trend };
  }, [analyticsData]);

  const hasData = analyticsData && analyticsData.length > 0;

  return (
    <Collapsible>
      <Card className="mb-8">
        <CollapsibleTrigger className="w-full">
          <CardHeader className="flex flex-row items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors [&[data-state=open]>svg]:rotate-180">
            <CardTitle className="flex items-center gap-2">
              <MenuIcon iconName="bar-chart3" className="h-5 w-5" />
              Side Analytik
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
                <MenuIcon iconName="bar-chart3" className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Ingen analytik data tilgængelig endnu.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Analytik vil blive vist her, når din side begynder at modtage trafik.
                </p>
              </div>
            ) : (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <MenuIcon iconName="users" className="h-4 w-4" />
                        <span className="text-xs">Besøgende</span>
                      </div>
                      <p className="text-2xl font-bold">{stats.totalVisitors.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <MenuIcon iconName="eye" className="h-4 w-4" />
                        <span className="text-xs">Sidevisninger</span>
                      </div>
                      <p className="text-2xl font-bold">{stats.totalPageViews.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <MenuIcon iconName="bar-chart3" className="h-4 w-4" />
                        <span className="text-xs">Gns. Per Dag</span>
                      </div>
                      <p className="text-2xl font-bold">{stats.avgVisitorsPerDay.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <MenuIcon iconName="trending-up" className="h-4 w-4" />
                        <span className="text-xs">Tendens</span>
                      </div>
                      <p className={`text-2xl font-bold ${stats.trend >= 0 ? "text-emerald-500" : "text-destructive"}`}>
                        {stats.trend >= 0 ? "+" : ""}{stats.trend}%
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Visitors Chart */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Besøgende over tid</h3>
                  <ChartContainer config={chartConfig} className="h-[250px] w-full">
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

                {/* Page Views Chart */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Sidevisninger</h3>
                  <ChartContainer config={chartConfig} className="h-[200px] w-full">
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
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
