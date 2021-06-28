export default {
  up: (queryInterface, DataTypes) => queryInterface.createTable('KnowledgeUnitUserLog', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    KnowledgeUnitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      references: {
        model: 'KnowledgeUnits',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
      uniqueKeys: {
        KnowledgeUnitUserLog_unique: {
          fields: ['KnowledgeUnitId', 'UserId']
        }
    }
  }),
  down: queryInterface => queryInterface.dropTable('KnowledgeUnitUserLog'),
};
