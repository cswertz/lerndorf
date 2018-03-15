module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.rawSelect('Users', {
    where: {
      username: 'admin',
    },
  }, ['id'])
    .then((user) => {
      queryInterface.bulkInsert('KnowledgeUnitTag', [
        {
          KnowledgeUnitId: 1,
          UserId: user,
          tag: 'some Tag',
          createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      ], {});
    }),

  down: queryInterface => queryInterface.bulkDelete('KnowledgeUnitTag', {
    // Where clause
  }),
};
