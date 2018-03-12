import validator from 'express-validator';
import session from 'express-session';
import bodyParser from 'body-parser';
import passport from 'passport';
import express from 'express';

import passportConfig from './config/passport';
import modelConfig from './config/sequelize';
import routeConfig from './config/routes';
import logger from './logger';

const app = express();

modelConfig.sequelize
  .sync()
  .catch((err) => {
    /* istanbul ignore next */
    logger.error('Could not connect to database', { err });
  });

passportConfig(passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(validator());
app.use(session({
  secret: 'zasephuiofarkhfnkasdf',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

routeConfig(app);

export default app;
