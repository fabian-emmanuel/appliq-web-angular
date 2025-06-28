import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { Application, Status, statusDetailsMap, statuses } from '@core/models/application';
import {MatFormField, MatLabel} from '@angular/material/input';
import {applicationList} from '../../core/models/store';
import {
  MatDatepickerModule,
  MatDatepickerToggle,
  MatDateRangeInput
} from '@angular/material/datepicker';
import {DatePipe, NgClass} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatOption, MatSelect, MatSelectTrigger} from '@angular/material/select';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {isPlatformBrowser} from '@angular/common';
import {DashboardCount} from '../../core/models/dashboard';
import {User} from '@core/models/user';
import {UserService} from '@app/services/user-service';
import {ChartModule} from 'primeng/chart';


@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, MatFormField, MatDatepickerToggle, MatSelect, DatePipe, FormsModule, MatSelect, MatSelect, MatOption, MatSelect, MatSelect, MatOption, MatLabel, MatDateRangeInput, MatFormFieldModule, MatSelectTrigger, MatDatepickerModule, ChartModule, NgClass],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard implements OnInit {

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
  chartData: any;
  chartOptions: any;
  userInfo: User | null = null;

  private dummyApplications: Application[] = applicationList;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private userService: UserService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.calculateStats();
    this.userInfo = userService.getCurrentUser();
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
      {name: 'Total Applications', count: this.totalApplicationsCount},
      {name: 'Interviews', count: this.interviewsCount},
      {name: 'Tests', count: this.testsCount},
      {name: 'Offers', count: this.offersCount},
      {name: 'Withdrawn', count: this.withdrawalsCount},
      {name: 'Rejected', count: this.rejectedCount}
    ];

    this.items = baseItems.map(item => {
      const {icon, color} = this.getStatusDetailsForDashboardItem(item.name);
      return {...item, icon, color};
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
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--appliq-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--appliq-text-secondary-color');
    const surfaceBorder = documentStyle.getPropertyValue('--appliq-border-color');

    let filteredApplications = this.dummyApplications.filter(app => {
      const appDate = new Date(app.createdAt);
      return (!this.startDate || appDate >= this.startDate) &&
        (!this.endDate || appDate <= this.endDate);
    });

    filteredApplications = filteredApplications.filter(app =>
      this.selectedStatuses.includes(app.status as Status)
    );

    const labels = this.selectedStatuses;
    const data = labels.map(status => filteredApplications.filter(app => app.status === status).length);

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Application Status',
          data: data,
          backgroundColor: [
            '#3B82F6',
            '#8B5CF6',
            '#22C55E',
            '#EF4444',
            '#EAB308',
            '#6B7280',
          ],
          borderColor: [
            '#3B82F6',
            '#8B5CF6',
            '#22C55E',
            '#EF4444',
            '#EAB308',
            '#6B7280',
          ],
          borderWidth: 1
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  onSelect(event: any): void {
    console.log('Chart item selected:', event);
    // You can add navigation or more detail display here
  }
}
