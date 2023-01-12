import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import MyCourses from '../courses/MyCourses';

const CoursesRouter = ({ courses, actions, user }) => (
  <>
    <Route
      exact
      path="/courses/my"
      render={() => <MyCourses user={user} actions={actions} courses={courses} />}
    />
  </>
);

CoursesRouter.propTypes = {
  actions: PropTypes.shape({
    coursesFetchMy: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
    errors: PropTypes.shape({
      registration: PropTypes.shape({}).isRequired,
      login: PropTypes.shape({}).isRequired,
      edit: PropTypes.shape({}).isRequired,
    }).isRequired,
  }).isRequired,
};

export default CoursesRouter;
