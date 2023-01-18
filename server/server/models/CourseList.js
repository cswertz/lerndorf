import { Model, DataTypes } from 'sequelize';

class CourseList extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        unique: true,
      },

    }, { sequelize });
  }

  static associate(sequelize) {
    CourseList.hasMany(sequelize.CourseListItem, { as: 'items', foreignKey: 'courseListId' });
  }
}

export default CourseList;
