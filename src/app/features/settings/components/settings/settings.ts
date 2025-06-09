import {Component} from '@angular/core';
import {
  AbstractControl,
  FormBuilder, FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {NgOptimizedImage} from '@angular/common';
import {CountryISO, NgxIntlTelInputModule, PhoneNumberFormat} from 'ngx-intl-tel-input';
import {strongPasswordValidator} from '../../../../shared/utils/PasswordUtil';
import {IntlInputTelComponent, SearchCountryField} from 'p-intl-input-tel';

@Component({
  selector: 'app-settings',
  imports: [
    ReactiveFormsModule,
    NgOptimizedImage,
    NgxIntlTelInputModule,
    IntlInputTelComponent
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings {
  profileForm!: FormGroup;
  accountForm!: FormGroup;

  isProfileEditing = false;
  isAccountEditing = false;
  profileImageUrl = 'https://github.com/shadcn.png';
  isLoading = false;

  preferredCountries: CountryISO[] = [CountryISO.Nigeria, CountryISO.UnitedKingdom];

  constructor(private fb: FormBuilder) {
    this.profileForm = this.createProfileForm();
    this.accountForm = this.createAccountForm();
    this.loadUserData();
  }

  //getters for form controls
  get firstName() { return this.profileForm.get('firstName') as FormControl; }
  get lastName() { return this.profileForm.get('lastName') as FormControl; }
  get bio() { return this.profileForm.get('bio') as FormControl; }
  get phone() { return this.profileForm.get('phone') as FormControl; }
  get location() { return this.profileForm.get('location') as FormControl; }

  get email() { return this.accountForm.get('email') as FormControl; }
  get currentPassword() { return this.accountForm.get('newPassword') as FormControl; }
  get password() { return this.accountForm.get('newPassword') as FormControl; }
  get confirmPassword() { return this.accountForm.get('confirmPassword') as FormControl; }


  private createProfileForm(): FormGroup {
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
      bio: ['', [
        Validators.maxLength(500)
      ]],
      phone: ['', [
        Validators.required,
        Validators.maxLength(500)
      ]],
      location: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(500)
      ]]
    }, {
      validators: [],
      updateOn: 'blur'
    });
  }

  private createAccountForm(): FormGroup {
    return this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(254)
      ]],
      currentPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(128),
        strongPasswordValidator
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(128),
        strongPasswordValidator
      ]],
      confirmPassword: ['', [
        Validators.required
      ]]
    }, {
      validators: [this.passwordMatchValidator],
      updateOn: 'blur'
    });
  }

  private noWhitespaceValidator = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    return value.trim().length === 0 ? { whitespace: true } : null;
  };


  loadUserData(): void {
    this.profileForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      bio: 'Software developer passionate about creating amazing user experiences.',
      phone: '+2348066504447', // If available, use IntlTelPhoneNumber structure
      location: 'San Francisco, CA'
    });

    this.accountForm.patchValue({
      email: 'john.doe@example.com',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: any } | null {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return newPassword && confirmPassword && newPassword !== confirmPassword
      ? { passwordMismatch: true }
      : null;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('profileImage') as HTMLInputElement;
    fileInput.click();
  }

  toggleProfileEdit(): void {
    this.isProfileEditing = !this.isProfileEditing;
    if (!this.isProfileEditing) {
      this.loadUserData(); // Reset form if cancelled
    }
  }

  toggleAccountEdit(): void {
    this.isAccountEditing = !this.isAccountEditing;
    if (!this.isAccountEditing) {
      this.accountForm.reset({
        email: this.email?.value || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      this.isLoading = true;
      setTimeout(() => {
        console.log('Profile updated:', this.profileForm.value);
        this.isLoading = false;
        this.isProfileEditing = false;
      }, 1000);
    } else {
      this.markFormGroupTouched(this.profileForm);
    }
  }

  saveAccount(): void {
    if (this.accountForm.valid) {
      this.isLoading = true;
      setTimeout(() => {
        console.log('Account updated:', this.accountForm.value);
        this.isLoading = false;
        this.isAccountEditing = false;
        this.accountForm.get('currentPassword')?.setValue('');
        this.accountForm.get('newPassword')?.setValue('');
        this.accountForm.get('confirmPassword')?.setValue('');
      }, 1000);
    } else {
      this.markFormGroupTouched(this.accountForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  getFieldError(form: FormGroup, fieldName: string): string {
    const field = form.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Invalid email format';
      if (field.errors['minlength']) return `Minimum ${field.errors['minlength'].requiredLength} characters required`;
      if (field.errors['maxlength']) return `Maximum ${field.errors['maxlength'].requiredLength} characters allowed`;
      if (field.errors['pattern']) return 'Invalid format';
      if (field.errors['passwordMismatch']) return 'Passwords do not match';
    }
    return '';
  }

  protected readonly CountryISO = CountryISO;
  protected readonly SearchCountryField = SearchCountryField;
  protected readonly PhoneNumberFormat = PhoneNumberFormat;
}
