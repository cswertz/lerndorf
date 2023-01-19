import { Model, DataTypes } from 'sequelize';

class Course extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        unique: true,
      },

      shortTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        notEmpty: false,
      },

      enrolmentStart: {
        type: DataTypes.TIME,
        allowNull: false,
        notEmpty: true,
      },

      enrolmentEnd: {
        type: DataTypes.TIME,
        allowNull: false,
        notEmpty: true,
      },

      enrolmentConfirmation: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        notEmpty: true,
      },

      enrolmentByTutor: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        notEmpty: true,
        defaultValue: true,
      },

      activateForum: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        notEmpty: true,
        defaultValue: true,
      },

      access: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        notEmpty: true,
      },

      visible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      copyAllowed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        notEmpty: true,
      },

      courseStart: {
        type: DataTypes.TIME,
        allowNull: false,
        notEmpty: true,
      },

      courseEnd: {
        type: DataTypes.TIME,
        allowNull: false,
        notEmpty: true,
      },

      mainLanguage: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Languages',
          key: 'id',
        },
      },

    }, { sequelize });
  }

  static associate(sequelize) {
    Course.hasMany(sequelize.CourseUser, { as: 'users', foreignKey: 'courseId' });
    Course.hasMany(sequelize.CourseSequence, { as: 'sequences', foreignKey: 'courseId' });
    Course.hasMany(sequelize.CourseContent, { as: 'content', foreignKey: 'courseId' });
  }
}

export default Course;
