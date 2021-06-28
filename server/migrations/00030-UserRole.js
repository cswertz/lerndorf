export default {
  up: (queryInterface, DataTypes) => queryInterface.createTable('UserRole', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      unique: 'userIdroleId',
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    RoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      unique: 'userIdroleId',
      references: {
        model: 'Roles',
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
    }
  }, {
      uniqueKeys: {
        UserRole_unique: {
          fields: ['UserId', 'RoleId']
      }
    }

  }),
  down: queryInterface => queryInterface.dropTable('UserRole'),
};
