import passport from 'passport';
import express from 'express';

import {
  isSelfOrHasCapability,
  hasCapability,
  hasRole,
} from '../helpers/auth';
import { hashPassword } from '../helpers/utils';
import models from '../config/sequelize';

const router = express.Router();

/* User management */
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

router.get('/logout', (req, res) => {
  req.logout();
  return res.sendStatus(200);
});

router.get('/:id', (req, res) => {
  // TODO: Return id, username, lastLogin to non self and non edit users
  // TODO: Return this only to self and to user with edit_user role
  models.User.findById(req.params.id, {
    attributes: [
      'id',
      'username',
      'lastLogin',
      'createdAt',
      'updatedAt',
    ],
    include: [
      {
        model: models.Role,
        attributes: ['id', 'slug', 'name'],
        through: { attributes: [] },
        include: [
          {
            model: models.Capability,
            attributes: ['id', 'slug', 'name'],
          },
        ],
      },
    ],
  })
    .then(result => res.json(result));
});

router.patch('/:id', isSelfOrHasCapability('edit_user'), (req, res) => {
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

router.delete('/:id', hasRole('admin'), (req, res) => {
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

/* User Role Management */
router.post('/:id/role', hasCapability('add_role_to_user'), (req, res) => {
  req.checkBody('id', 'id is required').notEmpty();

  req.getValidationResult().then((errors) => {
    if (!errors.isEmpty()) {
      res.status(400).send({
        error: 'There have been validation errors.',
        errors: errors.array(),
      });
      return;
    }

    models.Role.findById(req.body.id)
      .then((role) => {
        if (role) {
          models.User.findById(req.params.id)
            .then((result) => {
              result.addRole(role.id);

              return res.json(result);
            });
        } else {
          res.status(400).send({
            error: 'Role does not exist.',
          });
        }
      });
  });
});

router.delete('/:id/role/:role', hasCapability('delete_role_from_user'), (req, res) => {
  models.User.findById(req.params.id)
    .then((result) => {
      result.removeRole(req.params.role);
      res.status(200).send({});
    });
});

export default router;
