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
