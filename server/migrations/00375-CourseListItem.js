export default {
  up: (queryInterface, DataTypes) => queryInterface.createTable('CourseListItem', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    courseListId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      references: {
        model: 'CourseLists',
        key: 'id',
      },
      onDelete: 'cascade',
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

    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      defaultValue: 9999,
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
  down: (queryInterface) => queryInterface.dropTable('CourseListItem'),
};
