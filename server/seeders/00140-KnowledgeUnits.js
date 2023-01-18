module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('KnowledgeUnits', [
    {
      Id: 1,
      LearningUnitId: 1,
      UserId: 1,
      mediaType: 3,
      visiblePublic: true,
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    {
      Id: 2,
      LearningUnitId: 2,
      UserId: 1,
      visiblePublic: false,
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    {
      Id: 3,
      LearningUnitId: 1,
      UserId: 1,
      mediaType: 3,
      visiblePublic: true,
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  ], {}),
  down: (queryInterface) => queryInterface.bulkDelete('KnowledgeUnits', {
    // Where clause
  }),
};
