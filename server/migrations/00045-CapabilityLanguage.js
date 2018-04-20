export default {
  up: (queryInterface, DataTypes) => queryInterface.createTable('CapabilityLanguage', {

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: 'idcreatedAt',      
    },

    capabilityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      unique: 'capabilityIdlanguageId',
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    languageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      unique: 'capabilityIdlanguageId',
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
  down: queryInterface => queryInterface.dropTable('CapabilityLanguage'),
};
