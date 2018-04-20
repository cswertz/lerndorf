import { Model, DataTypes } from 'sequelize';

class LearningUnitTag extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      KnowledgeUnitId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        notEmpty: true,
        references: {
          model: 'KnowledgeUnits',
          key: 'id',
        },
        onDelete: 'cascade',
      },

      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        notEmpty: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
      },

      tag: {
        type: DataTypes.STRING,
        allowNull: false,
        allowEmpty: false,
      },
    }, {
      sequelize,
      updatedAt: false,
    });
  }

  static associate(sequelize) {
    LearningUnitTag.belongsTo(sequelize.LearningUnit);
    LearningUnitTag.belongsTo(sequelize.User);
  }
}

export default LearningUnitTag;
