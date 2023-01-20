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
  describe('PATH /api/courselists/:id', () => {
    it('it should return update the courselist', (done) => {
      models.CourseList.findAll({}).then((lists) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .patch('/api/courselists/1')
              .send({ title: 'test2', list: [1] })
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                expect(res.body.id).not.to.equal(undefined);
                expect(res.body.title).to.equal('test2');
                done();
              });
          });
      });
    });
    it('it should allow to update the order of the list', (done) => {
      models.CourseList.findAll({}).then((lists) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .patch('/api/courselists/1')
              .send({ title: 'test2', list: [1, 1] })
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                expect(res.body.id).not.to.equal(undefined);
                expect(res.body.items.length).to.equal(2);
                done();
              });
          });
      });
    });
    it('it should return a 403', (done) => {
      models.CourseList.findAll({}).then((lists) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .patch('/api/courselists/1')
              .send({ title: 'test2', list: [1] })
              .end((err, res) => {
                res.should.have.status(403);
                done();
              });
          });
      });
    });
    it('it should return a 404', (done) => {
      models.CourseList.findAll({}).then((lists) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .patch('/api/courselists/999')
              .send({ title: 'test2', list: [2] })
              .end((err, res) => {
                res.should.have.status(404);
                done();
              });
          });
      });
    });
  });
  describe('DELETE /api/courselists/:id', () => {
    it('it should return 401', (done) => {
      models.CourseList.findAll({}).then((lists) => {
        const session = chai.request.agent(server);
        session
          .delete('/api/courselists/1')
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      });
    });
    it('it should return a 403', (done) => {
      models.CourseList.findAll({}).then((lists) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .delete('/api/courselists/2')
              .end((err, res) => {
                res.should.have.status(403);
                done();
              });
          });
      });
    });
    it('it should return a 404', (done) => {
      models.CourseList.findAll({}).then((lists) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .delete('/api/courselists/999999')
              .end((err, res) => {
                res.should.have.status(404);
                done();
              });
          });
      });
    });
    it('it should delete the courselist', (done) => {
      models.CourseList.create({
        title: 'Test',
        createdAt: moment().toDate(),
        updatedAt: moment().toDate(),
      }).then((list) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .delete(`/api/courselists/${list.id}`)
              .end((err, res) => {
                res.should.have.status(200);
                done();
              });
          });
      });
    });
  });
});
