import { check, validationResult } from 'express-validator';
import express from 'express';

import {
  hasCapability,
  hasCapabilityOrOwnsKnowledgeUnit as hasCapabilityOrOwns,
  isLoggedIn,
  isAdmin,
  isUser,
} from '../helpers/auth';
import { logView } from '../helpers/log';
import models from '../config/sequelize';
import KnowledgeUnit from '../models/KnowledgeUnit';
import Language from '../models/Language';
import { getAllLanguages, resolveLanguages } from '../helpers/utils';

const { Op } = models.Sequelize;
const router = express.Router();

const transformQuery = (learningUnits, currentRequestIsFromAdmin, baseUrl, allowEmpty) => {
  const responseData = learningUnits.map((learningUnit) => {
    const secondLevelData = [];

    // extract the knowledge units and the knowledge type as second level and add the mt as third level
    const knowledgeTypesForLearningUnit = learningUnit.KnowledgeUnits.filter((knowledgeUnit) => {
      if (knowledgeUnit.kt != null) {
        return knowledgeUnit;
      }
    }).map((knowledgeUnit) => ({
      id: knowledgeUnit.kt.id,
      type: knowledgeUnit.kt.type,
      title: knowledgeUnit.kt.TaxonomyLanguages[0].vocable,
      items: learningUnit.KnowledgeUnits.filter((KnowledgeUnitForThridLevel) => {
        if (KnowledgeUnitForThridLevel.mt != null && KnowledgeUnitForThridLevel.kt != null && KnowledgeUnitForThridLevel.kt.type === KnowledgeUnit.kt.type) {
          return KnowledgeUnitForThridLevel;
        }
      }).map((KnowledgeUnitForThridLevel) =>
      // transfrom the items for the thrid level
        ({
          id: KnowledgeUnitForThridLevel.id,
          type: KnowledgeUnitForThridLevel.type,
          title: KnowledgeUnitForThridLevel.mt.TaxonomyLanguages[0].vocable,
          href: `${baseUrl}${KnowledgeUnitForThridLevel.id}`,
        })),
    })).filter((value, index, self) => {
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
      items: [...knowledgeTypesForLearningUnit],
    };
  }).filter((learningUnit) => {
    if (learningUnit.items.length > 0 || currentRequestIsFromAdmin === true || allowEmpty === true) {
      return learningUnit;
    }
  });

  return responseData;
};

router.get('/knowledge', async (req, res) => {
  // Get the current language for the user
  const languages = await resolveLanguages(req, res);

  // Is the current user an admin?
  const currentRequestIsFromAdmin = (req.user !== undefined && await isAdmin(req.user.id) === true);

  // Is the current user an logged user?
  const knowledgeUnitQuery = currentRequestIsFromAdmin === false && req.user !== undefined && await isUser(req.user.id) === true ? {
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
          id: languages,
        },
      },
      {
        model: models.KnowledgeUnit,
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
                where: currentRequestIsFromAdmin === true ? {} : {
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
      },
    ],
  });

  res.json(transformQuery(learningUnits, currentRequestIsFromAdmin, '/knowledge-units/show/'));
});

router.get('/content', async (req, res) => {
  if (req.user === undefined) {
    res.json([]);
    return;
  }

  const currentRequestIsFromAdmin = (req.user !== undefined && await isAdmin(req.user.id) === true);

  // Get the current language for the user
  const languages = await getAllLanguages();

  const learningUnits = await models.LearningUnit.findAll({
    attributes: ['id'],
    where: currentRequestIsFromAdmin === true ? {} : {
      UserId: req.user.id,
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
        model: models.KnowledgeUnit,
        required: false,
        where: currentRequestIsFromAdmin === true ? {} : {
          UserId: req.user.id,
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
                where: currentRequestIsFromAdmin === true ? {} : {
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
      },
    ],
  });

  res.json(transformQuery(learningUnits, currentRequestIsFromAdmin, '/content/', true));
});

router.get('/courses', async (req, res) => {
  const baseUrl = '';

  if (req.user === undefined || req.user === null) {
    res.json([]);
    return;
  }

  // Get the current language for the user
  const languages = await resolveLanguages(req, res);

  // Is the current user an admin?
  const currentRequestIsFromAdmin = (req.user !== undefined && await isAdmin(req.user.id) === true);

  const userId = req.user.id;

  const myCourses = await models.Course.findAll({
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

  // extract all the knowledge unit ids for the second query
  const knowledgUnitIds = myCourses.map((Course) => Course.sequences.map((sequence) => sequence.units.map((item) => item.knowledgeUnitId)).flat()).flat();

  const knowledgeUnits = await models.KnowledgeUnit.findAll({
    where: {
      id: knowledgUnitIds,
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
            where: currentRequestIsFromAdmin === true ? {} : {
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

  res.json(myCourses.map((Course) => {
    const knowledgeIds = Course.sequences.map((sequence) => sequence.units.map((item) => item.knowledgeUnitId)).flat();

    const knowledgeTypesForLearningUnit = knowledgeUnits.filter((knowledgeUnit) => {
      if (KnowledgeUnit.kt != null) {
        return KnowledgeUnit;
      }
    }).map((knowledgeUnit) => ({
      id: knowledgeUnit.kt.id,
      type: knowledgeUnit.kt.type,
      title: knowledgeUnit.kt.TaxonomyLanguages[0].vocable,
      items: knowledgeUnits.filter((KnowledgeUnitForThridLevel) => {
        if (KnowledgeUnitForThridLevel.mt != null && KnowledgeUnitForThridLevel.kt != null && KnowledgeUnitForThridLevel.kt.type === KnowledgeUnit.kt.type) {
          return KnowledgeUnitForThridLevel;
        }
      }).map((KnowledgeUnitForThridLevel) =>
      // transfrom the items for the thrid level
        ({
          id: KnowledgeUnitForThridLevel.id,
          type: KnowledgeUnitForThridLevel.type,
          title: KnowledgeUnitForThridLevel.mt.TaxonomyLanguages[0].vocable,
          href: `${baseUrl}${KnowledgeUnitForThridLevel.id}`,
        })),
    }));

    return {
      id: Course.id,
      title: Course.title,
      items: [...knowledgeTypesForLearningUnit],
    };
  }));
});

export default router;
