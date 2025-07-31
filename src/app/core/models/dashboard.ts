export interface BarChartData {
  name: string;
  value: number;
}

export interface LineChartSeries {
  name: string;
  series: { name: string; value: number }[];
}

export interface DashboardCount {
  name: string;
  count: number;
  icon: string;
  color: string;
}

export interface DashboardSuccessRate {
  message: string;
  percentage: string;
}

export interface Stats {
  interviews: number;
  offersAwarded: number;
  rejected: number;
  tests: number;
  totalApplications: number;
  withdrawn: number;
}
