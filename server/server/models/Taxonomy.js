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
    Taxonomy.belongsTo(Taxonomy, { as: 'Parent', foreignKey: 'parent', onDelete: 'CASCADE' });
    Taxonomy.belongsToMany(sequelize.Language, { through: 'TaxonomyLanguage' });
    Taxonomy.hasMany(sequelize.TaxonomyLanguage);
    Taxonomy.hasMany(sequelize.LearningUnitRelation, { foreignKey: 'type' });
  }
}

export default Taxonomy;
