export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('LearningUnits', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    rootId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'LearningUnits',
        key: 'id',
      },
      unique: 'learningUnitsRootIdCreatedAt',
    },

    prevId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'LearningUnits',
        key: 'id',
      },
    },

    nextId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Taxonomies',
        key: 'id',
      },
    },

    UserId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      unique: 'learningUnitsRootIdCreatedAt',
    },
  }),
  down: queryInterface => queryInterface.dropTable('LearningUnits'),
};
