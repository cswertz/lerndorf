import { Model, DataTypes } from 'sequelize';

class KnowledgeUnit extends Model {
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
        onDelete: 'cascade',
      },

      mediaType: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Taxonomies',
          key: 'id',
        },
      },

      knowledgeType: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Taxonomies',
          key: 'id',
        },
      },

      objectType: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Taxonomies',
          key: 'id',
        },
      },

      eqfLevel: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Taxonomies',
          key: 'id',
        },
      },

      courseLevel: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Taxonomies',
          key: 'id',
        },
      },

      license: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Taxonomies',
          key: 'id',
        },
      },

      suitableBlind: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        notEmpty: true,
      },

      suitableDeaf: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        notEmpty: true,
      },

      suitableDumb: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        notEmpty: true,
      },

      review: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        notEmpty: true,
      },

      lectorate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        notEmpty: true,
      },

      visiblePublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        notEmpty: true,
      },

      visibleLexicon: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        notEmpty: true,
      },

      visibleCourses: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        notEmpty: true,
      },

      time: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      objective: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      recommendedAge: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      minimumScreenResolution: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    }, {
      sequelize,
      updatedAt: false,
    });
  }

  static associate(sequelize) {
    KnowledgeUnit.belongsTo(sequelize.LearningUnit);

    KnowledgeUnit.hasOne(KnowledgeUnit, { foreignKey: 'rootId' });
    KnowledgeUnit.hasOne(KnowledgeUnit, { foreignKey: 'prevId' });
    KnowledgeUnit.hasOne(KnowledgeUnit, { foreignKey: 'nextId' });

    KnowledgeUnit.hasOne(sequelize.Taxonomy, { foreignKey: 'knowledgeType' });
    KnowledgeUnit.hasOne(sequelize.Taxonomy, { foreignKey: 'courseLevel' });
    KnowledgeUnit.hasOne(sequelize.Taxonomy, { foreignKey: 'objextType' });
    KnowledgeUnit.hasOne(sequelize.Taxonomy, { foreignKey: 'mediaType' });
    KnowledgeUnit.hasOne(sequelize.Taxonomy, { foreignKey: 'eqfLevel' });
    KnowledgeUnit.hasOne(sequelize.Taxonomy, { foreignKey: 'licence' });
  }
}

export default KnowledgeUnit;
