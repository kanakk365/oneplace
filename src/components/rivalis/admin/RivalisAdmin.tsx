"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Users,
  Activity,
  Building2,
  TrendingUp,
  Globe,
  Search,
  Star,
  BarChart3,
  Loader2,
  Download,
  DollarSign,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { cn } from "@/lib/utils";
import {
  getRivalisAdminCount,
  getRivalisAdminPlatformGrowth,
  getRivalisAdminScoreDistribution,
  getRivalisAdminTopCompanies,
  getRivalisAdminTrendSources,
  getRivalisAdminRecentActivity,
  RivalisAdminCountStat,
  PlatformGrowthData,
  ScoreDistribution,
  TopCompany,
  TrendSourceBreakdown,
  RecentActivity,
} from "@/lib/api/rivalis/admin";

const COLORS = ["#ec4899", "#d946ef", "#a855f7", "#8b5cf6", "#6366f1"];

// Mock data for when API returns empty
const MOCK_STATS: RivalisAdminCountStat[] = [
  { label: "Total Organizers", count: 148, badge_count: 12 },
  { label: "Total Companies", count: 2847, badge_count: 18 },
  { label: "Active Companies", count: 1923, badge_count: 8 },
  { label: "Avg Score", count: 72, badge_count: 5 },
  { label: "Total Searches", count: 15420, badge_count: 24 },
];

const MOCK_GROWTH: PlatformGrowthData = {
  day: [
    { label: "00:00", value: 12 },
    { label: "04:00", value: 8 },
    { label: "08:00", value: 24 },
    { label: "12:00", value: 38 },
    { label: "16:00", value: 45 },
    { label: "20:00", value: 32 },
  ],
  week: [
    { label: "Mon", value: 120 },
    { label: "Tue", value: 145 },
    { label: "Wed", value: 198 },
    { label: "Thu", value: 167 },
    { label: "Fri", value: 210 },
    { label: "Sat", value: 89 },
    { label: "Sun", value: 76 },
  ],
  month: [
    { label: "Week 1", value: 580 },
    { label: "Week 2", value: 720 },
    { label: "Week 3", value: 845 },
    { label: "Week 4", value: 910 },
  ],
  year: [
    { label: "Jan", value: 1200 },
    { label: "Feb", value: 1450 },
    { label: "Mar", value: 1680 },
    { label: "Apr", value: 1920 },
    { label: "May", value: 2100 },
    { label: "Jun", value: 2350 },
    { label: "Jul", value: 2480 },
    { label: "Aug", value: 2600 },
    { label: "Sep", value: 2720 },
    { label: "Oct", value: 2847 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ],
};

const MOCK_SCORE_DISTRIBUTION: ScoreDistribution[] = [
  { label: "Excellent (80-100)", value: 35 },
  { label: "Good (60-79)", value: 28 },
  { label: "Average (40-59)", value: 22 },
  { label: "Below Avg (20-39)", value: 10 },
  { label: "Poor (0-19)", value: 5 },
];

const MOCK_TOP_COMPANIES: TopCompany[] = [
  {
    name: "TechCorp Inc.",
    overall_score: 94,
    organizer: "John Smith",
    website_rank: 1245,
    social_followers: 245000,
    funding: "$45M Series C",
  },
  {
    name: "InnovateLab",
    overall_score: 89,
    organizer: "Sarah Johnson",
    website_rank: 3210,
    social_followers: 128000,
    funding: "$12M Series A",
  },
  {
    name: "DataFlow Systems",
    overall_score: 87,
    organizer: "Mike Chen",
    website_rank: 5670,
    social_followers: 89000,
    funding: "$8M Seed",
  },
  {
    name: "CloudNine Solutions",
    overall_score: 85,
    organizer: "Emily Davis",
    website_rank: 2340,
    social_followers: 156000,
    funding: "$22M Series B",
  },
  {
    name: "NovaTech Ventures",
    overall_score: 82,
    organizer: "Alex Wilson",
    website_rank: 8900,
    social_followers: 67000,
    funding: "$5M Seed",
  },
  {
    name: "QuantumBit AI",
    overall_score: 79,
    organizer: "Lisa Park",
    website_rank: 4560,
    social_followers: 98000,
    funding: "$18M Series B",
  },
];

const MOCK_TREND_SOURCES: TrendSourceBreakdown[] = [
  { label: "Google Trends", value: 38 },
  { label: "Reddit", value: 24 },
  { label: "Yelp", value: 18 },
  { label: "Social Media", value: 12 },
  { label: "Other", value: 8 },
];

const MOCK_RECENT_ACTIVITY: RecentActivity[] = [
  {
    date: "2026-03-24",
    organizer: "John Smith",
    company: "TechCorp Inc.",
    action: "Added",
    score: 94,
  },
  {
    date: "2026-03-23",
    organizer: "Sarah Johnson",
    company: "InnovateLab",
    action: "Updated",
    score: 89,
  },
  {
    date: "2026-03-23",
    organizer: "Mike Chen",
    company: "DataFlow Systems",
    action: "Added",
    score: 87,
  },
  {
    date: "2026-03-22",
    organizer: "Emily Davis",
    company: "CloudNine Solutions",
    action: "Analyzed",
    score: 85,
  },
  {
    date: "2026-03-22",
    organizer: "Alex Wilson",
    company: "NovaTech Ventures",
    action: "Added",
    score: 82,
  },
  {
    date: "2026-03-21",
    organizer: "Lisa Park",
    company: "QuantumBit AI",
    action: "Updated",
    score: 79,
  },
];

export const RivalisAdmin = ({ onSwitchToOrganizer }: { onSwitchToOrganizer?: () => void }) => {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month" | "year">(
    "week",
  );

  const [stats, setStats] = useState<RivalisAdminCountStat[]>([]);
  const [growthData, setGrowthData] = useState<PlatformGrowthData | null>(null);
  const [scoreDistribution, setScoreDistribution] = useState<ScoreDistribution[]>([]);
  const [topCompanies, setTopCompanies] = useState<TopCompany[]>([]);
  const [trendSources, setTrendSources] = useState<TrendSourceBreakdown[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsRes, growthRes, scoreRes, topRes, trendRes, activityRes] =
          await Promise.allSettled([
            getRivalisAdminCount(),
            getRivalisAdminPlatformGrowth(),
            getRivalisAdminScoreDistribution(),
            getRivalisAdminTopCompanies(),
            getRivalisAdminTrendSources(),
            getRivalisAdminRecentActivity(),
          ]);

        setStats(
          statsRes.status === "fulfilled" && statsRes.value.status && statsRes.value.data?.length
            ? statsRes.value.data
            : MOCK_STATS,
        );
        setGrowthData(
          growthRes.status === "fulfilled" && growthRes.value.status && growthRes.value.data
            ? growthRes.value.data
            : MOCK_GROWTH,
        );
        setScoreDistribution(
          scoreRes.status === "fulfilled" && scoreRes.value.status && scoreRes.value.data?.length
            ? scoreRes.value.data
            : MOCK_SCORE_DISTRIBUTION,
        );
        setTopCompanies(
          topRes.status === "fulfilled" && topRes.value.status && topRes.value.data?.length
            ? topRes.value.data
            : MOCK_TOP_COMPANIES,
        );
        setTrendSources(
          trendRes.status === "fulfilled" && trendRes.value.status && trendRes.value.data?.length
            ? trendRes.value.data
            : MOCK_TREND_SOURCES,
        );
        setRecentActivity(
          activityRes.status === "fulfilled" && activityRes.value.status && activityRes.value.data?.length
            ? activityRes.value.data
            : MOCK_RECENT_ACTIVITY,
        );
      } catch (e) {
        console.error("Failed to fetch Rivalis admin data", e);
        setStats(MOCK_STATS);
        setGrowthData(MOCK_GROWTH);
        setScoreDistribution(MOCK_SCORE_DISTRIBUTION);
        setTopCompanies(MOCK_TOP_COMPANIES);
        setTrendSources(MOCK_TREND_SOURCES);
        setRecentActivity(MOCK_RECENT_ACTIVITY);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatCount = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toLocaleString();
  };

  const getStatConfig = (label: string) => {
    if (label.includes("Organizers"))
      return { icon: <Users className="w-6 h-6 text-pink-500" />, bg: "bg-pink-500/10" };
    if (label.includes("Total Companies"))
      return { icon: <Building2 className="w-6 h-6 text-fuchsia-500" />, bg: "bg-fuchsia-500/10" };
    if (label.includes("Active"))
      return { icon: <Activity className="w-6 h-6 text-purple-500" />, bg: "bg-purple-500/10" };
    if (label.includes("Score"))
      return { icon: <Star className="w-6 h-6 text-violet-500" />, bg: "bg-violet-500/10" };
    if (label.includes("Searches"))
      return { icon: <Search className="w-6 h-6 text-indigo-500" />, bg: "bg-indigo-500/10", highlight: true };
    return { icon: <BarChart3 className="w-6 h-6 text-gray-500" />, bg: "bg-gray-100" };
  };

  const growthChartData = growthData ? (growthData[timeRange] || []) : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
      </div>
    );
  }

  return (
    <ScrollArea className="h-full w-full bg-gradient-to-b from-muted/20 to-background">
      <div className="flex flex-col gap-8 px-4 sm:px-8 py-8 max-w-[1600px] mx-auto pb-20">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
              <Globe className="w-8 h-8 text-pink-500" />
              Rivalis Admin Portal
            </h1>
            <p className="text-muted-foreground">
              Platform-wide overview: Organizers, Companies, Scores, and Trends
              across all users.
            </p>
          </div>
          {onSwitchToOrganizer && (
            <Button
              onClick={onSwitchToOrganizer}
              variant="outline"
              size="sm"
              className="rounded-full gap-2 shrink-0 border-pink-500/40 text-pink-600 hover:bg-pink-500/10 hover:text-pink-700"
            >
              <Users className="w-4 h-4" />
              Organizer View
            </Button>
          )}
        </div>

        {/* Top Level Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {stats.map((stat, i) => {
            const config = getStatConfig(stat.label);
            return (
              <StatCard
                key={i}
                value={formatCount(stat.count)}
                label={stat.label}
                change={stat.badge_count > 0 ? `+${stat.badge_count}%` : "0%"}
                icon={config.icon}
                highlight={"highlight" in config ? config.highlight : false}
                bg={config.bg}
              />
            );
          })}
        </div>

        {/* Platform Growth + Score Distribution */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 rounded-[32px] border-border/40 shadow-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle className="text-xl font-bold">Platform Growth</CardTitle>
                <CardDescription>
                  Companies added over time across all organizers
                </CardDescription>
              </div>
              <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-full">
                {(["day", "week", "month", "year"] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={cn(
                      "px-3 py-1 text-xs font-medium rounded-full transition-all",
                      timeRange === range
                        ? "bg-white dark:bg-zinc-800 shadow-sm text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthChartData}>
                    <defs>
                      <linearGradient id="colorGrowthRivalis" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="hsl(var(--border))"
                      opacity={0.4}
                    />
                    <XAxis dataKey="label" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <RechartsTooltip
                      contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                      formatter={(value: number) => [value.toLocaleString(), "Companies"]}
                    />
                    <Area type="monotone" dataKey="value" stroke="#ec4899" strokeWidth={3} fill="url(#colorGrowthRivalis)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[32px] border-border/40 shadow-sm flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Score Distribution</CardTitle>
              <CardDescription>Company scores across the platform</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
              <div className="h-[250px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={scoreDistribution.map((s) => ({ name: s.label, value: s.value }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {scoreDistribution.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-bold text-foreground">
                    {scoreDistribution.reduce((a, b) => a + b.value, 0)}%
                  </span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Breakdown</span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                {scoreDistribution.map((item, index) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-xs text-muted-foreground">
                      {item.label} ({item.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trend Sources + Top Companies */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="rounded-[32px] border-border/40 shadow-sm flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-fuchsia-500" />
                Trend Source Breakdown
              </CardTitle>
              <CardDescription>Where company trend data originates from</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col pb-6">
              <div className="flex-1 w-full min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trendSources} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
                    <XAxis dataKey="label" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} dy={4} height={30} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} domain={[0, 'auto']} />
                    <RechartsTooltip
                      cursor={{ fill: "transparent" }}
                      contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                      formatter={(value: number) => [`${value}%`, "Share"]}
                    />
                    <Bar dataKey="value" name="Trend Share" fill="#d946ef" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[32px] border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-pink-500" />
                Top Rated Companies
              </CardTitle>
              <CardDescription>Highest scoring companies on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topCompanies.slice(0, 6).map((company, i) => (
                  <div
                    key={company.name}
                    className="flex items-center justify-between p-3 rounded-2xl bg-muted/30 border border-transparent hover:border-border/50 hover:bg-muted/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 flex items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground">{company.name}</span>
                        <span className="text-xs text-muted-foreground">
                          by {company.organizer} • Rank #{company.website_rank}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">
                        {(company.social_followers / 1000).toFixed(0)}K followers
                      </span>
                      <span
                        className={cn(
                          "font-bold text-sm px-2.5 py-1 rounded-full",
                          company.overall_score >= 80
                            ? "bg-pink-500/10 text-pink-600"
                            : company.overall_score >= 60
                              ? "bg-purple-500/10 text-purple-600"
                              : "bg-red-500/10 text-red-600",
                        )}
                      >
                        {company.overall_score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Table */}
        <Card className="rounded-[32px] border-border/40 shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
              <CardDescription>Latest actions across all organizers</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="rounded-full gap-2">
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/30 text-muted-foreground uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Organizer</th>
                  <th className="px-6 py-4 font-semibold">Company</th>
                  <th className="px-6 py-4 font-semibold">Action</th>
                  <th className="px-6 py-4 font-semibold text-right">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {recentActivity.map((item, i) => (
                  <tr key={i} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{item.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-pink-500/10 flex items-center justify-center">
                          <Users className="w-3.5 h-3.5 text-pink-500" />
                        </div>
                        <span className="font-medium text-foreground">{item.organizer}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-foreground">{item.company}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded-full text-xs font-bold border backdrop-blur-sm",
                          item.action === "Added"
                            ? "bg-pink-500/10 text-pink-600 border-pink-500/20"
                            : item.action === "Updated"
                              ? "bg-purple-500/10 text-purple-600 border-purple-500/20"
                              : "bg-fuchsia-500/10 text-fuchsia-600 border-fuchsia-500/20",
                        )}
                      >
                        {item.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={cn(
                          "font-bold",
                          item.score >= 80
                            ? "text-pink-500"
                            : item.score >= 60
                              ? "text-purple-500"
                              : "text-red-500",
                        )}
                      >
                        {item.score}/100
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
};

const StatCard = ({
  value,
  label,
  icon,
  change,
  tone = "positive",
  highlight = false,
  bg,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
  change: string;
  tone?: "positive" | "negative";
  highlight?: boolean;
  bg?: string;
}) => (
  <div
    className={cn(
      "group flex flex-col justify-between gap-4 h-full rounded-[28px] p-5 lg:p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
      highlight
        ? "bg-gradient-to-br from-pink-500 to-purple-600 text-white border-transparent shadow-lg shadow-pink-500/25"
        : "bg-card border-border/40 hover:border-border/80",
    )}
  >
    <div className="flex justify-between items-start">
      <div
        className={cn(
          "p-2.5 rounded-xl transition-transform group-hover:scale-110 duration-300",
          highlight ? "bg-white/20 backdrop-blur-sm" : bg || "bg-muted/50",
        )}
      >
        {highlight ? <Search className="w-6 h-6 text-white" /> : icon}
      </div>
      <span
        className={cn(
          "text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm",
          highlight
            ? "bg-white/20 text-white"
            : tone === "positive"
              ? "bg-purple-500/10 text-purple-600 dark:text-purple-400"
              : "bg-red-500/10 text-red-600 dark:text-red-400",
        )}
      >
        {change}
      </span>
    </div>
    <div className="flex flex-col gap-1">
      <span className={cn("text-3xl font-bold tracking-tight", highlight ? "text-white" : "text-foreground")}>
        {value}
      </span>
      <span className={cn("text-sm font-medium", highlight ? "text-white/80" : "text-muted-foreground")}>
        {label}
      </span>
    </div>
  </div>
);
