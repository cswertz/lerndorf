module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Threads', [
      {
        summary: 'Demo',
        userId: 1,
        courseId: null,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        summary: 'Demo in Course',
        userId: 1,
        courseId: 1,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ], {});

    queryInterface.bulkInsert('ThreadPosts', [
      {
        text: 'I am a demo thread entry that is public available.',
        threadId: 1,
        userId: 1,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        text: 'I am a demo thread entry that is NOT public available.',
        threadId: 2,
        userId: 1,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ], {});
  },

  down: (queryInterface) => {
    queryInterface.bulkDelete('Threads', {});
    queryInterface.bulkDelete('ThreadPostss', {});
  },
};
