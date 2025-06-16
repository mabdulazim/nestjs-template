export class RegisterEmailDto {
  name: string;
  email: string;
  password: string;
  mobile?: string;
}

export class RegisterMobileDto {
  name: string;
  mobile: string;
  otp: string;
  email?: string;
}

export class RegisterMobile2FADto {
  mobile: string;
  otp: string;
}
