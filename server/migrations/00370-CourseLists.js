export default {
  up: (queryInterface, DataTypes) => queryInterface.createTable('CourseLists', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    title: {
      type: DataTypes.TEXT,
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
  down: (queryInterface) => queryInterface.dropTable('CourseLists'),
};
