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
