import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import MyCourses from '../courses/MyCourses';
import EnroleCourses from '../courses/EnroleCourses';
import CreateCourse from '../courses/CreateCourse';

const CoursesRouter = ({ courses, actions, user }) => (
  <>
    <Route
      exact
      path="/courses/my"
      render={() => <MyCourses user={user} actions={actions} courses={courses} />}
    />
    <Route
      exact
      path="/courses/enrole"
      render={() => <EnroleCourses user={user} actions={actions} courses={courses} />}
    />
    <Route
      exact
      path="/courses/create"
      render={() => <CreateCourse user={user} actions={actions} />}
    />
  </>
);

CoursesRouter.propTypes = {
  actions: PropTypes.shape({
    coursesFetchMy: PropTypes.func.isRequired,
    coursesFetchMyPossible: PropTypes.func.isRequired,
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
