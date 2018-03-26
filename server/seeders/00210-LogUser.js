module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('LogUser', [
    // Objects to be inserted
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('LogUser', {
    // Where clause
  }),
};
