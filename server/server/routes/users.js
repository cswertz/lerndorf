import passport from 'passport';
import express from 'express';

import {
  isLoggedIn,
  hasRole,
  isSelf,
} from '../helpers/auth';
import { hashPassword } from '../helpers/utils';
import models from '../config/sequelize';

const router = express.Router();

router.get('/', (req, res) => {
  models.User.findAll({
    attributes: ['id', 'username'],
  })
    .then(results => res.json(results));
});

router.post('/', (req, res) => {
  req.checkBody('username', 'username is required')
    .isLength({ max: 255 })
    .notEmpty();
  req.checkBody('password', 'password is required')
    .isLength({ max: 255 })
    .notEmpty();
  req.checkBody('email', 'email is required, has to be valid and not longer than 255 chars.')
    .notEmpty()
    .isLength({ max: 255 })
    .isEmail();

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send({
        error: 'There have been validation errors.',
        errors: result.array(),
      });
      return;
    }

    passport.authenticate('local-signup', (user, info) => {
      if (info) {
        return res.status(409).send(info);
      }

      return res.json({
        id: user.id,
        username: user.username,
      });
    })(req, res);
  });
});

router.get('/:id', (req, res) => {
  models.User.findById(req.params.id, {
    attributes: ['id', 'username', 'lastLogin', 'createdAt', 'updatedAt'],
    include: [
      {
        model: models.Role,
        attributes: ['id', 'slug', 'name'],
        through: { attributes: [] },
      },
    ],
  })
    .then(result => res.json(result));
});

router.patch('/:id', isLoggedIn, isSelf, (req, res) => {
  delete (req.body.createdAt);
  delete (req.body.updatedAt);
  delete (req.body.lastLogin);
  delete (req.body.username);
  delete (req.body.id);

  if (req.body.password) {
    req.body.password = hashPassword(req.body.password);
  }

  models.User.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      models.User.findById(req.params.id, {
        attributes: ['username'],
      })
        .then(result => res.json(result));
    });
});

router.delete('/:id', isLoggedIn, hasRole('admin'), (req, res) => {
  models.User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      res.json({ deleted: result });
    });
});

router.post('/login', (req, res, next) => {
  req.checkBody('username', 'username is required').notEmpty();
  req.checkBody('password', 'password is required').notEmpty();

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send({
        error: 'There have been validation errors.',
        errors: result.array(),
      });
      return;
    }

    passport.authenticate('local-signin', (user, info) => {
      if (info) {
        return res.status(409).send(info);
      }

      return req.logIn(user, () => res.json(user));
    })(req, res, next);
  });
});

export default router;
