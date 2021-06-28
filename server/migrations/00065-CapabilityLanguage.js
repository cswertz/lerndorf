export default {
  up: (queryInterface, DataTypes) => queryInterface.createTable('CapabilityLanguage', {

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: 'idcreatedAt',
    },

    CapabilityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      references: {
        model: 'Capabilities',
        key: 'id',
      },
      onDelete: 'cascade',
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
        CapabilityLanguage_unique: {
          fields: ['CapabilityId', 'LanguageId']
        }
      }
  }),
  down: queryInterface => queryInterface.dropTable('CapabilityLanguage'),
};
