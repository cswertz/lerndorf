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

  if (course.enrolmentConfirmation === false || (course.enrolmentConfirmation !== false)) {
    playButtonState.state = 'active';
    playButtonState.msg = '';
  }

  if (checkRole(['tutor', 'admin'], user.roles)) {
    playButtonState.state = 'active';
    playButtonState.msg = '';
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

const attachTrainerInformation = (data) => {
  const CourseUserEntries = data.users.filter((courseUserEntryItem) => {
    if (courseUserEntryItem.role.slug === 'trainer') {
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
  return course;
};

const attachCommonCourseMetaData = (data, user) => data.map((raw) => {
  let entry = raw.dataValues;
  entry = attachUserRoleText(entry, user);
  entry = attachPlayButtonState(entry, user);
  entry = attachTrainerInformation(entry);
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
