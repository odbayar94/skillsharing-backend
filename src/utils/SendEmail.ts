import nodemailer from "nodemailer";

//My imports
import config from "../config";

class SendEmail {
  mail: any;
  mailOptions: Object;
  status!: boolean;

  constructor(to: string, subject: string, html: string) {
    this.status = true;
    this.mailOptions = {
      from: config.emailFrom,
      to,
      subject,
      html,
    };
  }

  async send() {
    const mail = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.gmailAddress,
        pass: config.gmailPassword,
      },
    });
    mail.sendMail(this.mailOptions, (error: any, response: any) => {
      // if (error) {
      //   this.status = false;
      // } else {
      //   this.status = true;
      // }
    });

    return { success: this.status };
  }
}

export = SendEmail;
