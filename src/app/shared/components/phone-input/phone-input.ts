import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {CountryISO, IntlInputTelComponent, SearchCountryField} from "p-intl-input-tel";

@Component({
  selector: 'app-phone-input',
  imports: [
    FormsModule,
    IntlInputTelComponent,
    ReactiveFormsModule
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

  // Handle phone number input changes
  onPhoneInputChange(event: any): void {
    const value = event.target?.value || event;
    console.log("Phone input changed:", value);


    // Build the international format manually
    const internationalNumber = this.buildInternationalNumber(value);
    console.log("International number:", internationalNumber);
    this.phoneValue = value;

    this.onChange(internationalNumber);
    this.phoneNumberChange.emit(internationalNumber);
  }

  // Handle country changes from p-intl-tel-input
  onCountryChange(country: any): void {
    console.log("Country changed:", country);
    // Only update if this is a real country change, not just a keystroke event
    if (country && country.iso2 && country.iso2 !== this.currentCountry?.iso2) {
      this.currentCountry = country;
      console.log("Country actually changed to:", country.name);

      // Re-emit the current value with the new country code
      if (this.phoneValue) {
        const internationalNumber = this.buildInternationalNumber(this.phoneValue);
        console.log("International number after country change:", internationalNumber);
        this.onChange(internationalNumber);
        this.phoneNumberChange.emit(internationalNumber);
      }
    }
  }

  // Build international format: +{countryCode} {nationalNumber}
  private buildInternationalNumber(nationalNumber: string): string {
    if (!nationalNumber || !this.currentCountry) {
      return nationalNumber || '';
    }

    // Remove any existing formatting/spaces to get clean number
    const cleanNumber = nationalNumber.replace(/\s+/g, '');

    // If number is empty, return empty
    if (!cleanNumber) {
      return '';
    }

    // Build international format
    return `+${this.currentCountry.dialCode} ${nationalNumber}`;
  }

  // Writes a new value from the form model into the view
  writeValue(value: any): void {
    console.log("writeValue called with:", value);

    // Handle all cases including empty strings
    if (value === undefined || value === null) {
      this.phoneValue = '';
      return;
    }

    // If the value is in international format (+234 xxx xxx), extract the national part
    let nationalValue = value;
    if (typeof value === 'string' && value.startsWith('+')) {
      // Extract national number from international format
      const parts = value.split(' ');
      if (parts.length > 1) {
        nationalValue = parts.slice(1).join(' ');
      }
    }

    this.phoneValue = nationalValue;

    // If we receive a value, we should update the internal state
    // and potentially call onChange to sync with the form
    if (value && this.onChange) {
      const internationalNumber = this.buildInternationalNumber(nationalValue);
      this.onChange(internationalNumber);
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
