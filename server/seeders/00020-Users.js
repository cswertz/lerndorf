module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
    {
      username: 'admin',
      password: '$2a$08$J4aqYME43XRnZLCa0/FBU.TRTtb1ofVrBKsXyxdxBY6rL2FG915Xu',
      email: 'admin@example.com',
      active: true,
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      environment: 'production',
    },
    {
      username: 'username',
      password: '$2a$08$jKZV3y4GPOA/R97TTgBAyeE9U15ssrrYQJEYCQwSIPgQMRLaknNMu',
      email: 'username@example.com',
      active: true,
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      environment: 'production',
    },
    {
      username: 'userWithNoRole',
      password: '$2a$08$jKZV3y4GPOA/R97TTgBAyeE9U15ssrrYQJEYCQwSIPgQMRLaknNMu',
      email: 'no@example.com',
      active: true,
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      environment: 'test',
    },
    {
      username: 'trainer',
      password: '$2a$08$jKZV3y4GPOA/R97TTgBAyeE9U15ssrrYQJEYCQwSIPgQMRLaknNMu',
      email: 'trainer@example.com',
      active: true,
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      environment: 'test',
    },
  ].filter((userEntry) => {
    if (process.env.NODE_ENV === 'test') {
      return userEntry;
    }
    if (userEntry.environment !== 'test') {
      return userEntry;
    }
  }).map((user) => {
    delete user.environment;
    return user;
  }), {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', {
    username: 'admin',
  }),
};
