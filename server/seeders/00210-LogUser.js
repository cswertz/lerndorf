module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('LogUser', [
    {
      UserId: 1,
      mode: 'mode',
      navigationTool: 'navi',
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('LogUser', {
    // Where clause
  }),
};
