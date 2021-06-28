export default {
  up: (queryInterface, DataTypes) => queryInterface.createTable('KnowledgeUnitUser', {
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
      unique: 'KnowledgeUnitIduserId',
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
      unique: 'KnowledgeUnitIduserId',
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
  }, {
      uniqueKeys: {
        KnowledgeUnitUser_unique: {
          fields: ['KnowledgeUnitId', 'UserId']
        }
    }
  }),
  down: queryInterface => queryInterface.dropTable('KnowledgeUnitUser'),
};
