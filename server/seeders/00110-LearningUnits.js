module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.rawSelect('Users', {
    where: {
      username: 'admin',
    },
  }, ['id'])
    .then(user => queryInterface.bulkInsert('LearningUnits', [
      {
        id: 1,
        rootId: 1,
        UserId: user,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        id: 2,
        rootId: 2,
        UserId: user,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ], {})),

  down: queryInterface => queryInterface.bulkDelete('LearningUnits', {
    // Where clause
  }),
};
