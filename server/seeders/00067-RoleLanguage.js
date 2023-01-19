import models from '../server/config/sequelize';

const roleLanguages = [
  {
    slug: 'admin',
    language: 'en',
    vocable: 'admin',
  },
  {
    slug: 'admin',
    language: 'de',
    vocable: 'AdministratorIn',
  },
  {
    slug: 'guest',
    language: 'en',
    vocable: 'guest',
  },
  {
    slug: 'guest',
    language: 'de',
    vocable: 'Gast',
  },
  {
    slug: 'user',
    language: 'en',
    vocable: 'user',
  },
  {
    slug: 'user',
    language: 'de',
    vocable: 'BenutzerIn',
  },
  {
    slug: 'editor',
    language: 'en',
    vocable: 'author',
  },
  {
    slug: 'editor',
    language: 'de',
    vocable: 'AutorIn',
  },
  {
    slug: 'lector',
    language: 'en',
    vocable: 'Reviewer',
  },
  {
    slug: 'lector',
    language: 'de',
    vocable: 'GutachterIn',
  },
  {
    slug: 'researcher',
    language: 'en',
    vocable: 'Researcher',
  },
  {
    slug: 'researcher',
    language: 'de',
    vocable: 'ForscherIn',
  },
  {
    slug: 'tutor',
    language: 'en',
    vocable: 'Tutor',
  },
  {
    slug: 'tutor',
    language: 'de',
    vocable: 'Tutor',
  },
  {
    slug: 'trainer',
    language: 'en',
    vocable: 'Trainer',
  },
  {
    slug: 'trainer',
    language: 'de',
    vocable: 'TrainerIn',
  },
  {
    slug: 'learner',
    language: 'en',
    vocable: 'Learner',
  },
  {
    slug: 'learner',
    language: 'de',
    vocable: 'Lerner/Lernende',
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const translations = [];

    for (let i = 0; i < roleLanguages.length; i += 1) {
      const { slug, language, vocable } = roleLanguages[i];
      const resultLanguage = await models.Language.findOne({
        where: {
          code: language,
        },
        attributes: ['id'],
      });
      const languageId = resultLanguage !== null ? resultLanguage.id : null;

      const resultRole = await models.Role.findOne({
        where: {
          slug,
        },
        attributes: ['id'],
      });
      const roleId = resultRole != null ? resultRole.id : null;

      if (roleId === null || languageId === null) {
        console.error('Invalid role or language id', roleLanguages[i]);
        return;
      }

      translations.push({
        RoleId: roleId,
        LanguageId: languageId,
        vocable,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      });
    }

    queryInterface.bulkInsert('RoleLanguage', translations);
  },

  down: (queryInterface) => queryInterface.rawSelect('Roles', {
    where: {
      slug: 'admin',
    },
  }, ['id'])
    .then((role) => queryInterface.bulkDelete('RoleLanguage', {
      RoleId: role,
    })),
};
