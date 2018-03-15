module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.rawSelect('Users', {
    where: {
      username: 'admin',
    },
  }, ['id'])
    .then(user => queryInterface.bulkInsert('LearningUnitRelation', [
      {
        sourceId: 1,
        targetId: 2,
        UserId: user,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ], {})),

  down: queryInterface => queryInterface.bulkDelete('LearningUnitRelation', {
    // Where clause
  }),
};
