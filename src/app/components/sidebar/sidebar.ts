import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { PageTitle } from '@shared/services/page-title/page-title';
import { User } from '@core/models/user';
import { UserService } from '@app/services/user-service';
import { AuthService } from '@app/services/auth-service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  userInfo: User | null = null;
  isLoading = false;

  constructor(
    private pageTitle: PageTitle,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.userInfo = userService.getCurrentUser();
  }

  setTitle(title: string) {
    this.pageTitle.setTitle(title);
  }

  logout() {
    this.isLoading = true;
    // Optionally call backend logout API here if you have one
    // this.authService.logoutApi().subscribe({
    //   next: () => { ... },
    //   error: () => { ... }
    // });

    // Remove token from storage
    this.authService.logout();

    // Redirect to login page
    this.router.navigate(['/login']).then(() => {
      this.isLoading = false;
    });
  }
}

//  logout() {
//     this.isLoading = true;
//     this.authService.logoutApi().pipe(
//       finalize(() => {
//         // Always remove token and redirect, even if API fails
//         this.authService.logout();
//         this.router.navigate(['/login']).then(() => {
//           this.isLoading = false;
//         });
//       })
//     ).subscribe({
//       next: () => {
//         // Optionally show a message or log success
//       },
//       error: (err) => {
//         // Optionally handle/log error
//         // Still logs out locally and redirects
//       }
//     });
//   }
// }
