import express from 'express';

import { hasCapability } from '../helpers/auth';
import models from '../config/sequelize';

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

    return models.LearningUnitLanguage.findAll({
      where: {
        LanguageId: req.body.language,
        title: req.body.title,
      },
    })
      .then((results) => {
        if (results.length === 0) {
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
});

router.post('/addTag/:learningUnitLanguageId', hasCapability('add_learning_unit'), (req, res) => {
  req.checkBody('tag', 'tag is required')
    .isLength({ max: 255 })
    .notEmpty();

  const data = {
    LearningUnitLanguageId: req.params.learningUnitLanguageId,
    UserId: req.user.id,
    tag: req.body.tag,
  };

  return models.LearningUnitTag.create(data)
    .then(result => res.json(result));
});

router.post('/addRelation/:id', hasCapability('add_learning_unit'), (req, res) => {
  req.checkBody('targetId', 'target is required')
    .isInt()
    .notEmpty();

  req.checkBody('type', 'type is required')
    .isInt()
    .notEmpty();

  const data = {
    targetId: req.body.targetId,
    sourceId: req.params.id,
    type: req.body.type,
    UserId: req.user.id,
  };

  return models.LearningUnitRelation.create(data)
    .then(result => res.json(result));
});

router.get('/taxonomies', (req, res) => {
  async function getTree(source) {
    async function getChildren(parentId, level) {
      const prefix = `${'-'.repeat(level)} `;
      const children = await models.Taxonomy.findAll({
        where: {
          parent: parentId,
        },
        attributes: [
          'id',
          'type',
        ],
      });

      const terms = [];
      const promises = [];
      for (let i = 0; i < children.length; i += 1) {
        const current = children[i];
        const term = {
          id: current.id,
          type: prefix + current.type,
        };

        promises.push(getChildren(current.id, level + 1));
        terms.push(term);
      }

      const results = await Promise.all(promises);
      for (let i = 0; i < results.length; i += 1) {
        terms[i].children = results[i];
      }

      return terms;
    }

    const taxonomies = {};
    const promises = [];
    for (let i = 0; i < source.length; i += 1) {
      const current = source[i];
      promises.push(getChildren(current.id, 1));
    }

    const results = await Promise.all(promises);
    for (let i = 0; i < source.length; i += 1) {
      const current = source[i];
      const parent = current.Parent.type;
      if (!taxonomies[parent]) {
        taxonomies[parent] = [];
      }

      taxonomies[parent].push({
        id: current.id,
        type: current.type,
        children: results[i],
      });
    }

    return taxonomies;
  }

  models.Taxonomy.findAll({
    where: {
      '$Parent.type$': {
        [Op.in]: [
          'relationType',
        ],
      },
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
    .then((children) => {
      getTree(children).then((taxonomies) => {
        const flatten = (terms) => {
          let flat = [];
          for (let i = 0; i < terms.length; i += 1) {
            const current = terms[i];
            flat.push(current);
            if (terms[i].children.length > 0) {
              flat = flat.concat(flatten(terms[i].children));
            }

            delete current.children;
          }

          return flat;
        };

        const keys = Object.keys(taxonomies);
        const flattened = {};
        for (let i = 0; i < keys.length; i += 1) {
          const key = keys[i];
          flattened[key] = flatten(taxonomies[key]);
        }

        res.json(flattened);
      });
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
                attributes: ['id', 'type'],
              },
              {
                as: 'kt',
                model: models.Taxonomy,
                attributes: ['id', 'type'],
              },
              {
                as: 'cl',
                model: models.Taxonomy,
                attributes: ['id', 'type'],
              },
              {
                as: 'ot',
                model: models.Taxonomy,
                attributes: ['id', 'type'],
              },
              {
                as: 'mt',
                model: models.Taxonomy,
                attributes: ['id', 'type'],
              },
              {
                as: 'el',
                model: models.Taxonomy,
                attributes: ['id', 'type'],
              },
              {
                as: 'l',
                model: models.Taxonomy,
                attributes: ['id', 'type'],
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
        ],
      },
    ],
    order: [
      [models.LearningUnit, models.KnowledgeUnit, 'id', 'asc'],
      [models.LearningUnit, models.KnowledgeUnit, 'Texts', 'id', 'asc'],
    ],
  })
    .then(result => res.json(result));
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

      console.log(suggestions);
      return res.json(suggestions);
    });
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
