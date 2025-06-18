import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { IProvider } from '../interfaces/provider.interface';

@Injectable()
export class NodemailerService implements IProvider {
  constructor(private readonly configService: ConfigService) {}

  async sendOTP(email: string, code: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    });
    const mailOptions = {
      from: `"Your App" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${code}`,
    };

    await transporter.sendMail(mailOptions);
  }
}
