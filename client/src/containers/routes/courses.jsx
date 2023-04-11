import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import MyCourses from '../courses/MyCourses';
import EnroleCourses from '../courses/EnroleCourses';
import CreateCourse from '../courses/CreateCourse';
import EditCourse from '../courses/EditCourse';
import ShowCourse from '../courses/ShowCourse';
import ShowCourseForum from '../courses/ShowCourseForum';
import CourseLists from '../courses/CourseLists';
import CourseList from '../courses/CourseList';
import ForumThreadCreate from '../forum/Create';

const CoursesRouter = ({
  courses,
  course,
  languages,
  actions,
  user,
  roles,
  forum,
  threads,
  courselist,
  courselists,
}) => (
  <>
    <Route
      exact
      path="/courses/my"
      render={() => <MyCourses user={user} actions={actions} courses={courses} />}
    />
    <Route
      exact
      path="/courses/lists"
      render={() => (
        <CourseLists user={user} actions={actions} courses={courses} courselists={courselists} />
      )}
    />
    <Route
      exact
      path="/courses/lists/:id"
      render={() => <CourseList user={user} actions={actions} courselist={courselist} />}
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
    <Route
      exact
      path="/courses/:id/edit"
      render={() => (
        <EditCourse
          user={user}
          actions={actions}
          course={course}
          languages={languages}
          roles={roles}
        />
      )}
    />
    <Route
      exact
      path="/courses/:id"
      render={() => (
        <ShowCourse
          user={user}
          actions={actions}
          course={course}
          languages={languages}
          roles={roles}
        />
      )}
    />
    <Route
      exact
      path="/courses/:id/forum"
      render={() => (
        <ShowCourseForum
          user={user}
          actions={actions}
          course={course}
          languages={languages}
          roles={roles}
          items={forum ?? []}
        />
      )}
    />
    <Route
      exact
      path="/courses/:id/forum/create"
      render={() => <ForumThreadCreate course={course} user={user} actions={actions} />}
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
