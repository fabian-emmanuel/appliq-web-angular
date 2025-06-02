import { Component, Inject } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogTitle, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DatePipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {Application, InterviewType, StatusHistory} from '../../../../core/models/application';

@Component({
  selector: 'app-event-detail-dialog',
  imports: [
    MatDialogContent,
    MatDialogTitle,
    DatePipe,
    MatDialogActions,
    MatButton,
    RouterLink
  ],
  templateUrl: './event-detail-dialog.html',
  styleUrl: './event-detail-dialog.css'
})
export class EventDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EventDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { application: Application, statusHistory: StatusHistory }
  ) {}

  getInterviewType(type: InterviewType): string {
    switch (type) {
      case InterviewType.Hr:
        return 'HR Interview';
      case InterviewType.Behavioural:
        return 'Behavioural Interview';
      case InterviewType.Technical:
        return 'Technical Interview';
      case InterviewType.Other:
        return 'Other Interview';
      default:
        return 'Unknown Interview Type';
    }
  }

}
