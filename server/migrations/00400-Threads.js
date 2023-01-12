export default {
  up: (queryInterface, DataTypes) => queryInterface.createTable('Threads', {
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
      unique: 'threadCourseId',
      references: {
        model: 'Courses',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      unique: 'threadUserId',
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastPostFrom: {
      type: DataTypes.INTEGER,
      allowNull: true,
      notEmpty: true,
      unique: 'threadUserId',
      references: {
        model: 'Users',
        key: 'id',
      },
    },

    lastPostAt: {
      type: DataTypes.DATE,
      allowNull: false,
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

  }),
  down: (queryInterface) => queryInterface.dropTable('Threads'),
};
