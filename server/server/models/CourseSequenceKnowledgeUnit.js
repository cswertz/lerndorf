import { Model, DataTypes } from 'sequelize';

class CourseSequenceKnowledgeUnit extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      courseSequenceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Course',
          key: 'id',
        },
      },

      knowledgeUnitId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'KnowledgeUnit',
          key: 'id',
        },
      },

      rootId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'CourseSequenceKnowledgeUnit',
          key: 'id',
        },
      },

    }, {
      sequelize,
      freezeTableName: true,
    });
  }

  static associate(sequelize) {

    CourseSequenceKnowledgeUnit.belongsTo(sequelize.CourseSequenceKnowledgeUnit, { as: 'knowledgeUnit', foreignKey: 'rootId' });
   
  }
}

export default CourseSequence;
