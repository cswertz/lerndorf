export default {
  up: (queryInterface, DataTypes) => queryInterface.createTable('TaxonomyLanguage', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    TaxonomyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      unique: 'taxonomyIdlanguageId',
      references: {
        model: 'Taxonomies',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    LanguageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      unique: 'taxonomyIdlanguageId',
      references: {
        model: 'Languages',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    vocable: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      defaultValue: 0,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }),
  down: queryInterface => queryInterface.dropTable('TaxonomyLanguage'),
};
