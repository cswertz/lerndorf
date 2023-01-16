import moment from 'moment';
import models from '../config/sequelize';
import { checkRole, hasRole, isAdmin } from './auth';

const attachPlayButtonState = (data, user) => {
  const course = data;

  const playButtonState = {
    state: 'inactive',
    msg: null,
  };

  const CourseUserEntries = course.users.filter((courseUserEntryItem) => {
    if (courseUserEntryItem.userId === user.id) {
      return courseUserEntryItem;
    }
  });

  if ((course.enrolmentConfirmation === false || (course.enrolmentConfirmation === true && CourseUserEntries.length > 0 && CourseUserEntries[0].enrolmentConfirmation === true)) && (course.courseEnd === null || moment().isBefore(moment(course.courseEnd))) && (course.courseStart === null || moment().isAfter(moment(course.courseStart))) && course.access === true) {
    playButtonState.state = 'active';
    playButtonState.msg = '';
  }

  if (checkRole(['tutor', 'trainer', 'admin'], user.roles) || course.trainerId === user.id) {
    playButtonState.state = 'active';
    playButtonState.msg = '';
  }

  // Handle the inactive state + add the message
  if (playButtonState.state === 'inactive') {
    if (course.access === false) {
      playButtonState.msg = 'The course is currently not available.';
    } else if (moment().isBefore(moment(course.courseStart))) {
      playButtonState.msg = 'The course has not yet started.';
    } else if (moment().isAfter(moment(course.courseEnd))) {
      playButtonState.msg = 'The course was finished.';
    } else if (course.enrolmentConfirmation === true && CourseUserEntries.length > 0 && CourseUserEntries[0].enrolmentConfirmation === false) {
      playButtonState.msg = 'Your enrolment will be confirmed as soon as possible.';
    }
  }

  return Object.assign(course, { playButtonState });
};

const attachUserRoleText = (data, user) => {
  const course = data;
  const CourseUserEntries = course.users.filter((courseUserEntryItem) => {
    if (courseUserEntryItem.userId === user.id) {
      return courseUserEntryItem;
    }
  });

  course.currentUserRole = 'n/a';
  if (CourseUserEntries.length === 1) {
    course.currentUserRole = CourseUserEntries[0].role.RoleLanguage.vocable;
  }

  return course;
};

const attachTrainerInformation = (data, currentUser) => {
  const CourseUserEntries = data.users.filter((courseUserEntryItem) => {
    if (courseUserEntryItem.role.slug === 'trainer') {
      return courseUserEntryItem;
    }
  });
  const CourseUserEntriesTutor = data.users.filter((courseUserEntryItem) => {
    if (courseUserEntryItem.role.slug === 'tutor') {
      return courseUserEntryItem;
    }
  });

  const course = data;
  let trainerName = 'n/a';
  let trainerId = null;
  if (CourseUserEntries.length > 0) {
    trainerName = `${CourseUserEntries[0].user.firstName || ''} ${CourseUserEntries[0].user.lastName || ''}`;
    if (trainerName === ' ') {
      trainerName = CourseUserEntries[0].user.username;
    }
    trainerId = CourseUserEntries[0].user.id;
  }
  course.trainerId = trainerId;
  course.trainerName = trainerName;

  const tutorNames = [];
  const tutorIds = [];
  for (let i = 0; i < CourseUserEntriesTutor.length; i += 1) {
    let tutorName = `${CourseUserEntriesTutor[i].user.firstName || ''} ${CourseUserEntriesTutor[i].user.lastName || ''}`;
    if (tutorName === ' ') {
      tutorName = CourseUserEntriesTutor[i].user.username;
    }
    tutorNames.push(tutorName);
    tutorIds.push(CourseUserEntriesTutor[i].user.id);
  }

  course.trainerId = trainerId;
  course.trainerName = trainerName;

  course.currentUserIsTrainerOrTutor = trainerId === currentUser.id || tutorIds.indexOf(currentUser.id) > -1 || currentUser.roles.indexOf('admin') > -1;
  return course;
};

const attachCommonCourseMetaData = (data, user) => data.map((raw) => {
  let entry = raw.dataValues;
  entry = attachUserRoleText(entry, user);
  entry = attachTrainerInformation(entry, user);
  entry = attachPlayButtonState(entry, user);
  return entry;
});

const getRoleId = async (slug) => {
  const roles = await models.Role.findAll({ where: { slug } });
  return roles.length > 0 ? roles[0].id : null;
};

const getStudentRoleId = async () => getRoleId('learner');

const getTrainerRoleId = async () => getRoleId('trainer');

const getLastCourseSequendId = async (courseId) => {
  const course = await models.Course.findByPk(courseId, {
    include: [
      {
        model: models.CourseSequence,
        as: 'sequences',
        order: [
          ['id', 'DESC'],
        ],
      },
    ],
  });
  return course && course.sequences && course.sequences.length > 0 ? course.sequences[0].id : null;
};

export {
  attachPlayButtonState,
  attachUserRoleText,
  attachTrainerInformation,
  attachCommonCourseMetaData,
  getStudentRoleId,
  getTrainerRoleId,
  getRoleId,
  getLastCourseSequendId,
};
