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

    country: {
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
