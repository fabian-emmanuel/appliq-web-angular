import {Component, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
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
export class PhoneInput implements ControlValueAccessor, OnChanges {
  // Inputs for the p-intl-tel-input component
  @Input() preferredCountries: CountryISO[] = [];
  @Input() enableAutoCountrySelect: boolean = true;
  @Input() displayPlaceholder: boolean = true;
  @Input() selectedCountryISO: CountryISO = CountryISO.Nigeria; // Default as per your example
  @Input() phoneValidation: boolean = true;
  @Input() separateDialCode: boolean = true;
  // @Input() numberFormat: PhoneNumberFormat = PhoneNumberFormat.International; // Default as per your example
  @Input() searchCountryFields: SearchCountryField[] = [SearchCountryField.NAME, SearchCountryField.DIALCODE]; // Renamed for clarity

  // Input for the formControlName (if you still want to pass it directly, though ControlValueAccessor is preferred)
  // This input might be redundant if you're using ControlValueAccessor correctly, but kept for direct mapping
  @Input() formControlName: string | null = null;
  @Input() formControl: FormControl = new FormControl(''); // Use this for reactive forms directly

  // Output for value changes
  @Output() phoneNumberChange = new EventEmitter<any>();

  // Internal form control to manage the ngx-intl-tel-input value
  public phone = new FormControl('');

// ControlValueAccessor methods
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    // Listen to changes from the internal ngx-intl-tel-input control
    this.phone.valueChanges.subscribe(value => {
      this.onChange(value); // Propagate changes up to the parent form
      this.phoneNumberChange.emit(value); // Emit custom output event
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // If a formControl is provided directly, use it. Otherwise, rely on ControlValueAccessor.
    if (changes['formControl'] && changes['formControl'].currentValue) {
      this.phone = changes['formControl'].currentValue;
      console.log("Phone input control updated with formControl:", this.phone);
    }
  }

  // Writes a new value from the form model into the view (internalPhoneControl)
  writeValue(value: any): void {
    if (value !== undefined) {
      this.phone.setValue(value, { emitEvent: false }); // Avoid infinite loop
      console.log("Phone input value set to:", value);
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
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.phone.disable();
    } else {
      this.phone.enable();
    }
  }

  // Mark as touched when the internal control blurs
  onBlur(): void {
    this.onTouched();
  }
}
