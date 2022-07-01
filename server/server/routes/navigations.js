import { check, validationResult } from 'express-validator';
import express from 'express';

import {
  hasCapability,
  hasCapabilityOrOwnsKnowledgeUnit as hasCapabilityOrOwns,
  isLoggedIn,
  isAdmin
} from '../helpers/auth';
import { logView } from '../helpers/log';
import models from '../config/sequelize';
import KnowledgeUnit from '../models/KnowledgeUnit';

const { Op } = models.Sequelize;
const router = express.Router();

const resolveLanguages = async(req, res) => {

    const languageSystemDefault = await models.Language.findAll({limit:1});
    console.error(languageSystemDefault);

    // Method to get the list of possible menu items
    let languages = [languageSystemDefault[0].id];
  
    // Check the user default language
    if (req.user){
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

        let preferredLanguage = null;

        if (req.user !== null && req.user !== undefined && req.user.preferredLanguage !== null) {
           const preferredLanguageResult = await models.UserLanguage.findByPk(req.user.preferredLanguage);
           if (preferredLanguageResult !== null){
                preferredLanguage = preferredLanguageResult.LanguageId;
           }
        }

        languages = preferredLanguage !== null ? [preferredLanguage] : user.Languages.map((Language) => {
            return Language.id;
        });
    }
 
    return languages;

}

router.get('/knowledge', async (req, res) => {

    const languages = await resolveLanguages(req, res);
    const currentRequestIsFromAdmin = (req.user !== undefined && await isAdmin(req.user.id) === true);

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
          where: currentRequestIsFromAdmin === true ? {} : {
            id: languages
          }
        },
        {
          model:  models.KnowledgeUnit,
          where: currentRequestIsFromAdmin === true ? {} : {
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
                  where: currentRequestIsFromAdmin === true ? {} :{
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

     console.error('ISADMIN:', currentRequestIsFromAdmin, languages);

    res.json(responseData);

  });

router.get('/courses', async (req, res) => {

    const languages = await resolveLanguages(req, res);
    let responseData = [];

    res.json(responseData);

});

router.get('/content', async (req, res) => {

    const languages = await resolveLanguages(req, res);
    let responseData = [];

    res.json(responseData);

});

export default router;