import { Model, DataTypes } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      username: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        unique: true,
      },

      /*
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      */

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      lastLogin: {
        type: DataTypes.DATE,
      },
    }, { sequelize });
  }

  static associate(sequelize) {
    User.belongsToMany(sequelize.Role, { through: 'UserRole' });
  }
}

export default User;
