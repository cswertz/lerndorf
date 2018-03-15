module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.rawSelect('Users', {
    where: {
      username: 'admin',
    },
  }, ['id'])
    .then((result) => {
      const user = result;

      return queryInterface.rawSelect('Languages', {
        where: {
          code: 'en',
        },
      }, ['id'])
        .then(language => queryInterface.bulkInsert('LearningUnitLanguage', [
          {
            LearningUnitId: 1,
            LanguageId: language,
            UserId: user,
            title: 'Title in EN',
            createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
            updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
        ], {}));
    }),

  down: queryInterface => queryInterface.bulkDelete('LearningUnitLanguage', {
    // Where clause
  }),
};