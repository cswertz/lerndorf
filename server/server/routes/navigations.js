import { check, validationResult } from 'express-validator';
import express from 'express';

import {
  hasCapability,
  hasCapabilityOrOwnsKnowledgeUnit as hasCapabilityOrOwns,
  isLoggedIn,
} from '../helpers/auth';
import { logView } from '../helpers/log';
import models from '../config/sequelize';
import KnowledgeUnit from '../models/KnowledgeUnit';

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

    const responseData = learningUnits.map(learningUnit => {
        
        let secondLevelData = [];

        // extract the knowledge units and the knowledge type as second level and add the mt as third level
        const knowledgeTypesForLearningUnit = learningUnit.KnowledgeUnits.filter((KnowledgeUnit) => {
            if (KnowledgeUnit.kt != null) {
                return KnowledgeUnit;
            }
        }).map((KnowledgeUnit) => {
            return {
                id: KnowledgeUnit.kt.id,
                type: KnowledgeUnit.kt.type,
                title: KnowledgeUnit.kt.TaxonomyLanguages[0].vocable,
                items: learningUnit.KnowledgeUnits.filter((KnowledgeUnitForThridLevel) => {
                    if (KnowledgeUnitForThridLevel.mt != null && KnowledgeUnitForThridLevel.kt != null && KnowledgeUnitForThridLevel.kt.type == KnowledgeUnit.kt.type) {
                        return KnowledgeUnitForThridLevel;
                    }
                }).map((KnowledgeUnitForThridLevel) => {
                    // transfrom the items for the thrid level
                    return {
                        id: KnowledgeUnitForThridLevel.id,
                        type: KnowledgeUnitForThridLevel.type,
                        title: KnowledgeUnitForThridLevel.mt.TaxonomyLanguages[0].vocable,
                        href: `/knowledge-units/show/${KnowledgeUnitForThridLevel.id}`
                    }
                })
            }
        }).filter((value, index, self) => {
            if (self.findIndex((t) => (
                t.type === value.type
              )) === index) {
                  return value;
              }
        });

        // return the leaning units with the grouped data structure
        return {
           id: learningUnit.id,
           title: learningUnit.Languages[0].LearningUnitLanguage.title,
           items: [...knowledgeTypesForLearningUnit]
        }
   
     }).filter(learningUnit => {
         if (learningUnit.items.length > 0) {
             return learningUnit;
         }
     });

    res.json(responseData);

  });

router.get('/courses', async (req, res) => {

    const languages = await resolveLanguages(req);
    let responseData = [];

    res.json(responseData);

});

router.get('/content', async (req, res) => {

    const languages = await resolveLanguages(req);
    let responseData = [];

    res.json(responseData);

});

export default router;