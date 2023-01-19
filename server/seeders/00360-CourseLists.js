module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('CourseLists', [
    {
      id: 1,
      title: 'Testlist',
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('CourseLists', {}),
};
