export default {
  up: (queryInterface, DataTypes) => queryInterface.createTable('RoleLanguage', {

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: 'idcreatedAt',
    },

    RoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      unique: 'roleIdlanguageId',
      references: {
        model: 'Roles',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    LanguageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      unique: 'roleIdlanguageId',
      references: {
        model: 'Languages',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    vocable: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: 'idcreatedAt',
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
      uniqueKeys: {
        RoleLanguage_unique: {
          fields: ['LanguageId', 'RoleId']
      }
    }

  }),
  down: queryInterface => queryInterface.dropTable('RoleLanguage'),
};
