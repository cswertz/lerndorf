export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('UserLanguage', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
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

    LanguageId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      notEmpty: true,
      references: {
        model: 'Languages',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    level: {
      type: Sequelize.INTEGER,
      allowNull: false,
      notEmpty: true,
      defaultValue: 0,
    },

    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },

    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),
  down: queryInterface => queryInterface.dropTable('UserLanguage'),
};
