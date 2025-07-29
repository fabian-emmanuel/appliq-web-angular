import { MatInputModule, MatLabel } from '@angular/material/input';
import { MatDateRangeInput, MatDateRangePicker, MatDatepickerToggle, MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatOption, MatSelect, MatSelectTrigger } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { RouterOutlet } from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { ApplicationCard } from '@layout/card/application-card/application-card';
import {
  Application,
  Status,
  statusDetailsMap,
  statuses,
  ApplicationFilter,
  ApplicationRequest, ApplicationType, ApplicationStatusChangeRequest
} from '@core/models/application';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import {ApplicationService} from '@app/services/application-service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-applications',
  imports: [RouterOutlet, CommonModule, FormsModule,
    ApplicationCard, MatFormFieldModule, MatDatepickerModule,
    MatInputModule, MatDateRangeInput, MatDateRangePicker, MatDatepickerToggle, MatSelect, MatOption, MatLabel, MatSelectTrigger],
  templateUrl: './applications.html',
  styleUrl: './applications.css',
  providers: [provideNativeDateAdapter()],
})


export class Applications implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  viewMode: 'grid' | 'list' = 'grid';
  showAddModal = false;

  newApp = {
    company: '',
    website: '',
    position: '',
    applicationType: ApplicationType.WEBSITE // or null
  };

  applicationTypes = Object.values(ApplicationType); // for select option
  ApplicationType = ApplicationType; // use enum in template


  selectedStatuses: Status[] = statuses; // Default to all statuses selected
  searchTerm: string = '';
  statusDetailsMap = statusDetailsMap;
  statuses = statuses;

  selectedStatusForModal: string | null = null;
  selectedAppForModal: Application | null = null;
  showStatusModal = false;
  statusChangeReason: string = '';

  applications: Application[] = [];
  loading = false;
  error: string | null = null;

  currentPage = 1;
  pageSize = 16;
  totalItems = 0;
  totalPages = 0;

  dateRange: { begin: Date | null, end: Date | null } = {begin: null, end: null};

  showAddLoading = false;

  showDeleteModal = false;
  selectedAppForDelete: Application | null = null;


  editMode = false;
  applicationToEdit: Application | null = null;


  constructor(private applicationService: ApplicationService, private messageService: MessageService) {
    // Setup search debouncing
    this.searchSubject.pipe(
      debounceTime(10),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(searchTerm => {
      this.searchTerm = searchTerm;
      this.currentPage = 1;
      this.loadApplications();
    });
  }

  ngOnInit() {
    this.loadApplications();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleView(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }

  get StatusDisplayText(): string {
    if (!this.selectedStatuses || this.selectedStatuses.length === 0) {
      return 'All Statuses';
    }

    if (this.selectedStatuses.length === 1) {
      return this.selectedStatuses[0];
    }

    if (this.selectedStatuses.length === this.statuses.length) {
      return 'All Statuses';
    }

    return `${this.selectedStatuses.at(0)} (+${this.selectedStatuses.length - 1} ${this.selectedStatuses.length === 2 ? 'other' : 'others'})`;
  }

  // Load applications from service
  loadApplications() {
    this.loading = true;
    this.error = null;

    const filter: ApplicationFilter = {
      search: this.searchTerm || undefined,
      status: this.getSelectedStatus(),
      from: this.dateRange.begin || undefined,
      to: this.dateRange.end || undefined,
      page: this.currentPage,
      size: this.pageSize
    };

    this.applicationService.fetchApplications(filter).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        if (response && response.data) {
          this.applications = response.data.applications;
          this.totalItems = response.data.pagination.total;
          this.totalPages = response.data.pagination.totalPages;
          this.currentPage = response.data.pagination.page;
          this.loading = false;
        }
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Applications loaded successfully'});
      },
      error: (error) => {
        console.error('Error loading applications:', error);
        this.error = 'Failed to load applications';
        this.loading = false;
      }
    });

  }

  private getSelectedStatus(): Status | undefined {
    if (!this.selectedStatuses || this.selectedStatuses.length === 0 || this.selectedStatuses.length === this.statuses.length) {
      return undefined; // All statuses selected or none selected
    }

    if (this.selectedStatuses.length === 1) {
      return this.selectedStatuses[0];
    }

    // If multiple specific statuses are selected, you might need to modify your backend
    // to handle multiple status filters, or handle this differently
    return undefined;
  }

  // Search handling with debouncing
  onSearchChange(searchTerm: string) {
    this.searchSubject.next(searchTerm);
  }

  // Status filter change
  onStatusFilterChange() {
    this.currentPage = 1;
    this.loadApplications();
  }

  // Date range change
  onDateRangeChange() {
    this.currentPage = 1;
    this.loadApplications();
  }

  // Add application modal
  addApplication() {
    this.showAddLoading = true;

    const applicationData: ApplicationRequest = {
      company: this.newApp.company,
      position: this.newApp.position,
      website: this.newApp.website,
      applicationType: this.newApp.applicationType
    };

    this.applicationService.addApplication(applicationData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.showAddModal = false;
          this.newApp = {company: '', website: '', position: '', applicationType: ApplicationType.EMAIL}; // Reset form
          this.loadApplications();
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Application added successfully'});
          this.showAddLoading = false;
        },
        error: (error) => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to add application'});
          console.error('Add application error:', error);
          this.showAddLoading = false;
        }
      });
  }

  get displayedApplications() {
    return this.applications;
  }

  // Pagination methods
  get paginationArray() {
    const maxPages = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxPages / 2));
    let end = Math.min(this.totalPages, start + maxPages - 1);

    if (end - start < maxPages - 1) {
      start = Math.max(1, end - maxPages + 1);
    }

    return Array.from({length: end - start + 1}, (_, i) => start + i);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.loadApplications();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadApplications();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadApplications();
    }
  }

  // Status change methods
  openStatusModal(event: { appId: number; newStatus: string; reason?: string }) {
    console.log('Modal event:', event);
    this.selectedStatusForModal = event.newStatus;
    this.selectedAppForModal = this.applications.find(app => app.id === event.appId) || null;
    this.statusChangeReason = '';
    this.showStatusModal = true;
  }


  confirmStatusChange() {
    if (this.selectedAppForModal && this.selectedStatusForModal) {
      const statusData: ApplicationStatusChangeRequest = {
        applicationId: this.selectedAppForModal.id,
        status: this.selectedStatusForModal,
        notes: this.statusChangeReason,
        interviewType: null,
        testType: null
      };

      this.applicationService.changeApplicationStatus(statusData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.showStatusModal = false;
            this.loadApplications();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Status updated successfully'
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update status'
            });
            console.error('Status update error:', error);
          }
        });
    }
  }

    // Edit and delete application
cancelAddOrEdit() {
  this.showAddModal = false;
  // this.editMode = false;
  this.applicationToEdit = null;
  this.newApp = { company: '', website: '', position: '', applicationType: ApplicationType.EMAIL };
}


editApplication(appId: number) {
  console.log('Edit application', appId);
  console.log('All loaded applications:', this.applications);
  console.log('Current appId:', appId, typeof appId);
  console.log('Available app IDs:', this.applications.map(a => [a.id, typeof a.id]));

  const app = this.applications.find(a => String(a.id) === String(appId));
  if (app) {
    this.applicationToEdit = app;
    this.editMode = true;
    this.showAddModal = true;

    this.newApp = {
      company: app.company ?? '',
      website: app.website ?? '',
      position: app.position ?? '',
      applicationType: app.applicationType ?? ApplicationType.WEBSITE
    };
    console.log('Edit mode modal open:', this.newApp);
  } else {
    console.warn('App not found with id:', appId);
  }
}


updateApplication() {
  if (!this.applicationToEdit) return;

  this.showAddLoading = true;

  const updatedData: ApplicationRequest = {
    company: this.newApp.company,
    website: this.newApp.website,
    position: this.newApp.position,
    applicationType: this.newApp.applicationType
  };

  this.applicationService.updateApplication(this.applicationToEdit.id, updatedData)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: () => {
        this.showAddLoading = false;
        this.cancelAddOrEdit();
        this.loadApplications();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Application updated successfully' });
      },
      error: (err) => {
        this.showAddLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update application' });
        console.error('Update failed:', err);
      }
    });
}




//   deleteApplication(appId: number) {
//     this.applicationService.deleteApplication(appId)
//       .pipe(takeUntil(this.destroy$))
//       .subscribe({
//         next: () => {
//           this.loadApplications();
//           this.messageService.add({
//             severity: 'success',
//             summary: 'Deleted',
//             detail: 'Application deleted successfully'
//           });
//         },
//         error: (error) => {
//           console.error('Delete error:', error);
//           this.messageService.add({
//             severity: 'error',
//             summary: 'Failed',
//             detail: 'Failed to delete application'
//           });
//         }
//       });
// }

  deleteApplication(appId: number) {
    this.selectedAppForDelete = this.applications.find(app => app.id === appId) || null;
  this.showDeleteModal = true;
}

confirmDeleteApplication() {
  if (this.selectedAppForDelete) {
    const id = this.selectedAppForDelete.id;
    this.applicationService.deleteApplication(id).subscribe({
      next: () => {
        this.showDeleteModal = false;
        this.selectedAppForDelete = null;
        this.loadApplications(); // reload updated list
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Application deleted successfully' });
      },
      error: (error) => {
        console.error('Delete error:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete application' });
        this.showDeleteModal = false;
        this.selectedAppForDelete = null;
      }
    });
  }
}


}


