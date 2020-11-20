module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Texts', [
    {
      LanguageId: 1,
      KnowledgeUnitId: 1,
      content: 'Content comes here',
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    {
      LanguageId: 1,
      KnowledgeUnitId: 2,
      content: 'Content comes here',
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Texts', {
    // Where clause
  }),
};
