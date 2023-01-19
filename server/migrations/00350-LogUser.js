export default {
  up: (queryInterface, DataTypes) => queryInterface.createTable('LogUser', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
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

    KnowledgeUnitId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'KnowledgeUnits',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    LearningUnitId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'LearningUnits',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    CourseId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Courses',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    CourseSequenceId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'CourseSequence',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    mode: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      defaultValue: 'view',
    },

    navigationTool: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      defaultValue: 'navi',
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }),
  down: queryInterface => queryInterface.dropTable('LogUser'),
};
