module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.rawSelect('Users', {
    where: {
      username: 'admin',
    },
  }, ['id'])
    .then((user) => {
      queryInterface.bulkInsert('LearningUnitTag', [
        {
          KnowledgeUnitId: 1,
          UserId: user,
          tag: 'some Tag',
          createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      ], {});
    }),

  down: queryInterface => queryInterface.bulkDelete('LearningUnitTag', {
    // Where clause
  }),
};
