module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.rawSelect('Users', {
      where: {
        username: 'admin',
      },
    }, ['id'])
      .then((result) => {
        const user = result;
        return queryInterface.rawSelect('Roles', {
          where: {
            slug: 'admin',
          },
        }, ['id'])
          .then((role) => queryInterface.bulkInsert('UserRole', [
            {
              UserId: user,
              RoleId: role,
              createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
              updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
          ], {}));
      });
    queryInterface.rawSelect('Users', {
      where: {
        username: 'username',
      },
    }, ['id'])
      .then((result) => {
        const user = result;

        if (user === null) {
          return;
        }

        return queryInterface.rawSelect('Roles', {
          where: {
            slug: 'user',
          },
        }, ['id'])
          .then((role) => queryInterface.bulkInsert('UserRole', [
            {
              UserId: user,
              RoleId: role,
              createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
              updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
          ], {}));
      });
  },
  down: (queryInterface) => {
    queryInterface.rawSelect('Users', {
      where: {
        username: 'admin',
      },
    }, ['id'])
      .then((user) => queryInterface.bulkDelete('UserRole', {
        userId: user,
      }));
  },
};