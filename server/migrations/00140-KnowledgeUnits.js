export default {
  up: (queryInterface, DataTypes) => queryInterface.createTable('KnowledgeUnits', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    LearningUnitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      references: {
        model: 'LearningUnits',
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

    mediaType: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Taxonomies',
        key: 'id',
      },
    },

    knowledgeType: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Taxonomies',
        key: 'id',
      },
    },

    objectType: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Taxonomies',
        key: 'id',
      },
    },

    eqfLevel: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Taxonomies',
        key: 'id',
      },
    },

    courseLevel: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Taxonomies',
        key: 'id',
      },
    },

    license: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Taxonomies',
        key: 'id',
      },
    },

    minimumScreenResolution: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Taxonomies',
        key: 'id',
      },
    },

    suitableBlind: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      notEmpty: true,
    },

    suitableDeaf: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      notEmpty: true,
    },

    suitableDumb: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      notEmpty: true,
    },

    publish: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
      notEmpty: true,
    },

    review: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      notEmpty: true,
    },

    lectorate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      notEmpty: true,
    },

    visiblePublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      notEmpty: true,
    },

    visibleLexicon: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      notEmpty: true,
    },

    visibleCourses: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      notEmpty: true,
    },

    time: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    objective: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    recommendedAge: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }),
  down: queryInterface => queryInterface.dropTable('KnowledgeUnits'),
};
