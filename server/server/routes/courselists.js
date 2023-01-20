import { check, validationResult } from 'express-validator';
import express from 'express';
import models from '../config/sequelize';
import { attachCommonCourseMetaData } from '../helpers/course_utils';
import { hasCapability } from '../helpers/auth';

const router = express.Router();
const moment = require('moment');

const queryForCourselist = {
  model: models.CourseListItem,
  as: 'items',
  include: [
    {
      model: models.Course,
      as: 'course',
      include: [
        {
          model: models.CourseUser,
          as: 'users',
          include: [
            {
              model: models.User,
              as: 'user',
              attributes: ['id', 'firstName', 'lastName', 'email', 'username', 'picture', 'lastLogin'],
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
          include: [
            {
              model: models.CourseSequenceKnowledgeUnit,
              as: 'units',
            },
          ],
        },
      ],
    },
  ],
};

router.get('/', (req, res) => {
  models.CourseList.findAll({
    include: [
      queryForCourselist,
    ],

  })
    .then((results) => res.json(results));
});

router.get('/:id', async (req, res) => {
  try {
    const courseList = await models.CourseList.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        queryForCourselist,
      ],
    });

    const list = courseList.items.sort((a, b) => {
      if (a.orderId < b.orderId) return -1;
      if (a.orderId > b.orderId) return 1;
      return 0;
    }).map((item) => item.course);

    // courseList.items = attachCommonCourseMetaData(courseList, req.user);
    return res.status(200).send({ id: courseList.id, title: courseList.title, courses: attachCommonCourseMetaData(list, req.user) });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Error while loading the courselist' });
  }
});

router.post('/', [hasCapability('manage_course_lists')], async (req, res) => {
  try {
    const courselist = await models.CourseList.create({
      title: req.body.title,
      createdAt: moment().toDate(),
      updatedAt: moment().toDate(),
    });

    for (let i = 0; i < req.body.list.length; i += 1) {
      await models.CourseListItem.create({
        courseListId: courselist.id,
        courseId: req.body.list[i],
        orderId: i,
        createdAt: moment().toDate(),
        updatedAt: moment().toDate(),
      });
    }

    return res.status(200).send({ message: 'List has been created.' });
  } catch (err) {
    return res.status(400).send({ error: 'Something went wrong. Please try again.' });
  }
});

router.patch('/:id', [hasCapability('manage_course_lists')], async (req, res) => {
  try {
    const courselist = await models.CourseList.findOne({ where: { id: req.params.id }, include: [queryForCourselist] });

    if (courselist === null || courselist === undefined) {
      return res.status(404).send({ message: 'Cannot find the courselist' });
    }

    await models.CourseList.update({
      title: req.body.title,
    }, {
      where: {
        id: req.params.id,
      },
    });

    await models.CourseListItem.destroy({
      where: {
        courseListId: req.params.id,
      },
    });

    for (let i = 0; i < req.body.list.length; i += 1) {
      await models.CourseListItem.create({
        courseListId: courselist.id,
        courseId: req.body.list[i],
        orderId: i,
        createdAt: moment().toDate(),
        updatedAt: moment().toDate(),
      });
    }

    const courselistRefreshed = await models.CourseList.findOne({ where: { id: req.params.id }, include: [queryForCourselist] });

    return res.status(200).send(courselistRefreshed);
  } catch (err) {
    console.error(err);
    return res.status(400).send({ error: 'Something went wrong. Please try again.' });
  }
});

router.delete('/:id', [hasCapability('manage_course_list')], async (req, res) => {
  try {
    const courselist = await models.CourseList.findOne({ where: { id: req.params.id } });

    console.error(courselist);

    if (courselist === null || courselist === undefined) {
      return res.status(404).send({ message: 'Cannot find the courselist' });
    }

    // First delete the list items
    await models.CourseListItem.destroy({
      where: {
        courseListId: req.params.id,
      },
    });
    await models.CourseListItem.destroy({
      where: {
        courseListId: req.params.id,
      },
    });
    return res.status(200).send({ message: 'List has been deleted.' });
  } catch (err) {
    console.error(err);
    return res.status(400).send({ error: 'Something went wrong. Please try again.' });
  }
});

export default router;
