export default {
  up: (queryInterface, DataTypes) => queryInterface.createTable('Files', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    path: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      unique: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
    },

    mime: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
    },

    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Files'),
};
