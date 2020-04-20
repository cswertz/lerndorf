import { check, validationResult } from 'express-validator';
import express from 'express';

import { hasCapability } from '../helpers/auth';
import models from '../config/sequelize';

import { getTree } from '../helpers/taxonomies';

const { Op } = models.Sequelize;
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
    .then((results) => res.json(results));
});

router.post('/', [
  hasCapability('add_knowledge_unit'),
  check('LearningUnitId', 'LearningUnitId is required')
    .exists()
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

  req.body.UserId = req.user.id;
  return models.KnowledgeUnit.create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.status(422).send({
      error: 'There have been database errors.',
      errors: err.errors.map((error) => ({
        message: error.message,
        type: error.type,
      })),
    }));
});

router.get('/taxonomies', (req, res) => {
  models.Taxonomy.findAll({
    where: {
      '$Parent.type$': {
        [Op.in]: [
          'mediaType',
          'knowledgeType',
          'courseLevel',
          'licences',
          'minimumScreenResolution',
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
    .then((children) => getTree(children).then((result) => res.json(result)));
});

router.patch('/markReviewed/:id', hasCapability('set_knowledge_unit_reviewed'), (req, res) => {
  models.KnowledgeUnit.update({
    review: true,
  }, {
    where: {
      id: req.params.id,
    },
  })
    .then((result) => res.json(result));
});

router.patch('/markLectored/:id', hasCapability('set_knowledge_unit_lectored'), (req, res) => {
  models.KnowledgeUnit.update({
    lectorate: true,
  }, {
    where: {
      id: req.params.id,
    },
  })
    .then((result) => res.json(result));
});

router.get('/:id', (req, res) => {
  models.KnowledgeUnit.findByPk(req.params.id, {
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
  })
    .then((result) => res.json(result));
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
