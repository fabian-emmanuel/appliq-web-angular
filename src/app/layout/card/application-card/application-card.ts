import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Application } from '@core/models/application';

@Component({
  selector: 'app-application-card',
  templateUrl: './application-card.html',
  styleUrls: ['./application-card.css'],
  imports: [CommonModule, FormsModule]
})

export class ApplicationCardComponent {
  @Input() application!: Application;
  @Input() statusDetailsMap: any = {};
  @Input() statuses: string[] = [];
  @Input() viewMode: 'grid' | 'list' = 'grid';

  @Output() requestStatusChange = new EventEmitter<{ appId: number, newStatus: string, reason: string }>();
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  showStatusMenu: boolean = false;
   showStatusModal: boolean = false;
  selectedStatus: string | null = null;
 statusChangeReason: string = '';

  get lastUpdateTimestamp() {
    return this.application.statusHistory[this.application.statusHistory.length - 1]?.createdAt;
  }

  get currentStatusDetails() {
    return this.statusDetailsMap[this.application.status];
  }

  // onRequestStatusChange(newStatus: string) {
  //   this.requestStatusChange.emit({ appId: this.application.id, newStatus });
  // }

   openStatusModal(status: string) {
    this.selectedStatus = status;
    this.statusChangeReason = '';
    this.showStatusModal = true;
    this.showStatusMenu = false;
  }

  confirmStatusChange() {
    if (this.selectedStatus) {
      this.requestStatusChange.emit({
        appId: this.application.id,
        newStatus: this.selectedStatus,
        reason: this.statusChangeReason
      });
      this.showStatusModal = false;
      this.selectedStatus = null;
      this.statusChangeReason = '';
    }
  }

  closeStatusModal() {
    this.showStatusModal = false;
    this.selectedStatus = null;
    this.statusChangeReason = '';
  }

  onEdit() {
    this.edit.emit(this.application.id);
  }

  onDelete() {
    this.delete.emit(this.application.id);
  }

  // Add your utility functions here or import them if needed
  getInitials(company: string): string {
    return company.replace(/\s+/g, '').substring(0, 2).toUpperCase(); 
 }
}

//     return company.split(' ').map((n: string) => n[0]).join('').toUpperCase();
