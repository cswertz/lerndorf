module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('KnowledgeUnits', [
    {
      LearningUnitId: 1,
      UserId: 1,
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('KnowledgeUnits', {
    // Where clause
  }),
};
