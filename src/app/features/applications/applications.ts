import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {ApplicationCard} from '../../layout/card/application-card/application-card';
import {Application, statusDetailsMap, statuses} from '../../core/models/application';
import {applicationList} from '../../core/models/store';

@Component({
  selector: 'app-applications',
  imports: [RouterOutlet, CommonModule, FormsModule, ApplicationCard],
  templateUrl: './applications.html',
  styleUrl: './applications.css',
})

export class Applications {
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

  applications: Application[] = applicationList;

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
