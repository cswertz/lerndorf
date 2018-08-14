export default {
  up: (queryInterface, DataTypes) => queryInterface.createTable('Taxonomies', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      notEmpty: true,
      unique: true,
    },

    parent: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Taxonomies',
        key: 'id',
      },
    },

    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    type: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      notEmpty: true,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Taxonomies'),
};
