import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {CountryISO, IntlInputTelComponent, SearchCountryField} from "p-intl-input-tel";
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-phone-input',
  imports: [
    FormsModule,
    IntlInputTelComponent,
    ReactiveFormsModule,
    RouterOutlet
  ],
  templateUrl: './phone-input.html',
  styleUrl: './phone-input.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneInput),
      multi: true
    }
  ]
})
export class PhoneInput implements ControlValueAccessor {
  // Inputs for the p-intl-tel-input component
  @Input() preferredCountries: CountryISO[] = [];
  @Input() enableAutoCountrySelect: boolean = true;
  @Input() displayPlaceholder: boolean = true;
  @Input() selectedCountryISO: CountryISO = CountryISO.Nigeria;
  @Input() phoneValidation: boolean = true;
  @Input() separateDialCode: boolean = true;
  @Input() searchCountryFields: SearchCountryField[] = [SearchCountryField.NAME, SearchCountryField.DIALCODE];
  @Input() formControl: FormControl = new FormControl();
  // Output for value changes
  @Output() phoneNumberChange = new EventEmitter<any>();

  // Internal value and state
  public phoneValue: string = '';
  public isDisabled: boolean = false;

  // Store the current country to build international format
  private currentCountry: any = {
    dialCode: '234', // Default Nigeria dial code
    iso2: 'NG',
    name: 'Nigeria'
  };

  // ControlValueAccessor methods
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {}

  get isInvalid(): boolean {
    return this.formControl?.invalid && this.formControl?.dirty;
  }
  // Handle phone number input changes
  onPhoneInputChange(value: string): void {
    this.phoneValue = value;
    const internationalNumber = this.buildInternationalNumber(value);
    this.onChange(internationalNumber);
    this.onTouched();
  }


  // Handle country changes from p-intl-tel-input
  onCountryChange(country: any): void {
    if (country?.iso2 !== this.currentCountry?.iso2) {
      this.currentCountry = country;
      if (this.phoneValue) {
        const internationalNumber = this.buildInternationalNumber(this.phoneValue);
        this.onChange(internationalNumber);
      }
    }
  }

  // Build international format: +{countryCode} {nationalNumber}
  private buildInternationalNumber(nationalNumber: string): string {
    if (!nationalNumber || !this.currentCountry) return '';
    return `+${this.currentCountry.dialCode}${nationalNumber}`.replaceAll(' ', '');
  }

  // Writes a new value from the form model into the view
  writeValue(value: string): void {
    if (value === this.phoneValue) return;

    if (!value) {
      this.phoneValue = '';
      return;
    }

    // Convert international format to national number
    if (value.startsWith('+')) {
      const parts = value.split(' ');
      this.phoneValue = parts.length > 1 ? parts.slice(1).join(' ') : value.replace(`+${this.currentCountry.dialCode}`, '');
    } else {
      this.phoneValue = value;
    }
  }

  // Registers a callback function that is called when the control's value changes
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Registers a callback function that is called when the control loses focus
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Sets the disabled state for the control
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // Mark as touched when the control blurs
  onBlur(): void {
    this.onTouched();
  }
}
