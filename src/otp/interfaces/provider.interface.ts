export interface IProvider {
  sendOTP(identifier: string, code: string): Promise<void>;
}
