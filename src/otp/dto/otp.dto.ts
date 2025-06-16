export class SendOtpDto {
  identifier: string;
  purpose: string;
}

export class VerifyOtpDto {
  identifier: string;
  purpose: string;
  otp: string;
}
