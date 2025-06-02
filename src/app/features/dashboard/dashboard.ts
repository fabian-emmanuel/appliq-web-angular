import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Application, Status} from '../../core/models/application';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {applicationList} from '../../core/models/store';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';


// Interface for Bar Chart data
interface BarChartData {
  name: string;
  value: number;
}

// Interface for Line Chart data series
interface LineChartSeries {
  name: string;
  series: { name: string; value: number }[];
}


@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, MatFormField, MatIcon, MatDatepickerInput, MatDatepickerToggle, MatDatepicker, MatSelect, DatePipe, MatInput, FormsModule, MatSelect, MatSelect, MatOption, NgxChartsModule, MatSelect, MatSelect, MatOption, MatLabel, MatRadioGroup, MatRadioButton],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  cards = Array(4);
  totalApplicationsCount: number = 0;
  interviewsCount: number = 0;
  offersCount: number = 0;
  rejectedCount: number = 0;

  recentActivities: any[] = [];
  upcomingEvents: any[] = [];

  // Filter properties for graph
  startDate: Date | null = null;
  endDate: Date | null = null;
  allStatuses: Status[] = ['Applied', 'Interview', 'OfferAwarded', 'Rejected', 'Test'];
  selectedStatuses: Status[] = [...this.allStatuses]; // Default to all statuses selected

  chartType: 'bar' | 'line' = 'bar';

  // Chart data
  processedChartData: BarChartData[] = [];
  lineChartData: LineChartSeries[] = [];


  view: [number, number] = [700, 300]; // Adjust as needed
  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#007bff', '#FF7F00', '#2EC4B6']
  };

  // Dummy Data - Ensure 'Status' type is correctly defined in application.model.ts
  private dummyApplications: Application[] = applicationList;

  constructor() { }

  ngOnInit(): void {
    this.initializeFilters();
    this.calculateCounts();
    this.getRecentActivities();
    this.getUpcomingEvents();
    this.updateChartData(); // Initial chart data load
  }

  private initializeFilters(): void {
    // Set default date range to last 30 days, or a custom period
    const today = new Date();
    this.endDate = today;
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
    this.startDate = thirtyDaysAgo;
  }

  onFilterChange(): void {
    this.updateChartData();
  }

  private calculateCounts(): void {
    this.totalApplicationsCount = this.dummyApplications.length;
    this.interviewsCount = this.dummyApplications.filter(app => app.status === 'Interview').length;
    this.offersCount = this.dummyApplications.filter(app => app.status === 'OfferAwarded').length;
    this.rejectedCount = this.dummyApplications.filter(app => app.status === 'Rejected').length;
  }

  private getRecentActivities(): void {
    this.recentActivities = this.dummyApplications
      .flatMap(app =>
        app.statusHistory.map((history, index) => ({
          company: app.company,
          position: app.position,
          date: new Date(history.createdAt),
          // A simple way to get previous status; a more robust solution might store it directly
          oldStatus: index > 0 ? app.statusHistory[index - 1].status : 'Initial Application',
          newStatus: history.status,
          notes: history.notes,
          testType: history.testType,
          interviewType: history.interviewType
        }))
      )
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5); // Get the 5 most recent updates overall
  }

  private getUpcomingEvents(): void {
    const now = new Date();

    this.upcomingEvents = this.dummyApplications
      .filter(app => app.status === 'Interview' || app.status === 'Test')
      .map(app => {
        const latestRelevantHistory = app.statusHistory
          .filter(sh =>
            (sh.status === 'Interview' || sh.status === 'Test') &&
            (sh.interviewType || sh.testType)
          )
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

        if (!latestRelevantHistory) return null;

        const eventDate = new Date(latestRelevantHistory.createdAt);
        eventDate.setDate(eventDate.getDate() + 5);

        if (eventDate <= now) return null;

        let eventType = 'Unknown';
        if (latestRelevantHistory.status === 'Interview') {
          const type = latestRelevantHistory.interviewType;
          eventType = `Interview (${type === 1 ? 'Phone' : type === 2 ? 'On-site' : 'Unknown'})`;
        } else if (latestRelevantHistory.status === 'Test') {
          eventType = `Test (${latestRelevantHistory.testType || 'Unknown'})`;
        }

        return {
          company: app.company,
          position: app.position,
          eventType,
          date: eventDate,
          notes: latestRelevantHistory.notes || ''
        };
      })
      .filter(event => event !== null)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 3);
  }



  private updateChartData(): void {
    let filteredApplications = this.dummyApplications.filter(app => {
      const appDate = new Date(app.createdAt);
      const isWithinDateRange = (!this.startDate || appDate >= this.startDate) &&
        (!this.endDate || appDate <= this.endDate);
      return isWithinDateRange;
    });

    filteredApplications = filteredApplications.filter(app =>
      this.selectedStatuses.includes(app.status as Status)
    );

    // --- Data for Bar Chart (Applications by Status) ---
    const statusCounts: { [key: string]: number } = {};
    filteredApplications.forEach(app => {
      statusCounts[app.status] = (statusCounts[app.status] || 0) + 1;
    });

    this.processedChartData = Object.keys(statusCounts).map(status => ({
      name: status,
      value: statusCounts[status]
    }));

    // Ensure all selected statuses are represented in bar chart, even if count is 0
    this.selectedStatuses.forEach(status => {
      if (!this.processedChartData.some(d => d.name === status)) {
        this.processedChartData.push({ name: status, value: 0 });
      }
    });
    this.processedChartData.sort((a, b) => a.name.localeCompare(b.name));


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

    // Ngx-charts often expects data to be sorted by date for line charts
    // The date sorting is done when creating sortedDates
  }

  onSelect(event: any): void {
    console.log('Chart item selected:', event);
    // You can add navigation or more detail display here
  }
}

