import chaiHttp from 'chai-http';
import chai from 'chai';

import models from '../server/config/sequelize';
import server from '../server/';

chai.should();
chai.use(chaiHttp);
const agent = chai.request.agent(server);

describe('KnowledgeUnit', () => {
  const knowledgeUnits = [];
  const learningUnits = [];
  const userKnowledgeUnit = {
    username: 'user_knowlwdgeunit',
    password: 'password',
    email: 'user@knowledgeunit.com',
  };
  const admin = {
    username: 'admin',
    password: 'admin',
  };

  before((done) => {
    models.LearningUnit.create({})
      .then((result) => {
        const learningUnit = result.get();
        learningUnits.push(learningUnit);

        chai.request(server)
          .post('/api/users')
          .send(userKnowledgeUnit)
          .end((err, res) => {
            res.should.have.status(200);

            models.User.update({
              active: true,
            }, {
              where: {
                username: userKnowledgeUnit.username,
              },
            })
              .then(() => {
                done();
              });
          });
      });
  });

  after((done) => {
    server.close();

    done();
  });

  describe('GET /api/knowledgeUnits', () => {
    it('it should GET all the knowledgeUnits', (done) => {
      chai.request(server).keepOpen()
        .get('/api/knowledgeUnits')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(2);

          done();
        });
    });
  });

  describe('GET /api/knowledgeUnits/taxonomies', () => {
    it('it should GET all the relevant taxonomies for adding a knowledge Unit', (done) => {
      chai.request(server).keepOpen()
        .get('/api/knowledgeUnits/taxonomies')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');

          done();
        });
    });
  });

  describe('POST /api/knowledgeUnits', () => {
    it('it should not be possible to add a Knowledge Unit when not logged in', (done) => {
      chai.request(server).keepOpen()
        .post('/api/knowledgeUnits')
        .send({})
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');

          done();
        });
    });

    it('it should not allow a user without the proper permissions to add a Knowledge Unit', (done) => {
      agent
        .post('/api/users/login')
        .send(userKnowledgeUnit)
        .end((err, res) => {
          res.should.have.status(200);

          agent
            .post('/api/knowledgeUnits')
            .send({
              LearningUnitId: learningUnits[0].id,
            })
            .end((err1, res1) => {
              res1.should.have.status(403);
              res1.body.should.be.a('object');
              res1.body.should.have.property('error');

              done();
            });
        });
    });

    it('it should display an error when adding a Knowledge Unit without required fields', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .post('/api/knowledgeUnits')
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

    it('it should allow a user with the proper permissions to add a Knowledge Unit', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .post('/api/knowledgeUnits')
            .send({
              LearningUnitId: learningUnits[0].id,
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('id');

              knowledgeUnits[0] = res.body.id;

              done();
            });
        });
    });

    it('it should allow a user with the proper permissions to add a different Knowledge Unit', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .post('/api/knowledgeUnits')
            .send({
              LearningUnitId: learningUnits[0].id,
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('id');

              knowledgeUnits[0] = res.body.id;

              done();
            });
        });
    });
  });

  describe('GET /api/knowledgeUnits/:id', () => {
    it('it should display KnowledgeUnit information', (done) => {
      chai.request(server).keepOpen()
        .get(`/api/knowledgeUnits/${knowledgeUnits[0]}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');

          done();
        });
    });

    it('it should display KnowledgeUnit information when logged in', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .get(`/api/knowledgeUnits/${knowledgeUnits[0]}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('id');

              done();
            });
        });
    });
  });

  describe('GET /api/knowledgeUnits/own', () => {
    it('it should display a users knowledge units', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .get('/api/knowledgeUnits/own')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.gte(1);

              done();
            });
        });
    });
  });

  describe('PATCH /api/knowledgeUnits/markLectored:id', () => {
    it('it should not be possible to add mark a Knowledge Unit lectored when not logged in', (done) => {
      chai.request(server).keepOpen()
        .patch(`/api/knowledgeUnits/markLectored/${knowledgeUnits[0]}`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');

          done();
        });
    });

    it('it should not allow a user without the proper permissions to mark a Knowledge Unit lectored', (done) => {
      agent
        .post('/api/users/login')
        .send(userKnowledgeUnit)
        .end(() => {
          agent
            .patch(`/api/knowledgeUnits/markLectored/${knowledgeUnits[0]}`)
            .end((err, res) => {
              res.should.have.status(403);
              res.body.should.be.a('object');
              res.body.should.have.property('error');

              done();
            });
        });
    });

    it('it should allow a user with the proper permissions to mark a Knowledge Unit lectored', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .patch(`/api/knowledgeUnits/markLectored/${knowledgeUnits[0]}`)
            .send({
              LearningUnitId: learningUnits[0].id,
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(1);

              done();
            });
        });
    });
  });

  describe('PATCH /api/knowledgeUnits/markReviewed:id', () => {
    it('it should not be possible to add mark a Knowledge Unit reviewed when not logged in', (done) => {
      chai.request(server).keepOpen()
        .patch(`/api/knowledgeUnits/markReviewed/${knowledgeUnits[0]}`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');

          done();
        });
    });

    it('it should not allow a user without the proper permissions to add a Knowledge Unit', (done) => {
      agent
        .post('/api/users/login')
        .send(userKnowledgeUnit)
        .end(() => {
          agent
            .patch(`/api/knowledgeUnits/markReviewed/${knowledgeUnits[0]}`)
            .end((err, res) => {
              res.should.have.status(403);
              res.body.should.be.a('object');
              res.body.should.have.property('error');

              done();
            });
        });
    });

    it('it should allow a user with the proper permissions to mark a Knowledge Unit reviewed', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .patch(`/api/knowledgeUnits/markReviewed/${knowledgeUnits[0]}`)
            .send({
              LearningUnitId: learningUnits[0].id,
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(1);

              done();
            });
        });
    });
  });

  describe('DELETE /api/knowledgeUnits/:id', () => {
    it('it should not be possible to delete a KnowledgeUnit without capability', (done) => {
      chai.request(server).keepOpen()
        .delete(`/api/knowledgeUnits/${knowledgeUnits[0]}`)
        .end((err, res) => {
          res.should.have.status(401);

          done();
        });
    });
  });

  describe('DELETE /api/knowledgeUnits/:id', () => {
    it('it should be possible to delete a KnowledgeUnit with proper capability', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .delete(`/api/knowledgeUnits/${knowledgeUnits[0]}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('deleted');

              done();
            });
        });
    });
  });
});
