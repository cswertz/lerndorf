import { Model, DataTypes } from 'sequelize';

class CourseListItem extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      courseListId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'CourseList',
          key: 'id',
        },
      },

      courseId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Course',
          key: 'id',
        },
      },

      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

    }, {
      sequelize,
      freezeTableName: true,
    });
  }

  static associate(sequelize) {
    CourseListItem.belongsTo(sequelize.CourseList, { as: 'list', foreignKey: 'courseListId' });
    CourseListItem.hasMany(sequelize.Course, { as: 'course', foreignKey: 'id' });
  }
}

export default CourseListItem;
