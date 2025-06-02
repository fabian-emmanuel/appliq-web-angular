import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Application} from '../../../core/models/application';

@Component({
  selector: 'app-application-card',
  templateUrl: './application-card.html',
  styleUrls: ['./application-card.css'],
  imports: [CommonModule]
})

export class ApplicationCard {
  @Input() application!: Application;
  @Input() statusDetailsMap: any = {};
  @Input() statuses: string[] = [];

  @Output() requestStatusChange = new EventEmitter<{ appId: number, newStatus: string }>();
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  showStatusMenu: boolean = false;

  get lastUpdateTimestamp() {
    return this.application.statusHistory[this.application.statusHistory.length - 1]?.createdAt;
  }

  get currentStatusDetails() {
    return this.statusDetailsMap[this.application.status];
  }

  onRequestStatusChange(newStatus: string) {
    this.requestStatusChange.emit({ appId: this.application.id, newStatus });
  }

  onEdit() {
    this.edit.emit(this.application.id);
  }

  onDelete() {
    this.delete.emit(this.application.id);
  }

  // Add your utility functions here or import them if needed
  getInitials(company: string): string {
    return company.split(' ').map((n: string) => n[0]).join('').toUpperCase();
  }
}
