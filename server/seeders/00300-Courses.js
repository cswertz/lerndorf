module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Courses', [
    {
      title: 'DefaultDemoCourse',
      shortTitle: 'Demo',
      description: 'This is a demo course for testing puroposes',
      enrolmentStart: '1970-01-01',
      enrolmentEnd: '2900-01-01',
      enrolmentConfirmation: false,
      enrolmentByTutor: false,
      access: true,
      copyAllowed: true,
      courseStart: '1970-01-01',
      courseEnd: '2900-01-01',
      mainLanguage: 1,
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      visible: true,
    },
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Courses', {
    shortTitle: 'Demo',
  }),
};
