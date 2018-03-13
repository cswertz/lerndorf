module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Files', [
    {
      path: 'uploads/image_1.png',
      name: 'Some Image',
      mime: 'image/png',
      size: '1234',
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Files', {
    // Where clause
  }),
};
