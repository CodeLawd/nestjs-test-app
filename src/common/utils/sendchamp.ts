import { ForbiddenException } from '@nestjs/common';
import axios from 'axios';
import { SENDCHAP_API } from './axios';

export default class SendChamp {
  static async sendOtp(data: any) {
    const body = JSON.stringify({
      meta_data: {
        first_name: `${data?.firstName}`,
        last_name: `${data?.lastName}`,
        email: `${data?.email}`,
      },
      channel: 'email',
      sender: 'Landa Learn',
      token_type: 'numeric',
      token_length: 6,
      expiration_time: 10,
      customer_email_address: `${data?.email}`,
    });

    try {
      const response = await SENDCHAP_API.post('verification/create', body);
      return response?.data;
    } catch (error) {
      console.log(error);
      console.log(error.response);
      throw new ForbiddenException('Failed request');
    }
  }

  static async verifyOtp({ data }) {
    const body = JSON.stringify({
      verification_reference: `${data?.reference}`,
      verification_code: `${data?.otp}`,
    });

    try {
      const response = await SENDCHAP_API.post(
        'https://api.sendchamp.com/api/v1/verification/confirm',
        body,
        {
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${process.env.SENDCHAMP_PUBLIC_ACCESS_KEY}`,
          },
        },
      );

      return response?.data;
    } catch (error) {
      throw new ForbiddenException(`${error.response.data.message}`);
    }
  }

  static async sendEmail(data: any) {
    const body = JSON.stringify({
      to: [{ email: `${data.email}`, name: `${data.firstName}` }],
      from: { email: 'noreply@landalearn.ord', name: 'Landa' },
      message_body: {
        type: 'text/html',
        value: 'Your account has been created successfully.',
      },
      subject: 'Account Created',
    });

    try {
      const response = await SENDCHAP_API.post(
        'https://api.sendchamp.com/api/v1/email/send',
        body,
        {
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${process.env.SENDCHAMP_PUBLIC_ACCESS_KEY}`,
          },
        },
      );

      return response?.data;
    } catch (error) {
      throw new ForbiddenException(`${error.response.data.message}`);
    }
  }
}
