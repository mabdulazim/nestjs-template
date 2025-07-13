export class ForgotPasswordDto {
  email: string;
}

export class ValidateOTPDto {
  email: string;
  otp: string;
}

export class ChangePasswordDto {
  email: string;
  otp: string;
  password: string;
}
