module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.rawSelect('Capabilities', {
    where: {
      slug: 'edit_user',
    },
  }, ['id'])
    .then((result) => {
      const capability = result;
      return queryInterface.rawSelect('Languages', {
        where: {
          code: 'en',
        },
      }, ['id'])
        .then(language => queryInterface.bulkInsert('CapabilityLanguage', [
          {
            CapabilityId: capability,
            LanguageId: language,
            vocable: 'Edit User',
            createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
            updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
        ], {}));
    }),

  down: queryInterface => queryInterface.rawSelect('Capabilities', {
    where: {
      id: 1,
    },
  }, ['id'])
    .then(taxonomy => queryInterface.bulkDelete('CapabilityLanguage', {
      TaxonomyId: taxonomy,
    })),
};
