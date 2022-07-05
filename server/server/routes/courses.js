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
import { resolveLanguages } from '../helpers/utils';

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
  .then((results) => {
    console.log(results);
    if (results === null){
      res.status(404).json({
        'message':'entry not found'
      });
      return;
    }
    console.error('"');
    res.json(results);
  });
});

router.get('/:id/content', async  (req, res) => {
 
  const courses = await models.Course.findAll({
    where: {
      id:req.params.id
    },
    include: [
      {
        model: models.CourseUser,
        as: 'users'
      },
      {
        model: models.CourseSequence,
        as: 'sequences',
        include: [
          {
            model: models.CourseSequenceKnowledgeUnit,
            as: 'units'
          }
        ]
      }
    ]
  });

  if (courses[0] === undefined || courses[0] === null){
    res.status(404).json({
      'message':'entry not found'
    });
    return;
  }

  // Extract the knowledge unit ids
  const ids = courses[0].sequences.map((sequence) => {
     return sequence.units.map(item => item.knowledgeUnitId);
  }).flat();


  const languages = await resolveLanguages(req, res);

  // Knowledge units
  const units = await models.KnowledgeUnit.findAll({
      where:{
        id:  ids
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
                LanguageId: languages
              }
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
      ]
  })

  // load the 
  res.json(units);

});

export default router;