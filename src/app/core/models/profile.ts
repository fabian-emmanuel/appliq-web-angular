
export interface IntlTelPhoneNumber {
  number: string;
  internationalNumber: string;
  nationalNumber: string;
  e164Number: string;
  countryCode: string;
  dialCode: string;
}

export interface ProfileForm {
  firstName: string;
  lastName: string;
  bio: string;
  phone: IntlTelPhoneNumber | null;
  location: string;
}

export interface AccountForm {
  email: string;
  newPassword: string;
  confirmPassword: string;
}
