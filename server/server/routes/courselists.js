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
  models.CourseList.findAll({})
    .then((results) => res.json(results));
});

router.get('/:id', (req, res) => {
  models.CourseList.findByPk(req.params.id, {
    include: [
      {
        include: [
          {
            model: models.CourseListItem,
            as: 'items',
          },
        ],
      },
    ],
  })
    .then((results) => res.json(results));
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
