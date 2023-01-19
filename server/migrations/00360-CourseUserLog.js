export default {
  up: (queryInterface, DataTypes) => queryInterface.createTable('CourseUserLog', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    courseId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      notEmpty: true,
      unique: 'courseIduserIdKnowledgeUnitId',
      references: {
        model: 'Courses',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    courseSequenceId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      notEmpty: true,
      references: {
        model: 'CourseSequence',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      unique: 'courseIduserIdKnowledgeUnitId',
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    KnowledgeUnitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      unique: 'courseIduserIdKnowledgeUnitId',
      references: {
        model: 'KnowledgeUnits',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    uniqueKeys: {
      CourseUserLog: {
        fields: ['courseId', 'userId', 'KnowledgeUnitId']
      },
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('UserRole'),
};
