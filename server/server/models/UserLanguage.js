import { Model, DataTypes } from 'sequelize';

class UserLanguage extends Model {
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
        unique: 'compositeIndex',
      },

      LanguageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        notEmpty: true,
        references: {
          model: 'Languages',
          key: 'id',
        },
        unique: 'compositeIndex',
      },

      level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        notEmpty: true,
        defaultValue: 0,
      },
    }, {
      sequelize,
      freezeTableName: true,
    });
  }

  static associate(sequelize) {
    UserLanguage.belongsTo(sequelize.User);
    UserLanguage.belongsTo(sequelize.Language);
  }
}

export default UserLanguage;
