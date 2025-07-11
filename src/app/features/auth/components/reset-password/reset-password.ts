import {Component, inject, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule, ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {RouterOutlet, Router, ActivatedRoute} from "@angular/router";
import {Brand} from '@shared/components/brand/brand';
import {InputWithIcon} from '@shared/components/input-with-icon/input-with-icon';
import {getFormErrors, markAllFieldsAsTouched} from '@core/models/errors';
import {strongPasswordValidator} from '@shared/utils/PasswordUtil';
import { AuthService } from '@app/services/auth-service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reset-password',
  imports: [
    Brand,
    FormsModule,
    InputWithIcon,
    RouterOutlet,
    ReactiveFormsModule
  ],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPassword implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  resetPasswordForm!: FormGroup;
  token: string = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.resetPasswordForm = this.createForm();
  }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  get password() { return this.resetPasswordForm.get('password') as FormControl; }
  get confirmPassword() { return this.resetPasswordForm.get('confirmPassword') as FormControl; }

  onSubmit(): void {
    if (!this.resetPasswordForm.valid) {
      markAllFieldsAsTouched(this.resetPasswordForm);
      console.log('Form is not valid', getFormErrors(this.resetPasswordForm));
      return;
    }
    if (!this.token) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid or missing reset token.'
      });
      return;
    }

    this.isLoading = true;
    const { password, confirmPassword } = this.resetPasswordForm.value;

    this.authService.resetPassword(this.token, password, confirmPassword).subscribe({
      next: () => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Password reset successful! Please log in.'
        });
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error?.message || 'Failed to reset password.'
        });
      }
    });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(128),
        strongPasswordValidator
      ]],
      confirmPassword: ['', [
        Validators.required
      ]],
    }, {
      validators: [this.passwordMatchValidator],
      updateOn: 'blur'
    });
  }

  private passwordMatchValidator = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  };
}

