import {Component, OnInit, PLATFORM_ID, Inject} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import {AuthService} from '@app/services/auth-service';
import {UserService} from '@app/services/user-service';
import {MessageService} from 'primeng/api';
import {LoadingService} from '@shared/services/loading/loading.service';
import {LoadingSpinnerComponent} from '@shared/components/loading-spinner/loading-spinner';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingSpinnerComponent, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected title = 'appliq-web-angular';
  private readonly isBrowser: boolean;
  public isAppReady: boolean = false;

  constructor(private authService: AuthService, private router: Router, private userService: UserService, @Inject(PLATFORM_ID) private platformId: Object, private messageService: MessageService, private loadingService: LoadingService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.loadingService.show(); // Show loading spinner
    console.log(`App: isBrowser: ${this.isBrowser}`);
    const isAuthenticated = this.authService.isAuthenticated();
    console.log(`App: isAuthenticated: ${isAuthenticated}`);
    if (this.isBrowser && isAuthenticated) {
      this.userService.loadCurrentUser().subscribe({
        next: () => {
          console.log('User data loaded successfully', this.userService.getCurrentUser());
          // If user is authenticated and on the root path, redirect to dashboard
          if (this.router.url === '/') {
            this.router.navigate(['/dashboard']).then(r => {});
          }
          this.isAppReady = true;
          this.loadingService.hide(); // Hide loading spinner on success
        },
        error: (err) => {
          console.error('Failed to load user data', err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message || 'Failed to load user data' });
          this.isAppReady = true;
          this.loadingService.hide(); // Hide loading spinner on error
          // Optionally, log out the user if user data cannot be loaded
          this.authService.logout();
          this.router.navigate(['/login']).then(r => {});
        }
      });
    } else {
      this.isAppReady = true;
      this.loadingService.hide(); // Hide loading spinner if not authenticated or not in browser
    }
  }
}
