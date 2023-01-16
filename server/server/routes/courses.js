import { check, validationResult } from 'express-validator';
import express from 'express';

import {
  hasCapability,
  hasCapabilityOrOwnsKnowledgeUnit as hasCapabilityOrOwns,
  isLoggedIn,
  isUser,
  isAdmin,
} from '../helpers/auth';
import { logView } from '../helpers/log';
import models from '../config/sequelize';
import KnowledgeUnit from '../models/KnowledgeUnit';
import Language from '../models/Language';
import { resolveLanguages } from '../helpers/utils';
import {
  attachCommonCourseMetaData, attachUserRoleText, getLastCourseSequendId, getStudentRoleId, getTrainerRoleId,
} from '../helpers/course_utils';

const { Op } = require('sequelize');
const moment = require('moment');

const router = express.Router();

router.get('/', (req, res) => {
  models.Course.findAll({})
    .then((results) => res.json(results));
});

router.get('/my', async (req, res) => {
  if (req.user === undefined) {
    res.status(401).json([]);
    return;
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
          userId: req.user.id,
        },
      },
    ],
  }).then(async (result) => {
    const coursesRaw = await result;
    res.status(200).json(attachCommonCourseMetaData(coursesRaw, req.user));
  });
});

router.get('/my/stats', async (req, res) => {
  if (req.user === undefined) {
    res.status(401).json([]);
    return;
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
          userId: req.user.id,
        },
      },
    ],
  }).then(async (result) => {
    const coursesRaw = await result;
    res.status(200).json({ amount: result.length });
  });
});

router.get('/enroleable', async (req, res) => {
  if (req.user === undefined) {
    res.json([]);
    return;
  }

  const userId = req.user.id;

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

router.get('/:id/enrole', async (req, res) => {
  try {
    const course = await models.Course.findByPk(req.params.id, {
      include: [
        {
          model: models.CourseUser,
          as: 'users',
          include: [
            {
              model: models.User,
              as: 'user',
              attributes: ['id', 'firstName', 'lastName', 'username'],
              where: {
                id: req.user.id,
              },
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
    });

    if (course.users.length > 0) {
      return res.status(400).send({
        error: 'You cannot re-enrole, cause you are already enroled to this course.',
      });
    }

    const roleId = await getStudentRoleId();
    const sequeneceId = await getLastCourseSequendId(course.id);

    // Create a course user entry to the course.
    const courseUser = await models.CourseUser.create({
      enrolmentConfirmation: course.enrolmentConfirmation !== true,
      courseId: course.id,
      userId: req.user.id,
      roleId,
      enrolment: moment().toDate(),
      sequeneceId,
    });

    return res.status(200).send(courseUser);
  } catch (err) {
    return res.status(500).send({ err });
  }
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

router.delete('/:id', hasCapability('delete_course'), async (req, res) => {
  const isCurrentUserAdmin = await isAdmin(req.user.id);
  const trainerRoleId = await getTrainerRoleId();
  const course = await models.Course.findByPk(req.params.id, {
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
  });
  if (course === null) {
    return res.status(404).send({ message: 'entry not found' });
  }

  const courseUser = course.users.filter((user) => {
    if ((user.userId === req.user.id && user.roleId === trainerRoleId)) {
      return user;
    }
  });

  if (isCurrentUserAdmin === false && courseUser.length === 0) {
    return res.status(403).send({ message: 'you cannot delete this entry unless you are the trainer or an admin.' });
  }

  /* await models.Course.destroy({
    where: {
      id: req.params.id,
    },
  }); */
  return res.status(200).send({ message: 'course has been deleted.' });
});

export default router;
