import { Model, DataTypes } from 'sequelize';

class LearningUnit extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      rootId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'LearningUnits',
          key: 'id',
        },
        unique: 'learningUnitsRootIdCreatedAt',
      },

      prevId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'LearningUnits',
          key: 'id',
        },
      },

      nextId: {
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
    LearningUnit.belongsTo(sequelize.User);
    LearningUnit.hasOne(LearningUnit, { foreignKey: 'rootId' });
    LearningUnit.hasOne(LearningUnit, { foreignKey: 'prevId' });
    LearningUnit.hasOne(LearningUnit, { foreignKey: 'nextId' });
  }
}

export default LearningUnit;
