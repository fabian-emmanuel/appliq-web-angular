import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {environment} from '@environment/environment';
import {HttpClient} from '@angular/common/http';
import {isPlatformBrowser} from '@angular/common';
import {ApiResponse, LoginRequest, LoginResponse, SignupFormData} from '@core/models/auth';
import {last, Observable, tap} from 'rxjs';
import {User} from '@core/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly isBrowser: boolean;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  login(credentials: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response: ApiResponse<LoginResponse>) => {
        if (response && response.data.accessToken) {
          this.setToken(response.data.accessToken);
        }
      })
    );
  }

  signup(signupFormData: SignupFormData): Observable<ApiResponse<User>> {
    const body = {
      email: signupFormData.email,
      firstName: signupFormData.firstName,
      lastName: signupFormData.lastName,
      password: signupFormData.password,
      phoneNumber: signupFormData.phoneNumber,
    };
    console.log('Signing up user with info:', signupFormData);
    return this.http.post<ApiResponse<User>>(`${this.apiUrl}/user/register`, body);
    // return new Observable<ApiResponse<User>>(observer => {});
  }

  
  logoutApi(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/logout`, {});
  }
  
  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }
  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private setToken(token: string): void {
    if (this.isBrowser) {
      console.log(`Saving token: ${token}`);
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }
}
