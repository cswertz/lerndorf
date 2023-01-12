import { Model, DataTypes } from 'sequelize';

class CourseSequence extends Model {
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

      microModel: {
        type: DataTypes.TEXT,
        allowNull: false,
        notEmpty: false,
      },

    }, {
      sequelize,
      freezeTableName: true,
    });
  }

  static associate(sequelize) {
    CourseSequence.belongsTo(sequelize.Course, { as: 'course', foreignKey: 'courseId' });
    CourseSequence.hasMany(sequelize.CourseSequenceKnowledgeUnit, { as: 'units', foreignKey: 'courseSequenceId' });
  }
}

export default CourseSequence;
