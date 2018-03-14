export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('TaxonomyLanguage', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    TaxonomyId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      notEmpty: true,
      references: {
        model: 'Taxonomies',
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

    vocable: {
      type: Sequelize.STRING,
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
  down: queryInterface => queryInterface.dropTable('TaxonomyLanguage'),
};
