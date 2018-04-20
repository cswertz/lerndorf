import { Model, DataTypes } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      path: {
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

      mime: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
      },

      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
        notEmpty: true,
      },
    }, { sequelize });
  }

  static associate(sequelize) {
    File.belongsToMany(sequelize.Text, { through: 'TextFile' });
  }
}

export default File;
