import { check, validationResult } from 'express-validator';
import express from 'express';

import { hasCapability } from '../helpers/auth';
import { logView } from '../helpers/log';
import models from '../config/sequelize';

import { getTree } from '../helpers/taxonomies';

const { Op } = models.Sequelize;
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
    .then((results) => res.json(results));
});

router.post('/', [
  hasCapability('add_learning_unit'),
  check('title', 'title is required')
    .isLength({ max: 255 })
    .notEmpty(),
  check('language', 'language is required')
    .isInt()
    .notEmpty(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      error: 'There have been validation errors.',
      errors: errors.array(),
    });
  }

  return models.LearningUnitLanguage.findAll({
    where: {
      LanguageId: req.body.language,
      title: req.body.title,
    },
  })
    .then((results) => {
      if (results.length === 0) {
        req.body.UserId = req.user.id;
        return models.LearningUnit.create(req.body)
          .then((learningUnit) => {
            const learningUnitLanguageData = {
              LearningUnitId: learningUnit.id,
              LanguageId: req.body.language,
              title: req.body.title,
              UserId: req.user.id,
            };

            models.LearningUnitLanguage.create(learningUnitLanguageData)
              .then(() => res.json(learningUnit));
          })
          .catch((err) => res.status(422).send({
            error: 'There have been database errors.',
            errors: err.errors.map((error) => ({
              message: error.message,
              type: error.type,
            })),
          }));
      }
      return res.status(409).send({
        error: 'Duplicate entry',
        errors: [
          {
            param: 'title',
            msg: 'This title is already in use.',
          },
        ],
      });
    });
});

router.post('/addTag/:learningUnitLanguageId', [
  hasCapability('edit_any_learning_unit'),
  check('tag', 'tag is required')
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

  const data = {
    LearningUnitLanguageId: req.params.learningUnitLanguageId,
    UserId: req.user.id,
    tag: req.body.tag,
  };

  return models.LearningUnitTag.create(data)
    .then((result) => res.json(result));
});

router.post('/relation/:id', [
  hasCapability('edit_any_learning_unit'),
  check('targetId', 'target is required')
    .isInt()
    .notEmpty(),
  check('type', 'type is required')
    .isInt()
    .notEmpty(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      error: 'There have been validation errors.',
      errors: errors.array(),
    });
  }

  const data = {
    targetId: req.body.targetId,
    sourceId: req.params.id,
    type: req.body.type,
    UserId: req.user.id,
  };

  return models.LearningUnitRelation.create(data)
    .then((result) => res.json(result));
});

router.delete('/relation/:id', hasCapability('edit_any_learning_unit'), async (req, res) => {
  const result = await models.LearningUnitRelation.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.json({ deleted: result });
});

router.get('/taxonomies', (req, res) => {
  models.Taxonomy.findAll({
    where: {
      '$Parent.type$': {
        [Op.in]: [
          'relationType',
        ],
      },
      '$Parent.active$': true,
      active: true,
    },
    attributes: [
      'id',
      'type',
    ],
    include: [
      {
        as: 'Parent',
        model: models.Taxonomy,
        attributes: ['type'],
      },
    ],
  })
    .then((children) => getTree(children).then((result) => res.json(result)));
});

router.get('/:id', logView('LearningUnit'), async (req, res) => {
  const translations = await models.LearningUnitLanguage.findAll({
    where: {
      LearningUnitId: req.params.id,
    },
    attributes: ['id', 'title'],
    include: [
      {
        model: models.LearningUnitTag,
        attributes: ['id', 'tag'],
      },
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
          {
            model: models.KnowledgeUnit,
            attributes: [
              'id',
              'comment',
              'objective',
              'time',
              'recommendedAge',
              'visibleCourses',
              'visibleLexicon',
              'visiblePublic',
              'lectorate',
              'review',
              'publish',
              'suitableDumb',
              'suitableDeaf',
              'suitableBlind',
            ],
            include: [
              {
                as: 'msr',
                model: models.Taxonomy,
                attributes: ['type'],
                include: [
                  {
                    model: models.TaxonomyLanguage,
                    attributes: ['LanguageId', 'vocable'],
                  },
                ],
              },
              {
                as: 'kt',
                model: models.Taxonomy,
                attributes: ['type'],
                include: [
                  {
                    model: models.TaxonomyLanguage,
                    attributes: ['LanguageId', 'vocable'],
                  },
                ],
              },
              {
                as: 'cl',
                model: models.Taxonomy,
                attributes: ['type'],
                include: [
                  {
                    model: models.TaxonomyLanguage,
                    attributes: ['LanguageId', 'vocable'],
                  },
                ],
              },
              {
                as: 'ot',
                model: models.Taxonomy,
                attributes: ['type'],
                include: [
                  {
                    model: models.TaxonomyLanguage,
                    attributes: ['LanguageId', 'vocable'],
                  },
                ],
              },
              {
                as: 'mt',
                model: models.Taxonomy,
                attributes: ['type'],
                include: [
                  {
                    model: models.TaxonomyLanguage,
                    attributes: ['LanguageId', 'vocable'],
                  },
                ],
              },
              {
                as: 'el',
                model: models.Taxonomy,
                attributes: ['type'],
                include: [
                  {
                    model: models.TaxonomyLanguage,
                    attributes: ['LanguageId', 'vocable'],
                  },
                ],
              },
              {
                as: 'l',
                model: models.Taxonomy,
                attributes: ['type'],
                include: [
                  {
                    model: models.TaxonomyLanguage,
                    attributes: ['LanguageId', 'vocable'],
                  },
                ],
              },
              {
                as: 'author',
                model: models.User,
                attributes: ['id', 'username'],
              },
              {
                as: 'Texts',
                where: {
                  nextId: null,
                },
                required: false,
                model: models.Text,
                attributes: ['id', 'content', 'nextId', 'prevId', 'rootId'],
                include: [
                  {
                    model: models.Language,
                    attributes: ['id', 'code', 'name'],
                  },
                ],
              },
            ],
          },
          {
            model: models.LearningUnitRelation,
            as: 'learningUnitSource',
            attributes: ['id', 'type', 'targetId'],
            include: [
              {
                model: models.Taxonomy,
                attributes: ['id', 'type'],
                required: true,
                include: [
                  {
                    model: models.TaxonomyLanguage,
                    attributs: ['LanguageId', 'vocable'],
                  },
                ],
              },
              {
                model: models.LearningUnit,
                attributes: ['id'],
                as: 'target',
                include: [
                  {
                    model: models.LearningUnitLanguage,
                    attributes: ['LanguageId', 'title'],
                    as: 'Translations',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    order: [
      [models.LearningUnit, models.KnowledgeUnit, 'id', 'asc'],
      [models.LearningUnit, models.KnowledgeUnit, 'Texts', 'id', 'asc'],
    ],
  });

  return res.json(translations);
});

router.get('/suggestion/:term', (req, res) => {
  models.LearningUnitLanguage.findAll({
    where: {
      title: {
        [Op.like]: [
          `%${req.params.term}%`,
        ],
      },
    },
    attributes: ['LearningUnitId', 'title'],
  })
    .then((results) => {
      const suggestions = [];
      for (let i = 0; i < results.length; i += 1) {
        const current = results[i];
        suggestions.push({
          id: current.LearningUnitId,
          label: current.title,
        });
      }

      return res.json(suggestions);
    });
});

router.patch('/:id', hasCapability('edit_any_learning_unit'), async (req, res) => {
  const { id } = req.params;
  const languages = Object.keys(req.body);
  for(let language of languages) {
    const title = req.body[language].title;
    await models.LearningUnitLanguage.update({
      title,
    }, {
      where: {
        LanguageId: language,
        LearningUnitId: id,
      },
    });
  }

  res.json({});
});

router.delete('/deleteTag/:id', hasCapability('edit_any_learning_unit'), async (req, res) => {
  const result = await models.LearningUnitTag.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.json({ deleted: result });
});

router.patch('/tag/:id', [
  hasCapability('edit_any_learning_unit'),
  check('value', 'value is required')
    .isLength({ max: 255 })
    .notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      error: 'There have been validation errors.',
      errors: errors.array(),
    });
  }

  const result = await models.LearningUnitTag.update({
    tag: req.body.value,
  }, {
    where: {
      id: req.params.id,
    },
  });

  return res.json({ deleted: result });
});

router.delete('/:id', hasCapability('delete_any_learning_unit'), async (req, res) => {
  const result = await models.LearningUnit.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.json({ deleted: result });
});

export default router;
