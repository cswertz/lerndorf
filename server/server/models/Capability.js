import { Model, DataTypes } from 'sequelize';

class Capability extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        unique: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
      },
    }, { sequelize });
  }

  static associate(sequelize) {
    Capability.belongsToMany(sequelize.Role, { through: 'RoleCapability' });
    Capability.belongsToMany(sequelize.Languages, { through: 'CapabilityLanguage' });
  }
}

export default Capability;
