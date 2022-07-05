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

const getAllLanguages = async(req, res) => {

  const languageSystemDefault = await models.Language.findAll();

  const data = languageSystemDefault.map((Language) => {
     return Language.id;
  });

  return data;

}

const resolveLanguages = async(req, res) => {

    const languageSystemDefault = await models.Language.findAll({limit:1});

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

const transformQuery = (learningUnits, currentRequestIsFromAdmin, baseUrl, allowEmpty) => {
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
                    href: `${baseUrl}${KnowledgeUnitForThridLevel.id}`
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
     if (learningUnit.items.length > 0 || currentRequestIsFromAdmin === true || allowEmpty === true) {
         return learningUnit;
     }
 });

 return responseData;
}

router.get('/knowledge', async (req, res) => {
  
    // Get the current language for the user
    const languages = await resolveLanguages(req, res);

    // Is the current user an admin?
    const currentRequestIsFromAdmin = (req.user !== undefined && await isAdmin(req.user.id) === true);

    // Is the current user an logged user?
    const knowledgeUnitQuery = currentRequestIsFromAdmin == false && req.user !== undefined && await isUser(req.user.id) === true ?  {
      review: true,
      lectorate: true,
      publish: true,
      VisiblePublic: true,
      nextId: null,
    } : {
      review: true,
      lectorate: true,
      publish: true,
      VisibleLexicon: true,
      nextId: null,
    };

    const learningUnits = await models.LearningUnit.findAll({
      attributes: ['id'],
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
          where: currentRequestIsFromAdmin === true ? {} : knowledgeUnitQuery,
          required: !currentRequestIsFromAdmin,
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

    res.json(transformQuery(learningUnits, currentRequestIsFromAdmin, '/knowledge-units/show/'));

  });

router.get('/content', async (req, res) => {

    if (req.user === undefined){
      res.json([]);
      return;
    }

    const currentRequestIsFromAdmin = (req.user !== undefined && await isAdmin(req.user.id) === true);

    // Get the current language for the user
    const languages = await getAllLanguages(req, res);

    const learningUnits = await models.LearningUnit.findAll({
      attributes: ['id'],
      where: currentRequestIsFromAdmin === true ? {} : {
          UserId: req.user.id
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
        },
        {
          model:  models.KnowledgeUnit,
          required: false,
          where: currentRequestIsFromAdmin === true ? {} : {
             UserId: req.user.id
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
                    LanguageId: languages,
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

    res.json(transformQuery(learningUnits, currentRequestIsFromAdmin, '/content/', true));

});

export default router;