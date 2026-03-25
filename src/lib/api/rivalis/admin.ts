import { apiClient } from "@/lib/api-client";

// ===== Admin Count Stats =====
export interface RivalisAdminCountStat {
  label: string;
  count: number;
  badge_count: number;
}

export const getRivalisAdminCount = async () => {
  return apiClient<RivalisAdminCountStat[]>("/api/rivalis/admin/count");
};

// ===== Platform Growth Trends =====
export interface GrowthDataPoint {
  label: string;
  value: number;
}

export interface PlatformGrowthData {
  day: GrowthDataPoint[];
  week: GrowthDataPoint[];
  month: GrowthDataPoint[];
  year: GrowthDataPoint[];
}

export const getRivalisAdminPlatformGrowth = async () => {
  return apiClient<PlatformGrowthData>("/api/rivalis/admin/platform-growth");
};

// ===== Company Score Distribution =====
export interface ScoreDistribution {
  label: string;
  value: number;
}

export const getRivalisAdminScoreDistribution = async () => {
  return apiClient<ScoreDistribution[]>(
    "/api/rivalis/admin/score-distribution",
  );
};

// ===== Top Companies =====
export interface TopCompany {
  name: string;
  overall_score: number;
  organizer: string;
  website_rank: number;
  social_followers: number;
  funding: string;
}

export const getRivalisAdminTopCompanies = async () => {
  return apiClient<TopCompany[]>("/api/rivalis/admin/top-companies");
};

// ===== Trend Sources Breakdown =====
export interface TrendSourceBreakdown {
  label: string;
  value: number;
}

export const getRivalisAdminTrendSources = async () => {
  return apiClient<TrendSourceBreakdown[]>(
    "/api/rivalis/admin/trend-sources",
  );
};

// ===== Recent Activity =====
export interface RecentActivity {
  date: string;
  organizer: string;
  company: string;
  action: string;
  score: number;
}

export const getRivalisAdminRecentActivity = async () => {
  return apiClient<RecentActivity[]>("/api/rivalis/admin/recent-activity");
};
