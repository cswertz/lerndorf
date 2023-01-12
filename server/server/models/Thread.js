import { Model, DataTypes } from 'sequelize';

class Thread extends Model {
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

      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
        allowEmpty: false,
      },

      lastPostFrom: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },

      lastPostAt: {
        type: DataTypes.DATE,
        allowNull: false,
        allowEmpty: false,
      },

    }, {
      sequelize,
      tableName: 'threads',
      freezeTableName: true,
      updatedAt: true,
      createdAt: true,
    });
  }

  static associate(sequelize) {
    Thread.belongsTo(sequelize.Course, { as: 'course', foreignKey: 'courseId' });
    Thread.belongsTo(sequelize.User, { as: 'user', foreignKey: 'userId' });
    Thread.belongsTo(sequelize.User, { as: 'lastPostUser', foreignKey: 'lastPostFrom' });
    Thread.hasMany(sequelize.ThreadPost, { as: 'posts', foreignKey: 'threadId' });
  }
}

export default Thread;
