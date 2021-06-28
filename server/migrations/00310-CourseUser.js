export default {
  up: (queryInterface, DataTypes) => queryInterface.createTable('CourseUser', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
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
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      references: {
        model: 'Roles',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    enrolment: {
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
      uniqueKeys: {
        CourseUser_unique: {
          fields: ['courseId', 'userId', 'roleId']
        }
    }
  }),
  down: queryInterface => queryInterface.dropTable('CourseUser'),
};
