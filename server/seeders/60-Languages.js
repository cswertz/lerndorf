module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Languages', [
    {
      code: 'en',
      name: 'English',
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    {
      code: 'de',
      name: 'German',
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Languages', {
    // Where clause
  }),
};
