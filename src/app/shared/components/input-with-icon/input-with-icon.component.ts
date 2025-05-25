import {Component, Input} from '@angular/core';
import {
  ControlValueAccessor, FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-input-with-icon',
  imports: [
    ReactiveFormsModule,
    RouterLink, CommonModule
  ],
  templateUrl: './input-with-icon.component.html',
  styleUrl: './input-with-icon.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting:  InputWithIconComponent,
    }
  ]
})
export class InputWithIconComponent implements ControlValueAccessor{
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

  get inputClasses(): string {
    return `form-control bg-dark border-secondary text-white ${this.additionalClasses.join(' ')}`;
  }

  get isInvalid(): boolean {
    return this.control?.invalid && (this.control?.dirty || this.control?.touched);
  }


  get isPasswordField(): boolean {
    return this.type === 'password';
  }

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value || '';
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
