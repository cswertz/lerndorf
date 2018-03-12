import Strategy from 'passport-local';
import {
  hashPassword,
  comparePasswords,
} from '../helpers/utils';

import models from '../models';

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
          });
        }

        const hashedPassword = hashPassword(password);
        const user = {
          username,
          password: hashedPassword,
        };

        return models.User.create(user)
          .then(newUser => done(newUser));
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
        attributes: ['id', 'username', 'password'],
        where: {
          username,
        },
      }).then((result) => {
        if (!result || !comparePasswords(password, result.password)) {
          return done(false, {
            error: 'Username or Password wrong.',
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
