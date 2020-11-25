import { check, validationResult } from 'express-validator';
import express from 'express';

import { hasCapability } from '../helpers/auth';
import models from '../config/sequelize';

const router = express.Router();

router.get('/', (req, res) => {
  models.Language.findAll({
    attributes: [
      'id',
      'createdAt',
      'updatedAt',
      'code',
      'name',
    ],
  })
    .then((results) => res.json(results));
});

router.post('/', [
  hasCapability('add_language'),
  check('code', 'param is required')
    .isLength({ max: 255 })
    .notEmpty(),
  check('name', 'param is required')
    .isLength({ max: 255 })
    .notEmpty(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      error: 'There have been validation errors.',
      errors: errors.array(),
    });
  }

  return models.Language.create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.status(422).send({
      error: 'There have been database errors.',
      errors: err.errors.map((error) => ({
        param: error.path,
        msg: error.message,
      })),
    }));
});

router.get('/:id', (req, res) => {
  models.Language.findByPk(req.params.id, {
    attributes: ['id', 'createdAt', 'updatedAt'],
  })
    .then((result) => res.json(result));
});

router.patch('/:id', hasCapability('edit_language'), (req, res) => {
  delete (req.body.createdAt);
  delete (req.body.updatedAt);
  delete (req.body.id);

  models.Language.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      models.Language.findByPk(req.params.id, {
        attributes: ['id', 'createdAt', 'updatedAt'],
      })
        .then((result) => res.json(result));
    });
});

router.delete('/:id', hasCapability('delete_language'), async (req, res) => {
  // Check that the language does not have content and only delete it then.
  const checkModels = [
    'UserLanguage',
    'RoleLanguage',
    'CapabilityLanguage',
    'LearningUnitLanguage',
  ];
  const include = checkModels.map((item) => ({
    model: models[item],
    attributes: ['id'],
  }));

  const language = await models.Language.findOne({
    where: {
      id: req.params.id,
    },
    include,
  });

  let hasContent = false;
  for (const model of checkModels) {
    const items = language[model + "s"];
    if(items.length > 0) {
      hasContent = true;
    }
  }

  if (!hasContent) {
    const result = await language.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json({ deleted: result });
  }

  return res.status(400).send({
    error: 'A language with content can not be deleted',
    errors: [],
  });
});

export default router;
