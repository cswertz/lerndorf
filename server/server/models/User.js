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

      privacyLevelLog: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
        references: {
          model: 'Taxonomies',
          key: 'id',
        },
      },

      privacyLevelProfile: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Taxonomies',
          key: 'id',
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

      state: {
        type: DataTypes.STRING,
      },

      website: {
        type: DataTypes.STRING,
      },

      picture: {
        type: DataTypes.STRING,
      },

      description: {
        type: DataTypes.TEXT,
      },

      lastLogin: {
        type: DataTypes.DATE,
      },

      acceptPrivacy: {
        type: DataTypes.BOOLEAN,
      },

      acceptTos: {
        type: DataTypes.BOOLEAN,
      },

      allowBasicLog: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },

      // Enabled by default
      allowLogResearch: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },

      allowLogSharing: {
        type: DataTypes.BOOLEAN,
      },

      allowLogReports: {
        type: DataTypes.BOOLEAN,
      },

      showProfilePublic: {
        type: DataTypes.BOOLEAN,
      },

      showProfileStudents: {
        type: DataTypes.BOOLEAN,
      },

      showProfileTeachers: {
        type: DataTypes.BOOLEAN,
      },

      activationCode: {
        type: DataTypes.STRING,
      },

      active: {
        type: DataTypes.BOOLEAN,
      },
    }, { sequelize });
  }

  static associate(sequelize) {
    User.hasMany(sequelize.KnowledgeUnitUserRating, { as: 'KnowledgeUnitUserRatings' });
    User.hasMany(sequelize.LearningUnitLanguage, { as: 'LearningUnitLanguages' });
    User.hasMany(sequelize.LearningUnitRelation, { as: 'LearningUnitRelations' });
    User.hasMany(sequelize.LearningUnitTag, { as: 'LearningUnitTags' });
    User.hasMany(sequelize.KnowledgeUnit, { as: 'KnowledgeUnits' });
    User.hasMany(sequelize.LearningUnit, { as: 'LearningUnits' });
    User.hasMany(sequelize.LogUser, { as: 'Logs' });

    User.belongsToMany(sequelize.KnowledgeUnit, { through: 'KnowledgeUnitUserRating' });
    User.belongsToMany(sequelize.KnowledgeUnit, { through: 'KnowledgeUnitUserLog' });
    User.belongsToMany(sequelize.KnowledgeUnit, { through: 'KnowledgeUnitUser' });
    User.belongsToMany(sequelize.Language, { through: 'UserLanguage' });
    User.belongsToMany(sequelize.Role, { through: 'UserRole' });

    User.hasOne(sequelize.Taxonomy, { foreignKey: 'privacyLevelLog' });
    User.hasOne(sequelize.Taxonomy, { foreignKey: 'privacyLevelProfile' });
  }
}

export default User;
