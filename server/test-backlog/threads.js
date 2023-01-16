import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import models from '../server/config/sequelize';
import server from '../server';
import { up } from '../seeders/00020-Users';

const moment = require('moment');

chai.should();
chai.use(chaiHttp);
const agent = chai.request.agent(server);

describe('Threads', () => {
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

  describe('GET /api/threads', () => {
    it('it should return a list of thread which are public available (no courseId)', (done) => {
      models.Thread.findAll({
        where: {
          courseId: null,
        },
      }).then((threads) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .get('/api/threads')
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                expect(res.body.length).to.equal(threads.length);
                done();
              });
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
  });

  describe('GET /api/threads/stats', () => {
    it('it should return a counter for the threads', (done) => {
      models.Thread.findAll({
        where: {
          courseId: null,
        },
      }).then((threads) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .get('/api/threads/stats')
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
  });

  describe('GET /api/threads/:id', () => {
    it('it should return a 400 for a invalid thread', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end((err, res) => {
          res.should.have.status(200);
          agent
            .get('/api/threads/999')
            .end((err, res) => {
              res.should.have.status(400);
              done();
            });
        });
    });
    it('it should return a single thread', (done) => {
      models.Thread.create({
        courseId: 1, userId: 1, summary: 'Test', lastPostAt: new Date(), lastPostFrom: 1,
      }).then((thread) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .get(`/api/threads/${thread.id}`)
              .send({ text: '<p>zzz</p>' })
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                expect(res.body.summary).to.equal('Test');
                done();
              });
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
    it('it should return a 403 if user is not in admin', (done) => {
      models.Thread.create({
        courseId: 1, userId: 1, summary: 'Failing test', lastPostAt: new Date(), lastPostFrom: 1,
      }).then((thread) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .get(`/api/threads/${thread.id}`)
              .end((err, res) => {
                res.should.have.status(403);
                done();
              });
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
  });

  describe('POST /api/threads', () => {
    it('trying to create a thread without beging logged should return 401', (done) => {
      chai.request(server).keepOpen()
        .post('/api/threads')
        .send({})
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it('trying to create a thread without providing all data should return 422', (done) => {
      const session = chai.request.agent(server);
      session.post('/api/users/login')
        .send(admin)
        .end((err, res) => {
          session
            .post('/api/threads')
            .send({})
            .end((err, res) => {
              res.should.have.status(422);
              done();
            });
        });
    });
    it('trying to create a thread with providing all data should return 200', (done) => {
      const session = chai.request.agent(server);
      session.post('/api/users/login')
        .send(admin)
        .end((err, res) => {
          session
            .post('/api/threads')
            .send({ summary: 'Test', text: '<p>test</p>' })
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
        });
    });
    it('trying to create a thread for a course without permission ends in 403', (done) => {
      const session = chai.request.agent(server);
      session.post('/api/users/login')
        .send(user)
        .end((err, res) => {
          session
            .post('/api/threads')
            .send({ summary: 'Test', text: '<p>test</p>', courseId: 1 })
            .end((err, res) => {
              res.should.have.status(403);
              done();
            });
        });
    });
    it('trying to create a thread for a course with permission ends in 200', (done) => {
      const session = chai.request.agent(server);
      session.post('/api/users/login')
        .send(admin)
        .end((err, res) => {
          session
            .post('/api/threads')
            .send({ summary: 'Test', text: '<p>test</p>', courseId: 1 })
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
        });
    });
  });

  describe('PATCH /api/threads/:id', () => {
    it('it should return a 403 if user is not an admin', (done) => {
      models.Thread.create({
        courseId: 1, userId: 1, summary: 'Test', lastPostAt: new Date(), lastPostFrom: 1,
      }).then((thread) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .patch(`/api/threads/${thread.id}`)
              .send({ summary: 'asdf' })
              .end((err, res) => {
                res.should.have.status(403);
                done();
              });
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
    it('it should return a 200 if user is admin', (done) => {
      const session = chai.request.agent(server);
      session
        .post('/api/users/login')
        .send(admin)
        .end((err, res) => {
          res.should.have.status(200);
          session
            .post('/api/threads')
            .send({ summary: 'Test', text: '<p>test</p>', courseId: 1 })
            .end((err, res) => {
              res.should.have.status(200);
              session
                .patch(`/api/threads/${res.body.id}`)
                .send({ summary: 'asdf' })
                .end((err, res) => {
                  res.should.have.status(200);
                  done();
                });
            });
        });
    });
    it('it should return a 403 if user is not owner and no admin', (done) => {
      models.Thread.create({
        courseId: 1, userId: 3, summary: 'Failing test', lastPostAt: new Date(), lastPostFrom: 1,
      }).then((thread) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .patch(`/api/threads/${thread.id}`)
              .end((err, res) => {
                res.should.have.status(403);
                done();
              });
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
  });

  describe('DELETE /api/threads/:id', () => {
    it('it should return a 403 if user is not an admin', (done) => {
      models.Thread.create({
        courseId: 1, userId: 1, summary: 'Test', lastPostAt: new Date(), lastPostFrom: 1,
      }).then((thread) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .delete(`/api/threads/${thread.id}`)
              .send({ summary: 'asdf' })
              .end((err, res) => {
                res.should.have.status(403);
                done();
              });
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
    it('it should return a 200 if user is admin', (done) => {
      const session = chai.request.agent(server);
      session
        .post('/api/users/login')
        .send(admin)
        .end((err, res) => {
          res.should.have.status(200);
          session
            .post('/api/threads')
            .send({ summary: 'Test', text: '<p>test</p>', courseId: 1 })
            .end((err, res) => {
              res.should.have.status(200);
              session
                .delete(`/api/threads/${res.body.id}`)
                .send({ summary: 'asdf' })
                .end((err, res) => {
                  res.should.have.status(200);
                  done();
                });
            });
        });
    });
    it('it should return a 403 if user is not owner and no admin', (done) => {
      models.Thread.create({
        courseId: 1, userId: 3, summary: 'Failing test', lastPostAt: new Date(), lastPostFrom: 1,
      }).then((thread) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .delete(`/api/threads/${thread.id}`)
              .end((err, res) => {
                res.should.have.status(403);
                done();
              });
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
  });

  describe('POST /api/threads/:id/answers', () => {
    it('it should return a 200 if the user is admin', (done) => {
      models.Thread.create({
        courseId: 1, userId: 1, summary: 'Test', lastPostAt: new Date(), lastPostFrom: 1,
      }).then((thread) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .post(`/api/threads/${thread.id}/answers`)
              .send({ text: '<p>zzz</p>' })
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('text');
                res.body.text.should.be.eql('<p>zzz</p>');
                done();
              });
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
    it('it should return a 200 if the user is the creator', (done) => {
      models.Thread.create({
        courseId: 1, userId: 2, summary: 'Test', lastPostAt: new Date(), lastPostFrom: 1,
      }).then((thread) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .post(`/api/threads/${thread.id}/answers`)
              .send({ text: '<p>zzz</p>' })
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('text');
                res.body.text.should.be.eql('<p>zzz</p>');
                done();
              });
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
    it('it should return a 403 if the user is not the creator or an admin', (done) => {
      models.Thread.create({
        courseId: 1, userId: 1, summary: 'Test', lastPostAt: new Date(), lastPostFrom: 1,
      }).then((thread) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(userWithNoRole)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .post(`/api/threads/${thread.id}/answers`)
              .send({ text: '<p>zzz</p>' })
              .end((err, res) => {
                res.should.have.status(403);
                done();
              });
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
    it('it should return a 200 if the thread is not related to a course', (done) => {
      models.Thread.create({
        userId: 1, summary: 'Test', lastPostAt: new Date(), lastPostFrom: 1,
      }).then((thread) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(userWithNoRole)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .post(`/api/threads/${thread.id}/answers`)
              .send({ text: '<p>zzz</p>' })
              .end((err, res) => {
                res.should.have.status(200);
                done();
              });
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
    it('it should return a 422 if text is null', (done) => {
      models.Thread.create({
        userId: 1, summary: 'Test', lastPostAt: new Date(), lastPostFrom: 1,
      }).then((thread) => {
        const session = chai.request.agent(server);
        session
          .post('/api/users/login')
          .send(userWithNoRole)
          .end((err, res) => {
            res.should.have.status(200);
            session
              .post(`/api/threads/${thread.id}/answers`)
              .send({ text: null })
              .end((err, res) => {
                res.should.have.status(422);
                done();
              });
          });
      }).catch((rr) => {
        console.error(rr);
      });
    });
  });
});
