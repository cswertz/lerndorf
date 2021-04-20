export default {
  up: (queryInterface, DataTypes) => queryInterface.addColumn('CourseUser', 'sequenceId', {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'CourseSequence',
      key: 'id',
    },
    onDelete: 'cascade',
  }),
  down: (queryInterface) => queryInterface.removeColumn('CourseUser', 'sequenceId'),
};
