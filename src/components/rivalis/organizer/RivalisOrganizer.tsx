"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Building2,
  TrendingUp,
  Globe,
  Search,
  Star,
  Activity,
  Loader2,
  ExternalLink,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { TrendBadge } from "@/components/dashboard/TrendBadge";
import {
  getRivalisOrganizerCount,
  getRivalisOrganizerCompanies,
  getRivalisOrganizerGrowth,
  getRivalisOrganizerScoreTrends,
  getRivalisOrganizerTrendSources,
  RivalisOrganizerCountStat,
  CompanyDetail,
  CompanyGrowthData,
  ScoreTrendsData,
  OrgTrendSource,
} from "@/lib/api/rivalis/organizer";

const COLORS = ["#ec4899", "#d946ef", "#a855f7", "#8b5cf6", "#6366f1"];

// Mock data
const MOCK_STATS: RivalisOrganizerCountStat[] = [
  { label: "My Companies", count: 24, badge_count: 4 },
  { label: "Active Tracking", count: 18, badge_count: 6 },
  { label: "Avg Score", count: 76, badge_count: 3 },
  { label: "Total Searches", count: 342, badge_count: 15 },
];

const MOCK_COMPANIES: CompanyDetail[] = [
  {
    id: 1,
    name: "TechCorp Inc.",
    website: "techcorp.io",
    overall_score: 94,
    funding: "$45M Series C",
    social_followers: 245000,
    website_rank: 1245,
    reddit_trend: "Rising",
    google_trend: "High",
    yelp_trend: "Stable",
    added_date: "2026-03-15",
    status: "Active",
  },
  {
    id: 2,
    name: "InnovateLab",
    website: "innovatelab.com",
    overall_score: 89,
    funding: "$12M Series A",
    social_followers: 128000,
    website_rank: 3210,
    reddit_trend: "Stable",
    google_trend: "Rising",
    yelp_trend: "Rising",
    added_date: "2026-03-12",
    status: "Active",
  },
  {
    id: 3,
    name: "DataFlow Systems",
    website: "dataflow.dev",
    overall_score: 87,
    funding: "$8M Seed",
    social_followers: 89000,
    website_rank: 5670,
    reddit_trend: "Rising",
    google_trend: "Stable",
    yelp_trend: "Declining",
    added_date: "2026-03-10",
    status: "Active",
  },
  {
    id: 4,
    name: "CloudNine Solutions",
    website: "cloudnine.io",
    overall_score: 85,
    funding: "$22M Series B",
    social_followers: 156000,
    website_rank: 2340,
    reddit_trend: "Declining",
    google_trend: "Rising",
    yelp_trend: "Stable",
    added_date: "2026-03-08",
    status: "Active",
  },
  {
    id: 5,
    name: "NovaTech Ventures",
    website: "novatech.co",
    overall_score: 82,
    funding: "$5M Seed",
    social_followers: 67000,
    website_rank: 8900,
    reddit_trend: "Stable",
    google_trend: "Declining",
    yelp_trend: "Rising",
    added_date: "2026-03-05",
    status: "Inactive",
  },
  {
    id: 6,
    name: "QuantumBit AI",
    website: "quantumbit.ai",
    overall_score: 79,
    funding: "$18M Series B",
    social_followers: 98000,
    website_rank: 4560,
    reddit_trend: "Rising",
    google_trend: "High",
    yelp_trend: "Stable",
    added_date: "2026-03-01",
    status: "Active",
  },
];

const MOCK_GROWTH: CompanyGrowthData = {
  day: [
    { label: "00:00", value: 1 },
    { label: "04:00", value: 0 },
    { label: "08:00", value: 2 },
    { label: "12:00", value: 3 },
    { label: "16:00", value: 1 },
    { label: "20:00", value: 2 },
  ],
  week: [
    { label: "Mon", value: 3 },
    { label: "Tue", value: 5 },
    { label: "Wed", value: 2 },
    { label: "Thu", value: 7 },
    { label: "Fri", value: 4 },
    { label: "Sat", value: 1 },
    { label: "Sun", value: 2 },
  ],
  month: [
    { label: "Week 1", value: 8 },
    { label: "Week 2", value: 12 },
    { label: "Week 3", value: 6 },
    { label: "Week 4", value: 10 },
  ],
  year: [
    { label: "Jan", value: 2 },
    { label: "Feb", value: 3 },
    { label: "Mar", value: 5 },
    { label: "Apr", value: 4 },
    { label: "May", value: 6 },
    { label: "Jun", value: 8 },
    { label: "Jul", value: 7 },
    { label: "Aug", value: 9 },
    { label: "Sep", value: 11 },
    { label: "Oct", value: 14 },
    { label: "Nov", value: 18 },
    { label: "Dec", value: 24 },
  ],
};

const MOCK_SCORE_TRENDS: ScoreTrendsData = {
  day: [
    { label: "00:00", value: 72 },
    { label: "04:00", value: 72 },
    { label: "08:00", value: 74 },
    { label: "12:00", value: 73 },
    { label: "16:00", value: 75 },
    { label: "20:00", value: 76 },
  ],
  week: [
    { label: "Mon", value: 71 },
    { label: "Tue", value: 73 },
    { label: "Wed", value: 72 },
    { label: "Thu", value: 74 },
    { label: "Fri", value: 75 },
    { label: "Sat", value: 76 },
    { label: "Sun", value: 76 },
  ],
  month: [
    { label: "Week 1", value: 68 },
    { label: "Week 2", value: 71 },
    { label: "Week 3", value: 74 },
    { label: "Week 4", value: 76 },
  ],
  year: [
    { label: "Jan", value: 58 },
    { label: "Feb", value: 60 },
    { label: "Mar", value: 62 },
    { label: "Apr", value: 65 },
    { label: "May", value: 67 },
    { label: "Jun", value: 69 },
    { label: "Jul", value: 71 },
    { label: "Aug", value: 72 },
    { label: "Sep", value: 73 },
    { label: "Oct", value: 74 },
    { label: "Nov", value: 75 },
    { label: "Dec", value: 76 },
  ],
};

const MOCK_TREND_SOURCES: OrgTrendSource[] = [
  { label: "Google", value: 42 },
  { label: "Reddit", value: 28 },
  { label: "Yelp", value: 18 },
  { label: "Social", value: 12 },
];

export const RivalisOrganizer = ({ onSwitchToAdmin }: { onSwitchToAdmin?: () => void }) => {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month" | "year">("month");

  const [countStats, setCountStats] = useState<RivalisOrganizerCountStat[] | null>(null);
  const [companies, setCompanies] = useState<CompanyDetail[]>([]);
  const [growthData, setGrowthData] = useState<CompanyGrowthData | null>(null);
  const [scoreTrends, setScoreTrends] = useState<ScoreTrendsData | null>(null);
  const [trendSources, setTrendSources] = useState<OrgTrendSource[]>([]);
  const [loadingCount, setLoadingCount] = useState(true);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchCountStats = async () => {
      try {
        setLoadingCount(true);
        const response = await getRivalisOrganizerCount();
        setCountStats(response.status && response.data?.length ? response.data : MOCK_STATS);
      } catch {
        setCountStats(MOCK_STATS);
      } finally {
        setLoadingCount(false);
      }
    };

    const fetchMainData = async () => {
      try {
        setLoadingData(true);
        const [companiesRes, growthRes, scoreRes, trendRes] = await Promise.allSettled([
          getRivalisOrganizerCompanies(),
          getRivalisOrganizerGrowth(),
          getRivalisOrganizerScoreTrends(),
          getRivalisOrganizerTrendSources(),
        ]);

        setCompanies(
          companiesRes.status === "fulfilled" && companiesRes.value.status && companiesRes.value.data?.length
            ? companiesRes.value.data
            : MOCK_COMPANIES,
        );
        setGrowthData(
          growthRes.status === "fulfilled" && growthRes.value.status && growthRes.value.data
            ? growthRes.value.data
            : MOCK_GROWTH,
        );
        setScoreTrends(
          scoreRes.status === "fulfilled" && scoreRes.value.status && scoreRes.value.data
            ? scoreRes.value.data
            : MOCK_SCORE_TRENDS,
        );
        setTrendSources(
          trendRes.status === "fulfilled" && trendRes.value.status && trendRes.value.data?.length
            ? trendRes.value.data
            : MOCK_TREND_SOURCES,
        );
      } catch {
        setCompanies(MOCK_COMPANIES);
        setGrowthData(MOCK_GROWTH);
        setScoreTrends(MOCK_SCORE_TRENDS);
        setTrendSources(MOCK_TREND_SOURCES);
      } finally {
        setLoadingData(false);
      }
    };

    fetchCountStats();
    fetchMainData();
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getStatValue = (label: string): string => {
    if (!countStats) return "0";
    const stat = countStats.find((s) => s.label === label);
    return stat ? formatNumber(stat.count) : "0";
  };

  const getStatBadge = (label: string): string => {
    if (!countStats) return "+0";
    const stat = countStats.find((s) => s.label === label);
    const count = stat?.badge_count || 0;
    return count >= 0 ? `+${count}` : String(count);
  };

  const iconMap: Record<string, ReactNode> = {
    "My Companies": <Building2 className="w-5 h-5" />,
    "Active Tracking": <Activity className="w-5 h-5" />,
    "Avg Score": <Star className="w-5 h-5" />,
    "Total Searches": <Search className="w-5 h-5" />,
  };

  const getGrowthChartData = () => (growthData ? growthData[timeRange] || [] : []);
  const getScoreChartData = () => (scoreTrends ? scoreTrends[timeRange] || [] : []);

  const getTrendStyle = (trend: string) => {
    if (trend === "Rising" || trend === "High")
      return { color: "text-pink-500", bg: "bg-pink-500/10" };
    if (trend === "Declining")
      return { color: "text-red-500", bg: "bg-red-500/10" };
    return { color: "text-purple-500", bg: "bg-purple-500/10" };
  };

  return (
    <ScrollArea className="h-full w-full bg-gradient-to-b from-muted/20 to-background">
      <div className="flex flex-col gap-6 lg:gap-8 px-4 sm:px-8 py-8 max-w-[1600px] mx-auto pb-20">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Rivalis</h1>
            <p className="text-muted-foreground">
              Track your rival companies, monitor scores, and analyze market trends.
            </p>
          </div>
          {onSwitchToAdmin && (
            <Button
              onClick={onSwitchToAdmin}
              variant="outline"
              size="sm"
              className="rounded-full gap-2 shrink-0 border-fuchsia-500/40 text-fuchsia-600 hover:bg-fuchsia-500/10 hover:text-fuchsia-700"
            >
              <Globe className="w-4 h-4" />
              Admin View
            </Button>
          )}
        </div>

        {/* Stats + Hero Card Bento Grid */}
        <div className="grid lg:grid-cols-3 gap-y-5 lg:gap-7.5 items-stretch">
          {/* 2x2 Stat Cards */}
          <div className="lg:col-span-1">
            <div className="grid grid-cols-2 gap-4 lg:gap-6 h-full items-stretch">
              {loadingCount ? (
                <>
                  <StatCardSkeleton />
                  <StatCardSkeleton />
                  <StatCardSkeleton />
                  <StatCardSkeleton />
                </>
              ) : (
                <>
                  <StatCard
                    value={getStatValue("My Companies")}
                    label="My Companies"
                    icon={iconMap["My Companies"]}
                    change={getStatBadge("My Companies")}
                    delay={0}
                  />
                  <StatCard
                    value={getStatValue("Active Tracking")}
                    label="Active Tracking"
                    icon={iconMap["Active Tracking"]}
                    change={getStatBadge("Active Tracking")}
                    highlight
                    delay={100}
                  />
                  <StatCard
                    value={getStatValue("Avg Score")}
                    label="Avg Score"
                    icon={iconMap["Avg Score"]}
                    change={getStatBadge("Avg Score")}
                    delay={200}
                    highlight
                  />
                  <StatCard
                    value={getStatValue("Total Searches")}
                    label="Total Searches"
                    icon={iconMap["Total Searches"]}
                    change={getStatBadge("Total Searches")}
                    delay={300}
                  />
                </>
              )}
            </div>
          </div>

          {/* Large Score Trends Hero Card */}
          <div className="lg:col-span-2">
            <div className="group h-full rounded-[32px] bg-gradient-to-br from-pink-400 via-fuchsia-400 to-purple-400 text-white p-8 lg:p-10 flex flex-col justify-between shadow-xl shadow-pink-400/10 relative overflow-hidden transition-all hover:shadow-2xl hover:shadow-pink-400/20">
              <div className="flex flex-col gap-8 relative z-10 h-full">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/15 rounded-2xl backdrop-blur-md border border-white/10 shadow-inner">
                      <Star className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white/70 uppercase tracking-wider">
                        Average Score Trend
                      </p>
                      <h3 className="text-4xl lg:text-5xl font-bold tracking-tight mt-1 text-white">
                        {loadingData ? (
                          <Loader2 className="w-8 h-8 animate-spin" />
                        ) : (
                          getStatValue("Avg Score")
                        )}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Select
                      value={timeRange}
                      onValueChange={(val: "day" | "week" | "month" | "year") => setTimeRange(val)}
                    >
                      <SelectTrigger className="w-[100px] h-8 bg-white/10 border-white/10 text-white rounded-lg backdrop-blur-md focus:ring-0 focus:ring-offset-0">
                        <SelectValue placeholder="Period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">Day</SelectItem>
                        <SelectItem value="week">Week</SelectItem>
                        <SelectItem value="month">Month</SelectItem>
                        <SelectItem value="year">Year</SelectItem>
                      </SelectContent>
                    </Select>
                    <TrendBadge
                      change={`+${countStats?.find((s) => s.label === "Avg Score")?.badge_count || 3}%`}
                      tone="positive"
                      className="text-white border-white/10 backdrop-blur-md px-3 py-1"
                    />
                  </div>
                </div>

                {/* Score Chart */}
                <div className="flex-1 w-full min-h-[140px] -ml-2 relative">
                  {loadingData ? (
                    <div className="flex items-center justify-center h-full">
                      <Loader2 className="w-8 h-8 animate-spin text-white/70" />
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={getScoreChartData()}>
                        <defs>
                          <linearGradient id="colorScoreRivalis" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#fff" stopOpacity={0.35} />
                            <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            borderRadius: "16px",
                            border: "none",
                            color: "#ec4899",
                            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
                          }}
                          itemStyle={{ color: "#ec4899", fontWeight: 600 }}
                          formatter={(value: number) => [`${value}/100`, "Avg Score"]}
                          cursor={{ stroke: "rgba(255,255,255,0.3)", strokeWidth: 1, strokeDasharray: "5 5" }}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#fff"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#colorScoreRivalis)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>

                {/* Bottom Metrics */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Companies</span>
                    <span className="text-xl font-bold text-white">{companies.length}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-l border-white/10 pl-6">
                    <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Active</span>
                    <span className="text-xl font-bold text-white">
                      {companies.filter((c) => c.status === "Active").length}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 border-l border-white/10 pl-6">
                    <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Top Score</span>
                    <span className="text-xl font-bold text-white">
                      {companies.length > 0 ? Math.max(...companies.map((c) => c.overall_score)) : 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-[80px] pointer-events-none mix-blend-overlay" />
              <div className="absolute -left-20 bottom-0 w-60 h-60 bg-pink-300/30 rounded-full blur-[60px] pointer-events-none mix-blend-multiply" />
            </div>
          </div>
        </div>

        {/* Company Growth + Trend Sources */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          <Card className="rounded-[32px] border-border/40 shadow-sm overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-fuchsia-500" />
                Companies Added
              </CardTitle>
              <CardDescription>Your company tracking growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getGrowthChartData()}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
                    <XAxis dataKey="label" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <RechartsTooltip
                      cursor={{ fill: "transparent" }}
                      contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                    />
                    <Bar dataKey="value" name="Companies" fill="#ec4899" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[32px] border-border/40 shadow-sm flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Globe className="w-5 h-5 text-purple-500" />
                Trend Sources
              </CardTitle>
              <CardDescription>Where your company intelligence originates</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
              <div className="h-[220px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={trendSources.map((s) => ({ name: s.label, value: s.value }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {trendSources.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-bold text-foreground">
                    {trendSources.reduce((a, b) => a + b.value, 0)}%
                  </span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Sources</span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {trendSources.map((item, index) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-sm text-muted-foreground">
                      {item.label} ({item.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Companies Detail Table */}
        <Card className="rounded-[32px] border-border/40 shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold">My Companies</CardTitle>
              <CardDescription>All companies you are tracking with detailed analytics</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="rounded-full gap-2">
              <Search className="w-4 h-4" />
              Add Company
            </Button>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/30 text-muted-foreground uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 font-semibold">Company</th>
                  <th className="px-6 py-4 font-semibold text-center">Score</th>
                  <th className="px-6 py-4 font-semibold">Funding</th>
                  <th className="px-6 py-4 font-semibold text-right">Social</th>
                  <th className="px-6 py-4 font-semibold text-center">SEO Rank</th>
                  <th className="px-6 py-4 font-semibold">Trends</th>
                  <th className="px-6 py-4 font-semibold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {companies.map((company) => (
                  <tr key={company.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground">{company.name}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" />
                          {company.website}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={cn(
                          "inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold",
                          company.overall_score >= 80
                            ? "bg-pink-500/10 text-pink-600"
                            : company.overall_score >= 60
                              ? "bg-purple-500/10 text-purple-600"
                              : "bg-red-500/10 text-red-600",
                        )}
                      >
                        {company.overall_score}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-fuchsia-500" />
                        <span className="font-medium text-foreground">{company.funding}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-medium">
                      {(company.social_followers / 1000).toFixed(0)}K
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-medium text-foreground">#{company.website_rank.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1.5 flex-wrap">
                        {[
                          { source: "Reddit", trend: company.reddit_trend },
                          { source: "Google", trend: company.google_trend },
                          { source: "Yelp", trend: company.yelp_trend },
                        ].map((t) => {
                          const style = getTrendStyle(t.trend);
                          return (
                            <span
                              key={t.source}
                              className={cn(
                                "px-2 py-0.5 rounded-full text-[10px] font-bold",
                                style.bg,
                                style.color,
                              )}
                              title={`${t.source}: ${t.trend}`}
                            >
                              {t.source[0]}:{" "}
                              {t.trend === "Rising" || t.trend === "High"
                                ? "↑"
                                : t.trend === "Declining"
                                  ? "↓"
                                  : "→"}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={cn(
                          "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border backdrop-blur-sm",
                          company.status === "Active"
                            ? "bg-fuchsia-500/10 text-fuchsia-600 border-fuchsia-500/20"
                            : "bg-muted text-muted-foreground border-border",
                        )}
                      >
                        {company.status === "Active" && (
                          <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 mr-1.5 animate-pulse" />
                        )}
                        {company.status}
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
  delay = 0,
}: {
  value: string;
  label: string;
  icon: ReactNode;
  change: string;
  tone?: "positive" | "negative";
  highlight?: boolean;
  delay?: number;
}) => (
  <div
    className={cn(
      "group flex flex-col justify-between gap-4 h-full rounded-[28px] p-5 lg:p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
      highlight
        ? "bg-gradient-to-br from-pink-400 to-purple-400 text-white border-transparent shadow-lg shadow-pink-400/25"
        : "bg-card border-border/40 hover:border-border/80",
    )}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex justify-between items-start">
      <div
        className={cn(
          "p-2.5 rounded-xl transition-transform group-hover:scale-110 duration-300",
          highlight ? "bg-white/20 backdrop-blur-sm" : "bg-muted/50",
        )}
      >
        {icon}
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

const StatCardSkeleton = () => (
  <div className="flex flex-col justify-between gap-4 h-full rounded-[28px] p-5 lg:p-6 border bg-card border-border/40 animate-pulse">
    <div className="flex justify-between items-start">
      <div className="p-2.5 rounded-xl bg-muted/50 w-10 h-10" />
      <div className="h-6 w-12 rounded-full bg-muted/50" />
    </div>
    <div className="flex flex-col gap-2">
      <div className="h-8 w-20 rounded bg-muted/50" />
      <div className="h-4 w-24 rounded bg-muted/50" />
    </div>
  </div>
);
