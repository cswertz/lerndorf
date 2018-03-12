import Sequelize from 'sequelize';

import User from '../models/User';
import Role from '../models/Role';

const models = [User, Role];

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
