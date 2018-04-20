module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.rawSelect('Capabilities', {
    where: {
      id: 1,
    },
  }, ['id'])
    .then((result) => {
      const taxonomy = result;
      return queryInterface.rawSelect('Languages', {
        where: {
          code: 'en',
        },
      }, ['id'])
        .then(language => queryInterface.bulkInsert('CapabilityLanguage', [
          {
            TaxonomyId: taxonomy,
            LanguageId: language,
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
