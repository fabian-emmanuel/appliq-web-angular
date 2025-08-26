import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {ApiResponse} from '@core/models/auth';
import {DashboardSuccessRate, Stats} from '@core/models/dashboard';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = environment.apiUrl;
  private dashboardStats: BehaviorSubject<Stats | null> = new BehaviorSubject<Stats | null>(null);
  private dashboardSuccessRate = new BehaviorSubject<DashboardSuccessRate | null>(null);
successRate$ = this.dashboardSuccessRate.asObservable();

  constructor(private http: HttpClient) {
  }

  stats(): Observable<ApiResponse<Stats>> {
    return this.http.get<ApiResponse<Stats>>(`${this.apiUrl}/dashboard/stats`).pipe(
      tap(response => {
          if (response && response.data) {
            // console.log('Dashboard stats fetched successfully:', response.data);
            this.dashboardStats.next(response.data);
          }
        }
      )
    )
  }

getSuccessRate(): Observable<ApiResponse<DashboardSuccessRate>> {
  return this.http.get<ApiResponse<DashboardSuccessRate>>(`${this.apiUrl}/dashboard/success-rate`).pipe(
    tap(response => {
      if (response && response.data) {
        this.dashboardSuccessRate.next(response.data);
      }
    })
  );
}

getRecentActivities(): Observable<ApiResponse<{ activities: any[] }>> {
  return this.http.get<ApiResponse<{ activities: any[] }>>(`${this.apiUrl}/dashboard/recent-activities`);
}

getAverageResponseTime(): Observable<ApiResponse<{ average: string; comparedToMessage: string; fasterMessage: string }>> {
  return this.http.get<ApiResponse<{ average: string; comparedToMessage: string; fasterMessage: string }>>(
    `${this.apiUrl}/dashboard/average-response-time`
  );
}

getChartData(statuses: string[], from?: string, to?: string): Observable<ApiResponse<{ bar_data: any[]; line_data: any[] }>> {
  let params = new HttpParams();
  if (statuses && statuses.length) {
    params = params.set('statuses', statuses.join(','));
  }
  if (from) {
    params = params.set('from', from);
  }
  if (to) {
    params = params.set('to', to);
  }
  return this.http.get<ApiResponse<{ bar_data: any[]; line_data: any[] }>>(
    `${this.apiUrl}/dashboard/chart-data`, { params }
  );
}

// getChartData(statuses: string[], from?: string, to?: string): Observable<ApiResponse<{ bar_data: any[]; line_data: any[] }>> {
//   let params = new HttpParams();
//   if (statuses && statuses.length) {
//     statuses.forEach(status => {
//       params = params.append('statuses', status);
//     });
//   }
//   if (from) {
//     params = params.set('from', from);
//   }
//   if (to) {
//     params = params.set('to', to);
//   }
//   return this.http.get<ApiResponse<{ bar_data: any[]; line_data: any[] }>>(
//     `${this.apiUrl}/dashboard/chart-data`, { params }
//   );
// }

}
