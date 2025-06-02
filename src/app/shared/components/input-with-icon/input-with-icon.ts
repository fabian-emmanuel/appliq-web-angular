import {Component, Input} from '@angular/core';
import {
  ControlValueAccessor, FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from '@angular/forms';
import {RouterLink, RouterOutlet} from '@angular/router';
import {getPasswordStrength, getPasswordStrengthLabel, passwordRequirements} from '../../utils/PasswordUtil';


@Component({
  selector: 'app-input-with-icon',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet
],
  templateUrl: './input-with-icon.html',
  styleUrl: './input-with-icon.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting:  InputWithIcon,
    }
  ]
})
export class InputWithIcon implements ControlValueAccessor{
  @Input() formGroup!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() icon!: string;
  @Input() isLoginForm !: string;
  @Input() type!: string;
  @Input() control!: FormControl;
  @Input() additionalClasses: string[] = [];

  value: string = '';
  disabled: boolean = false;
  showPassword: boolean = false;
  currentPassword: string = '';
  passwordStrength: number = 0;
  passwordRequirements = passwordRequirements

  get inputClasses(): string {
    return `form-control bg-dark border-secondary text-white ${this.additionalClasses.join(' ')}`;
  }

  get isInvalid(): boolean {
    return this.control?.invalid && (this.control?.dirty || this.control?.touched);
  }


  get isPasswordField(): boolean {
    return this.type === 'password';
  }

  get isLogin(): boolean {
    return this.isLoginForm === 'true';
  }

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value || '';
    this.currentPassword = value || '';
    if (this.isPasswordField) {
      this.updatePasswordStrength(this.currentPassword);
    }
  }

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.currentPassword = target.value;
    this.value = target.value;

    if (this.isPasswordField) {
      this.updatePasswordStrength(target.value);
    }

    this.onChange(target.value);
    this.onTouched();
  }

  private updatePasswordStrength(password: string) {
    this.passwordStrength = getPasswordStrength(password);
  }

  get passwordStrengthLabel(): string {
    return getPasswordStrengthLabel(this.currentPassword);
  }

  get passwordStrengthTextClass(): string {
    const strength = this.passwordStrength;
    if (strength < 40) return 'text-danger';
    if (strength < 70) return 'text-warning';
    if (strength < 90) return 'text-info';
    return 'text-success';
  }

  get passwordStrengthBarClass(): string {
    const strength = this.passwordStrength;
    if (strength < 40) return 'bg-danger';
    if (strength < 70) return 'bg-warning';
    if (strength < 90) return 'bg-info';
    return 'bg-success';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  get currentInputType(): string {
    if (this.isPasswordField) {
      return this.showPassword ? 'text' : 'password';
    }
    return this.type;
  }


  togglePasswordVisibility() {
    console.log('Toggling password visibility');
    this.showPassword = !this.showPassword;
  }
}
