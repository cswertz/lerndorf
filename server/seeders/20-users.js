module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
    {
      username: 'admin',
      password: '$2a$08$J4aqYME43XRnZLCa0/FBU.TRTtb1ofVrBKsXyxdxBY6rL2FG915Xu',
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', {
    username: 'admin',
  }),
};
