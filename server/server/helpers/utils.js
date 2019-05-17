import nodemailer from 'nodemailer';
import bCrypt from 'bcrypt-nodejs';
import md5 from 'md5';

const hashPassword = password => bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
const comparePasswords = (pwd1, pwd2) => bCrypt.compareSync(pwd1, pwd2);
const hashString = string => md5(string);

const sendMail = (address, subjectLine, message) => {
  const send = (settings, to, subject, html) => {
    const transporter = nodemailer.createTransport(settings);

    transporter.sendMail({
      from: settings.from,
      to,
      subject,
      html,
    });
  };

  if (process.env.NODE_ENV !== 'test') {
    send(global.config.smtp, address, subjectLine, message);
  }
};

export {
  sendMail,
  hashString,
  hashPassword,
  comparePasswords,
};
