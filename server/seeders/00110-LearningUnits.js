module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('LearningUnits', [
    // Objects to be inserted
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('LearningUnits', {
    // Where clause
  }),
};
