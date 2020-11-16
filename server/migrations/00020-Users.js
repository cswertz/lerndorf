export default {
  up: (queryInterface, DataTypes) => queryInterface.createTable('Users', {
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

    state: {
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
      defaultValue: null,
      allowNull: true,
    },

    description: {
      type: DataTypes.TEXT,
    },

    lastLogin: {
      type: DataTypes.DATE,
    },

    acceptPrivacy: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      notEmpty: true,
    },

    acceptTos: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      notEmpty: true,
    },

    allowBasicLog: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      notEmpty: true,
    },

    allowLogResearch: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      notEmpty: true,
    },

    allowLogSharing: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      notEmpty: true,
    },

    allowLogReports: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      notEmpty: true,
    },

    showProfilePublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      notEmpty: true,
    },

    showProfileStudents: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      notEmpty: true,
    },

    showProfileTeachers: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      notEmpty: true,
    },

    activationCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      notEmpty: true,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Users'),
};
