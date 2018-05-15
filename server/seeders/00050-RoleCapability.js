module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.rawSelect('Roles', {
    where: {
      slug: 'admin',
    },
  }, ['id'])
    .then((result) => {
      const role = result;
      return queryInterface.rawSelect('Capabilities', {
        where: {
          slug: 'edit_user',
        },
      }, ['id'])
        .then(capability => queryInterface.bulkInsert('RoleCapability', [
          {
            RoleId: role,
            CapabilityId: capability,
            createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
            updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
        ], {}));
    }),

  down: queryInterface => queryInterface.rawSelect('Roles', {
    where: {
      slug: 'admin',
    },
  }, ['id'])
    .then(role => queryInterface.bulkDelete('RoleCapability', {
      roleId: role,
    })),
};
