export default {
  up: (queryInterface, DataTypes) => queryInterface.addColumn('Users', 'preferredLanguage', {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'UserLanguage',
      key: 'id',
    },
  }),
  down: (queryInterface) => queryInterface.removeColumn('User', 'preferredLanguage'),
};
