export interface IOtpService {
  sendOtp(mobile: string, code: string): Promise<void>;
  sendOtpWithStore(mobile: string): Promise<void>;
  verifyOtp(mobile: string, code: string): boolean;
}
