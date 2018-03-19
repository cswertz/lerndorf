module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.rawSelect('Users', {
    where: {
      username: 'admin',
    },
  }, ['id'])
    .then((user) => {
      queryInterface.bulkInsert('KnowledgeUnitUserLog', [
        {
          KnowledgeUnitId: 1,
          UserId: user,
          createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      ], {});
    }),

  down: queryInterface => queryInterface.bulkDelete('KnowledgeUnitUserLog', {
    // Where clause
  }),
};
