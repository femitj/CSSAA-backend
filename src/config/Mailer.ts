import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const { SENDGRID_API_KEY } = process.env;

// @ts-ignore
sgMail.setApiKey(SENDGRID_API_KEY);
/**
 * @class Mailer
 */
class Mailer {
  /**
   *
   * @param {object} to Recipient Email
   * @param {string} subject Email Subject
   * @param {string} content Email Content
   * @returns {function} returns a function
   */
  static sendMail(to: string, subject: string, content: string) {
    const message = {
      from: process.env.EMAIL,
      to,
      html: content,
      subject,
    };

    // @ts-ignore
    return sgMail.send(message, (error, result) => {
      if (error) {
        //Do something with the error
        console.log(error);
      } else {
        //Celebrate
        console.log('success');
      }
    });
  }
}

export default Mailer;
