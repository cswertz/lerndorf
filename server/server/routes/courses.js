import { check, validationResult } from 'express-validator';
import express from 'express';

import {
  hasCapability,
  hasCapabilityOrOwnsKnowledgeUnit as hasCapabilityOrOwns,
  isLoggedIn,
  isAdmin,
  isUser,
} from '../helpers/auth';
import { logView } from '../helpers/log';
import models from '../config/sequelize';
import KnowledgeUnit from '../models/KnowledgeUnit';
import Language from '../models/Language';
import { resolveLanguages } from '../helpers/utils';
import { attachCommonCourseMetaData, attachPlayButtonState, attachUserRoleText } from '../helpers/course_utils';

const { Op } = require('sequelize');
const moment = require('moment');

const router = express.Router();

router.get('/', (req, res) => {
  models.Course.findAll({})
    .then((results) => res.json(results));
});

router.get('/my', async (req, res) => {
  if (req.user === undefined) {
    res.json([]);
    return;
  }

  const userId = req.user.id;

  if (userId === null) {
    return res.status(401).json(req.user);
  }

  models.Course.findAll({
    include: [
      {
        model: models.CourseUser,
        as: 'users',
        include: [
          {
            model: models.User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'username'],
          },
          {
            model: models.Role,
            as: 'role',
            include: [
              {
                model: models.RoleLanguage,
              },
            ],
          },
        ],
        where: {
          userId,
        },
      },
    ],
  }).then(async (result) => {
    const coursesRaw = await result;
    res.status(200).json(attachCommonCourseMetaData(coursesRaw, req.user));
  });
});

router.get('/enroleable', async (req, res) => {
  if (req.user === undefined) {
    res.json([]);
    return;
  }

  const userId = req.user.id;

  if (userId === null) {
    return res.status(401).json(req.user);
  }

  const userLanguages = await models.UserLanguage.findAll({ where: { UserId: req.user.id } });
  const languageIds = userLanguages.map((userLanguage) => userLanguage.LanguageId);

  models.Course.findAll({
    include: [
      {
        model: models.CourseUser,
        as: 'users',
        include: [
          {
            model: models.User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'username'],
          },
          {
            model: models.Role,
            as: 'role',
            include: [
              {
                model: models.RoleLanguage,
              },
            ],
          },
        ],
      },
    ],
    where: {
      [Op.and]: [
        {
          [Op.or]: [
            {
              enrolmentStart: {
                [Op.lte]: moment().startOf('day').toDate(),
              },
            },
            { enrolmentStart: null },
          ],
        },
        {
          [Op.or]: [
            {
              enrolmentEnd: {
                [Op.gte]: moment().endOf('day').toDate(),
              },
            },
            { enrolmentEnd: null },
          ],
        },
        {
          mainLanguage: languageIds,
        },
      ],
    },
  }).then(async (result) => {
    const coursesRaw = await result;
    res.status(200).json(attachCommonCourseMetaData(coursesRaw, req.user));
  });
});

router.get('/:id', (req, res) => {
  models.Course.findByPk(req.params.id)
    .then((results) => {
      if (results === null) {
        res.status(404).json({
          message: 'entry not found',
        });
        return;
      }
      res.json(results);
    });
});

router.get('/:id/content', async (req, res) => {
  const courses = await models.Course.findAll({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: models.CourseUser,
        as: 'users',
      },
      {
        model: models.CourseSequence,
        as: 'sequences',
        include: [
          {
            model: models.CourseSequenceKnowledgeUnit,
            as: 'units',
          },
        ],
      },
    ],
  });

  if (courses[0] === undefined || courses[0] === null) {
    res.status(404).json({
      message: 'entry not found',
    });
    return;
  }

  // Extract the knowledge unit ids
  const ids = courses[0].sequences.map((sequence) => sequence.units.map((item) => item.knowledgeUnitId)).flat();

  const languages = await resolveLanguages(req, res);

  // Knowledge units
  const units = await models.KnowledgeUnit.findAll({
    where: {
      id: ids,
    },
    include: [
      {
        as: 'kt',
        model: models.Taxonomy,
        attributes: ['id', 'type'],
        include: [
          {
            model: models.TaxonomyLanguage,
            attributes: ['LanguageId', 'vocable'],
            where: {
              LanguageId: languages,
            },
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
    ],
  });

  // load the
  res.json(units);
});

export default router;
