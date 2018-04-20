import { Model, DataTypes } from 'sequelize';

class RoleLanguage extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: 'idcreatedAt',
      },

      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        notEmpty: true,
        unique: 'roleIdlanguageId',
        references: {
          model: 'Roles',
          key: 'id',
        },
        onDelete: 'cascade',
      },

      languageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        notEmpty: true,
        unique: 'roleIdlanguageId',
        references: {
          model: 'Languages',
          key: 'id',
        },
        onDelete: 'cascade',
      },

      vocable: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
      },

      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: 'idcreatedAt',
      },

      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    }, { sequelize });
  }

  static associate(sequelize) {
    RoleLanguage.belongsTo(sequelize.Language);
    RoleLanguage.belongsTo(sequelize.Role);
  }
}

export default RoleLanguage;
