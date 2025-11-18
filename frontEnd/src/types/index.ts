export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData extends LoginData {
    confirmPassword: string
}

export interface LoginResponse {
  token: string;
  user: string;
  success?: boolean;
}

export interface LoginFormProps {
  onSubmit: (data: LoginResponse) => void;
}