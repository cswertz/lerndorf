import Sequelize from 'sequelize';

import KnowledgeUnitUserRating from '../models/KnowledgeUnitUserRating';
import LearningUnitLanguage from '../models/LearningUnitLanguage';
import LearningUnitRelation from '../models/LearningUnitRelation';
import KnowledgeUnitTag from '../models/KnowledgeUnitTag';
import KnowledgeUnit from '../models/KnowledgeUnit';
import LearningUnit from '../models/LearningUnit';
import Capability from '../models/Capability';
import Taxonomy from '../models/Taxonomy';
import Language from '../models/Language';
import User from '../models/User';
import Role from '../models/Role';
import File from '../models/File';
import Text from '../models/Text';

const models = [
  KnowledgeUnitUserRating,
  LearningUnitLanguage,
  LearningUnitRelation,
  KnowledgeUnitTag,
  KnowledgeUnit,
  LearningUnit,
  Capability,
  Language,
  Taxonomy,
  User,
  Role,
  File,
  Text,
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
