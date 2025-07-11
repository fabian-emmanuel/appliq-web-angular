import { AuthService } from '@/app/services/auth-service';
import { Component, NgZone, OnDestroy} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Brand} from '@shared/components/brand/brand';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-check-inbox',
  providers: [AuthService, MessageService],
  imports: [
    FormsModule,
    Brand
  ],
  templateUrl: './check-inbox.html',
  styleUrl: './check-inbox.css'
})
export class CheckInbox implements OnDestroy {
  
  // private ngZone: NgZone,

   constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  
  ngOnDestroy(): void {
    localStorage.removeItem('resetEmail'); 
  }

  openGmail() {
    window.open('https://mail.google.com/', '_blank');
  }

  resendResetLink() {
    const email = localStorage.getItem('resetEmail');
    if (!email) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No email found. Please try again from the Forgot Password page.'
      }); 
      return;
    }
    this.authService.forgotPassword(email).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Password reset link resent! Please check your email.'
        }); 
        console.log('AuthService:', this.authService);
        console.log('ForgotPassword exists?', typeof this.authService.forgotPassword);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error?.message || 'Failed to resend reset link.'
        });
      }
    });
  }
}
