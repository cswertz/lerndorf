import chaiHttp from 'chai-http';
import chai from 'chai';

import models from '../server/config/sequelize';
import server from '../server/';

chai.should();
chai.use(chaiHttp);
const agent = chai.request.agent(server);

describe('LearningUnit', () => {
  const learningUnit = {
    language: 1,
    title: 'Testing',
  };
  const learningUnit1 = {
    language: 2,
    title: 'Testing 1',
  };
  const learningUnits = [];
  const userLearningUnit = {
    username: 'user_learningunit',
    password: 'password',
    email: 'user@learningunit.com',
  };
  const admin = {
    username: 'admin',
    password: 'admin',
  };

  before((done) => {
    chai.request(server).keepOpen()
      .post('/api/users')
      .send(userLearningUnit)
      .end((err, res) => {
        res.should.have.status(200);

        models.User.update({
          active: true,
        }, {
          where: {
            username: userLearningUnit.username,
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

  describe('GET /api/learningUnits', () => {
    it('it should GET all the learningUnits', (done) => {
      chai.request(server).keepOpen()
        .get('/api/learningUnits')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');

          done();
        });
    });
  });

  describe('POST /api/learningUnits', () => {
    it('it should not be possible to add a knowledgeUnit when not logged in', (done) => {
      chai.request(server).keepOpen()
        .post('/api/learningUnits')
        .send({})
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');

          done();
        });
    });

    it('it should not allow a user without the proper permissions to add a role', (done) => {
      agent
        .post('/api/users/login')
        .send(userLearningUnit)
        .end(() => {
          agent
            .post('/api/learningUnits')
            .send(learningUnit)
            .end((err, res) => {
              res.should.have.status(403);
              res.body.should.be.a('object');
              res.body.should.have.property('error');

              done();
            });
        });
    });

    it('it should display an error when adding a Learning Unit without required fields', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .post('/api/learningUnits')
            .send({})
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.should.have.property('errors');

              done();
            });
        });
    });

    it('it should allow a user with the proper permissions to add a learningUnit', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .post('/api/learningUnits')
            .send(learningUnit)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('id');
              res.body.should.have.property('createdAt');
              res.body.should.have.property('UserId');

              learningUnits[0] = res.body.id;

              done();
            });
        });
    });

    it('it should allow a user with the proper permissions to add a different learningUnit', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .post('/api/learningUnits')
            .send(learningUnit1)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('id');
              res.body.should.have.property('createdAt');

              learningUnits[1] = res.body.id;

              done();
            });
        });
    });
  });

  describe('GET /api/learningUnits/:id', () => {
    it('it should display LearningUnit information', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .get(`/api/learningUnits/${learningUnits[1]}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body[0].should.have.property('id');
              res.body[0].should.have.property('title');
              res.body[0].should.have.property('Language');
              res.body[0].should.have.property('User');
              res.body[0].should.have.property('LearningUnit');

              done();
            });
        });
    });
  });

  describe('DELETE /api/learningUnits/:id', () => {
    it('it should not be possible to delete a Learning unit when not logged in', (done) => {
      chai.request(server).keepOpen()
        .delete(`/api/learningUnits/${learningUnits[0]}`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');

          done();
        });
    });

    it('it should not allow a user without the proper permissions to delete a learning Unit', (done) => {
      agent
        .post('/api/users/login')
        .send(userLearningUnit)
        .end(() => {
          agent
            .delete(`/api/learningUnits/${learningUnits[0]}`)
            .end((err, res) => {
              res.should.have.status(403);
              res.body.should.be.a('object');

              done();
            });
        });
    });

    it('it should allow a user with the proper permissions to delete a learning Unit', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .delete(`/api/learningUnits/${learningUnits[0]}`)
            .end((err, res) => {
              agent
                .get('/api/users/logout')
                .end(() => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');

                  done();
                });
            });
        });
    });
  });
});
