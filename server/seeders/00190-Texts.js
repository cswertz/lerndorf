module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Texts', [
    // Objects to be inserted
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Texts', {
    // Where clause
  }),
};
