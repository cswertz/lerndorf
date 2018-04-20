export default {
  up: (queryInterface, DataTypes) => queryInterface.createTable('RoleLanguage', {

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: 'idcreatedAt',      
    },

    roleId: {
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

    languageId: {
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
  }),  
  down: queryInterface => queryInterface.dropTable('RoleLanguage'),
};
