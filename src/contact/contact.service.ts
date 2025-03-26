import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ContactDto } from './dto/contact.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ContactService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'dineshmathsa140614@gmail.com',
        pass: 'batentgzhrnluepf'
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  async sendEmail(contactData: ContactDto) {
    const mailOptions = {
      from: {
        name: 'Portfolio Contact Form',
        address: 'dineshmathsa140614@gmail.com'
      },
      to: 'dineshmathsa@gmail.com',
      subject: `Portfolio Contact: ${contactData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h3 style="color: #333;">New Contact Form Submission</h3>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${contactData.name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${contactData.email}</p>
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${contactData.subject}</p>
            <p style="margin: 10px 0;"><strong>Message:</strong></p>
            <p style="margin: 10px 0;">${contactData.message}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This email was sent from your portfolio contact form.
          </p>
        </div>
      `,
      replyTo: contactData.email,
      headers: {
        'List-Unsubscribe': `<mailto:dineshmathsa140614@gmail.com>`,
        'Precedence': 'bulk'
      }
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Failed to send email. Please try again later.',
        timestamp: new Date().toISOString(),
      }, HttpStatus.BAD_REQUEST);
    }
  }
} 