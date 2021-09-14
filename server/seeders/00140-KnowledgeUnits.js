module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('KnowledgeUnits', [
    {
      LearningUnitId: 1,
      UserId: 1,
      mediaType: 3,
      visiblePublic: true,
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    {
      LearningUnitId: 2,
      UserId: 1,
      visiblePublic: true,
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    {
      LearningUnitId: 1,
      UserId: 1,
      mediaType: 3,
      visiblePublic: true,
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    {
      LearningUnitId: 1,
      UserId: 1,
      mediaType: 3,
      visiblePublic: true,
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    {
      LearningUnitId: 1,
      UserId: 1,
      mediaType: 4,
      visiblePublic: true,
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  ], {}),
  down: (queryInterface) => queryInterface.bulkDelete('KnowledgeUnits', {
    // Where clause
  }),
};
