import Sequelize from 'sequelize';

import KnowledgeUnitUserRating from '../models/KnowledgeUnitUserRating';
import LearningUnitLanguage from '../models/LearningUnitLanguage';
import LearningUnitRelation from '../models/LearningUnitRelation';
import CapabilityLanguage from '../models/CapabilityLanguage';
import TaxonomyLanguage from '../models/TaxonomyLanguage';
import LearningUnitTag from '../models/LearningUnitTag';
import KnowledgeUnit from '../models/KnowledgeUnit';
import LearningUnit from '../models/LearningUnit';
import RoleLanguage from '../models/RoleLanguage';
import UserLanguage from '../models/UserLanguage';
import Capability from '../models/Capability';
import Taxonomy from '../models/Taxonomy';
import Language from '../models/Language';
import LogUser from '../models/LogUser';
import User from '../models/User';
import Role from '../models/Role';
import File from '../models/File';
import Text from '../models/Text';
import Course from '../models/Course';
import CourseUser from '../models/CourseUser';
import CourseUserLog from '../models/CourseUserLog';
import CourseSequence from '../models/CourseSequence';
import CourseContent from '../models/CourseContent';
import CourseSequenceKnowledgeUnit from '../models/CourseSequenceKnowledgeUnit';
import Thread from '../models/Thread';
import ThreadPost from '../models/ThreadPost';

const models = [
  KnowledgeUnitUserRating,
  LearningUnitLanguage,
  LearningUnitRelation,
  CapabilityLanguage,
  TaxonomyLanguage,
  LearningUnitTag,
  KnowledgeUnit,
  LearningUnit,
  RoleLanguage,
  UserLanguage,
  Capability,
  Language,
  Taxonomy,
  LogUser,
  User,
  Role,
  File,
  Text,
  Course,
  CourseUser,
  CourseUserLog,
  CourseSequence,
  CourseSequenceKnowledgeUnit,
  CourseContent,
  Thread,
  ThreadPost,
];

/* istanbul ignore next */
const env = process.env.NODE_ENV || 'development';
const config = require('./config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};
models.forEach((model) => {
  db[model.name] = model.init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
