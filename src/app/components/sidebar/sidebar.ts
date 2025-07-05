import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {PageTitle} from '@shared/services/page-title/page-title';
import {User} from '@core/models/user';
import {UserService} from '@app/services/user-service';
import { AuthService } from '@app/services/auth-service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api'; 
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
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
    private router: Router,
    private messageService: MessageService 
  ) {
    this.userInfo = userService.getCurrentUser();
  }

  setTitle(title: string) {
    this.pageTitle.setTitle(title);
  }

  logout() {
    this.isLoading = true;
    this.authService.logoutApi().pipe(
      finalize(() => {
        // Always remove token and redirect, even if API fails
        this.authService.logout();
        this.router.navigate(['/']).then(() => {
          this.isLoading = false;
        });
      })
    ).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'You have logged out successfully'
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'You have logged out successfully'
        });
      }
    });
  }
}
