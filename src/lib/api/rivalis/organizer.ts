import { apiClient } from "@/lib/api-client";

// ===== Organizer Count Stats =====
export interface RivalisOrganizerCountStat {
  label: string;
  count: number;
  badge_count: number;
}

export const getRivalisOrganizerCount = async () => {
  return apiClient<RivalisOrganizerCountStat[]>(
    "/api/rivalis/organizer/count",
  );
};

// ===== Companies List =====
export interface CompanyDetail {
  id: number;
  name: string;
  website: string;
  overall_score: number;
  funding: string;
  social_followers: number;
  website_rank: number;
  reddit_trend: string;
  google_trend: string;
  yelp_trend: string;
  added_date: string;
  status: string;
}

export const getRivalisOrganizerCompanies = async () => {
  return apiClient<CompanyDetail[]>("/api/rivalis/organizer/companies");
};

// ===== Company Growth =====
export interface CompanyGrowthPoint {
  label: string;
  value: number;
}

export interface CompanyGrowthData {
  day: CompanyGrowthPoint[];
  week: CompanyGrowthPoint[];
  month: CompanyGrowthPoint[];
  year: CompanyGrowthPoint[];
}

export const getRivalisOrganizerGrowth = async () => {
  return apiClient<CompanyGrowthData>("/api/rivalis/organizer/growth");
};

// ===== Score Trends =====
export interface ScoreTrendPoint {
  label: string;
  value: number;
}

export interface ScoreTrendsData {
  day: ScoreTrendPoint[];
  week: ScoreTrendPoint[];
  month: ScoreTrendPoint[];
  year: ScoreTrendPoint[];
}

export const getRivalisOrganizerScoreTrends = async () => {
  return apiClient<ScoreTrendsData>("/api/rivalis/organizer/score-trends");
};

// ===== Trend Sources =====
export interface OrgTrendSource {
  label: string;
  value: number;
}

export const getRivalisOrganizerTrendSources = async () => {
  return apiClient<OrgTrendSource[]>("/api/rivalis/organizer/trend-sources");
};
