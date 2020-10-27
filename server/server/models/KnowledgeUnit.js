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

      rootId: {
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
          model: 'LearningUnits',
          key: 'id',
        },
      },

      prevId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'LearningUnits',
          key: 'id',
        },
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

      minimumScreenResolution: {
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

      publish: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
    }, {
      sequelize,
      updatedAt: false,
    });
  }

  static associate(sequelize) {
    KnowledgeUnit.belongsToMany(sequelize.User, { through: 'KnowledgeUnitUserRating' });
    KnowledgeUnit.belongsToMany(sequelize.User, { through: 'KnowledgeUnitUserLog' });
    KnowledgeUnit.belongsToMany(sequelize.User, { through: 'KnowledgeUnitUser' });

    KnowledgeUnit.belongsTo(sequelize.Taxonomy, { as: 'msr', foreignKey: 'minimumScreenResolution' });
    KnowledgeUnit.belongsTo(sequelize.Taxonomy, { as: 'kt', foreignKey: 'knowledgeType' });
    KnowledgeUnit.belongsTo(sequelize.Taxonomy, { as: 'cl', foreignKey: 'courseLevel' });
    KnowledgeUnit.belongsTo(sequelize.Taxonomy, { as: 'ot', foreignKey: 'objectType' });
    KnowledgeUnit.belongsTo(sequelize.Taxonomy, { as: 'mt', foreignKey: 'mediaType' });
    KnowledgeUnit.belongsTo(sequelize.Taxonomy, { as: 'el', foreignKey: 'eqfLevel' });
    KnowledgeUnit.belongsTo(sequelize.Taxonomy, { as: 'l', foreignKey: 'license' });

    KnowledgeUnit.hasMany(sequelize.KnowledgeUnitUserRating, { as: 'Ratings' });
    KnowledgeUnit.hasMany(sequelize.LearningUnitTag, { as: 'Tags' });
    KnowledgeUnit.hasMany(sequelize.Text, { as: 'Texts' });

    KnowledgeUnit.hasOne(KnowledgeUnit, { foreignKey: 'rootId' });
    KnowledgeUnit.hasOne(KnowledgeUnit, { foreignKey: 'prevId' });
    KnowledgeUnit.hasOne(KnowledgeUnit, { foreignKey: 'nextId' });

    KnowledgeUnit.belongsTo(sequelize.LearningUnit);
    KnowledgeUnit.belongsTo(sequelize.User, { as: 'author', foreignKey: 'UserId' });
  }
}

export default KnowledgeUnit;
