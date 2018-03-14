import chaiHttp from 'chai-http';
import chai from 'chai';

import models from '../server/config/sequelize';
import server from '../server/';

chai.should();
chai.use(chaiHttp);
// const agent = chai.request.agent(server);

describe('LearningUnit', () => {
  const learningUnit = {};
  const learningUnit1 = {};
  const learningUnits = [];

  before((done) => {
    models.LearningUnit.truncate({
      restartIdentity: true,
      cascade: true,
    });

    done();
  });

  after((done) => {
    server.close();

    done();
  });

  describe('GET /api/learningUnits', () => {
    it('it should GET all the learningUnits', (done) => {
      chai.request(server)
        .get('/api/learningUnits')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);

          done();
        });
    });
  });

  describe('POST /api/learningUnits', () => {
    /*
    it('it should display an error when required fields are missing', (done) => {
      chai.request(server)
        .post('/api/learningUnits')
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('errors');
          res.body.errors.length.should.be.eql(1);

          done();
        });
    });
    */

    it('it should add a new LearningUnit', (done) => {
      chai.request(server)
        .post('/api/learningUnits')
        .send(learningUnit)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('createdAt');

          learningUnits[0] = res.body.id;

          done();
        });
    });

    /*
    it('it should not add the same LearningUnit twice', (done) => {
      chai.request(server)
        .post('/api/learningUnits')
        .send(learningUnit)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('errors');
          res.body.errors.length.should.be.eql(1);

          done();
        });
    });
    */

    it('it should add a different LearningUnit', (done) => {
      chai.request(server)
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

  describe('GET /api/learningUnits/:id', () => {
    it('it should display LearningUnit information', (done) => {
      chai.request(server)
        .get(`/api/learningUnits/${learningUnits[0]}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('createdAt');

          done();
        });
    });
  });

  describe('DELETE /api/learningUnits/:id', () => {
    it('it should be possible to delete a LearningUnit', (done) => {
      chai.request(server)
        .delete(`/api/learningUnits/${learningUnits[0]}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('deleted');

          done();
        });
    });
  });
});
