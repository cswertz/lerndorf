import { check, validationResult } from 'express-validator';
import { convertArrayToCSV } from 'convert-array-to-csv';
import { Op } from 'sequelize';
import express from 'express';

import { hasCapability } from '../helpers/auth';
import models from '../config/sequelize';

const router = express.Router();

const filterLogs = async (query, limit = null) => {
  const where = {};
  if (query) {
    if (query.user_id) {
      where.UserId = query.user_id;
    }

    if (query.knowledge_unit_id) {
      where.KnowledgeUnitId = query.knowledge_unit_id;
    }

    if (query.learning_unit_id) {
      where.LearningUnitId = query.learning_unit_id;
    }

    if (query.course_id) {
      where.CourseId = query.course_id;
    }

    if (query.date_from) {
      if (!where.createdAt) {
        where.createdAt = {};
      }

      where.createdAt[Op.gte] = new Date(query.date_from);
    }

    if (query.date_to) {
      if (!where.createdAt) {
        where.createdAt = {};
      }

      where.createdAt[Op.lte] = new Date(query.date_to);
    }
  }

  const results = await models.LogUser.findAll({
    where,
    limit,
    include: [
      {
        model: models.User,
        attributes: [
          'id',
          'username',
        ],
      },
      {
        model: models.KnowledgeUnit,
        required: false,
        attributes: [
          'mediaType',
          'knowledgeType',
          'objectType',
          'eqfLevel',
          'courseLevel',
          'suitableBlind',
          'suitableDeaf',
          'suitableDumb',
          'recommendedAge',
          'minimumScreenResolution',
          'UserId',
        ],
        include: [
          {
            model: models.User,
            as: 'author',
          },
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
        ],
      },
      {
        model: models.LearningUnit,
        required: false,
      },
    ],
    order: [
      ['createdAt', 'ASC'],
    ],
  });

  return results;
};

router.get('/', hasCapability('view_user_logs'), async (req, res) => {
  const limit = 5;
  const results = await filterLogs(req.query, limit);

  return res.json(results);
});

router.get('/export', hasCapability('view_user_logs'), async (req, res) => {
  const results = await filterLogs(req.query);
  const header = [
    'userId',
    'createdAt',
    'KnowlegeUnitId',
    'authorId',
    'mediaType',
    'knowledgeType',
    'objectType',
    'eqfLevel',
    'courseLevel',
    'suitableBlind',
    'suitableDeaf',
    'suitableDumb',
    'recommendedAge',
    'minimumScreenResolution',
    'userRating',
    'KnowledgeUnitLanguage',
    'LearningUnitId',
    'title',
    'CourseId',
    'courseTitle',
    'activeSequence',
  ];

  const data = results.map((item) => {
    const ku = item.dataValues.KnowledgeUnit;
    const authorId = ku ? ku.author.dataValues.id : null;
    const suitableBlind = ku ? ku.dataValues.suitableBlind : null;
    const suitableDeaf = ku ? ku.dataValues.suitableDeaf : null;
    const suitableDumb = ku ? ku.dataValues.suitableDumb : null;
    const recommendedAge = ku ? ku.dataValues.recommendedAge : null;

    const minimumScreenResolution = (ku && ku.msr) ? ku.msr.dataValues.type : null;
    const knowledgeType = (ku && ku.kt) ? ku.kt.dataValues.type : null;
    const mediaType = (ku && ku.mt) ? ku.mt.dataValues.type : null;
    const objectType = (ku && ku.ot) ? ku.ot.dataValues.type : null;
    const eqfLevel = (ku && ku.el) ? ku.el.dataValues.type : null;
    const courseLevel = (ku && ku.cl) ? ku.cl.dataValues.type : null;

    return {
      userId: item.dataValues.id,
      createdAt: new Date(item.dataValues.createdAt).toISOString(),
      KnowlegeUnitId: item.dataValues.KnowledgeUnitId,
      authorId,
      mediaType,
      knowledgeType,
      objectType,
      eqfLevel,
      courseLevel,
      suitableBlind,
      suitableDeaf,
      suitableDumb,
      recommendedAge,
      minimumScreenResolution,
      userRating: null,
      KnowledgeUnitLanguage: null,
      LearningUnitId: item.dataValues.LearningUnitId,
      title: null,
      CourseId: item.dataValues.CourseId,
      courseTitle: null,
      activeSequence: null,
    };
  });

  const csvString = convertArrayToCSV(data, {
    header,
    separator: ';',
  });

  res.header('Content-Typ', 'text/csv');
  res.attachment('export.csv');
  return res.send(csvString);
});

export default router;
