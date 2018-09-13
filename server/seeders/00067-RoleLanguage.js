const roleslanguages = [
  {
    slug: 'admin',
    code: 'en',
    vocable: 'admin'
  },
  {
    slug: 'admin',
    code: 'de',
    vocable: 'AdministratorIn'
  },
  {
    slug: 'guest',
    code: 'en',
    vocable: 'guest'
  },
  {
    slug: 'guest',
    code: 'de',
    vocable: 'Gast'
  },
  {
    slug: 'user',
    code: 'en',
    vocable: 'user',
  },
  {
    slug: 'user',
    code: 'de',
    vocable: 'BenutzerIn',
  },
  {
    slug: 'editor',
    code: 'en',
    vocable: 'author',
  },
  {
    slug: 'editor',
    code: 'de',
    vocable: 'AutorIn',
  },
  {
    slug: 'lector',
    code: 'en',
    vocable: 'Reviewer',
  },
  {
    slug: 'lector',
    code: 'de',
    vocable: 'GutachterIn',
  },
];


module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.rawSelect('Roles', {
    where: {
      slug: 'admin',
    },
  }, ['id'])
    .then((result) => {
      const role = result;
      return queryInterface.rawSelect('Languages', {
        where: {
          code: 'en',
        },
      }, ['id'])
        .then(language => queryInterface.bulkInsert('RoleLanguage', [
          {
            RoleId: role,
            LanguageId: language,
            vocable: 'Admin',
            createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
            updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
        ], {}));
    }),

  down: queryInterface => queryInterface.rawSelect('Roles', {
    where: {
      slug: 'admin',
    },
  }, ['id'])
    .then(role => queryInterface.bulkDelete('RoleLanguage', {
      RoleId: role,
    })),
};
