import { Model, DataTypes } from 'sequelize';

class Role extends Model {
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
    Role.belongsToMany(sequelize.User, { through: 'UserRole' });
    Role.belongsToMany(sequelize.Capability, { through: 'RoleCapability' });
    Role.belongsToMany(sequelize.LogUser, { through: 'LogUserRole' });
    Role.belongsToMany(sequelize.Language, { through: 'RoleLanguage' });
    Role.hasOne(sequelize.RoleLanguage, { foreignKey: 'RoleId' });
  }
}

export default Role;
