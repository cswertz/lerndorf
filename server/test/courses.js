import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import models from '../server/config/sequelize';
import server from '../server';
import { up } from '../seeders/00020-Users';

chai.should();
chai.use(chaiHttp);
const agent = chai.request.agent(server);

describe('Courses', () => {
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
  const admin = {
    username: 'admin',
    password: 'admin',
  };

  before((done) => {
    done();
  });

  after((done) => {
    server.close();
    done();
  });

  describe('GET /api/courses/my', () => {
    it('it should return a list of my courses', (done) => {
      models.Course.findAll({

      }).then((courses) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .get('/api/courses')
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                expect(res.body.length).to.equal(courses.length);
                expect(res.body[0].id).not.to.equal(undefined);
                done();
              });
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
    it('it should return 401 if not logged in', (done) => {
      models.Course.findAll({

      }).then((courses) => {
        const session = chai.request.agent(server);
        session
          .get('/api/courses/my')
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
  });
  describe('GET /api/courses/possible', () => {
    it('it should return a list of possible courses', (done) => {
      models.Course.findAll({

      }).then((courses) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .get('/api/courses/enroleable')
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                expect(res.body.length).to.equal(courses.length);
                expect(res.body[0].id).not.to.equal(undefined);
                done();
              });
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
  });
  describe('GET /api/courses/:id/enrole', () => {
    it('it should return a 200 if user is not already part of the course.', (done) => {
      models.Course.findAll({

      }).then((courses) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .get(`/api/courses/${courses[0].id}/enrole`)
              .end((err, res) => {
                res.should.have.status(200);
                done();
              });
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
    it('it should return a 400 if user is already part of the course.', (done) => {
      models.Course.findAll({

      }).then((courses) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .get(`/api/courses/${courses[0].id}/enrole`)
              .end((err, res) => {
                res.should.have.status(400);
                done();
              });
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
  });
});
