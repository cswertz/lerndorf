export default {
  up: (queryInterface, DataTypes) => queryInterface.createTable('LearningUnitRelation', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    sourceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      unique: 'sourceIdtargetIdtype',
      references: {
        model: 'LearningUnits',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    targetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      unique: 'sourceIdtargetIdtype',
      references: {
        model: 'LearningUnits',
        key: 'id',
      },
      onDelete: 'cascade',
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

    type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: 'sourceIdtargetIdtype',
      references: {
        model: 'Taxonomies',
        key: 'id',
      },
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
      uniqueKeys: {
        LearningUnitRelation_unique: {
          fields: ['sourceId', 'targetId', 'type']
        }
    }

  }),
  down: queryInterface => queryInterface.dropTable('TaxonomyLanguage'),
};
