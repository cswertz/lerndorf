import chaiHttp from 'chai-http';
import chai from 'chai';

import server from '../server/';

chai.should();
chai.use(chaiHttp);
const agent = chai.request.agent(server);

describe('Role', () => {
  const admin = {
    username: 'admin',
    password: 'admin',
  };

  const role = {
    slug: 'edit_users_test',
    name: 'Edit Users Test',
  };
  const role1 = {
    slug: 'delete_users_test',
    name: 'Delete Users Test',
  };
  const roles = [];

  after((done) => {
    server.close();

    done();
  });

  describe('GET /api/roles', () => {
    it('it should GET all the roles', (done) => {
      chai.request(server)
        .get('/api/roles')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.not.be.eql(0);

          done();
        });
    });
  });

  describe('POST /api/roles', () => {
    it('it should display an error when required fields are missing', (done) => {
      chai.request(server)
        .post('/api/roles')
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
        .post('/api/roles')
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
        .post('/api/roles')
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

    it('it should add a new Role', (done) => {
      chai.request(server)
        .post('/api/roles')
        .send(role)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('createdAt');
          res.body.should.have.property('updatedAt');

          roles[0] = res.body.id;

          done();
        });
    });

    it('it should not add the same Role twice', (done) => {
      chai.request(server)
        .post('/api/roles')
        .send(role)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('errors');
          res.body.errors.length.should.be.eql(1);

          done();
        });
    });

    it('it should add a different Role', (done) => {
      chai.request(server)
        .post('/api/roles')
        .send(role1)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('createdAt');
          res.body.should.have.property('updatedAt');

          roles[1] = res.body.id;

          done();
        });
    });
  });

  describe('GET /api/roles/:id', () => {
    it('it should display Role information', (done) => {
      chai.request(server)
        .get(`/api/roles/${roles[0]}`)
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

  describe('PATCH /api/roles/:id', () => {
    it('it should allow an empty patch', (done) => {
      agent
        .patch(`/api/roles/${roles[0]}`)
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

    it('it should allow the name to be patched', (done) => {
      const newName = 'New name comes here';
      agent
        .patch(`/api/roles/${roles[0]}`)
        .send({
          name: newName,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('name');
          res.body.should.have.property('createdAt');
          res.body.should.have.property('updatedAt');

          done();
        });
    });
  });

  describe('DELETE /api/roles/:id', () => {
    it('it should be possible to delete a Role', (done) => {
      chai.request(server)
        .delete(`/api/roles/${roles[0]}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('deleted');

          done();
        });
    });
  });

  describe('POST /api/roles/:id/capability', () => {
    it('it should not be possible to add a capability by a guest user', (done) => {
      chai.request(server)
        .post(`/api/roles/${role[0]}/capability`)
        .send({
          id: 1,
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');

          done();
        });
    });

    /*
    it('it should not be possible to add a role by a user without proper permissions', (done) => {
      agent
        .post('/api/users/login')
        .send(user)
        .end(() => {
          agent
            .post(`/api/roles/${role[0]}/capability`)
            .send({
              id: 1,
            })
            .end((err, res) => {
              res.should.have.status(403);
              res.body.should.be.a('object');
              res.body.should.have.property('error');

              done();
            });
        });
    });
    */

    it('it should not be possible to add a capability to a non existing role', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .post('/api/roles/99/capability')
            .send({
              id: 1,
            })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');

              done();
            });
        });
    });

    it('it should be possible to add a capability to a role by an admin user', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .post(`/api/roles/${roles[1]}/capability`)
            .send({
              id: 1,
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');

              done();
            });
        });
    });
  });

  describe('DELETE /api/roles/:id/capability/:capability', () => {
    it('it should not be possible to remove a capability from a role by a guest user', (done) => {
      chai.request(server)
        .delete(`/api/roles/${roles[1]}/capability/1`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');

          done();
        });
    });

    it('it should be possible to remove a capability from a role by an admin user', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .delete(`/api/roles/${roles[1]}/capability/1`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');

              done();
            });
        });
    });
  });
});
