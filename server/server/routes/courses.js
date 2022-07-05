import { check, validationResult } from 'express-validator';
import express from 'express';

import {
  hasCapability,
  hasCapabilityOrOwnsKnowledgeUnit as hasCapabilityOrOwns,
  isLoggedIn,
  isAdmin,
  isUser
} from '../helpers/auth';
import { logView } from '../helpers/log';
import models from '../config/sequelize';
import KnowledgeUnit from '../models/KnowledgeUnit';
import Language from '../models/Language';

const { Op } = models.Sequelize;
const router = express.Router();


router.get('/', (req, res) => {
  models.Course.findAll({})
  .then((results) => res.json(results));
});

router.get('/my', (req, res) => {

  if (req.user === undefined){
     res.json([]);
     return;
  }

  const userId = res.user.id;

  models.Course.findAll({
    include:[
      {
        model: models.CourseUser,
        as: 'users',
        where: {
          userId: userId
        }
      },
    ]
  }).then(result => {
    res.json(result);
  })
  
});

router.get('/:id', (req, res) => {
  models.Course.findByPk(req.params.id)
  .then((results) => res.json(results));
});

export default router;