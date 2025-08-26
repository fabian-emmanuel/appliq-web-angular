import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  PLATFORM_ID,
  Inject,
  ChangeDetectorRef,
} from '@angular/core';
import {RouterOutlet, Router} from '@angular/router';
import {Application, Status, statusDetailsMap, statuses} from '@core/models/application';
import {MatFormField, MatLabel} from '@angular/material/input';
import {applicationList} from '@core/models/store';
import {
  MatDatepickerModule,
  MatDatepickerToggle,
  MatDateRangeInput
} from '@angular/material/datepicker';
import {DatePipe, NgClass, NgStyle} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatOption, MatSelect, MatSelectTrigger} from '@angular/material/select';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {isPlatformBrowser} from '@angular/common';
import {DashboardCount} from '@core/models/dashboard';
import {User} from '@core/models/user';
import {UserService} from '@app/services/user-service';
import {ChartModule} from 'primeng/chart';
import {DashboardService} from '@app/services/dashboard-service';
import { ApplicationService } from '@/app/services/application-service';


@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, MatFormField, MatDatepickerToggle, MatSelect, DatePipe, FormsModule, MatSelect, MatSelect, MatOption, MatSelect, MatSelect, MatOption, MatLabel, MatDateRangeInput, MatFormFieldModule, MatSelectTrigger, MatDatepickerModule, ChartModule, NgClass, NgStyle],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard implements OnInit {

  isBrowser: boolean;
  items: DashboardCount[] = [];
  recentActivities: any[] = [];

  // Filter properties for graph
  startDate: Date | null = null;
  endDate: Date | null = null;
  allStatuses: Status[] = statuses;
  selectedStatuses: Status[] = statuses; // Default to all statuses selected

  chartType: 'bar' | 'line' = 'bar';
  chartData: any;
  chartOptions: any;
  userInfo: User | null = null;
successRate: string = '0';
successRateMessage: string = '';

averageResponseTime: string = '';
comparedToMessage: string = '';
fasterMessage: string = '';


  private dummyApplications: Application[] = applicationList;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private userService: UserService,
    private dashboardService: DashboardService,
    private applicationService: ApplicationService,
    private cdr: ChangeDetectorRef,
    private router: Router // Inject Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.userInfo = userService.getCurrentUser();
  }

  ngOnInit(): void {
  this.initializeDashboardItems();
  this.initializeFilters();
  this.getRecentActivities();
  this.getChartData();
  this.getAverageResponseTime();

  this.dashboardService.getSuccessRate().subscribe(response => {
    if (response?.data) {
      this.successRate = response.data.percentage;
      this.successRateMessage = response.data.message;
      this.cdr.markForCheck();
    }
  });
}

  private initializeFilters(): void {
    const today = new Date();
    this.endDate = today;
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
    this.startDate = thirtyDaysAgo;
  }


  private getChartData(): void {
    const from = this.startDate ? this.startDate.toISOString() : undefined;
    const to = this.endDate ? this.endDate.toISOString() : undefined;
    const statuses = this.selectedStatuses.map(s => s.toString());

    this.dashboardService.getChartData(statuses, from, to)
      .subscribe(response => {
        if (response?.data) {
          // console.log('barData:', response.data.bar_data);
          this.chartData = {
            bar: this.mapBarChartData(response.data.bar_data),
            line: this.mapLineChartData(response.data.line_data)
          };
          this.cdr.markForCheck();
        }
      });
  }

  onFilterChange(): void {
    this.getChartData();
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
    this.dashboardService.stats().subscribe(response => {
      if (response && response.data) {
        const baseItems: Omit<DashboardCount, 'icon' | 'color'>[] = [
          {name: 'Total Applications', count: response.data.totalApplications},
          {name: 'Interviews', count: response.data.interviews},
          {name: 'Tests', count: response.data.tests},
          {name: 'Offers', count: response.data.offersAwarded},
          {name: 'Withdrawn', count: response.data.withdrawn},
          {name: 'Rejected', count: response.data.rejected}
        ];

        this.items = baseItems.map(item => {
          const {icon, color} = this.getStatusDetailsForDashboardItem(item.name);
          return {...item, icon, color};
        });
        this.cdr.markForCheck();
      }
    })
  }

private getRecentActivities(): void {
  this.dashboardService.getRecentActivities().subscribe(response => {
    if (response?.data?.activities) {
      this.recentActivities = response.data.activities.map(activity => ({
        company: activity.company,
        position: activity.position,
        date: new Date(activity.lastUpdated),
        oldStatus: activity.previousStatus ?? 'Applied',
        newStatus: activity.currentStatus,
        // Add other fields if needed
      }))
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 6); // Show 6 most recent
      this.cdr.markForCheck();
      console.log('Recent Activities:', this.recentActivities);
    }
  });
}

private getAverageResponseTime(): void {
  this.dashboardService.getAverageResponseTime().subscribe(response => {
    if (response?.data) {
      this.averageResponseTime = response.data.average;
      this.comparedToMessage = response.data.comparedToMessage;
      this.fasterMessage = response.data.fasterMessage;
      this.cdr.markForCheck?.();
    }
  });
}

  onSelect(event: any): void {
    console.log('Chart item selected:', event);
  }

  getGradientFromColor(color: string): string {
    // Extract the base color name from Tailwind classes like "text-blue-400"
    const colorName = color.split('-')[1] || 'blue';

    // Return appropriate gradient based on color name
    switch (colorName) {
      case 'blue':
        return 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.15) 100%)';
      case 'green':
        return 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(22, 163, 74, 0.15) 100%)';
      case 'red':
        return 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.15) 100%)';
      case 'yellow':
        return 'linear-gradient(135deg, rgba(234, 179, 8, 0.15) 0%, rgba(202, 138, 4, 0.15) 100%)';
      case 'purple':
        return 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(147, 51, 234, 0.15) 100%)';
      case 'pink':
        return 'linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(219, 39, 119, 0.15) 100%)';
      case 'indigo':
        return 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(79, 70, 229, 0.15) 100%)';
      default:
        return 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.15) 100%)';
    }
  }

  getIconBgFromColor(color: string): string {
    const colorName = color.split('-')[1] || 'blue';

    // Return appropriate background for icon based on color name
    switch (colorName) {
      case 'blue':
        return 'rgba(59, 130, 246, 0.2)';
      case 'green':
        return 'rgba(34, 197, 94, 0.2)';
      case 'red':
        return 'rgba(239, 68, 68, 0.2)';
      case 'yellow':
        return 'rgba(234, 179, 8, 0.2)';
      case 'purple':
        return 'rgba(168, 85, 247, 0.2)';
      case 'pink':
        return 'rgba(236, 72, 153, 0.2)';
      case 'indigo':
        return 'rgba(99, 102, 241, 0.2)';
      default:
        return 'rgba(59, 130, 246, 0.2)';
    }
  }

  getGlowFromColor(color: string): string {
    const colorName = color.split('-')[1] || 'blue';

    // Return appropriate glow color based on color name
    switch (colorName) {
      case 'blue':
        return 'rgba(59, 130, 246, 0.3)';
      case 'green':
        return 'rgba(34, 197, 94, 0.3)';
      case 'red':
        return 'rgba(239, 68, 68, 0.3)';
      case 'yellow':
        return 'rgba(234, 179, 8, 0.3)';
      case 'purple':
        return 'rgba(168, 85, 247, 0.3)';
      case 'pink':
        return 'rgba(236, 72, 153, 0.3)';
      case 'indigo':
        return 'rgba(99, 102, 241, 0.3)';
      default:
        return 'rgba(59, 130, 246, 0.3)';
    }
  }

  // openAddApplicationModal() {
  //   this.router.navigate(['/applications'], { queryParams: { add: 'true' } });
  // }

  goToApplications() {
    this.router.navigate(['/applications']);
  }

  onDateRangeChange(event: any): void {
    this.startDate = event.value?.start || null;
    this.endDate = event.value?.end || null;
    this.onFilterChange();
  }

 private mapBarChartData(barData: any[]): any {
  // Map each status to its color
  const statusColorMap: Record<string, string> = {
    Applied: '#3B82F6',
    Interview: '#8B5CF6',
    Test: '#22C55E',
    OfferAwarded: '#EAB308',
    Withdrawn: '#6B7280',
    Rejected: '#EF4444'
  };

  return {
    labels: barData.map(item => item.status),
    datasets: [{
      label: 'Applications',
      data: barData.map(item => item.count),
      backgroundColor: barData.map(item => statusColorMap[item.status] || '#3B82F6')
    }]
  };
}

  private mapLineChartData(lineData: any[]): any {
    return {
      labels: lineData.map(item => new Date(item.date).toLocaleDateString()),
      datasets: [{
        label: 'Applications Over Time',
        data: lineData.map(item => item.count),
        borderColor: '#3B82F6',
        fill: false,
        tension: 0.4
      }]
    };
  }
}
