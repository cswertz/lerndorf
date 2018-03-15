import { Model, DataTypes } from 'sequelize';

class LearningUnitLanguage extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      LearningUnitId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        notEmpty: true,
        references: {
          model: 'LearningUnits',
          key: 'id',
        },
      },

      LanguageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        notEmpty: true,
        references: {
          model: 'Languages',
          key: 'id',
        },
      },

      UserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
      },
    }, { sequelize });
  }

  static associate(sequelize) {
    LearningUnitLanguage.belongsTo(sequelize.User);
    LearningUnitLanguage.belongsTo(sequelize.LearningUnit);
  }
}

export default LearningUnitLanguage;
