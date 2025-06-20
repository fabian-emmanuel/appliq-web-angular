import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ApplicationCard} from '../../layout/card/application-card/application-card';
import {Application, Status, statusDetailsMap, statuses} from '../../core/models/application';
import {applicationList} from '../../core/models/store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatDateRangeInput, MatDateRangePicker, MatDatepickerToggle } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-applications',
  imports: [RouterOutlet, CommonModule, FormsModule, 
    ApplicationCard, MatFormFieldModule, MatDatepickerModule, 
    MatInputModule, MatDateRangeInput, MatDateRangePicker, MatDatepickerToggle],
  templateUrl: './applications.html',
  styleUrl: './applications.css',
})

export class Applications implements OnInit {
  statusDropdownOpen = true;
  dateDropdownOpen = true;
  startDate: string | null = null;
  endDate: string | null = null;
  image : string = "https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D";
  viewMode: 'grid' | 'list' = 'grid';
  showAddModal = false;
  newApp = {
    company: '',
    website: '',
    position: '',
  };
  // statusOptions = statuses;

  selectedStatus: string = '';
  searchTerm: string = '';
  statusDetailsMap = statusDetailsMap;
  statuses = statuses;

  selectedStatusForModal: string | null = null;
  selectedAppForModal: Application | null = null;
  showStatusModal = false;
  statusChangeReason: string = '';

  toggleView (mode: 'grid' | 'list') {
    this.viewMode = mode;
  }

  applications: Application[] = applicationList;

  filteredApplications: Application[] = [];

  currentPage = 1;
  pageSize = 12;

  dateRange: { begin: Date | null, end: Date | null } = { begin: null, end: null };

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

  onDateRangeChange(range: { begin: Date | null, end: Date | null }) {
    this.dateRange = range;
    this.filterApplications();
  }
//   ngDoCheck() {
//   console.log('dateRange:', this.dateRange);
// }

  // add application modal
  addApplication() {
    const now = new Date();
    this.applications.unshift({
      id: Date.now(),
      company: this.newApp.company,
      website: this.newApp.website,
      position: this.newApp.position,
      status: 'Applied',
      statusHistory: [
        {
          id: Date.now(), 
          applicationId: Date.now(),
          createdBy: 1,
          status: 'Applied',
          createdAt: now,
          notes: 'Application submitted'
        }
      ],
      createdAt: now,
      createdBy: 1
    });
    this.showAddModal = false;
    this.newApp = { company: '', website: '', position: '' };
  }
 

// filter Applications
  ngOnInit() {
    this.filterApplications();
  }

  filterApplications() {
    let filtered = this.applications;

    if (this.selectedStatus) {
      filtered = filtered.filter(app => app.status === this.selectedStatus);
    }

    if (this.searchTerm) {
    const term = this.searchTerm.toLowerCase();
    filtered = filtered.filter(app => app.company.toLowerCase().includes(term));
  }

    if (this.dateRange.begin) {
      filtered = filtered.filter(app => new Date(app.createdAt) >= this.dateRange.begin!);
    }
    if (this.dateRange.end) {
      filtered = filtered.filter(app => new Date(app.createdAt) <= this.dateRange.end!);
    }

    this.filteredApplications = filtered;
    this.currentPage = 1;
    console.log('Filtered applications:', this.filteredApplications);
    // console.log('app.createdAt:', app.createdAt, 'begin:', this.dateRange.begin, 'end:', this.dateRange.end);
  }

  get displayedApplications() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredApplications.slice(start, start + this.pageSize);
  }

  // pagination
  get totalPages(): number {
    return Math.ceil(this.filteredApplications.length / this.pageSize) || 1;
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

  // change status
  handleStatusChange(event: { appId: number, newStatus: string, reason: string }) {
    // Find the application and update its status and statusHistory
    const app = this.applications.find((a: any) => a.id === event.appId);
    // console.log(app.id);
    if (app) {
      app.status = event.newStatus as Status;
      app.statusHistory.push({
        id: 1,
        applicationId: app.id,
        createdBy: 1, 
        status: event.newStatus as Status,
        createdAt: new Date(),
        notes: event.reason
      });
    }
  }

 openStatusModal(event: { appId: number; newStatus: string; reason?: string }) {
  console.log('Modal event:', event);
  this.selectedStatusForModal = event.newStatus;
  this.selectedAppForModal = this.applications.find(app => app.id === event.appId) || null;
   this.statusChangeReason = '';
  this.showStatusModal = true;
}

    // Update the application's status and status-history
  confirmStatusChange() {
  if (this.selectedAppForModal && this.selectedStatusForModal) {
    this.selectedAppForModal.status = this.selectedStatusForModal as Status;
    this.selectedAppForModal.statusHistory.push({
      id: Date.now(),
      applicationId: this.selectedAppForModal.id,
      createdBy: 1,
      status: this.selectedStatusForModal as Status,
      createdAt: new Date(),
      notes: this.statusChangeReason
    });
    this.showStatusModal = false;
  }
}

  // edit and delete application
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
