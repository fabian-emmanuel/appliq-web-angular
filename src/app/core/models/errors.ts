import {FormGroup, ValidationErrors} from '@angular/forms';


export function getFormErrors(formGroup: FormGroup): Record<string, ValidationErrors> {
  const errors: Record<string, ValidationErrors> = {};

  Object.keys(formGroup.controls).forEach(key => {
    const control = formGroup.get(key);
    if (control && control.errors) {
      errors[key] = control.errors;
    }
  });

  if (formGroup.errors) {
    errors['form'] = formGroup.errors;
  }

  return errors;
}


export function markAllFieldsAsTouched(formGroup: FormGroup): void {
  Object.keys(formGroup.controls).forEach(key => {
    const control = formGroup.get(key);
    control?.markAsTouched();
  });
}


export function shouldShowError(fieldName: string, formGroup: FormGroup): boolean {
  const field = formGroup.get(fieldName);
  return !!(field && field.invalid && field.touched);
}
