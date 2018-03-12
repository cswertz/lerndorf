export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    username: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true,
      unique: true,
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    lastLogin: {
      type: Sequelize.DATE,
    },

    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },

    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Users'),
};
