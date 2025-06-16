export interface IOtpService {
  sendOTP(identifier: string, code: string): Promise<void>;
}
