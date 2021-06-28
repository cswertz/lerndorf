export default {
  up: (queryInterface, DataTypes) => queryInterface.createTable('UserLanguage', {
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
      unique: 'userIdLanguageId',
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    LanguageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      unique: 'userIdLanguageId',
      references: {
        model: 'Languages',
        key: 'id',
      },
      onDelete: 'cascade',
    },

    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      defaultValue: 0,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },  {
        uniqueKeys: {
          UserLanguage_unique: {
            fields: ['UserId', 'LanguageId']
          }
        },




  }),
  down: queryInterface => queryInterface.dropTable('UserLanguage'),
};
