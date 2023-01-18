import chaiHttp from 'chai-http';
import chai from 'chai';

import models from '../server/config/sequelize';
import server from '../server/';

chai.should();
chai.use(chaiHttp);
const agent = chai.request.agent(server);

describe('LogUser', () => {
  const userLog = {
    username: 'user_log',
    password: 'password',
    email: 'user@log.com',
  };
  const admin = {
    username: 'admin',
    password: 'admin',
  };

  before((done) => {
    chai.request(server).keepOpen()
      .post('/api/users')
      .send(userLog)
      .end((err, res) => {
        res.should.have.status(200);

        models.User.update({
          active: true,
        }, {
          where: {
            username: userLog.username,
          },
        })
          .then(() => {
            done();
          });
      });
  });

  after((done) => {
    server.close();

    done();
  });

  describe('GET /api/knowledgeUnits/:id', () => {
    it('it should display KnowledgeUnit information when logged in', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .get('/api/knowledgeUnits')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');

              const length = res.body.length;
              let count = 1;
              for (let i = 0; i < length; i += 1) {
                agent
                  .post('/api/users/login')
                  .send(admin)
                  .end(() => {
                    agent
                      .get(`/api/knowledgeUnits/${res.body[i].id}`)
                      .end((err, res) => {
                        if(count++ == length) {
                          done();
                        }
                      });
                  });
              }
            });
        });
    });
  });

  describe('GET /api/learningUnits/:id', () => {
    it('it should display LearningUnit information when logged in', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .get('/api/learningUnits')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');

              const length = res.body.length;
              let count = 1;
              for (let i = 0; i < length; i += 1) {
                agent
                  .post('/api/users/login')
                  .send(admin)
                  .end(() => {
                    agent
                      .get(`/api/learningUnits/${res.body[i].id}`)
                      .end((err, res) => {
                        if(count++ == length) {
                          done();
                        }
                      });
                  });
              }
            });
        });
    });
  });

  describe('GET /api/logs', () => {
    it('it should not be possible to get logs when not logged in', (done) => {
      chai.request(server).keepOpen()
        .get('/api/logs')
        .end((err, res) => {
          res.should.have.status(401);

          done();
        });
    });

    it('it should not be possible to get logs without proper permission', (done) => {
      agent
        .post('/api/users/login')
        .send(userLog)
        .end(() => {
          agent
            .get('/api/logs')
            .end((err, res) => {
              res.should.have.status(403);

              done();
            });
        });
    });

    it('it should be possible to get logs with proper permission', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .get('/api/logs')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.gt(0);
              res.body.length.should.be.lte(5);

              done();
            });
        });
    });

    it('it should be possible to get logs filtered by user with proper permission', (done) => {
      const userIdFilter = 1;
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .get(`/api/logs?user_id=${userIdFilter}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.gt(0);
              res.body.length.should.be.lte(5);

              const entries = res.body;
              entries.forEach((item) => {
                item.userId.should.be.eq(userIdFilter);
              });

              done();
            });
        });
    });

    it('it should be possible to get logs filtered by user and KU with proper permission', (done) => {
      const userIdFilter = 1;
      const knowledgeUntitIdFilter = 1;
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .get(`/api/logs?user_id=${userIdFilter}&knowledge_unit_id=${knowledgeUntitIdFilter}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.gt(0);
              res.body.length.should.be.lte(5);

              const entries = res.body;
              entries.forEach((item) => {
                item.userId.should.be.eq(userIdFilter);
                item.KnowlegeUnitId.should.be.eq(knowledgeUntitIdFilter);
              });

              done();
            });
        });
    });

    it('it should be possible to get logs filtered by user and LU with proper permission', (done) => {
      const userIdFilter = 1;
      const learningUntitIdFilter = 1;
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .get(`/api/logs?user_id=${userIdFilter}&learning_unit_id=${learningUntitIdFilter}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.gt(0);
              res.body.length.should.be.lte(5);

              const entries = res.body;
              entries.forEach((item) => {
                item.userId.should.be.eq(userIdFilter);
                item.LearningUnitId.should.be.eq(learningUntitIdFilter);
              });

              done();
            });
        });
    });

    // TODO: Test by course ID

    it('it should be possible to get logs filtered by user, LU and date (from future) range with proper permission', (done) => {
      const userIdFilter = 1;
      const learningUntitIdFilter = 1;
      const from = new Date();
      const year = from.getFullYear();
      from.setYear(year + 10);
      const fromIso = from.toISOString();

      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
          .get(`/api/logs?user_id=${userIdFilter}&learning_unit_id=${learningUntitIdFilter}&date_from=${fromIso}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eq(0);

              done();
            });
        });
    });

    it('it should be possible to get logs filtered by user, LU and date (from future) range with proper permission', (done) => {
      const userIdFilter = 1;
      const learningUntitIdFilter = 1;
      const from = new Date();
      const year = from.getFullYear();
      from.setYear(year + 10);
      const fromIso = from.toISOString();

      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
          .get(`/api/logs?user_id=${userIdFilter}&learning_unit_id=${learningUntitIdFilter}&date_to=${fromIso}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.gt(0);

              done();
            });
        });
    });

    it('it should be possible to get a log export filtered by user, LU and date (from future) range with proper permission', (done) => {
      const userIdFilter = 1;
      const learningUntitIdFilter = 1;
      const from = new Date();
      const year = from.getFullYear();
      from.setYear(year + 10);
      const fromIso = from.toISOString();

      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
          .get(`/api/logs/export?user_id=${userIdFilter}&learning_unit_id=${learningUntitIdFilter}&date_to=${fromIso}`)
            .end((err, res) => {
              res.should.have.status(200);

              done();
            });
        });
    });
  });
});
