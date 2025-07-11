import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {getFormErrors} from '@core/models/errors';
import {LoginRequest} from '@core/models/auth';
import {Brand} from '@shared/components/brand/brand';
import {InputWithIcon} from '@shared/components/input-with-icon/input-with-icon';
import { AuthService } from '@app/services/auth-service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forgot-password',
  imports: [
    FormsModule,
    RouterOutlet,
    Brand,
    ReactiveFormsModule,
    InputWithIcon,
    RouterLink
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {
  forgotPasswordForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.forgotPasswordForm = this.createForm();
  }


  get email() { return this.forgotPasswordForm.get('email') as FormControl; }


  onSubmit(): void {
    if (!this.forgotPasswordForm.valid) {
      this.markAllFieldsAsTouched();
      console.log('Form is not valid', getFormErrors(this.forgotPasswordForm));
      return;
    }

    this.isLoading = true;
    const { email } = this.forgotPasswordForm.value;

    this.authService.forgotPassword(email).subscribe({
      next: () => {
        this.isLoading = false;
        localStorage.setItem('resetEmail', email);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Password reset link sent! Please check your email.'
        });
        this.router.navigate(['/check-inbox']);
      },
      error: (err) => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error?.message || 'Failed to send password reset link.'
        });
      }
    });
  }

  markAllFieldsAsTouched(): void {
    Object.keys(this.forgotPasswordForm.controls).forEach(key => {
      const control = this.forgotPasswordForm.get(key);
      control?.markAsTouched();
    });
  }


  private createForm(): FormGroup {
    return this.fb.group({
      email: ['', [
        Validators.required, Validators.email,
      ]],
    }, {
      updateOn: 'blur'
    });
  }


  
}

