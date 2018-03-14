export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('RoleCapability', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    RoleId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      notEmpty: true,
      references: {
        model: 'Roles',
        key: 'id',
      },
    },

    CapabilityId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      notEmpty: true,
      references: {
        model: 'Capabilities',
        key: 'id',
      },
    },

    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },

    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),
  down: queryInterface => queryInterface.dropTable('RoleCapability'),
};
