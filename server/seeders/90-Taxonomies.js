module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Taxonomies', [
    {
      id: 1,
      rootId: 1,
      type: 'taxonomy',
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Taxonomies', {
    // Where clause
  }),
};
