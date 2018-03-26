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
        allowNull: false,
        notEmpty: true,
        references: {
          model: 'KnowledgeUnits',
          key: 'id',
        },
        onDelete: 'cascade',
      },

      LearningUnitId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        notEmpty: true,
        references: {
          model: 'KnowledgeUnits',
          key: 'id',
        },
        onDelete: 'cascade',
      },

      /*
      CourseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        notEmpty: true,
        references: {
          model: 'Courses',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      */

      mode: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
      },

      navigationTool: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
      },

    }, {
      sequelize,
      updatedAt: false,
    });
  }

  static associate(sequelize) {
    LogUser.belongsTo(sequelize.User);

    LogUser.hasOne(sequelize.LearningUnit);
    LogUser.hasOne(sequelize.KnowledgeUnit);
    // LogUser.hasOne(sequelize.Course);
  }
}

export default LogUser;
