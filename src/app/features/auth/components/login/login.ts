import {Component} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {InputWithIcon} from '../../../../shared/components/input-with-icon/input-with-icon';
import {getFormErrors} from '../../../../core/models/errors';
import {LoginRequest} from '../../../../core/models/auth';

@Component({
  selector: 'app-login',
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    RouterLink,
    InputWithIcon
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.createForm();
  }


  get email() { return this.loginForm.get('email') as FormControl; }
  get password() { return this.loginForm.get('password') as FormControl; }
  get rememberMe() { return this.loginForm.get('rememberMe') as FormControl; }


  onSubmit(): void {
    if (!this.loginForm.valid) {
      this.markAllFieldsAsTouched();
      console.log('Form is not valid', getFormErrors(this.loginForm));
      this.router.navigate(['/dashboard']).then();
      return;
    }

    const formData = this.loginForm.value as LoginRequest;
    console.log('Submitting form', formData);

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
}
