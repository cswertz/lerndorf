module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('TextFile', [
    {
      TextId: 1,
      FileId: 1,
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('TextFile', {
    // Where clause
  }),
};
