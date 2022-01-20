module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('KnowledgeUnits', [
    {
      //LearningUnitId 1 is hard codes in the client as homepage
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
  ], {}),
  down: (queryInterface) => queryInterface.bulkDelete('KnowledgeUnits', {
    // Where clause
  }),
};
