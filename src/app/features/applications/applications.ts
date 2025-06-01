import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { statuses, statusDetailsMap, Application } from '@core/models/application';
import { ApplicationCardComponent } from '@layout/card/application-card/application-card';
import { PageLayoutComponent } from '@layout/page-layout/page-layout';
import { stat } from 'fs';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar';
import { TopbarComponent } from 'src/app/components/topbar/topbar';

@Component({
  selector: 'app-applications',
  imports: [RouterOutlet, CommonModule, FormsModule, ApplicationCardComponent],
  templateUrl: './applications.html',
  styleUrl: './applications.css',
})

export class ApplicationsComponent {
  statusDropdownOpen = true;
  dateDropdownOpen = true;
  startDate: string | null = null;
  endDate: string | null = null;
  image : string = "https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D";
  viewMode: 'grid' | 'list' = 'grid';
  // statusOptions = statuses;

  statusDetailsMap = statusDetailsMap;
  statuses = statuses;


  toggleView (mode: 'grid' | 'list') {
    this.viewMode = mode;
  }

  applications: Application[] = [
  {
    id: 1,
    company: 'MetaAi',
    position: 'Software Engineer',
    status: 'Applied',
    statusHistory: [
      {
        id: 101,
        applicationId: 1,
        createdBy: 1,
        status: 'Applied',
        createdAt: '2024-05-01T10:00:00Z',
        notes: 'Application submitted online'
      }
    ],
    website: 'https://meta.com/careers',
    applicationType: 'Full-time',
    createdAt: 1714545600000,
    createdBy: 1
  },
  {
    id: 2,
    company: 'Jobberman',
    position: 'Frontend Developer',
    status: 'Interview',
    statusHistory: [
      {
        id: 201,
        applicationId: 2,
        createdBy: 2,
        status: 'Applied',
        createdAt: '2024-04-15T09:00:00Z'
      },
      {
        id: 202,
        applicationId: 2,
        createdBy: 2,
        status: 'Test',
        createdAt: '2024-04-20T14:00:00Z',
        notes: 'Completed coding test'
      },
      {
        id: 203,
        applicationId: 2,
        createdBy: 2,
        status: 'Interview',
        createdAt: '2024-04-25T11:00:00Z',
        notes: 'Scheduled for technical interview'
      }
    ],
    website: 'https://jobberman.com/jobs/123',
    applicationType: 'Contract',
    createdAt: 1713162000000,
    createdBy: 2
  },
  {
    id: 3,
    company: 'Google',
    position: 'Product Manager',
    status: 'Rejected',
    statusHistory: [
      {
        id: 301,
        applicationId: 3,
        createdBy: 3,
        status: 'Applied',
        createdAt: '2024-03-10T08:00:00Z'
      },
      {
        id: 302,
        applicationId: 3,
        createdBy: 3,
        status: 'Interview',
        createdAt: '2024-03-20T10:00:00Z'
      },
      {
        id: 303,
        applicationId: 3,
        createdBy: 3,
        status: 'Rejected',
        createdAt: '2024-03-25T15:00:00Z',
        notes: 'Position filled by another candidate'
      }
    ],
    website: 'https://careers.google.com/jobs/results/456',
    applicationType: 'Full-time',
    createdAt: 1710057600000,
    createdBy: 3
  }
];

  currentPage = 1;
  pageSize = 1;

  toggleStatusDropdown() {
    console.log('Toggling status dropdown before:: ', this.statusDropdownOpen);
    this.statusDropdownOpen = !this.statusDropdownOpen;
    console.log('Toggling status dropdown after click:', this.statusDropdownOpen);
    if( this.statusDropdownOpen) {
      this.dateDropdownOpen = false;
    }
  }

  toggleDateDropdown() {
    this.dateDropdownOpen = !this.dateDropdownOpen;
    if( this.dateDropdownOpen) {
      this.statusDropdownOpen = false;
    }
  }

  applyDateRange() {
    // Logic to apply the selected date range
    console.log('Applying date range:', this.startDate, this.endDate);
    this.dateDropdownOpen = false;
  }

  get totalPages(): number {
    return Math.ceil(this.applications.length / this.pageSize) || 1;
  }

  get paginatedApplications() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.applications.slice(start, start + this.pageSize);
  }

  get paginationArray() {
    const total = this.totalPages;
    const maxPages = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxPages / 2));
    let end = Math.min(total, start + maxPages - 1);

    if (end - start < maxPages - 1) {
      start = Math.max(1, end - maxPages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  handleStatusChange(event: { appId: number, newStatus: string }) {
    // Find the application and update its status
    const app = this.applications.find((a: any) => a.id === event.appId);
    if (app) {
      // app.statusHistory = event.newStatus;
      // Optionally, update statusHistory or call an API here
    }
  }

  editApplication(appId: number) {
    // Implement logic to edit application
    // For example, open a modal or navigate to an edit page
    console.log('Edit application', appId);
  }

  deleteApplication(appId: number) {
    // Implement logic to delete application
    // For example, remove from array or call an API
    this.applications = this.applications.filter((a: any) => a.id !== appId);
  }
}
