import express from 'express';

import { hasCapability } from '../helpers/auth';
import models from '../config/sequelize';

const router = express.Router();

router.get('/', (req, res) => {
  models.LearningUnit.findAll({
    attributes: ['id', 'createdAt'],
    include: [
      {
        model: models.User,
        attributes: [
          'id',
          'username',
        ],
      },
      {
        model: models.Language,
        attributes: [
          'id',
          'code',
          'name',
        ],
        through: {
          attributes: [
            'title',
          ],
        },
      },
    ],
  })
    .then(results => res.json(results));
});

router.post('/', hasCapability('add_learning_unit'), (req, res) => {
  req.checkBody('title', 'title is required')
    .isLength({ max: 255 })
    .notEmpty();

  req.checkBody('language', 'language is required')
    .isInt()
    .notEmpty();

  req.getValidationResult().then((errors) => {
    if (!errors.isEmpty()) {
      return res.status(400).send({
        error: 'There have been validation errors.',
        errors: errors.array(),
      });
    }

    return models.LearningUnit.create(req.body)
      .then((learningUnit) => {
        learningUnit.setUser(req.user);

        const learningUnitLanguageData = {
          LearningUnitId: learningUnit.id,
          LanguageId: req.body.language,
          title: req.body.title,
          UserId: req.user.id,
        };

        models.LearningUnitLanguage.create(learningUnitLanguageData)
          .then(() => res.json(learningUnit));
      })
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
  models.LearningUnitLanguage.findAll({
    where: {
      LearningUnitId: req.params.id,
    },
    attributes: ['id', 'title'],
    include: [
      {
        model: models.User,
        attributes: ['id', 'username'],
      },
      {
        model: models.Language,
        attributes: ['id', 'code', 'name'],
      },
      {
        model: models.LearningUnit,
        attributes: ['id'],
        include: [
          {
            model: models.User,
            attributes: ['id', 'username'],
          },
        ],
      },
    ],
  })
    .then(result => res.json(result));
});

router.delete('/:id', hasCapability('delete_any_learning_unit'), (req, res) => {
  models.LearningUnit.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      res.json({ deleted: result });
    });
});

export default router;
