import {Component, inject} from '@angular/core';
import {BrandComponent} from "@shared/components/brand/brand.component";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule, ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {InputWithIconComponent} from "@shared/components/input-with-icon/input-with-icon.component";
import {RouterOutlet, Router} from "@angular/router";
import {strongPasswordValidator} from '@shared/utils/PasswordUtil';
import {SignupFormData} from '@core/models/auth';
import {getFormErrors, markAllFieldsAsTouched} from '@core/models/errors';

@Component({
  selector: 'app-reset-password',
  imports: [
    BrandComponent,
    FormsModule,
    InputWithIconComponent,
    RouterOutlet,
    ReactiveFormsModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  private router = inject(Router);

  resetPasswordForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.resetPasswordForm = this.createForm();
  }

  get password() { return this.resetPasswordForm.get('password') as FormControl; }
  get confirmPassword() { return this.resetPasswordForm.get('confirmPassword') as FormControl; }


  onSubmit(): void {
    if (!this.resetPasswordForm.valid) {
      markAllFieldsAsTouched(this.resetPasswordForm);
      console.log('Form is not valid', getFormErrors(this.resetPasswordForm));
      return;
    }

    const formData = this.resetPasswordForm.value as SignupFormData;
    console.log('Submitting form', formData);

    // TODO: Call your signup service here
    // this.authService.signup(formData).subscribe(...)
    this.router.navigateByUrl('/check-inbox').then(r => []);
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
