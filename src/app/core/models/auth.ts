export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}



export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}
