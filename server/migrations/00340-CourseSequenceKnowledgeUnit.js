export default {
  up: (queryInterface, DataTypes) => queryInterface.createTable('CourseSequenceKnowledgeUnit', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    courseSequenceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      references: {
        model: 'Courses',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    knowledgeUnitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      references: {
        model: 'KnowledgeUnits',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    rootId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      references: {
        model: 'CourseSequenceKnowledgeUnit',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    prevId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      references: {
        model: 'CourseSequenceKnowledgeUnit',
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
  }),
  down: queryInterface => queryInterface.dropTable('UserRole'),
};
