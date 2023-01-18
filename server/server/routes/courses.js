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

router.post('/', [
  hasCapability('create_course'),
  check('title', 'title is required')
    .isLength({ min: 1 })
    .notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({
      error: 'There have been validation errors.',
      errors: errors.array(),
    });
  }

  try {
    const role = await models.Role.findOne({ where: { slug: 'trainer' } });

    const course = await models.Course.create({
      title: req.body.title,
      shortTitle: '',
      description: '',
      enrolmentStart: moment().format('YYYY-MM-DD'),
      enrolmentEnd: moment().format('YYYY-MM-DD'),
      courseStart: moment().format('YYYY-MM-DD'),
      courseEnd: moment().format('YYYY-MM-DD'),
      mainLanguage: 1,
      access: false,
      copyAllowed: false,
      enrolmentByTutor: false,
      enrolmentConfirmation: false,
    });

    models.CourseUser.create({
      courseId: course.id,
      userId: req.user.id,
      roleId: role.id,
      enrolment: moment().toDate(),
      enrolmentConfirmation: false,
      sequenceId: null,
    });
    return res.status(200).send(course);
  } catch (err) {
    return res.status(400).send({ msg: 'Unknown issue occurs' });
  }
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
          visible: true,
        },
      ],
    },
  }).then(async (result) => {
    const coursesRaw = await result;
    res.status(200).json(attachCommonCourseMetaData(coursesRaw, req.user));
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

router.get('/:id', async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: 'Not logged in.' });
  }

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
              attributes: ['id', 'firstName', 'lastName', 'email', 'username', 'picture'],
            },
            {
              model: models.Role,
              as: 'role',
            },
          ],
        },
        {
          model: models.CourseContent,
          as: 'content',
          include: [
            {
              model: models.KnowledgeUnit,
              as: 'knowledgeUnit',
              include: [
                {
                  as: 'versions',
                  model: models.KnowledgeUnit,
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
                  as: 'LearningUnit',
                  model: models.LearningUnit,
                  include: [
                    {
                      as: 'Translations',
                      model: models.LearningUnitLanguage,
                      attributes: ['LanguageId', 'title'],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          model: models.CourseSequence,
          as: 'sequences',
        },
      ],
    });

    if (course === null) {
      return res.status(404).send({ error: 'There is no course with this id.' });
    }

    return res.status(200).send(course);
  } catch (err) {
    console.error(err);
  }

  return res.status(400).send({ error: 'Error while fetching the data.' });
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

router.get('/:id/content/:contentId/update', async (req, res) => {
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
        model: models.CourseContent,
        as: 'content',
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

  // load the
  res.json([]);
});

router.patch('/:id', hasCapability('edit_course'), async (req, res) => {
  try {
    const isCurrentUserAdmin = await isAdmin(req.user.id);
    const trainerRoleId = await getTrainerRoleId();
    const course = await models.Course.findByPk(req.params.id, {
      include: [
        {
          model: models.CourseUser,
          as: 'users',
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
      return res.status(403).send({ message: 'you cannot update this entry unless you are the trainer or an admin.' });
    }

    const updateData = { title: req.body.title };
    const keys = Object.keys(req.body);

    for (let i = 0; i < keys.length; i += 1) {
      const attr = keys[i];
      if (req.body[attr] !== undefined) {
        switch (attr) {
          case 'courseStart':
          case 'courseEnd':
          case 'enrolmentStart':
          case 'enrolmentEnd':
            updateData[attr] = moment.utc(req.body[attr]).toDate();
            break;
          default:
            updateData[attr] = req.body[attr];
            break;
        }
      }
    }

    const updatedData = await models.Course.update(updateData, {
      where: {
        id: req.params.id,
      },
    });

    const courseRefetched = await models.Course.findByPk(req.params.id, {
      include: [
        {
          model: models.CourseUser,
          as: 'users',
        },
      ],
    });

    return res.status(200).send(courseRefetched);
  } catch (err) {
    console.error(err);
    return res.status(400).send({ message: 'Error occured while try to update the course.' });
  }
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

  await models.Course.destroy({
    where: {
      id: req.params.id,
    },
  });

  await models.CourseUserLog.destroy({
    where: {
      courseId: req.params.id,
    },
  });

  await models.CourseContent.destroy({
    where: {
      courseId: req.params.id,
    },
  });

  return res.status(200).send({ message: 'course has been deleted.' });
});

router.patch('/:id/users/:userId', async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: 'Not logged in.' });
  }

  try {
    // Load the course information
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

    const currentCourseUser = course.users.filter((user) => {
      if ((user.userId === req.user.id && user.roleId === trainerRoleId)) {
        return user;
      }
      if (course.enrolmentByTutor === true && course.enrolmentConfirmation === true) {
        return user;
      }
    });

    if (isCurrentUserAdmin === false && currentCourseUser.length === 0) {
      return res.status(403).send({ message: 'you cannot confirm this unless you are the trainer or an admin.' });
    }

    const searchedUser = course.users.filter((user) => {
      if (user.id === parseInt(req.params.userId, 10)) {
        return user;
      }
    });

    if (searchedUser.length === 0) {
      return res.status(400).send({ message: 'you cannot confirm a course user which does not exists.' });
    }

    if (req.body.confirm !== undefined && typeof req.body.confirm !== 'boolean') {
      throw Error('Confirm must be a boolean');
    }

    const updateRequest = await models.CourseUser.update({
      enrolmentConfirmation: req.body.confirm === true,
    }, { where: { id: searchedUser[0].id } });

    return res.status(200).send({ message: req.body.confirm === true ? 'you have confirmed the user' : 'you have disabled the confirmation for the user' });
  } catch (err) {
    return res.status(400).send({ message: 'Error occured while try to set the confirmation status.' });
  }
});

router.delete('/:id/users/:userId', async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: 'Not logged in.' });
  }

  try {
    // Load the course information
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
      return res.status(404).send({ message: 'Entry not found' });
    }

    const currentCourseUser = course.users.filter((user) => {
      if ((user.userId === req.user.id && user.roleId === trainerRoleId)) {
        return user;
      }
    });

    if (isCurrentUserAdmin === false && currentCourseUser.length === 0) {
      return res.status(403).send({ message: 'You remove an user this unless you are the trainer or an admin.' });
    }

    const searchedUser = course.users.filter((user) => {
      if (user.id === parseInt(req.params.userId, 10)) {
        return user;
      }
    });

    if (searchedUser.length === 0) {
      return res.status(400).send({ message: 'You cannot remove course user which does not exists.' });
    }

    if (req.body.confirm !== undefined && typeof req.body.confirm !== 'boolean') {
      throw Error('Confirm must be a boolean');
    }

    await models.CourseUser.destroy({
      where: {
        id: req.params.userId,
      },
    });

    await models.CourseUserLog.destroy({
      where: {
        userId: req.params.userId,
      },
    });

    return res.status(200).send({ message: 'You have removed the user' });
  } catch (err) {
    return res.status(400).send({ message: 'Error occured while try to remove the user.' });
  }
});

router.post('/:id/users', [
  check('userId', 'User id is required')
    .notEmpty(),
  check('roleId', 'Role id is required')
    .notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({
      error: 'There have been validation errors.',
      errors: errors.array(),
    });
  }
  if (!req.user) {
    return res.status(401).send({ error: 'Not logged in.' });
  }

  try {
    // Load the course information
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
      return res.status(404).send({ message: 'Entry not found' });
    }

    const currentCourseUser = course.users.filter((user) => {
      if ((user.userId === req.user.id && user.roleId === trainerRoleId)) {
        return user;
      }
    });

    if (isCurrentUserAdmin === false && currentCourseUser.length === 0) {
      return res.status(403).send({ message: 'You remove an user this unless you are the trainer or an admin.' });
    }

    const searchedUser = course.users.filter((user) => {
      if (user.id === parseInt(req.body.userId, 10)) {
        return user;
      }
    });

    if (searchedUser.length > 0) {
      return res.status(400).send({ message: 'You cannot add duplicate entries.' });
    }

    const userToBeAdded = await models.User.findByPk(req.body.userId);

    if (userToBeAdded === null) {
      return res.status(400).send({ message: 'You cannot add an invalid user.' });
    }

    const sequeneceId = await getLastCourseSequendId(course.id);

    // Create a course user entry to the course.
    const courseUser = await models.CourseUser.create({
      enrolmentConfirmation: course.enrolmentConfirmation !== true,
      courseId: course.id,
      userId: req.body.userId,
      roleId: req.body.roleId,
      enrolment: moment().toDate(),
      sequeneceId,
    });

    return res.status(200).send({ message: 'You have added the user' });
  } catch (err) {
    return res.status(400).send({ message: 'Error occured while try to adding the user.' });
  }
});

export default router;
