import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {
  Application,
  Status, statusDetailsMap,
  statuses,
} from '../../core/models/application';
import {MatFormField, MatLabel} from '@angular/material/input';
import {applicationList} from '../../core/models/store';
import {
  MatDatepickerModule,
  MatDatepickerToggle,
  MatDateRangeInput
} from '@angular/material/datepicker';
import {DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgxChartsModule, ScaleType, Color} from '@swimlane/ngx-charts';
import {MatOption, MatSelect, MatSelectTrigger} from '@angular/material/select';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {isPlatformBrowser} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {BarChartData, DashboardCount, LineChartSeries} from '../../core/models/dashboard';


@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, MatFormField, MatDatepickerToggle, MatSelect, DatePipe, FormsModule, MatSelect, MatSelect, MatOption, NgxChartsModule, MatSelect, MatSelect, MatOption, MatLabel, MatRadioGroup, MatRadioButton, MatDateRangeInput, MatFormFieldModule, MatSelectTrigger, MatDatepickerModule, MatIcon],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard implements OnInit {

  appliqScheme: Color = {
    name: 'appliq',
    selectable: true,
    group: ScaleType.Quantile,
    domain: [
      '#3B82F6', // Blue
      '#8B5CF6', // Purple
      '#22C55E', // Green
      '#EF4444', // Red
      '#F59E0B', // Amber
      '#06B6D4', // Cyan
      '#EC4899', // Pink
      '#84CC16', // Lime
    ],
  }

  isBrowser: boolean;
  totalApplicationsCount: number = 0;
  interviewsCount: number = 0;
  testsCount: number = 0;
  offersCount: number = 0;
  withdrawalsCount: number = 0;
  rejectedCount: number = 0;
  items: DashboardCount[] = [];
  recentActivities: any[] = [];

  // Filter properties for graph
  startDate: Date | null = null;
  endDate: Date | null = null;
  allStatuses: Status[] = statuses;
  selectedStatuses: Status[] = statuses; // Default to all statuses selected

  chartType: 'bar' | 'line' = 'bar';
  barChartData: BarChartData[] = [];
  lineChartData: LineChartSeries[] = [];

  private dummyApplications: Application[] = applicationList;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.calculateStats();
  }

  ngOnInit(): void {
    this.initializeDashboardItems();
    this.initializeFilters();
    this.getRecentActivities();
    this.updateChartData(); // Initial chart data load
  }

  private calculateStats(): void {
    this.totalApplicationsCount = this.dummyApplications.length;
    this.interviewsCount = this.dummyApplications.filter(app => app.status === 'Interview').length;
    this.testsCount = this.dummyApplications.filter(app => app.status === 'Test').length;
    this.offersCount = this.dummyApplications.filter(app => app.status === 'OfferAwarded').length;
    this.withdrawalsCount = this.dummyApplications.filter(app => app.status === 'Withdrawn').length;
    this.rejectedCount = this.dummyApplications.filter(app => app.status === 'Rejected').length;
  }

  private initializeFilters(): void {
    const today = new Date();
    this.endDate = today;
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
    this.startDate = thirtyDaysAgo;
  }

  onFilterChange(): void {
    this.updateChartData();
  }

  get StatusDisplayText(): string {
    if (!this.selectedStatuses || this.selectedStatuses.length === 0) {
      return 'All Statuses';
    }

    if (this.selectedStatuses.length === 1) {
      return this.selectedStatuses[0];
    }

    if (this.selectedStatuses.length === this.allStatuses.length) {
      return 'All Statuses';
    }

    return `${this.selectedStatuses.at(0)} (+${this.selectedStatuses.length - 1} ${this.selectedStatuses.length === 2 ? 'other' : 'others'})`;
  }

  private getStatusDetailsForDashboardItem(itemName: string): { icon: string; color: string } {
    let statusKey: Status = 'Applied';
    switch (itemName) {
      case 'Total Applications':
        statusKey = 'Applied';
        break;
      case 'Tests':
        statusKey = 'Test';
        break;
      case 'Interviews':
        statusKey = 'Interview';
        break;
      case 'Offers':
        statusKey = 'OfferAwarded';
        break;
      case 'Withdrawn':
        statusKey = 'Withdrawn';
        break;
      case 'Rejected':
        statusKey = 'Rejected';
        break;
      default:
    }
    const details = statusDetailsMap[statusKey];
    return {
      icon: details.iconClass,
      color: details.textClass
    };
  }

  private initializeDashboardItems(): void {
    const baseItems: Omit<DashboardCount, 'icon' | 'color'>[] = [
      { name: 'Total Applications', count: this.totalApplicationsCount },
      { name: 'Interviews', count: this.interviewsCount },
      { name: 'Tests', count: this.testsCount },
      { name: 'Offers', count: this.offersCount },
      { name: 'Withdrawn', count: this.withdrawalsCount },
      { name: 'Rejected', count: this.rejectedCount }
    ];

    this.items = baseItems.map(item => {
      const { icon, color } = this.getStatusDetailsForDashboardItem(item.name);
      return { ...item, icon, color };
    });
  }

  private getRecentActivities(): void {
    this.recentActivities = this.dummyApplications
      .flatMap(app =>
        app.statusHistory.map((history, index) => ({
          company: app.company,
          position: app.position,
          date: new Date(history.createdAt),
          oldStatus: index > 0 ? app.statusHistory[index - 1].status : 'Applied',
          newStatus: history.status,
          notes: history.notes,
          testType: history.testType,
          interviewType: history.interviewType
        }))
      )
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 6); // Get the 6 most recent updates overall
  }

  private updateChartData(): void {
    let filteredApplications = this.dummyApplications.filter(app => {
      const appDate = new Date(app.createdAt);
      return (!this.startDate || appDate >= this.startDate) &&
        (!this.endDate || appDate <= this.endDate);
    });

    filteredApplications = filteredApplications.filter(app =>
      this.selectedStatuses.includes(app.status as Status)
    );

    // --- Data for Bar Chart (Applications by Status) ---
    const statusCounts: { [key: string]: number } = {};
    filteredApplications.forEach(app => {
      statusCounts[app.status] = (statusCounts[app.status] || 0) + 1;
    });

    this.barChartData = Object.keys(statusCounts).map(status => ({
      name: status,
      value: statusCounts[status]
    }));

    // Ensure all selected statuses are represented in bar chart, even if count is 0
    this.selectedStatuses.forEach(status => {
      if (!this.barChartData.some(d => d.name === status)) {
        this.barChartData.push({name: status, value: 0});
      }
    });
    this.barChartData.sort((a, b) => a.name.localeCompare(b.name));

    // --- Data for Line Chart (Applications over time per status) ---
    const lineDataMap = new Map<Status, Map<string, number>>(); // Map<Status, Map<DateString, Count>>

    // Initialize map with all selected statuses
    this.selectedStatuses.forEach(status => lineDataMap.set(status, new Map<string, number>()));

    filteredApplications.forEach(app => {
      const appDateString = new Date(app.createdAt).toISOString().split('T')[0]; // YYYY-MM-DD
      const statusMap = lineDataMap.get(app.status);
      if (statusMap) {
        statusMap.set(appDateString, (statusMap.get(appDateString) || 0) + 1);
      }
    });

    // Generate all dates within the selected range for a continuous line chart
    const allDates: Set<string> = new Set();
    let currentDate = this.startDate ? new Date(this.startDate) : new Date();
    const end = this.endDate ? new Date(this.endDate) : new Date();

    while (currentDate <= end) {
      allDates.add(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    const sortedDates = Array.from(allDates).sort();

    this.lineChartData = this.selectedStatuses.map(status => {
      const seriesData: { name: string; value: number }[] = [];
      const statusMap = lineDataMap.get(status);

      sortedDates.forEach(date => {
        seriesData.push({
          name: date,
          value: statusMap?.get(date) || 0 // Use 0 if no applications for that date/status
        });
      });

      return {
        name: status,
        series: seriesData
      };
    });
  }

  onSelect(event: any): void {
    console.log('Chart item selected:', event);
    // You can add navigation or more detail display here
  }
}