import { Model, DataTypes } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        notEmpty: true,
        unique: true,
      },

      username: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        unique: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      firstName: {
        type: DataTypes.STRING,
      },

      lastName: {
        type: DataTypes.STRING,
      },

      titlePrefix: {
        type: DataTypes.STRING,
      },

      titleSuffix: {
        type: DataTypes.STRING,
      },

      birthdate: {
        type: DataTypes.DATE,
      },

      studyId: {
        type: DataTypes.STRING,
      },

      phone: {
        type: DataTypes.STRING,
      },

      street: {
        type: DataTypes.STRING,
      },

      zip: {
        type: DataTypes.STRING,
      },

      city: {
        type: DataTypes.STRING,
      },

      country: {
        type: DataTypes.STRING,
      },

      website: {
        type: DataTypes.STRING,
      },

      picture: {
        type: DataTypes.STRING,
      },

      privacyLevel: {
        type: DataTypes.INTEGER,
      },

      description: {
        type: DataTypes.TEXT,
      },

      lastLogin: {
        type: DataTypes.DATE,
      },
    }, { sequelize });
  }

  static associate(sequelize) {
    User.hasMany(sequelize.LearningUnit, { as: 'LearningUnits' });
    User.hasMany(sequelize.LearningUnitLanguage, { as: 'LearningUnitLanguages' });
    User.hasMany(sequelize.LearningUnitRelation, { as: 'LearningUnitRelations' });

    User.belongsToMany(sequelize.Role, { through: 'UserRole' });
    User.belongsToMany(sequelize.Language, { through: 'UserLanguage' });
  }
}

export default User;
