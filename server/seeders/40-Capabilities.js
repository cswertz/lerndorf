module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Capabilities', [
    {
      slug: 'edit_users',
      name: 'Edit Users',
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    {
      slug: 'delete_users',
      name: 'Delete Users',
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    {
      slug: 'add_roles',
      name: 'Add Roles',
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    {
      slug: 'edit_roles',
      name: 'Edit Roles',
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    {
      slug: 'delete_roles',
      name: 'Delete Roles',
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Capabilities', {
    // Where clause
  }),
};
