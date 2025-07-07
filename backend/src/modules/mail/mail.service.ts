import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as pug from 'pug';
import { convert } from 'html-to-text';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    } as nodemailer.TransportOptions);
  }

  async sendMail(to: string, subject: string, template: string, {name, url}: {name: string, url: string}): Promise<nodemailer.SentMessageInfo> {
    const html = pug.renderFile(`${__dirname}/templates/${template}.pug`, {
      name,
      url,
    });
    const info = await this.transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text: convert(html),
      html,
    });
    return info;
  }
}
