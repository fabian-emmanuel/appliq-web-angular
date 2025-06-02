import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {CalendarEvent, CalendarModule, CalendarView} from 'angular-calendar';
import {MatIconButton} from '@angular/material/button';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatTooltip} from '@angular/material/tooltip';
import {FormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {Application, Status, StatusHistory} from '../../../../core/models/application';
import {applicationList} from '../../../../core/models/store';
import {EventDetailDialogComponent} from '../event-detail-dialog/event-detail-dialog';


interface CustomCalendarEvent extends CalendarEvent {
  applicationId: number;
  applicationCompany: string;
  applicationPosition: string;
  statusHistoryId: number;
  statusHistoryDetails: StatusHistory;
}


@Component({
  selector: 'app-calendar',
  imports: [
    MatNativeDateModule,
    MatIconButton,
    MatIcon,
    MatRadioGroup,
    MatRadioButton,
    MatFormField,
    MatLabel,
    MatSelect,
    CalendarModule,
    MatTooltip,
    MatIcon,
    FormsModule,
    MatOption
  ],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css'
})
export class Calendar implements OnInit{
  view: CalendarView = CalendarView.Month; // Default view
  viewDate: Date = new Date(); // Current date for the calendar

  today: Date = new Date(); // To reset view to today

  // For event refresh
  refresh: Subject<any> = new Subject();

  calendarEvents: CustomCalendarEvent[] = []; // Events to display

  allStatuses: Status[] = ['Applied', 'Interview', 'OfferAwarded', 'Rejected', 'Test'];
  selectedStatuses: Status[] = ['Interview', 'Test']; // Default to relevant event statuses

  // dommy Data (expanded from dashboard to include more relevant dates for calendar)
  private dummyApplications: Application[] = applicationList;


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    const events: CustomCalendarEvent[] = [];

    this.dummyApplications.forEach(app => {
      app.statusHistory.forEach(history => {
        // Only include history items whose status is in our selectedStatuses filter
        if (this.selectedStatuses.includes(history.status)) {
          let eventTitle = `${app.company} - ${app.position}`;
          let eventColor: { primary: string; secondary: string }; // Default red

          // Determine event specifics and color based on status/type
          switch (history.status) {
            case 'Interview':
              eventTitle += ` - Interview`;
              if (history.interviewType === 1) eventTitle += ` (Phone)`;
              if (history.interviewType === 2) eventTitle += ` (On-site)`;
              eventColor = { primary: '#1e90ff', secondary: '#D1E8FF' }; // Blue
              break;
            case 'Test':
              eventTitle += ` - Test`;
              if (history.testType) eventTitle += ` (${history.testType})`;
              eventColor = { primary: '#FF7F00', secondary: '#FFE0B3' }; // Orange
              break;
            case 'OfferAwarded':
              eventTitle += ` - Offer`;
              eventColor = { primary: '#008000', secondary: '#CCFFCC' }; // Green
              break;
            case 'Rejected':
              eventTitle += ` - Follow-up`;
              eventColor = { primary: '#B22222', secondary: '#FFDAB9' }; // IndianRed
              break;
            // Add more cases for other statuses you want to show on the calendar
            default:
              eventTitle += ` - ${history.status}`;
              eventColor = { primary: '#AAAAAA', secondary: '#EEEEEE' }; // Grey for others
              break;
          }
          if (history.notes) {
            eventTitle += ` (${history.notes.substring(0, 20)}...)`; // Shorten notes for title
          }


          events.push({
            title: eventTitle,
            start: new Date(history.createdAt),
            color: eventColor,
            draggable: false, // You can make events draggable if needed
            resizable: { beforeStart: false, afterEnd: false },
            applicationId: app.id,
            applicationCompany: app.company,
            applicationPosition: app.position,
            statusHistoryId: history.id,
            statusHistoryDetails: history,
          });
        }
      });
    });
    this.calendarEvents = events;
    this.refresh.next(true); // Notify calendar to re-render
  }

  handleEventClick(event: { event: CalendarEvent }): void {
    const customEvent = event.event as CustomCalendarEvent;
    console.log('Event clicked:', event.event);
    this.dialog.open(EventDetailDialogComponent, {
      data: {
        application: this.dummyApplications.find(app => app.id === customEvent.applicationId),
        statusHistory: customEvent.statusHistoryDetails
      },
      width: '500px', // Adjust width as needed
      panelClass: 'custom-dialog-container' // Optional: for custom styling
    });
  }

}
