import {Component, inject} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule, ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {RouterOutlet, Router} from "@angular/router";
import {Brand} from '../../../../shared/components/brand/brand';
import {InputWithIcon} from '../../../../shared/components/input-with-icon/input-with-icon';
import {getFormErrors, markAllFieldsAsTouched} from '../../../../core/models/errors';
import {SignupFormData} from '../../../../core/models/auth';
import {strongPasswordValidator} from '../../../../shared/utils/PasswordUtil';

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
export class ResetPassword {
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
    this.router.navigateByUrl('/check-inbox').then();
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
