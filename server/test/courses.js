import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import models from '../server/config/sequelize';
import server from '../server';
import { up } from '../seeders/00020-Users';

const moment = require('moment');

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

  describe('GET /api/courses', () => {
    it('it should return a list of courses', (done) => {
      models.Course.findAll({

      }).then((courses) => {
        const session = chai.request.agent(server);
        session
          .get('/api/courses')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            expect(res.body.length).to.equal(courses.length);
            expect(res.body[0].id).not.to.equal(undefined);
            done();
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
  });

  describe('GET /api/courses/:id', () => {
    it('it should return a empty list of enroleable courses if not user is logged in', (done) => {
      models.Course.findAll({

      }).then((courses) => {
        const session = chai.request.agent(server);
        session
          .get('/api/courses/enroleable')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            expect(res.body.length).to.equal(0);
            done();
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
  });

  describe('GET /api/courses/my', () => {
    it('it should return a list of my courses', (done) => {
      models.Course.findAll({

      }).then((courses) => {
        models.CourseUser.create({
          enrolmentConfirmation: false,
          courseId: courses[0].id,
          userId: 1,
          roleId: 7, // Student
          enrolment: moment().toDate(),
          sequenceId: null,
        });

        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .get('/api/courses/my')
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

  describe('GET /api/courses/my/stats', () => {
    it('it should return an amount of my courses', (done) => {
      models.Course.findAll({

      }).then((courses) => {
        models.CourseUser.create({
          enrolmentConfirmation: false,
          courseId: courses[0].id,
          userId: 1,
          roleId: 7, // Student
          enrolment: moment().toDate(),
          sequenceId: null,
        });

        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .get('/api/courses/my/stats')
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                expect(res.body.amount).to.equal(1);
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
          .get('/api/courses/my/stats')
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
  });

  describe('GET /api/courses/enroleable', () => {
    it('it should return a empty list of enroleable courses if not user is logged in', (done) => {
      models.Course.findAll({

      }).then((courses) => {
        const session = chai.request.agent(server);
        session
          .get('/api/courses/enroleable')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            expect(res.body.length).to.equal(0);
            done();
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
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
  describe('GET /api/courses/:id', () => {
    it('it should return a 200 and the course if it exists.', (done) => {
      models.Course.findAll({

      }).then((courses) => {
        // Run the test
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .get(`/api/courses/${courses[0].id}`)
              .end((err, res) => {
                res.should.have.status(200);
                expect(res.body.id).to.equal(courses[0].id);
                done();
              });
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
    it('it should return a 404 and the course if it does not exists.', (done) => {
      models.Course.findAll({

      }).then((courses) => {
        // Run the test
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .get('/api/courses/1000')
              .end((err, res) => {
                res.should.have.status(404);
                done();
              });
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
  });
  describe('GET /api/courses/:id/enrole', () => {
    it('it should return a 200 if the rolement is possible.', (done) => {
      models.Course.findAll({

      }).then((courses) => {
        // Remove all course registrations for the user before the test happen
        models.CourseUser.destroy({ where: { userId: 1 } });
        // Run the test
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
    it('it should return a 400 and the course a enrolement already happen.', (done) => {
      models.Course.findAll({

      }).then((courses) => {
        // Run the test
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
    it('it should return a 500 and the course a enrolement already happen.', (done) => {
      models.Course.findAll({

      }).then((courses) => {
        // Delete the student role to trigger an exception
        models.Role.destroy({ where: { slug: 'learner' } });

        // Run the test
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .get(`/api/courses/${courses[0].id}/enrole`)
              .end((err, res) => {
                res.should.have.status(500);

                // Recreate the Role
                models.Role.create({ slug: 'learner', name: 'Learner' });

                done();
              });
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
  });
  describe('GET /api/courses/:id/content', () => {
    it('it should return a 200 if an return a list of content.', (done) => {
      models.Course.findAll({

      }).then((courses) => {
        // Run the test
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .get(`/api/courses/${courses[0].id}/content`)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
              });
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
    it('it should return a 404 if the course does not exists.', (done) => {
      models.Course.findAll({

      }).then((courses) => {
        // Run the test
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .get('/api/courses/999/content')
              .end((err, res) => {
                res.should.have.status(404);
                done();
              });
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
  });
  describe('DELETE /api/courses/:id', () => {
    it('it should return a 401 if the user is not logged.', (done) => {
      models.Course.findAll({

      }).then((courses) => {
        // Run the test
        const session = chai.request.agent(server);
        session
          .delete(`/api/courses/${courses[0].id}`)
          .send(admin)
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
    it('it should return a 404 if the course does not exists.', (done) => {
      models.Course.findAll({

      }).then((courses) => {
        // Run the test
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .delete('/api/courses/99999')
              .end((err, res) => {
                res.should.have.status(404);
                done();
              });
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
    it('it should return a 200 if the user can delete a course.', (done) => {
      try {
        const result = models.Course.create({
          title: 'Demo1',
          shortTitle: 'Demo1a',
          description: 'Demo1Description',
          enrolmentStart: moment().format('YYYY-MM-DD'),
          enrolmentEnd: moment().add(1, 'days').format('YYYY-MM-DD'),
          courseStart: moment().format('YYYY-MM-DD'),
          courseEnd: moment().add(1, 'days').format('YYYY-MM-DD'),
          mainLanguage: 1,
          access: false,
          copyAllowed: true,
          enrolmentByTutor: false,
          enrolmentConfirmation: true,
        });
      } catch (err) {
        console.error(err);
      }

      models.Course.findAll().then((courses) => {
        // Run the test
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .delete(`/api/courses/${courses[1].id}`)
              .end((err, res) => {
                res.should.have.status(200);
                expect(courses.length).to.be.equals(2);
                models.Course.findAll().then((refreshedCourseList) => {
                  expect(refreshedCourseList.length).to.be.equals(1);
                });
                done();
              });
          });
      }).catch((err) => {
        console.error(err);
      });
    });
    it('it should return a 403 if the user is not in a relation to the course.', (done) => {
      try {
        const result = models.Course.create({
          title: 'Demo1',
          shortTitle: 'Demo1a',
          description: 'Demo1Description',
          enrolmentStart: moment().format('YYYY-MM-DD'),
          enrolmentEnd: moment().add(1, 'days').format('YYYY-MM-DD'),
          courseStart: moment().format('YYYY-MM-DD'),
          courseEnd: moment().add(1, 'days').format('YYYY-MM-DD'),
          mainLanguage: 1,
          access: false,
          copyAllowed: true,
          enrolmentByTutor: false,
          enrolmentConfirmation: true,
        });
      } catch (err) {
        console.error(err);
      }

      models.Course.findAll().then((courses) => {
        // Run the test
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .delete(`/api/courses/${courses[1].id}`)
              .end((err, res) => {
                res.should.have.status(403);
                done();
              });
          });
      }).catch((err) => {
        console.error(err);
      });
    });
    it('it should return a 403 if the user is not the trainer of the course.', (done) => {
      try {
        // Prepare the course for the test
        models.Course.create({
          title: 'Demo1',
          shortTitle: 'Demo1a',
          description: 'Demo1Description',
          enrolmentStart: moment().format('YYYY-MM-DD'),
          enrolmentEnd: moment().add(1, 'days').format('YYYY-MM-DD'),
          courseStart: moment().format('YYYY-MM-DD'),
          courseEnd: moment().add(1, 'days').format('YYYY-MM-DD'),
          mainLanguage: 1,
          access: false,
          copyAllowed: true,
          enrolmentByTutor: false,
          enrolmentConfirmation: true,
        }).then((course) => {
          models.User.findOne({ where: { username: user.username } })
            .then((userEntry) => {
              userEntry.addRole(7); // Required otherwise test will fail on the wrong step.
              userEntry.addRole(9);

              models.CourseUser.create({
                courseId: course.id,
                userId: userEntry.id,
                roleId: 9,
                enrolment: moment().toDate(),
                enrolmentConfirmation: false,
                sequenceId: null,
              });

              // Execute the test here
              models.Course.findAll().then((courses) => {
                // Run the test
                const session = chai.request.agent(server);
                session
                  .post('/api/users/login')
                  .send(user)
                  .end((err, res) => {
                    res.should.have.status(200);
                    session
                      .delete(`/api/courses/${course.id}`)
                      .end((err, res) => {
                        res.should.have.status(403);
                        done();
                      });
                  });
              }).catch((err) => {
                console.error(err);
              });
            });
        });
      } catch (err) {
        console.error(err);
      }
    });
    it('it should return a 200 if the user is the trainer of the course.', (done) => {
      try {
        // Prepare the course for the test
        models.Course.create({
          title: 'Demo1',
          shortTitle: 'Demo1a',
          description: 'Demo1Description',
          enrolmentStart: moment().format('YYYY-MM-DD'),
          enrolmentEnd: moment().add(1, 'days').format('YYYY-MM-DD'),
          courseStart: moment().format('YYYY-MM-DD'),
          courseEnd: moment().add(1, 'days').format('YYYY-MM-DD'),
          mainLanguage: 1,
          access: false,
          copyAllowed: true,
          enrolmentByTutor: false,
          enrolmentConfirmation: true,
        }).then((course) => {
          models.User.findOne({ where: { username: user.username } })
            .then((userEntry) => {
              userEntry.addRole(7);

              models.CourseUser.create({
                courseId: course.id,
                userId: userEntry.id,
                roleId: 7,
                enrolment: moment().toDate(),
                enrolmentConfirmation: false,
                sequenceId: null,
              });

              // Execute the test here
              models.Course.findAll().then((courses) => {
                // Run the test
                const session = chai.request.agent(server);
                session
                  .post('/api/users/login')
                  .send(user)
                  .end((err, res) => {
                    res.should.have.status(200);
                    session
                      .delete(`/api/courses/${course.id}`)
                      .end((err, res) => {
                        res.should.have.status(200);
                        done();
                      });
                  });
              }).catch((err) => {
                console.error(err);
              });
            });
        });
      } catch (err) {
        console.error(err);
      }
    });
  });
});
