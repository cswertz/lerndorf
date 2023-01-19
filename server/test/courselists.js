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

  describe('GET /api/courselists', () => {
    it('it should return a list of courselists', (done) => {
      models.CourseList.findAll({}).then((lists) => {
        const session = chai.request.agent(server);
        session
          .get('/api/courselists')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            expect(res.body.length).to.equal(lists.length);
            expect(res.body[0].id).not.to.equal(undefined);
            expect(res.body[0].title).to.equal('Testlist');
            done();
          });
      });
    });
  });
  describe('GET /api/courselists/:id', () => {
    it('it should return a  courselist', (done) => {
      models.CourseList.findAll({}).then((lists) => {
        const session = chai.request.agent(server);
        session
          .get('/api/courselists/1')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            expect(res.body.id).not.to.equal(undefined);
            expect(res.body.title).to.equal('Testlist');
            done();
          });
      });
    });
  });
});
