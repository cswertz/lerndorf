import { Model, DataTypes } from 'sequelize';

class CapabilityLanguage extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: 'idcreatedAt',
      },

      capabilityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        notEmpty: true,
        unique: 'capabilityIdlanguageId',
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
      },

      languageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        notEmpty: true,
        unique: 'capabilityIdlanguageId',
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
    CapabilityLanguage.belongsTo(sequelize.Language);
    CapabilityLanguage.belongsTo(sequelize.Capability);
  }
}

export default CapabilityLanguage;
