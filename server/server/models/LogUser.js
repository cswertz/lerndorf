import { Model, DataTypes } from 'sequelize';

class LogUser extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        notEmpty: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
      },

      KnowledgeUnitId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        notEmpty: false,
        references: {
          model: 'KnowledgeUnits',
          key: 'id',
        },
        onDelete: 'cascade',
      },

      LearningUnitId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        notEmpty: false,
        references: {
          model: 'LearningUnits',
          key: 'id',
        },
        onDelete: 'cascade',
      },

      CourseId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        notEmpty: false,
        references: {
          model: 'Courses',
          key: 'id',
        },
        onDelete: 'cascade',
      },

      mode: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        defaultValue: 'view',
      },

      navigationTool: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        defaultValue: 'navi',
      },

    }, {
      sequelize,
      updatedAt: false,
      freezeTableName: true,
    });
  }

  static associate(sequelize) {
    LogUser.belongsTo(sequelize.User);

    // LogUser.belongsTo(sequelize.Course, { foreignKey: 'CourseId' });
    LogUser.belongsTo(sequelize.LearningUnit, { foreignKey: 'LearningUnitId' });
    LogUser.belongsTo(sequelize.KnowledgeUnit, { foreignKey: 'KnowledgeUnitId' });

    LogUser.belongsToMany(sequelize.Role, { through: 'LogUserLearningUnit' });
    LogUser.belongsToMany(sequelize.Role, { through: 'LogUserRole' });
  }
}

export default LogUser;
