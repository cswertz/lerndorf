import { check, validationResult, buildCheckFunction } from 'express-validator';
import passport from 'passport';
import express from 'express';

import {
  isSelfOrHasCapability,
  hasCapability,
  isLastAdmin,
} from '../helpers/auth';
import { hashPassword } from '../helpers/utils';
import models from '../config/sequelize';

const router = express.Router();

const checkBody = buildCheckFunction(['body']);

router.post('/login', [
  check('username', 'username is required').exists(),
  check('password', 'password is required').exists(),
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({
      error: 'There have been validation errors.',
      errors: errors.array(),
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

router.get('/logout', (req, res) => {
  req.logout();
  return res.sendStatus(200);
});

router.get('/activate/:hash', (req, res) => {
  models.User.findOne({
    where: {
      activationCode: req.params.hash,
    },
  })
    .then((user) => {
      if (user) {
        return models.User.update({
          active: true,
          activationCode: null,
        }, {
          where: {
            activationCode: req.params.hash,
          },
        })
          .then(() => res.json({}));
      }

      return res.status(400).send({
        error: 'Could not activate user',
      });
    });
});

/* User management */
router.get('/', hasCapability('edit_user'), (req, res) => {
  models.User.findAll({
    attributes: ['id', 'username'],
  })
    .then((results) => res.json(results));
});

router.post('/', [
  check('username', 'username is required')
    .isLength({ max: 255 })
    .notEmpty(),
  check('password', 'password is required')
    .isLength({ max: 255 })
    .notEmpty(),
  check('email', 'email is required, has to be valid and not longer than 255 chars.')
    .notEmpty()
    .isLength({ max: 255 })
    .isEmail(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({
      error: 'There have been validation errors.',
      errors: errors.array(),
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

router.get('/:id', isSelfOrHasCapability('edit_user'), (req, res) => {
  models.User.findByPk(req.params.id, {
    attributes: [
      'id',
      'username',
      'showProfileStudents',
      'showProfileTeachers',
      'showProfilePublic',
      'allowLogResearch',
      'allowLogSharing',
      'allowLogReports',
      'allowBasicLog',
      'titlePrefix',
      'titleSuffix',
      'description',
      'lastLogin',
      'createdAt',
      'updatedAt',
      'firstName',
      'birthdate',
      'lastName',
      'studyId',
      'country',
      'website',
      'picture',
      'street',
      'state',
      'email',
      'phone',
      'city',
      'zip',
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
    .then((result) => res.json(result));
});

router.patch('/:id', isSelfOrHasCapability('edit_user'), (req, res) => {
  delete (req.body.acceptPrivacy);
  delete (req.body.createdAt);
  delete (req.body.updatedAt);
  delete (req.body.lastLogin);
  delete (req.body.acceptTos);
  delete (req.body.username);
  delete (req.body.id);

  if (req.body.password) {
    req.body.password = hashPassword(req.body.password);
  }

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

  models.User.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      models.User.findByPk(req.params.id, {
        attributes: [
          'id',
          'username',
          'showProfileStudents',
          'showProfileTeachers',
          'showProfilePublic',
          'allowLogResearch',
          'allowLogSharing',
          'allowLogReports',
          'allowBasicLog',
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
          'state',
          'email',
          'phone',
          'city',
          'zip',
        ],
      })
        .then((result) => res.json(result));
    });
});

router.delete('/:id', isSelfOrHasCapability('delete_user'), (req, res) => {
  const { id } = req.params;

  isLastAdmin(id, (last) => {
    if (!last) {
      models.User.destroy({
        where: {
          id,
        },
      })
        .then((result) => {
          res.json({ deleted: result });
        });
    } else {
      res.status(400).send({
        error: 'Can not delete last admin.',
      });
    }
  });
});

/* User Role Management */
router.post('/:id/role', [
  hasCapability('add_role_to_user'),
  checkBody('id', 'id is required')
    .exists()
    .notEmpty()
    .isInt(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      error: 'There have been validation errors.',
      errors: errors.array(),
    });
  }

  return models.Role.findByPk(req.body.id)
    .then((role) => {
      if (role) {
        models.User.findByPk(req.params.id)
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

router.delete('/:id/role/:role', hasCapability('delete_role_from_user'), (req, res) => {
  models.User.findByPk(req.params.id)
    .then((result) => {
      result.removeRole(req.params.role);
      res.status(200).send({});
    });
});

export default router;
