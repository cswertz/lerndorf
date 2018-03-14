import { Model, DataTypes } from 'sequelize';

class TaxonomyLanguage extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      TaxonomyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        notEmpty: true,
        references: {
          model: 'Taxonomies',
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
      },

      vocable: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        defaultValue: 0,
      },
    }, { sequelize });
  }
}

export default TaxonomyLanguage;
