export default {
  up: (queryInterface, DataTypes) => queryInterface.createTable('Taxonomies', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      notEmpty: true,
      unique: true,
    },

    rootId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Taxonomies',
        key: 'id',
      },
      unique: 'taxonomyRootIdCreatedAt',
    },

    prevId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Taxonomies',
        key: 'id',
      },
    },

    nextId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Taxonomies',
        key: 'id',
      },
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
      unique: 'taxonomyRootIdCreatedAt',
    },
  }),
  down: queryInterface => queryInterface.dropTable('Taxonomies'),
};
