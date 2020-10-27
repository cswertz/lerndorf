import chaiHttp from 'chai-http';
import chai from 'chai';

import server from '../server/';

chai.should();
chai.use(chaiHttp);
// const agent = chai.request.agent(server);

describe('Capability', () => {
  /*
  const capability = {
    slug: 'edit_users_test',
    name: 'Edit Users Test',
  };
  const capability1 = {
    slug: 'delete_users_test',
    name: 'Delete Users Test',
  };
  const capabilities = [];
  */

  after((done) => {
    server.close();

    done();
  });

  describe('GET /api/capabilities', () => {
    it('it should GET all the capabilities', (done) => {
      chai.request(server)
        .get('/api/capabilities')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.not.be.eql(0);

          done();
        });
    });
  });

  /*
  describe('POST /api/capabilities', () => {
    it('it should display an error when required fields are missing', (done) => {
      chai.request(server)
        .post('/api/capabilities')
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('errors');
          res.body.errors.length.should.be.eql(2);

          done();
        });
    });

    it('it should display an error when slug is missing', (done) => {
      chai.request(server)
        .post('/api/capabilities')
        .send({
          name: 'Name',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('errors');
          res.body.errors.length.should.be.eql(1);

          done();
        });
    });

    it('it should display an error when name is missing', (done) => {
      chai.request(server)
        .post('/api/capabilities')
        .send({
          slug: 'slug',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('errors');
          res.body.errors.length.should.be.eql(1);

          done();
        });
    });

    it('it should add a new Capability', (done) => {
      chai.request(server)
        .post('/api/capabilities')
        .send(capability)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('createdAt');
          res.body.should.have.property('updatedAt');

          capabilities[0] = res.body.id;

          done();
        });
    });

    it('it should not add the same Capability twice', (done) => {
      chai.request(server)
        .post('/api/capabilities')
        .send(capability)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('errors');
          res.body.errors.length.should.be.eql(1);

          done();
        });
    });

    it('it should add a different Capability', (done) => {
      chai.request(server)
        .post('/api/capabilities')
        .send(capability1)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('createdAt');
          res.body.should.have.property('updatedAt');

          capabilities[1] = res.body.id;

          done();
        });
    });
  });

  describe('GET /api/capabilities/:id', () => {
    it('it should display Capability information', (done) => {
      chai.request(server)
        .get(`/api/capabilities/${capabilities[0]}`)
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

  describe('PATCH /api/capabilities/:id', () => {
    it('it should allow an empty patch', (done) => {
      agent
        .patch(`/api/capabilities/${capabilities[0]}`)
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

  describe('DELETE /api/capabilities/:id', () => {
    it('it should be possible to delete a Capability', (done) => {
      chai.request(server)
        .delete(`/api/capabilities/${capabilities[0]}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('deleted');

          done();
        });
    });
  });
  */
});
