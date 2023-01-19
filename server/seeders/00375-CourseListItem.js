module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('CourseListItem', [
    {
      id: 1,
      courseListId: 1,
      courseId: 1,
      orderId: 0,
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('CourseListItem', {}),
};
