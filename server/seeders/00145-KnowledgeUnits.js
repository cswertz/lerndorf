module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkUpdate(
      'KnowledgeUnits',
      { rootId: 1, nextId: 3 },
      Sequelize.literal('id=1'),
    );
    await queryInterface.bulkUpdate(
      'KnowledgeUnits',
      { rootId: 1 },
      Sequelize.literal('id=3'),
    );
  },
  down: (queryInterface) => queryInterface.bulkDelete('KnowledgeUnits', {
    // Where clause
  }),
};
