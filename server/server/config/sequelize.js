import Sequelize from 'sequelize';

import LearningUnitLanguage from '../models/LearningUnitLanguage';
import LearningUnit from '../models/LearningUnit';
import Capability from '../models/Capability';
import Taxonomy from '../models/Taxonomy';
import Language from '../models/Language';
import User from '../models/User';
import Role from '../models/Role';
import File from '../models/File';

const models = [User, Role, Capability, Language, File, Taxonomy, LearningUnit, LearningUnitLanguage];

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
