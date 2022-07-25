import { Model, DataTypes } from 'sequelize';

class CourseContent extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      courseId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Course',
          key: 'id',
        },
      },

      knowledgeUnitId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Course',
          key: 'id',
        },
      },

    }, {
      sequelize,
      freezeTableName: true,
    });
  }

  static associate(sequelize) {

    CourseContent.belongsTo(sequelize.Course, { as: 'course', foreignKey: 'courseId' });
   
  }
}

export default CourseContent;
