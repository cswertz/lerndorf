module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.rawSelect('Users', {
    where: {
      username: 'admin',
    },
  }, ['id'])
    .then((user) => {
      queryInterface.bulkInsert('KnowledgeUnitUserRating', [
        {
          KnowledgeUnitId: 1,
          UserId: user,
          rating: 5,
          createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      ], {});
    }),

  down: queryInterface => queryInterface.bulkDelete('KnowledgeUnitUserRating', {
    // Where clause
  }),
};
