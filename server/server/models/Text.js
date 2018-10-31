import { Model, DataTypes } from 'sequelize';

class Text extends Model {
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
          model: 'Texts',
          key: 'id',
        },
        unique: 'textsRootIdCreatedAt',
      },

      prevId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Texts',
          key: 'id',
        },
      },

      nextId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Texts',
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
        onDelete: 'cascade',
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

      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        allowEmpty: false,
      },
    }, {
      sequelize,
      updatedAt: false,
    });
  }

  static associate(sequelize) {
    Text.belongsToMany(sequelize.File, { through: 'TextFile' });

    Text.hasOne(Text, { foreignKey: 'rootId' });
    Text.hasOne(Text, { foreignKey: 'prevId' });
    Text.hasOne(Text, { foreignKey: 'nextId' });

    Text.belongsTo(sequelize.KnowledgeUnit);
    Text.belongsTo(sequelize.Language);
  }
}

export default Text;
