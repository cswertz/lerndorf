import express from 'express';

import { hasCapability } from '../helpers/auth';
import models from '../config/sequelize';

const router = express.Router();

router.get('/', (req, res) => {
  models.KnowledgeUnit.findAll({
    where: {
      visiblePublic: true,
    },
    attributes: [
      'id',
      'createdAt',
    ],
    include: [
      {
        model: models.User,
        attributes: [
          'id',
          'username',
        ],
      },
    ],
  })
    .then(results => res.json(results));
});

router.post('/', hasCapability('add_knowledge_unit'), (req, res) => {
  req.checkBody('LearningUnitId', 'LearningUnitId is required')
    .isInt()
    .notEmpty();

  req.getValidationResult().then((errors) => {
    if (!errors.isEmpty()) {
      return res.status(400).send({
        error: 'There have been validation errors.',
        errors: errors.array(),
      });
    }

    req.body.UserId = req.user.id;
    return models.KnowledgeUnit.create(req.body)
      .then(result => res.json(result))
      .catch(err => res.status(422).send({
        error: 'There have been database errors.',
        errors: err.errors.map(error => ({
          message: error.message,
          type: error.type,
        })),
      }));
  });
});

router.get('/:id', (req, res) => {
  models.KnowledgeUnit.findById(req.params.id, {
    attributes: ['id', 'createdAt'],
  })
    .then(result => res.json(result));
});

router.delete('/:id', (req, res) => {
  models.KnowledgeUnit.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      res.json({ deleted: result });
    });
});

export default router;
