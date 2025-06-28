import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {ApiResponse} from '@core/models/auth';
import {Stats} from '@core/models/dashboard';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = environment.apiUrl;
  private dashboardStats: BehaviorSubject<Stats | null> = new BehaviorSubject<Stats | null>(null);

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

}
