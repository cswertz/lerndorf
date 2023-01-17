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
router.get('/', hasCapability('list_user'), (req, res) => {
  models.User.findAll({
    attributes: ['id', 'username', 'picture', 'firstName', 'lastName', 'studyId', 'city', 'country'],
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

router.get('/:id', isSelfOrHasCapability('edit_user'), async (req, res) => {
  const user = await models.User.findByPk(req.params.id, {
    attributes: [
      'id',
      'username',
      'showProfileStudents',
      'showProfileTeachers',
      'showProfilePublic',
      'preferredLanguage',
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
      {
        model: models.Language,
      },
    ],
  });

  res.json(user);
});

router.patch('/:id', isSelfOrHasCapability('edit_user'), (req, res) => {
  delete (req.body.acceptPrivacy);
  delete (req.body.createdAt);
  delete (req.body.updatedAt);
  delete (req.body.lastLogin);
  delete (req.body.acceptTos);
  delete (req.body.username);
  delete (req.body.id);

  // clear data if invalid
  if (req.body.birthdate === '') {
    delete (req.body.birthdate);
  }

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

router.delete('/:id', isSelfOrHasCapability('delete_user'), async (req, res) => {
  const { id } = req.params;

  const lastAdmin = await isLastAdmin(id);

  // Last admin can not be deleted
  if (!lastAdmin) {
    // See if the user has content
    const user = await models.User.findByPk(id);
    const learningUnits = await user.getLearningUnits();

    // If a user does not have content, destroy him
    if (learningUnits.length === 0) {
      const result = await models.User.destroy({
        where: {
          id,
        },
      });

      return res.json({ deleted: result });
    }

    // Otherwise we anonymize him
    await models.User.update({
      password: 'DELETED',
      username: `[DELETED ${id}]`,
      email: `${id}@deleted.com`,
      firstName: null,
      lastName: null,
      titlePrefix: null,
      titleSuffix: null,
      birthdate: null,
      studyId: null,
      phone: null,
      street: null,
      zip: null,
      city: null,
      state: null,
      country: null,
      website: null,
      picture: null,
      description: null,
      active: 0,
      activationCode: null,
    }, {
      where: {
        id,
      },
    });

    return res.json({});
  }

  res.status(400).send({
    error: 'Can not delete last admin.',
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

router.post('/:id/language', [
  isSelfOrHasCapability('edit_user'),
  checkBody('id', 'id is required')
    .exists()
    .notEmpty()
    .isInt(),
  checkBody('level', 'level is required')
    .exists()
    .notEmpty()
    .isInt(),
], async (req, res) => {
  let user = await models.User.findByPk(req.params.id);
  await user.addLanguage(req.body.id, {
    through: {
      level: req.body.level,
    },
  });
  user = await models.User.findByPk(req.params.id, {
    include: [
      {
        model: models.Language,
      },
    ],
  });

  return res.json(user);
});

router.delete('/:id/language/:language', isSelfOrHasCapability('edit_user'), async (req, res) => {
  await models.UserLanguage.destroy({
    where: {
      UserId: req.params.id,
      LanguageId: req.params.language,
    },
  });

  const user = await models.User.findByPk(req.params.id, {
    include: [
      {
        model: models.Language,
      },
    ],
  });

  res.status(200).send(user);
});

router.post('/:id/language/preferred', [
  isSelfOrHasCapability('edit_user'),
  checkBody('id', 'id is required')
    .exists()
    .notEmpty()
    .isInt(),
], async (req, res) => {
  let user = await models.User.findByPk(req.params.id);
  await user.setUserLanguage(req.body.id);

  user = await models.User.findByPk(req.params.id, {
    include: [
      {
        model: models.Language,
      },
    ],
  });

  return res.json(user);
});

export default router;
