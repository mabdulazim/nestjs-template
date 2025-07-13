export class RegisterEmailDto {
  name: string;
  email: string;
  password: string;
  mobile?: string;
}

export class RegisterEmail2FADto {
  email: string;
  otp: string;
}

export class RegisterMobileDto {
  name: string;
  mobile: string;
  email?: string;
}

export class RegisterMobile2FADto {
  mobile: string;
  otp: string;
}
