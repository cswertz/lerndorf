import models from '../config/sequelize';

const moment = require('moment');

const user = {
  username: 'username',
  password: 'password',
  email: 'username@host.com',
};
const userWithNoRole = {
  username: 'userWithNoRole',
  password: 'password',
  email: 'username2@host.com',
};
const userTrainer = {
  username: 'trainer',
  password: 'password',
  email: 'trainer@host.com',
};
const admin = {
  username: 'admin',
  password: 'admin',
};

const addCourse = () => models.Course.create({
  title: 'Demo1',
  shortTitle: 'Demo1a',
  description: 'Demo1Description',
  enrolmentStart: moment().format('YYYY-MM-DD'),
  enrolmentEnd: moment().add(1, 'days').format('YYYY-MM-DD'),
  courseStart: moment().format('YYYY-MM-DD'),
  courseEnd: moment().add(1, 'days').format('YYYY-MM-DD'),
  mainLanguage: 1,
  access: false,
  copyAllowed: true,
  enrolmentByTutor: false,
  enrolmentConfirmation: false,
});

const createCourseUser = (course, userData, role, handleUser) => new Promise((resolve, reject) => {
  models.Role.findOne({ where: { slug: role } }).then((role) => {
    models.User.findOne({ where: { username: userData.username } })
      .then((userEntry) => {
        if (handleUser) {
          handleUser(userEntry);
        } else {
          userEntry.addRole(role.id);
        }
        models.CourseUser.create({
          courseId: course.id,
          userId: userEntry.id,
          roleId: role.id,
          enrolment: moment().toDate(),
          enrolmentConfirmation: false,
          sequenceId: null,
        }).then((userResult) => {
          resolve(userResult);
        }).catch((error) => {
          console.error(error);
          resolve(null);
        });
      });
  });
});
const addUsersToCourse = (course, users, role, roleFn) => new Promise((resolve) => {
  Promise.all(users.map((user) => createCourseUser(course, user, role, roleFn))).then((users) => {
    resolve({ course, users });
  });
});
const addCourseDefault = (admin, user, roleFn) => new Promise((resolve) => {
  addCourse().then((course) => {
    if (course === undefined) {
      resolve(null);
      return;
    }
    Promise.all([
      createCourseUser(course, admin, 'tutor', roleFn),
      createCourseUser(course, user, 'learner', roleFn),
      createCourseUser(course, userTrainer, 'trainer', roleFn),
    ]).then((users) => {
      resolve({ course, users });
    });
  });
});

export {
  addCourse, addCourseDefault, addUsersToCourse, admin, user, userTrainer, userWithNoRole,
};
