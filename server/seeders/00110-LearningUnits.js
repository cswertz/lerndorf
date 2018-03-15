module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.rawSelect('Taxonomies', {
    where: {
      id: 1,
    },
  }, ['id'])
    .then(user => queryInterface.bulkInsert('LearningUnits', [
      {
        id: 1,
        rootId: 1,
        UserId: user,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ], {})),

  down: queryInterface => queryInterface.bulkDelete('LearningUnits', {
    // Where clause
  }),
};
