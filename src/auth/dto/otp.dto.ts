export class SendOtpDto {
  mobile: string;
  purpose: string;
}

export class VerifyOtpDto {
  mobile: string;
  purpose: string;
  code: string;
}
