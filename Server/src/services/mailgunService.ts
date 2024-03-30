import Mailgun from 'mailgun.js';
import FormData from 'form-data';
import constants from '../utils/constants';
import { accountRegistrationEmailTemplate, resetPasswordEmailTemplate } from '../utils/email';

const mg = new Mailgun(FormData);
const mailgun = mg.client({username: 'api', key: constants.mailgun_api_key})

export async function sendEmailVerification(email: string, token: string, id: string, name: string) {
    const content = {
        from: "Bearmax Account Services <no-reply@bearmax-service.bearmaxcare.com>",
        to: email,
        subject: 'Email Verification',
        text: accountRegistrationEmailTemplate(name, `${constants.server_url}/api/auth/verify?token=${token}&id=${id}`),
        html: accountRegistrationEmailTemplate(name, `${constants.server_url}/api/auth/verify?token=${token}&id=${id}`)
    }
    return mailgun.messages.create(
        constants.mailgun_domain,
        content
    ).catch((err) => {
      return err;
    });
}

export async function sendPasswordReset(email: string, token: string, id: string) {
    const content = {
        from: "Bearmax Account Services<no-reply@bearmax-service.bearmaxcare.com>",
        to: email,
        subject: 'Password Reset',
        text: resetPasswordEmailTemplate(`${constants.server_url}/resetPassword?token=${token}&id=${id}`),
        html: resetPasswordEmailTemplate(`${constants.server_url}/resetPassword?token=${token}&id=${id}`)
    }
    return mailgun.messages.create(
        constants.mailgun_domain,
        content
    ).catch((err) => {
      return err;
    });
}