import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function getPasswordStrength(password: string){
  let score = 0;

  if (!password) {
    return score;
  }

  // Length check
  if (password.length > 5) score += 20;
  if (password.length > 8) score += 10;

  // Complexity checks
  if (/[A-Z]/.test(password)) score += 20; // Has uppercase
  if (/[a-z]/.test(password)) score += 15; // Has lowercase
  if (/[0-9]/.test(password)) score += 20; // Has number
  if (/[^A-Za-z0-9]/.test(password)) score += 15; // Has special char

  return Math.min(100, score);
};


export function getPasswordStrengthLabel(password: string)  {
  const passwordStrength = getPasswordStrength(password);
  if (passwordStrength === 0) return "";
  if (passwordStrength < 40) return "Weak";
  if (passwordStrength < 70) return "Fair";
  if (passwordStrength < 90) return "Good";
  return "Strong";
};


export const passwordRequirements = [
  {
    test: (password: string) => password.length >= 8,
    text: "At least 8 characters"
  },
  {
    test: (password: string) => /[A-Z]/.test(password),
    text: "Contains uppercase letter"
  },
  {
    test: (password: string) => /[0-9]/.test(password),
    text: "Contains number"
  },
  {
    test: (password: string) => /[^A-Za-z0-9]/.test(password),
    text: "Contains special character"
  }
];


export function strongPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

    return passwordValid ? null : { weakPassword: true };
  };
}
