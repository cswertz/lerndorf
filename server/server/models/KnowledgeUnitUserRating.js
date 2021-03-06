import { Model, DataTypes } from 'sequelize';

class KnowledgeUnitUserRating extends Model {
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

      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        allowEmpty: false,
      },

      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    }, {
      sequelize,
      updatedAt: false,
    });
  }

  static associate(sequelize) {
    KnowledgeUnitUserRating.belongsTo(sequelize.KnowledgeUnit);
    KnowledgeUnitUserRating.belongsTo(sequelize.User);
  }
}

export default KnowledgeUnitUserRating;
