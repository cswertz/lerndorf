export default {
  up: (queryInterface, DataTypes) => queryInterface.createTable('LearningUnits', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    rootId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'LearningUnits',
        key: 'id',
      },
      unique: 'learningUnitsRootIdCreatedAt',
    },

    prevId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'LearningUnits',
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

    UserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: 'learningUnitsRootIdCreatedAt',
    },
  }),
  down: queryInterface => queryInterface.dropTable('LearningUnits'),
};
