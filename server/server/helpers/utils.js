import nodemailer from 'nodemailer';
import bCrypt from 'bcrypt-nodejs';
import md5 from 'md5';
import models from '../config/sequelize';

const hashPassword = (password) => bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
const comparePasswords = (pwd1, pwd2) => bCrypt.compareSync(pwd1, pwd2);
const hashString = (string) => md5(string);

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

const getAllLanguages = async () => {
  const languageSystemDefault = await models.Language.findAll();

  const data = languageSystemDefault.map((Language) => Language.id);

  return data;
};

const resolveLanguages = async (req, res) => {
  const languageSystemDefault = await models.Language.findAll({ limit: 1 });

  // Method to get the list of possible menu items
  let languages = [languageSystemDefault[0].id];

  // Check the user default language
  if (req.user) {
    const user = await models.User.findByPk(req.user.id, {
      include: [
        {
          model: models.Language,
          order: [
            ['level', 'DESC'],
          ],
        },
      ],
    });

    let preferredLanguage = null;

    if (req.user !== null && req.user !== undefined && req.user.preferredLanguage !== null) {
      const preferredLanguageResult = await models.UserLanguage.findByPk(req.user.preferredLanguage);
      if (preferredLanguageResult !== null) {
        preferredLanguage = preferredLanguageResult.LanguageId;
      }
    }

    languages = preferredLanguage !== null ? [preferredLanguage] : user.Languages.map((Language) => Language.id);
  }

  return languages;
};

export {
  sendMail,
  hashString,
  hashPassword,
  comparePasswords,
  getAllLanguages,
  resolveLanguages,
};
