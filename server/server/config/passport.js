import Strategy from 'passport-local';
import {
  sendMail,
  hashString,
  hashPassword,
  comparePasswords,
} from '../helpers/utils';

import models from './sequelize';

const passportConfig = (passport) => {
  const LocalStrategy = Strategy;

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    models.User.findById(id)
      .then((result) => {
        done(null, result);
      });
  });

  passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      models.User.findOne({
        where: {
          username,
        },
      }).then((result) => {
        if (result) {
          return done(false, {
            error: 'That username is already taken',
            errors: [
              {
                param: 'username',
                msg: 'That username is already taken',
              },
            ],
          });
        }

        return models.User.findOne({
          where: {
            email: req.body.email,
          },
        }).then((resultEmail) => {
          if (resultEmail) {
            return done(false, {
              error: 'That username is already taken',
              errors: [
                {
                  param: 'email',
                  msg: 'That email address is already in use',
                },
              ],
            });
          }

          const hashedPassword = hashPassword(password);
          req.body.password = hashedPassword;
          req.body.activationCode = hashString(req.body.email + new Date().toISOString());

          if (req.files) {
            const fileName = req.files.picture.md5 + req.files.picture.name;
            req.body.picture = fileName;
            req.files.picture.mv(`./server/public/uploads/${fileName}`, (err) => {
              if (err) {
                console.log('Failed to save image:', err);
              }
            });
          } else {
            delete (req.body.picture);
          }

          return models.User.create(req.body)
            .then((newUser) => {
              const { activationCode } = newUser;
              const message = `To activate your account, <a href="${global.config.domain}/users/activate/${activationCode}">click this link</a>.`;
              sendMail(newUser.email, 'Registration', message);
              done(newUser);
            });
        });
      });
    },
  ));

  passport.use('local-signin', new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      models.User.findOne({
        attributes: [
          'id',
          'username',
          'password',
          'titlePrefix',
          'titleSuffix',
          'description',
          'firstName',
          'birthdate',
          'lastName',
          'studyId',
          'country',
          'website',
          'picture',
          'street',
          'email',
          'phone',
          'city',
          'zip',
        ],
        where: {
          username,
          active: true,
        },
      }).then((result) => {
        if (!result || !comparePasswords(password, result.password)) {
          return done(false, {
            error: 'Username and/or Password wrong or User not activated yet.',
          });
        }

        return models.User.update({
          lastLogin: models.Sequelize.literal('CURRENT_TIMESTAMP'),
        }, {
          where: {
            username,
          },
        })
          .then(() => {
            const user = result.get();
            delete (user.password);
            return done(user);
          });
      });
    },
  ));
};

export default passportConfig;
