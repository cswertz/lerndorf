export default {
  up: (queryInterface, DataTypes) => queryInterface.createTable('Courses', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      notEmpty: true,
    },

    shortTitle: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    enrolmentStart: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    enrolmentEnd: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    enrolmentConfirmation: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    enrolmentByTutor: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    access: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    copyAllowed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    courseStart: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    courseEnd: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    mainLanguage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      references: {
        model: 'Languages',
        key: 'id',
      },
      onDelete: 'cascade',
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
  down: queryInterface => queryInterface.dropTable('UserRole'),
};
