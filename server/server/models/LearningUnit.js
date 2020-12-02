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

    }, {
      sequelize,
      updatedAt: false,
    });
  }

  static associate(sequelize) {
    LearningUnit.belongsTo(sequelize.User);

    LearningUnit.hasMany(sequelize.KnowledgeUnit);

    //LearningUnit.hasOne(LearningUnit, { foreignKey: 'rootId' });
    //LearningUnit.hasOne(LearningUnit, { foreignKey: 'prevId' });
    //LearningUnit.hasOne(LearningUnit, { foreignKey: 'nextId' });

    LearningUnit.belongsToMany(sequelize.Language, { through: 'LearningUnitLanguage' });
    LearningUnit.belongsToMany(sequelize.LearningUnit, { through: 'LearningUnitRelation', foreignKey: 'sourceId', as: 'source' });
    LearningUnit.belongsToMany(sequelize.LearningUnit, { through: 'LearningUnitRelation', foreignKey: 'targetId', as: 'target' });

    LearningUnit.hasMany(sequelize.LearningUnitRelation, { foreignKey: 'sourceId', as: 'learningUnitSource' });
    LearningUnit.hasMany(sequelize.LearningUnitRelation, { foreignKey: 'targetId', as: 'learningUnitTarget' });

    LearningUnit.hasMany(sequelize.LearningUnitLanguage, { as: 'Translations' });
  }
}

export default LearningUnit;
