import { Model, DataTypes } from 'sequelize';

class LearningUnitRelation extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      sourceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        notEmpty: true,
        references: {
          model: 'LearningUnits',
          key: 'id',
        },
        onDelete: 'cascade',
      },

      targetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        notEmpty: true,
        references: {
          model: 'LearningUnits',
          key: 'id',
        },
        onDelete: 'cascade',
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

      type: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Taxonomies',
          key: 'id',
        },
      },
    }, {
      sequelize,
      updatedAt: false,
    });
  }

  static associate(sequelize) {
    LearningUnitRelation.belongsTo(sequelize.User);
    LearningUnitRelation.hasOne(sequelize.Taxonomy, { foreignKey: 'type' });
  }
}

export default LearningUnitRelation;
