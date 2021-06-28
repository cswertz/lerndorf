export default {
  up: (queryInterface, DataTypes) => queryInterface.createTable('LearningUnitTag', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    LearningUnitLanguageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      references: {
        model: 'LearningUnitLanguage',
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
  }, {
      uniqueKeys: {
        LearningUnitTag_unique: {
          fields: ['LearningUnitLanguageId', 'tag']
        }
    }

  }),
  down: queryInterface => queryInterface.dropTable('LearningUnitTag'),
};
