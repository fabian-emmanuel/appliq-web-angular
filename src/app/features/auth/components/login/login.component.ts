import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {InputWithIconComponent} from '@shared/components/input-with-icon/input-with-icon.component';
import {LoginRequest} from '@core/models/auth';

@Component({
  selector: 'app-login',
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    RouterLink,
    InputWithIconComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.createForm();
  }


  get email() { return this.loginForm.get('email') as FormControl; }
  get password() { return this.loginForm.get('password') as FormControl; }
  get rememberMe() { return this.loginForm.get('rememberMe') as FormControl; }


  onSubmit(): void {
    if (!this.loginForm.valid) {
      this.markAllFieldsAsTouched();
      console.log('Form is not valid', this.getFormErrors());
      return;
    }

    const formData = this.loginForm.value as LoginRequest;
    console.log('Submitting form', formData);

    // TODO: Call your signup service here
    // this.authService.signup(formData).subscribe(...)
  }

  onCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.rememberMe.setValue(target.checked);
    this.rememberMe.markAsTouched();

    // Force change detection if needed
    console.log('Remember Me Checkbox changed:', target.checked);
  }

  private createForm(): FormGroup {
    return this.fb.group({
      email: ['', [
        Validators.required, Validators.email,
        this.customEmailValidator,
        Validators.maxLength(254)
      ]],
      password: ['', [
        Validators.required,
      ]],
      rememberMe: [false],
    }, {
      updateOn: 'blur'
    });
  }

  customEmailValidator(control: AbstractControl): ValidationErrors | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Requires a top-level domain
    const valid = emailRegex.test(control.value);
    return valid ? null : { email: true };
  }

  markAllFieldsAsTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  private getFormErrors(): any {
    const errors: any = {};

    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      if (control && control.errors) {
        errors[key] = control.errors;
      }
    });

    if (this.loginForm.errors) {
      errors.form = this.loginForm.errors;
    }

    return errors;
  }


}
