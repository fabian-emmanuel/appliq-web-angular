import {Component} from '@angular/core';
import {InputWithIconComponent} from '@shared/components/input-with-icon/input-with-icon.component';
import {
  AbstractControl,
  FormBuilder, FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {RouterLink, RouterOutlet} from '@angular/router';
import {SignupFormData} from '@core/models/auth';
import {strongPasswordValidator} from '@shared/utils/PasswordUtil';

@Component({
  selector: 'app-signup',
  imports: [
    InputWithIconComponent,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.createForm();
  }

  // Getter properties for form controls
  get firstName() { return this.signupForm.get('firstName') as FormControl; }
  get lastName() { return this.signupForm.get('lastName') as FormControl; }
  get email() { return this.signupForm.get('email') as FormControl; }
  get password() { return this.signupForm.get('password') as FormControl; }
  get confirmPassword() { return this.signupForm.get('confirmPassword') as FormControl; }
  get acceptTerms() { return this.signupForm.get('acceptTerms') as FormControl; }

  onSubmit(): void {
    if (!this.signupForm.valid) {
      this.markAllFieldsAsTouched();
      console.log('Form is not valid', this.getFormErrors());
      return;
    }

    const formData = this.signupForm.value as SignupFormData;
    console.log('Submitting form', formData);

    // TODO: Call your signup service here
    // this.authService.signup(formData).subscribe(...)
  }

  onCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.acceptTerms.setValue(target.checked);
    this.acceptTerms.markAsTouched();

    // Force change detection if needed
    console.log('Checkbox changed:', target.checked);
  }



  private createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        this.noWhitespaceValidator
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        this.noWhitespaceValidator
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(254)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(128),
        strongPasswordValidator
      ]],
      confirmPassword: ['', [
        Validators.required
      ]],
      acceptTerms: [false, [Validators.requiredTrue]],
    }, {
      validators: [this.passwordMatchValidator],
      updateOn: 'blur' // or 'blur' for better performance
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

  private noWhitespaceValidator = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    return value.trim().length === 0 ? { whitespace: true } : null;
  };

  private markAllFieldsAsTouched(): void {
    Object.keys(this.signupForm.controls).forEach(key => {
      const control = this.signupForm.get(key);
      control?.markAsTouched();
    });
  }

  private getFormErrors(): any {
    const errors: any = {};

    Object.keys(this.signupForm.controls).forEach(key => {
      const control = this.signupForm.get(key);
      if (control && control.errors) {
        errors[key] = control.errors;
      }
    });

    if (this.signupForm.errors) {
      errors.form = this.signupForm.errors;
    }

    return errors;
  }
}
