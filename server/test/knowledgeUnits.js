import chaiHttp from 'chai-http';
import chai from 'chai';

import models from '../server/config/sequelize';
import server from '../server/';

chai.should();
chai.use(chaiHttp);
// const agent = chai.request.agent(server);

describe('KnowledgeUnit', () => {
  const knowledgeUnits = [];
  const learningUnits = [];
  const users = [];

  before((done) => {
    models.KnowledgeUnit.truncate({
      restartIdentity: true,
      cascade: true,
    });

    models.LearningUnit.truncate({
      restartIdentity: true,
      cascade: true,
    });

    models.User.truncate({
      restartIdentity: true,
      cascade: true,
    });

    models.LearningUnit.create({})
      .then((result) => {
        const learningUnit = result.get();
        learningUnits.push(learningUnit);

        models.User.create({
          username: 'user',
          email: 'foobar@example.com',
          password: 'foobar',
        })
          .then((user) => {
            users.push(user.get());

            done();
          });
      });
  });

  after((done) => {
    server.close();

    done();
  });

  describe('GET /api/knowledgeUnits', () => {
    it('it should GET all the knowledgeUnits', (done) => {
      chai.request(server)
        .get('/api/knowledgeUnits')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);

          done();
        });
    });
  });

  describe('POST /api/knowledgeUnits', () => {
    it('it should display an error when required fields are missing', (done) => {
      chai.request(server)
        .post('/api/knowledgeUnits')
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('errors');
          res.body.errors.length.should.be.eql(4);

          done();
        });
    });

    it('it should add a new KnowledgeUnit', (done) => {
      chai.request(server)
        .post('/api/knowledgeUnits')
        .send({
          LearningUnitId: learningUnits[0].id,
          UserId: users[0].id,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('createdAt');

          knowledgeUnits[0] = res.body.id;

          done();
        });
    });

    it('it should add a different KnowledgeUnit', (done) => {
      chai.request(server)
        .post('/api/knowledgeUnits')
        .send({
          LearningUnitId: learningUnits[0].id,
          UserId: users[0].id,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('createdAt');

          knowledgeUnits[1] = res.body.id;

          done();
        });
    });
  });

  describe('GET /api/knowledgeUnits/:id', () => {
    it('it should display KnowledgeUnit information', (done) => {
      chai.request(server)
        .get(`/api/knowledgeUnits/${knowledgeUnits[0]}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('createdAt');

          done();
        });
    });
  });

  describe('DELETE /api/knowledgeUnits/:id', () => {
    it('it should be possible to delete a KnowledgeUnit', (done) => {
      chai.request(server)
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
