import { check, validationResult } from 'express-validator';
import express from 'express';

import { hasCapability } from '../helpers/auth';
import models from '../config/sequelize';

const router = express.Router();

router.get('/', (req, res) => {
  models.Text.findAll({
    attributes: ['id', 'createdAt'],
  })
    .then(results => res.json(results));
});

router.post('/', [
  hasCapability('add_knowledge_unit'),
  check('content', 'content is required')
    .notEmpty(),
  check('KnowledgeUnitId', 'KnowledgeUnitId is required')
    .notEmpty(),
  check('LanguageId', 'LanguageId is required')
    .notEmpty(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      error: 'There have been validation errors.',
      errors: errors.array(),
    });
  }

  return models.Text.create(req.body)
    .then(result => res.json(result))
    .catch(err => res.status(422).send({
      error: 'There have been database errors.',
      errors: err.errors.map(error => ({
        message: error.message,
        type: error.type,
      })),
    }));
});

router.get('/:id', (req, res) => {
  models.Text.findByPk(req.params.id, {
    attributes: [
      'id',
      'content',
      'prevId',
      'nextId',
      'rootId',
    ],
    include: [
      {
        model: models.Language,
        attributes: ['id', 'code', 'name'],
      },
    ],
  })
    .then((result) => {
      let source = result.rootId;
      if (!source) {
        source = result.id;
      }
      models.Text.findOne({
        where: {
          rootId: source,
          nextId: null,
        },
        attributes: [
          'id',
        ],
      })
        .then((current) => {
          const text = result;
          if (current) {
            text.dataValues.currentId = current.id;
          } else {
            text.dataValues.currentId = text.id;
          }

          return res.json(text);
        });
    });
});

router.patch('/:id', [
  check('content', 'content is required')
    .notEmpty(),
  check('LanguageId', 'LanguageId is required')
    .notEmpty(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      error: 'There have been validation errors.',
      errors: errors.array(),
    });
  }

  return models.Text.findByPk(req.params.id)
    .then((result) => {
      req.body.prevId = result.id;
      req.body.rootId = result.rootId || result.id;
      req.body.KnowledgeUnitId = result.KnowledgeUnitId;

      return models.Text.create(req.body)
        .then((newText) => {
          models.Text.update(
            {
              nextId: newText.id,
            },
            {
              where: {
                id: req.params.id,
              },
            },
          )
            .then(() => res.json(newText));
        });
    });
});

router.delete('/:id', (req, res) => {
  models.Text.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      res.json({ deleted: result });
    });
});

export default router;
