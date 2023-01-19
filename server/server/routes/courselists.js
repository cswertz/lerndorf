import { check, validationResult } from 'express-validator';
import express from 'express';
import models from '../config/sequelize';
import { attachCommonCourseMetaData } from '../helpers/course_utils';

const router = express.Router();

router.get('/', (req, res) => {
  models.CourseList.findAll({})
    .then((results) => res.json(results));
});

router.get('/:id', async (req, res) => {
  try {
    const courseList = await models.CourseList.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
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
        },
      ],
    });

    const list = courseList.items.sort((a, b) => {
      console.error(a, b);
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

router.delete('/:id', async (req, res) => {
  try {
    // First delete the list items
    await models.CourseListItem.destroy({
      where: {
        courseListId: req.params.id,
      },
    });
    await models.CourseList.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).send({ message: 'List has been deleted.' });
  } catch (err) {
    return res.status(400).send({ error: 'Something went wrong. Please try again.' });
  }
});

export default router;
