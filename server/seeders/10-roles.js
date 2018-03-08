module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Roles', [
    {
      slug: 'admin',
      name: 'Admin',
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Roles', {
    slug: 'admin',
  }),
};
