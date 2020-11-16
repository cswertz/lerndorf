export default {
  up: (queryInterface, DataTypes) => queryInterface.createTable('RoleCapability', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    RoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      unique: 'roleIdcapabilityId',
      references: {
        model: 'Roles',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    CapabilityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      unique: 'roleIdcapabilityId',
      references: {
        model: 'Capabilities',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }),
  down: queryInterface => queryInterface.dropTable('RoleCapability'),
};
