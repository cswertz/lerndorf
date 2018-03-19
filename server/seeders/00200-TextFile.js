module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('TextFile', [
    // Objects to be inserted
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('TextFile', {
    // Where clause
  }),
};
