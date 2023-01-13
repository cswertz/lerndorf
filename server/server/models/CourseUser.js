import { Model, DataTypes } from 'sequelize';

class CourseUser extends Model {
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

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },

      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id',
        },
      },

      enrolment: {
        type: DataTypes.TIME,
        allowNull: false,
        notEmpty: true,
      },

      enrolmentConfirmation: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        notEmpty: true,
        default: false,
      },

      sequenceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'CourseSequence',
          key: 'id',
        },
      },

    }, {
      sequelize,
      freezeTableName: true,
    });
  }

  static associate(sequelize) {
    CourseUser.belongsTo(sequelize.Course, { as: 'course', foreignKey: 'courseId' });
    CourseUser.belongsTo(sequelize.User, { as: 'user', foreignKey: 'userId' });
    CourseUser.belongsTo(sequelize.Role, { as: 'role', foreignKey: 'roleId' });
  }
}

export default CourseUser;
