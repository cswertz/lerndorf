import { Model, DataTypes } from 'sequelize';

class ThreadPost extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      threadId: {
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

      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        allowEmpty: false,
      },

    }, {
      sequelize,
      tableName: 'ThreadPosts',
      freezeTableName: true,
      updatedAt: true,
      createdAt: true,
    });
  }

  static associate(sequelize) {
    ThreadPost.belongsTo(sequelize.Thread, { as: 'threads', foreignKey: 'threadId' });
    ThreadPost.belongsTo(sequelize.User, { as: 'user', foreignKey: 'userId' });
  }
}

export default ThreadPost;
