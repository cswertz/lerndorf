export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Files', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    path: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true,
      unique: true,
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true,
    },

    mime: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true,
    },

    size: {
      type: Sequelize.INTEGER,
      allowNull: false,
      notEmpty: true,
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
  down: queryInterface => queryInterface.dropTable('Files'),
};
