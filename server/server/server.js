import validator from 'express-validator';
import session from 'express-session';
import bodyParser from 'body-parser';
import passport from 'passport';
import express from 'express';

import passportConfig from './config/passport';
import routeConfig from './config/routes';
import logger from './logger';
import models from './models';

const app = express();

models.sequelize
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
