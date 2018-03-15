export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('KnowledgeUnitUser', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    KnowledgeUnitId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      notEmpty: true,
      references: {
        model: 'KnowledgeUnits',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    UserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      notEmpty: true,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),
  down: queryInterface => queryInterface.dropTable('KnowledgeUnitUser'),
};
