import chaiHttp from 'chai-http';
import chai from 'chai';

import models from '../server/config/sequelize';
import server from '../server/';

chai.should();
chai.use(chaiHttp);

describe('File', () => {
  const file = {
    name: 'name',
  };
  const file1 = {
    name: 'name1',
  };
  const files = [];

  before((done) => {
    models.File.truncate({
      restartIdentity: true,
      cascade: true,
    });

    done();
  });

  after((done) => {
    server.close();

    done();
  });

  describe('GET /api/files', () => {
    it('it should GET all the files', (done) => {
      chai.request(server)
        .get('/api/files')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);

          done();
        });
    });
  });

  describe('POST /api/files', () => {
    it('it should display an error when required fields are missing', (done) => {
      chai.request(server)
        .post('/api/files')
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

    it('it should add a new File', (done) => {
      chai.request(server)
        .post('/api/files')
        .send(file)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('createdAt');
          res.body.should.have.property('updatedAt');

          files[0] = res.body.id;

          done();
        });
    });

    it('it should not add the same File twice', (done) => {
      chai.request(server)
        .post('/api/files')
        .send(file)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('errors');
          res.body.errors.length.should.be.eql(1);

          done();
        });
    });

    it('it should add a different File', (done) => {
      chai.request(server)
        .post('/api/files')
        .send(file1)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('createdAt');
          res.body.should.have.property('updatedAt');

          files[1] = res.body.id;

          done();
        });
    });
  });

  describe('GET /api/files/:id', () => {
    it('it should display File information', (done) => {
      chai.request(server)
        .get(`/api/files/${files[0]}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('createdAt');
          res.body.should.have.property('updatedAt');

          done();
        });
    });
  });

  describe('PATCH /api/files/:id', () => {
    it('it should allow an empty patch', (done) => {
      chai.request(server)
        .patch(`/api/files/${files[0]}`)
        .send({})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('createdAt');
          res.body.should.have.property('updatedAt');

          done();
        });
    });
  });

  describe('DELETE /api/files/:id', () => {
    it('it should be possible to delete a File', (done) => {
      chai.request(server)
        .delete(`/api/files/${files[0]}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('deleted');

          done();
        });
    });
  });
});
