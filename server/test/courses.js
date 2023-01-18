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
  const userTrainer = {
    username: 'trainer',
    password: 'password',
    email: 'trainer@host.com',
  };
  const admin = {
    username: 'admin',
    password: 'admin',
  };

  const addCourse = () => models.Course.create({
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
    enrolmentConfirmation: false,
  });

  const createCourseUser = (course, userData, role, handleUser) => new Promise((resolve, reject) => {
    models.Role.findOne({ where: { slug: role } }).then((role) => {
      models.User.findOne({ where: { username: userData.username } })
        .then((userEntry) => {
          if (handleUser) {
            handleUser(userEntry);
          } else {
            userEntry.addRole(role.id);
          }
          models.CourseUser.create({
            courseId: course.id,
            userId: userEntry.id,
            roleId: role.id,
            enrolment: moment().toDate(),
            enrolmentConfirmation: false,
            sequenceId: null,
          }).then((userResult) => {
            resolve(userResult);
          }).catch((error) => {
            console.error(error);
            resolve(null);
          });
        });
    });
  });

  const addUsersToCourse = (course, users, role, roleFn) => new Promise((resolve) => {
    Promise.all(users.map((user) => createCourseUser(course, user, role, roleFn))).then((users) => {
      resolve({ course, users });
    });
  });

  const addCourseDefault = (admin, user, roleFn) => new Promise((resolve) => {
    addCourse().then((course) => {
      if (course === undefined) {
        resolve(null);
        return;
      }
      Promise.all([
        createCourseUser(course, admin, 'tutor', roleFn),
        createCourseUser(course, user, 'learner', roleFn),
        createCourseUser(course, userTrainer, 'trainer', roleFn),
      ]).then((users) => {
        resolve({ course, users });
      });
    });
  });

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
                expect(res.body.amount).to.equal(courses.length);
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
                expect(res.body.length).to.equal(1);
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
    it('it should automatic confirm a user if enrolementConfirmation is false.', (done) => {
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
        enrolmentConfirmation: false,
      }).then((course) => {
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
              .get(`/api/courses/${course.id}/enrole`)
              .end((err, res) => {
                res.should.have.status(200);
                expect(res.body.enrolmentConfirmation).to.be.equals(true);
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
                res.should.have.status(200);
                session
                  .get(`/api/courses/${courses[0].id}/enrole`)
                  .end((err, res) => {
                    res.should.have.status(400);
                    done();
                  });
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
              .delete(`/api/courses/${courses[courses.length - 1].id}`)
              .end((err, res) => {
                res.should.have.status(200);
                expect(courses.length).to.be.equals(courses.length);
                models.Course.findAll().then((refreshedCourseList) => {
                  expect(refreshedCourseList.length).to.be.equals(courses.length - 1);
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
  describe('POST /api/courses', () => {
    it('it should return a 401 if the user is not logged.', (done) => {
      models.Course.findAll({

      }).then((courses) => {
        // Run the test
        const session = chai.request.agent(server);
        session
          .post('/api/courses')
          .send({
            title: 'asdf',
          })
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
    it('it should return a 422 it the user is logged but the response is missing the title.', (done) => {
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
              .post('/api/courses')
              .send({})
              .end((err, res) => {
                res.should.have.status(422);
                done();
              });
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
    it('it should return a 200 it the user is logged, an admin and send a title.', (done) => {
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
              .post('/api/courses')
              .send({
                title: 'Test my passion',
              })
              .end((err, res) => {
                res.should.have.status(200);
                expect(res.body.id).not.to.be.equals(undefined);
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
    it('it should return a 401 if the user is not logged.', (done) => {
      models.Course.findAll({

      }).then((courses) => {
        // Run the test
        const session = chai.request.agent(server);
        session
          .get(`/api/courses/${courses[0].id}`)
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
  });
  describe('PATCH /api/courses/:id', () => {
    it('it should return a 401 if the user is not logged.', (done) => {
      models.Course.findAll({

      }).then((courses) => {
        // Run the test
        const session = chai.request.agent(server);
        session
          .patch(`/api/courses/${courses[0].id}`)
          .send({
            title: 'asdf',
          })
          .end((err, res) => {
            res.should.have.status(401);
            done();
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
              .patch('/api/courses/1000')
              .send({ title: 'test1' })
              .end((err, res) => {
                res.should.have.status(404);
                done();
              });
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
    it('it should return a 200 and the course if the user has permission to update the entry.', (done) => {
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
              .patch(`/api/courses/${courses[0].id}`)
              .send({
                title: 'test1',
              })
              .end((err, res) => {
                res.should.have.status(200);
                expect(res.body.title).to.be.equals('test1');

                // Reset the data
                models.Course.update({ title: 'Demo1' }, { where: { id: courses[0].id } });

                done();
              });
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
  });
  describe('PATCH /api/courses/:id/users/:userId', () => {
    it('it should return a 401 if the user is not logged.', (done) => {
      addCourseDefault(admin, user).then((result) => {
        const session = chai.request.agent(server);
        session
          .patch(`/api/courses/${result.course.id}/users/${result.users[1].id}`)
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      });
    });
    it('it should return a 404 if the course does not exists.', (done) => {
      addCourseDefault(admin, user).then((result) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            session
              .patch(`/api/courses/9999/users/${result.users[1].id}`)
              .end((err, res) => {
                res.should.have.status(404);
                done();
              });
          });
      });
    });
    it('it should return a 400 if the user does not exists.', (done) => {
      addCourseDefault(admin, user).then((result) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            session
              .patch(`/api/courses/${result.course.id}/users/999`)
              .end((err, res) => {
                res.should.have.status(400);
                done();
              });
          });
      });
    });
    it('it should return a 403 if the user is not permitted.', (done) => {
      addCourseDefault(admin, user).then((result) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(userWithNoRole)
          .end((err, res) => {
            session
              .patch(`/api/courses/${result.course.id}/users/${result.users[1].id}`)
              .end((err, res) => {
                res.should.have.status(403);
                done();
              });
          });
      });
    });
    it('it should return a 200 if the user is an admin.', (done) => {
      addCourseDefault(admin, user).then((result) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            session
              .patch(`/api/courses/${result.course.id}/users/${result.users[1].id}`)
              .send({ confirm: true })
              .end((err, res) => {
                res.should.have.status(200);
                done();
              });
          });
      });
    });
    it('it should return a 403 if the own user tries to confirm him-/herself.', (done) => {
      addCourseDefault(admin, user).then((result) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(user)
          .end((err, res) => {
            session
              .patch(`/api/courses/${result.course.id}/users/${result.users[1].id}`)
              .send({ confirm: true })
              .end((err, res) => {
                res.should.have.status(403);
                done();
              });
          });
      });
    });
    it('it should return a 400 if an invalid param is passed.', (done) => {
      addCourseDefault(admin, user).then((result) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            session
              .patch(`/api/courses/${result.course.id}/users/${result.users[1].id}`)
              .send({ confirm: 'MONKEY' })
              .end((err, res) => {
                res.should.have.status(400);
                done();
              });
          });
      });
    });
    it('it should return a 200 if the user is an trainer.', (done) => {
      addCourseDefault(admin, user).then((result) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(userTrainer)
          .end((err, res) => {
            session
              .patch(`/api/courses/${result.course.id}/users/${result.users[1].id}`)
              .send({ confirm: true })
              .end((err, res) => {
                res.should.have.status(200);
                done();
              });
          });
      });
    });
  });
  describe('DELETE /api/courses/:id/users/:userId', () => {
    it('it should return a 401 if the user is not logged.', (done) => {
      addCourseDefault(admin, user).then((result) => {
        const session = chai.request.agent(server);
        session
          .delete(`/api/courses/${result.course.id}/users/${result.users[1].id}`)
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      });
    });
    it('it should return a 404 if the course does not exists.', (done) => {
      addCourseDefault(admin, user).then((result) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            session
              .delete(`/api/courses/9999/users/${result.users[1].id}`)
              .end((err, res) => {
                res.should.have.status(404);
                done();
              });
          });
      });
    });
    it('it should return a 400 if the user does not exists.', (done) => {
      addCourseDefault(admin, user).then((result) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            session
              .delete(`/api/courses/${result.course.id}/users/999`)
              .end((err, res) => {
                res.should.have.status(400);
                done();
              });
          });
      });
    });
    it('it should return a 403 if the user is not permitted.', (done) => {
      addCourseDefault(admin, user).then((result) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(userWithNoRole)
          .end((err, res) => {
            session
              .delete(`/api/courses/${result.course.id}/users/${result.users[1].id}`)
              .end((err, res) => {
                res.should.have.status(403);
                done();
              });
          });
      });
    });
    it('it should return a 200 if the user is an admin.', (done) => {
      addCourseDefault(admin, user).then((result) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            session
              .delete(`/api/courses/${result.course.id}/users/${result.users[1].id}`)
              .end((err, res) => {
                res.should.have.status(200);
                done();
              });
          });
      });
    });
    it('it should return a 200 if the user is an trainer.', (done) => {
      addCourseDefault(admin, user).then((result) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(userTrainer)
          .end((err, res) => {
            session
              .delete(`/api/courses/${result.course.id}/users/${result.users[1].id}`)
              .end((err, res) => {
                res.should.have.status(200);
                done();
              });
          });
      });
    });
  });
  describe('POST /api/courses/:id/users', () => {
    it('it should return a 401 if the user is not logged.', (done) => {
      models.User.findOne({ where: { username: userWithNoRole.username } }).then((newUser) => {
        addCourseDefault(admin, user).then((result) => {
          const session = chai.request.agent(server);
          session
            .post(`/api/courses/${result.course.id}/users`)
            .send({
              userId: newUser.id,
              roleId: 9,
            })
            .end((err, res) => {
              res.should.have.status(401);
              done();
            });
        });
      });
    });
    it('it should return a 422 if the user id is missing.', (done) => {
      models.User.findOne({ where: { username: userWithNoRole.username } }).then((newUser) => {
        addCourseDefault(admin, user).then((result) => {
          const session = chai.request.agent(server);
          session
            .post(`/api/courses/${result.course.id}/users`)
            .send({
              roleId: 9,
            })
            .end((err, res) => {
              res.should.have.status(422);
              done();
            });
        });
      });
    });
    it('it should return a 422 if the role id is missing.', (done) => {
      models.User.findOne({ where: { username: userWithNoRole.username } }).then((newUser) => {
        addCourseDefault(admin, user).then((result) => {
          const session = chai.request.agent(server);
          session
            .post(`/api/courses/${result.course.id}/users`)
            .send({
              userId: newUser.id,
            })
            .end((err, res) => {
              res.should.have.status(422);
              done();
            });
        });
      });
    });
    it('it should return a 404 if the course does not exists.', (done) => {
      models.User.findOne({ where: { username: userWithNoRole.username } }).then((newUser) => {
        addCourseDefault(admin, user).then((result) => {
          const session = chai.request.agent(server);
          session
            .post('/api/users/login')
            .send(admin)
            .end((err, res) => {
              session
                .post('/api/courses/9999/users')
                .send({
                  userId: newUser.id,
                  roleId: 9,
                })
                .end((err, res) => {
                  res.should.have.status(404);
                  done();
                });
            });
        });
      });
    });
    it('it should return a 403 if the course does not exists.', (done) => {
      models.User.findOne({ where: { username: userWithNoRole.username } }).then((newUser) => {
        addCourseDefault(admin, user).then((result) => {
          const session = chai.request.agent(server);
          session
            .post('/api/users/login')
            .send(user)
            .end((err, res) => {
              session
                .post(`/api/courses/${result.course.id}/users`)
                .send({
                  userId: newUser.id,
                  roleId: 9,
                })
                .end((err, res) => {
                  res.should.have.status(403);
                  done();
                });
            });
        });
      });
    });
    it('it should return a 400 if the users does not exists.', (done) => {
      models.User.findOne({ where: { username: userWithNoRole.username } }).then((newUser) => {
        addCourseDefault(admin, user).then((result) => {
          const session = chai.request.agent(server);
          session
            .post('/api/users/login')
            .send(admin)
            .end((err, res) => {
              session
                .post(`/api/courses/${result.course.id}/users`)
                .send({
                  userId: 99999,
                  roleId: 9,
                })
                .end((err, res) => {
                  res.should.have.status(400);
                  done();
                });
            });
        });
      });
    });
    it('it should return a 200 if the user is admin and pass correct data.', (done) => {
      models.User.findOne({ where: { username: userWithNoRole.username } }).then((newUser) => {
        addCourseDefault(admin, user).then((result) => {
          const session = chai.request.agent(server);
          session
            .post('/api/users/login')
            .send(admin)
            .end((err, res) => {
              session
                .post(`/api/courses/${result.course.id}/users`)
                .send({
                  userId: newUser.id,
                  roleId: 8,
                })
                .end((err, res) => {
                  res.should.have.status(200);
                  done();
                });
            });
        });
      });
    });
    it('it should return a 400 if the user is was already added.', (done) => {
      models.User.findOne({ where: { username: userWithNoRole.username } }).then((newUser) => {
        addCourseDefault(admin, user).then((result) => {
          const session = chai.request.agent(server);
          session
            .post('/api/users/login')
            .send(admin)
            .end((err, res) => {
              session
                .post(`/api/courses/${result.course.id}/users`)
                .send({
                  userId: result.users[1].id,
                  roleId: 8,
                })
                .end((err, res) => {
                  res.should.have.status(400);
                  done();
                });
            });
        });
      });
    });
  });
  describe('DELETE /api/courses/:id/content/:contentId', () => {
    it('it should return a 401 if the user is not logged in.', (done) => {
      models.User.findOne({ where: { username: userWithNoRole.username } }).then((newUser) => {
        addCourseDefault(admin, user).then((result) => {
          const session = chai.request.agent(server);
          session
            .delete('/api/courses/1/content/1')
            .end((err, res) => {
              res.should.have.status(401);
              done();
            });
        });
      });
    });
    it('it should return a 404 if the course does not exits.', (done) => {
      models.User.findOne({ where: { username: userWithNoRole.username } }).then((newUser) => {
        addCourseDefault(admin, user).then((result) => {
          const session = chai.request.agent(server);
          session
            .post('/api/users/login')
            .send(admin)
            .end((err, res) => {
              session
                .delete('/api/courses/999/content/1')
                .end((err, res) => {
                  res.should.have.status(404);
                  done();
                });
            });
        });
      });
    });
    it('it should return a 404 if the knowledge unit does not exits.', (done) => {
      models.User.findOne({ where: { username: userWithNoRole.username } }).then((newUser) => {
        addCourseDefault(admin, user).then((result) => {
          const session = chai.request.agent(server);
          session
            .post('/api/users/login')
            .send(admin)
            .end((err, res) => {
              session
                .delete('/api/courses/1/content/999')
                .end((err, res) => {
                  res.should.have.status(404);
                  done();
                });
            });
        });
      });
    });
    it('it should return a 403 if the user does not have the permission to delete.', (done) => {
      models.User.findOne({ where: { username: userWithNoRole.username } }).then((newUser) => {
        addCourseDefault(admin, user).then((result) => {
          const session = chai.request.agent(server);
          session
            .post('/api/users/login')
            .send(user)
            .end((err, res) => {
              session
                .delete('/api/courses/1/content/1')
                .end((err, res) => {
                  res.should.have.status(403);
                  done();
                });
            });
        });
      });
    });
    it('it should return a 403 if the user does not have the permission to do the deletion, cause he/she has no connection to the course at all.', (done) => {
      models.User.findOne({ where: { username: userWithNoRole.username } }).then((newUser) => {
        addCourseDefault(admin, user).then((result) => {
          const session = chai.request.agent(server);
          session
            .post('/api/users/login')
            .send(userWithNoRole)
            .end((err, res) => {
              session
                .delete('/api/courses/1/content/1')
                .end((err, res) => {
                  res.should.have.status(403);
                  done();
                });
            });
        });
      });
    });

    it('it should return a 200 if the deletion was successful', (done) => {
      models.User.findOne({ where: { username: userWithNoRole.username } }).then((newUser) => {
        addCourseDefault(admin, user).then((result) => {
          const session = chai.request.agent(server);
          session
            .post('/api/users/login')
            .send(admin)
            .end((err, res) => {
              session
                .delete('/api/courses/1/content/1')
                .end((err, res) => {
                  res.should.have.status(200);
                  done();
                });
            });
        });
      });
    });
  });

  it('it should return a 400 if there is no update available', (done) => {
    models.User.findOne({ where: { username: userWithNoRole.username } }).then((newUser) => {
      addCourseDefault(admin, user).then((result) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            session
              .get('/api/courses/1/content/2/update')
              .end((err, res) => {
                res.should.have.status(400);
                done();
              });
          });
      });
    });
  });
  it('it should return a 200 if there is an update available', (done) => {
    models.User.findOne({ where: { username: userWithNoRole.username } }).then((newUser) => {
      addCourseDefault(admin, user).then((result) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            session
              .get('/api/courses/1/content/1/update')
              .end((err, res) => {
                res.should.have.status(200);

                done();
              });
          });
      });
    });
  });
  describe('POST /api/courses/:id/content', () => {
    it('it should return a 401 if the user is not logged in.', (done) => {
      models.User.findOne({ where: { username: userWithNoRole.username } }).then((newUser) => {
        addCourseDefault(admin, user).then((result) => {
          const session = chai.request.agent(server);
          session
            .post(`/api/courses/${result.course.id}/content`)
            .send({ contentId: 1 })
            .end((err, res) => {
              res.should.have.status(401);
              done();
            });
        });
      });
    });
    it('it should return a 404 if the course does not exists.', (done) => {
      models.User.findOne({ where: { username: userWithNoRole.username } }).then((newUser) => {
        addCourseDefault(admin, user).then((result) => {
          const session = chai.request.agent(server);
          session
            .post('/api/users/login')
            .send(admin)
            .end((err, res) => {
              session
                .post('/api/courses/999/content')
                .send({ contentId: 1 })
                .end((err, res) => {
                  res.should.have.status(404);
                  done();
                });
            });
        });
      });
    });
    it('it should return a 500 if the knowledge unit does not exists.', (done) => {
      models.User.findOne({ where: { username: userWithNoRole.username } }).then((newUser) => {
        addCourseDefault(admin, user).then((result) => {
          const session = chai.request.agent(server);
          session
            .post('/api/users/login')
            .send(admin)
            .end((err, res) => {
              session
                .post(`/api/courses/${result.course.id}/content`)
                .send({ contentId: 9999 })
                .end((err, res) => {
                  res.should.have.status(500);
                  done();
                });
            });
        });
      });
    });
    it('it should return a 403 if the user does not have enough permissions.', (done) => {
      models.User.findOne({ where: { username: userWithNoRole.username } }).then((newUser) => {
        addCourseDefault(admin, user).then((result) => {
          const session = chai.request.agent(server);
          session
            .post('/api/users/login')
            .send(user)
            .end((err, res) => {
              session
                .post(`/api/courses/${result.course.id}/content`)
                .send({ contentId: 2 })
                .end((err, res) => {
                  res.should.have.status(403);
                  done();
                });
            });
        });
      });
    });
    it('it should return a 403 if the user is not part of the course.', (done) => {
      models.User.findOne({ where: { username: userWithNoRole.username } }).then((newUser) => {
        addCourseDefault(admin, user).then((result) => {
          const session = chai.request.agent(server);
          session
            .post('/api/users/login')
            .send(userWithNoRole)
            .end((err, res) => {
              session
                .post(`/api/courses/${result.course.id}/content`)
                .send({ contentId: 2 })
                .end((err, res) => {
                  res.should.have.status(403);
                  done();
                });
            });
        });
      });
    });
    it('it should return a 200 if the user has enough permissions.', (done) => {
      models.User.findOne({ where: { username: userWithNoRole.username } }).then((newUser) => {
        addCourseDefault(admin, user).then((result) => {
          const session = chai.request.agent(server);
          session
            .post('/api/users/login')
            .send(admin)
            .end((err, res) => {
              session
                .post(`/api/courses/${result.course.id}/content`)
                .send({ contentId: 2 })
                .end((err, res) => {
                  res.should.have.status(200);
                  done();
                });
            });
        });
      });
    });
  });
});
