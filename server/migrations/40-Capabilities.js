export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Capabilities', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    slug: {
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

    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },

    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Capabilities'),
};
