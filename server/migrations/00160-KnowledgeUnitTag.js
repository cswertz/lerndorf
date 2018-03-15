export default {
  up: (queryInterface, DataTypes) => queryInterface.createTable('KnowledgeUnitTag', {
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

    tag: {
      type: DataTypes.STRING,
      allowNull: false,
      allowEmpty: false,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }),
  down: queryInterface => queryInterface.dropTable('KnowledgeUnitUser'),
};
