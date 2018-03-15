module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.rawSelect('Users', {
    where: {
      username: 'admin',
    },
  }, ['id'])
    .then((user) => {
      queryInterface.bulkInsert('KnowledgeUnitUser', [
        {
          KnowledgeUnitId: 1,
          UserId: user,
          createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      ], {});
    }),

  down: queryInterface => queryInterface.bulkDelete('KnowledgeUnitUser', {
    // Where clause
  }),
};
