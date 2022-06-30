import { check, validationResult } from 'express-validator';
import express from 'express';

import {
  hasCapability,
  hasCapabilityOrOwnsKnowledgeUnit as hasCapabilityOrOwns,
  isLoggedIn,
} from '../helpers/auth';
import { logView } from '../helpers/log';
import models from '../config/sequelize';

const { Op } = models.Sequelize;
const router = express.Router();

const resolveLanguages = async(req) => {

    // Method to get the list of possible menu items
    const languageSystemDefault = await models.Language.findAll({limit:1});
    let languages = [languageSystemDefault[0].id];
  
    // Check the user default language
    if (req.user && req.user.preferredLanguage){
      languages = [req.user.preferredLanguage];
    }
    else if (req.user){
      const user = await models.User.findByPk(req.user.id, {
        include: [
          {
            model: models.Language,
            order: [
              ['level', 'DESC'],
            ],
          },
        ],
      });
      languages = user.Languages.map((Language) => {
        return Language.id;
      });
    }

    return languages;

}

router.get('/knowledge', async (req, res) => {

    const languages = await resolveLanguages(req);

    const learningUnits = await models.LearningUnit.findAll({
      attributes: ['id'],
      where: {
         
      },
      include: [
        {
          model: models.Language,
          attributes: [
            'name',            
          ],
          through: {
            attributes: [
              'title',
            ],
          },
          where: {
            id: languages
          }
        },
        {
          model:  models.KnowledgeUnit,
          where: {
            review: true,
            lectorate: true,
            publish: true,
            VisiblePublic: true,
            nextId: null,
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
        }
      ],
    });
    
    res.json(learningUnits.map(learningUnit => {
  
       return {
          id: learningUnit.id,
          title: learningUnit.Languages[0].LearningUnitLanguage.title,
          items: [...learningUnit.KnowledgeUnits.filter((KnowledgeUnit) => {
              if (KnowledgeUnit.kt != null) {
                  return KnowledgeUnit;
              }
          }).map((KnowledgeUnit) => {
              
             return {
              id: KnowledgeUnit.id,
              title: KnowledgeUnit.kt.TaxonomyLanguages[0].vocable,
             }
  
          })].filter((value, index, self) => {
              if (self.findIndex((t) => (
                t.title === value.title
              )) === index) {
                  return value;
              }
          })
       }
  
    }).filter(learningUnit => {
        if (learningUnit.items.length > 0) {
            return learningUnit;
        }
    }));
  });
export default router;