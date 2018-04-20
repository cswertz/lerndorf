export default {
  up: (queryInterface, DataTypes) => queryInterface.createTable('Texts', {
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

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: 'textsRootIdCreatedAt',
    },
  }),
  down: queryInterface => queryInterface.dropTable('Texts'),
};
