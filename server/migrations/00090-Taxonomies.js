export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Taxonomies', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      notEmpty: true,
      unique: true,
    },

    rootId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Taxonomies',
        key: 'id',
      },
      unique: 'taxonomyRootIdCreatedAt',
    },

    prevId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Taxonomies',
        key: 'id',
      },
      unique: 'taxonomyRootIdCreatedAt',
    },

    nextId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Taxonomies',
        key: 'id',
      },
      unique: 'taxonomyRootIdCreatedAt',
    },

    parent: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Taxonomies',
        key: 'id',
      },
    },

    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },

    type: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true,
    },

    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      notEmpty: true,
      unique: 'taxonomyRootIdCreatedAt',
    },
  }),
  down: queryInterface => queryInterface.dropTable('Taxonomies'),
};
