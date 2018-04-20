import { Model, DataTypes } from 'sequelize';

class Language extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      code: {
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
    Language.belongsToMany(sequelize.User, { through: 'UserLanguage' });
    Language.belongsToMany(sequelize.Taxonomy, { through: 'TaxonomyLanguage' });
    Language.belongsToMany(sequelize.LearningUnit, { through: 'LearningUnitLanguage' });
    Language.belongsToMany(sequelize.Role, { through: 'RoleLanguage' });
    Language.belongsToMany(sequelize.Capability, { through: 'CapabilityLanguage' });
  }
}

export default Language;
