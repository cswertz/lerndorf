import fileUpload from 'express-fileupload';
// import validator from 'express-validator';
import session from 'express-session';
import bodyParser from 'body-parser';
import passport from 'passport';
import express from 'express';

import passportConfig from './config/passport';
import routeConfig from './config/routes';

const app = express();

passportConfig(passport);

app.use('/', express.static('./server/public'));
app.use('/uploads', express.static('./server/public/uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
// app.use(validator());
app.use(session({
  secret: 'zasephuiofarkhfnkasdf',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  if (req.user) {
    req.user.roles = [];
    req.user.capabilities = [];

    req.user.getRoles()
      .then((roles) => {
        const userRoles = roles.map((role) => role.dataValues.slug);
        const promises = roles.map((role) => role.getCapabilities());
        Promise.all(promises)
          .then((values) => {
            const objects = [].concat(...values);
            const capabilities = objects.map((object) => object.get().slug);
            req.user.capabilities = capabilities;
            req.user.roles = userRoles;

            next();
          });
      });
  } else {
    next();
  }
});

routeConfig(app);
console.log(__dirname)

export default app;
