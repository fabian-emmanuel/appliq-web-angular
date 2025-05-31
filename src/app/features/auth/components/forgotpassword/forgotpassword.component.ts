import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {BrandComponent} from '@shared/components/brand/brand.component';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputWithIconComponent} from '@shared/components/input-with-icon/input-with-icon.component';
import {LoginRequest} from '@core/models/auth';
import {getFormErrors} from '@core/models/errors';

@Component({
  selector: 'app-forgotpassword',
  imports: [
    RouterOutlet,
    BrandComponent,
    FormsModule,
    InputWithIconComponent,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {

  forgotPasswordForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.forgotPasswordForm = this.createForm();
  }


  get email() { return this.forgotPasswordForm.get('email') as FormControl; }


  onSubmit(): void {
    if (!this.forgotPasswordForm.valid) {
      this.markAllFieldsAsTouched();
      console.log('Form is not valid', getFormErrors(this.forgotPasswordForm));
      return;
    }

    const formData = this.forgotPasswordForm.value as LoginRequest;
    console.log('Submitting form', formData);

    // TODO: Call your signup service here
    // this.authService.signup(formData).subscribe(...)
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
