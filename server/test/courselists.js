import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import models from '../server/config/sequelize';
import server from '../server';
import { up } from '../seeders/00020-Users';

import {
  addCourse, addCourseDefault, addUsersToCourse, admin, user, userTrainer, userWithNoRole,
} from '../server/helpers/testhelper';

const moment = require('moment');

chai.should();
chai.use(chaiHttp);
const agent = chai.request.agent(server);

describe('Courses', () => {
  before((done) => {
    done();
  });

  after((done) => {
    server.close();
    done();
  });
});
