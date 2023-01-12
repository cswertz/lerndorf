import { check, validationResult } from 'express-validator';
import express from 'express';

import {
  hasCapability,
  hasCapabilityOrOwnsKnowledgeUnit as hasCapabilityOrOwns,
  isLoggedIn,
} from '../helpers/auth';
import { logView } from '../helpers/log';
import models from '../config/sequelize';

import { getTree } from '../helpers/taxonomies';

const { Op } = models.Sequelize;
const router = express.Router();

const knowledgeUnitDetailData = {
  attributes: [
    'id',
    'UserId',
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
    'LearningUnitId',
  ],
  include: [
    {
      as: 'msr',
      model: models.Taxonomy,
      attributes: ['id', 'type'],
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
      attributes: ['id', 'type'],
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
      attributes: ['id', 'type'],
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
      attributes: ['id', 'type'],
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
      attributes: ['id', 'type'],
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
      attributes: ['id', 'type'],
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
      attributes: ['id', 'type'],
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
    {
      as: 'LearningUnit',
      model: models.LearningUnit,
      attributes: ['id'],
      include: [
        {
          as: 'Translations',
          model: models.LearningUnitLanguage,
          attributes: ['LanguageId', 'title'],
        },
      ],
    },
  ],
};

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

router.patch('/:id', hasCapability('edit_any_knowledge_unit'), async (req, res) => {
  const result = await models.KnowledgeUnit.update(req.body, {
    where: {
      id: req.params.id,
    },
  });

  return res.json(result);
});

router.get('/taxonomies', async (req, res) => {
  const taxonomies = await models.Taxonomy.findAll({
    where: {
      '$Parent.type$': {
        [Op.in]: [
          'eqflevel',
          'mediaType',
          'knowledgeType',
          'courseLevel',
          'licences',
          'minimumScreenResolution',
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
      {
        model: models.TaxonomyLanguage,
        attributes: ['LanguageId', 'vocable'],
      },
    ],
  });
  const tree = await getTree(taxonomies);

  return res.json(tree);
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

router.get('/own', isLoggedIn, async (req, res) => {
  const query = { knowledgeUnitDetailData };
  query.where = {
    UserId: {
      [Op.eq]: req.user.id,
    },
  };

  const result = await models.KnowledgeUnit.findAll(query);

  res.json(result);
});

router.get('/:id', logView('KnowledgeUnit'), async (req, res) => {
  const result = await models.KnowledgeUnit.findByPk(req.params.id, knowledgeUnitDetailData);

  res.json(result);
});

router.get('/:id/media-types', logView('KnowledgeUnit'), async (req, res) => {
  const result = await models.KnowledgeUnit.findByPk(req.params.id, knowledgeUnitDetailData);

  res.json(result);
});

router.delete('/:id', hasCapabilityOrOwns('delete_any_knowledge_unit'), async (req, res) => {
  const result = await models.KnowledgeUnit.destroy({
    where: {
      id: req.params.id,
    },
  });

  return res.json({ deleted: result });
});

export default router;
