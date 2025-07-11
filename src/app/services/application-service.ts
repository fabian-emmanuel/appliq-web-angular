import {Injectable} from '@angular/core';
import {environment} from '@environment/environment';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {
  ApplicationFilter,
  ApplicationRequest,
  Applications,
  Application,
  InterviewType,
  TestType,
  Status,
  ApplicationStatusChangeRequest
} from '@core/models/application';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiResponse} from '@core/models/auth';

interface UpdateStatusRequest {
  applicationId: number;
  status: Status;
  notes?: string;
  testType?: TestType | null;
  interviewType?: InterviewType | null;
}

interface UpdateStatusResponse {
  applicationId: number;
  createdAt: string;
  createdBy: number;
  id: number;
  interviewType: InterviewType | null;
  notes: string;
  status: Status;
  testType: TestType | null;
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = environment.apiUrl;
  private applications: BehaviorSubject<Applications | null> = new BehaviorSubject<Applications | null>(null);

  constructor(private http: HttpClient) {
  }


  fetchApplications(filter: ApplicationFilter): Observable<ApiResponse<Applications>> {
    // Create HttpParams and filter out undefined/null values
    let params = new HttpParams();

    if (filter.search) {
      params = params.set('search', filter.search);
    }
    if (filter.status) {
      params = params.set('status', filter.status.toString());
    }
    if (filter.from) {
      params = params.set('from', filter.from.toISOString());
    }
    if (filter.to) {
      params = params.set('to', filter.to.toISOString());
    }
    if (filter.page !== undefined && filter.page !== null) {
      params = params.set('page', filter.page.toString());
    }
    if (filter.size !== undefined && filter.size !== null) {
      params = params.set('size', filter.size.toString());
    }

    return this.http.get<ApiResponse<Applications>>(`${this.apiUrl}/application`, {params}).pipe(
      tap(response => {
        if (response && response.data) {
          this.applications.next(response.data);
        }
      })
    );
  }

  changeApplicationStatus(resp: ApplicationStatusChangeRequest) {
    return this.http.post<ApiResponse<any>>(
      `${this.apiUrl}/application/status`,
      resp
    );
  }

  addApplication(application: ApplicationRequest): Observable<ApiResponse<Application>> {
    return this.http.post<ApiResponse<Application>>(`${this.apiUrl}/application`, application);
  }

// this is a POST request
  updateApplicationStatus(statusUpdate: UpdateStatusRequest): Observable<ApiResponse<UpdateStatusResponse>> {
    return this.http.post<ApiResponse<UpdateStatusResponse>>(`${this.apiUrl}/application/status`, statusUpdate);
  }
}


