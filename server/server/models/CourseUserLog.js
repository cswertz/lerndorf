import { Model, DataTypes } from 'sequelize';

class CourseUserLog extends Model {
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
        allowNull: false,
        references: {
          model: 'Course',
          key: 'id',
        },
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'CourseUser',
          key: 'id',
        },
      },

      KnowledgeUnitId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'KnowledgeUnit',
          key: 'id',
        },
      },

    }, {
      sequelize,
      freezeTableName: true,
    });
  }

  static associate(sequelize) {
    CourseUserLog.belongsTo(sequelize.Course, { as: 'course', foreignKey: 'courseId' });
    CourseUserLog.belongsTo(sequelize.CourseUser, { as: 'courseUser', foreignKey: 'userId' });
    CourseUserLog.belongsTo(sequelize.KnowledgeUnit, { as: 'knowledgeUnit', foreignKey: 'KnowledgeUnitId' });
  }
}

export default CourseUserLog;
