module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('CourseContent', [
    {
      id: 1,
      courseId: 1,
      knowledgeUnitId: 1,
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    {
      id: 2,
      courseId: 1,
      knowledgeUnitId: 2,
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('CourseContent', {}),
};
