import { Model, DataTypes } from 'sequelize';

class Taxonomy extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        notEmpty: true,
        unique: true,
      },

      rootId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Taxonomies',
          key: 'id',
        },
        unique: 'taxonomyRootIdCreatedAt',
      },

      prevId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Taxonomies',
          key: 'id',
        },
        unique: 'taxonomyRootIdCreatedAt',
      },

      nextId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Taxonomies',
          key: 'id',
        },
        unique: 'taxonomyRootIdCreatedAt',
      },

      parent: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Taxonomies',
          key: 'id',
        },
      },

      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },

      type: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
      },

      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        notEmpty: true,
        unique: 'taxonomyRootIdCreatedAt',
      },
    }, {
      sequelize,
      updatedAt: false,
    });
  }

  static associate(sequelize) {
    Taxonomy.hasOne(Taxonomy, { foreignKey: 'rootId' });
    Taxonomy.hasOne(Taxonomy, { foreignKey: 'prevId' });
    Taxonomy.hasOne(Taxonomy, { foreignKey: 'nextId' });
    Taxonomy.hasOne(Taxonomy, { foreignKey: 'parentId' });
  }
}

export default Taxonomy;
