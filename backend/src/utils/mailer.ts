import sendgrid from '@sendgrid/mail';
import {
  NODE_ENV,
  SENDGRID_API_KEY,
  EMAIL_SENDER
} from '@config'
import { logger } from '@utils/logger';

if (NODE_ENV != "test") {
  sendgrid.setApiKey(SENDGRID_API_KEY || '');
}

/**
 * Send email
 * @param {String} template Filename of template
 * @param {String} recipient Single string or array of email addresses
 * @param {*} data Sendgrid response
 * @returns
 */
const sendMail = async (template: string = 'welcome', recipient: string | string[], data: any = {}): Promise<any> => {
  try {
    const { subject, html } = require(`./email-templates/${template}`).default(data);

    // Convert string to array
    if (typeof recipient === 'string') {
      recipient = [recipient];
    }

    // If not in production, also send email to mailinator
    if (NODE_ENV !== 'production') {
      const mailinatorEquivalent = recipient.map(email => {
        const [address, domain] = email.split('@');

        if (domain !== 'mailinator.com') {
          email = `${address}@mailinator.com`;
        }

        return email;
      });

      logger.info(`[SENDGRID] Email will also be sent to:`, mailinatorEquivalent);

      // Merge mailinator emails to actual emails
      recipient = [...recipient, ...mailinatorEquivalent];

      // Remove duplicates
      recipient = recipient.filter((email, i, arr) => arr.indexOf(email) === i);
    }

    // Send email
    const mail = await sendgrid.sendMultiple({
      to: recipient,
      from: {
        name: 'Vue3 Vite Exam',
        email: EMAIL_SENDER || '',
      },
      subject,
      html,
    });

    logger.info(`[SENDGRID] Email Successfully Sent to: ${recipient}`);

    return mail;
  } catch (error) {
    logger.error(`[SENDGRID]: Sending email to ${recipient} has failed.`, {
      data,
      error: error.message || error,
    });

    if (error.response.body && error.response.body.errors) {
      throw error.response.body.errors[0];
    } else {
      throw error;
    }
  }
}

export { sendMail };
