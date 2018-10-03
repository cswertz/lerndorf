import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../server/';

chai.should();
chai.use(chaiHttp);
const agent = chai.request.agent(server);

describe('User', () => {
  const user = {
    username: 'username',
    password: 'password',
    email: 'username@host.com',
  };
  const user1 = {
    username: 'username1',
    password: 'password',
    email: 'username1@host.com',
  };
  const admin = {
    username: 'admin',
    password: 'admin',
  };
  const users = [];

  after((done) => {
    server.close();

    done();
  });

  describe('GET /api/users', () => {
    it('it should GET all the users', (done) => {
      chai.request(server)
        .get('/api/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.not.be.eql(0);

          done();
        });
    });
  });

  describe('POST /api/users', () => {
    it('it should display an error when required fields are missing', (done) => {
      chai.request(server)
        .post('/api/users')
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

    it('it should display an error when username not present', (done) => {
      chai.request(server)
        .post('/api/users')
        .send({
          password: 'password',
          email: 'username@host.com',
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

    it('it should display an error when password not present', (done) => {
      chai.request(server)
        .post('/api/users')
        .send({
          username: 'username',
          email: 'username@host.com',
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

    it('it should display an error when email not present', (done) => {
      chai.request(server)
        .post('/api/users')
        .send({
          password: 'password',
          username: 'username',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('errors');
          res.body.errors.length.should.be.eql(2);

          done();
        });
    });

    it('it should display an error when email invalid', (done) => {
      chai.request(server)
        .post('/api/users')
        .send({
          password: 'password',
          username: 'username',
          email: 'invalid',
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

    it('it should display an error when username too long', (done) => {
      const longUsername = Array(500).join('a');
      chai.request(server)
        .post('/api/users')
        .send({
          username: longUsername,
          password: 'password',
          email: 'username@host.com',
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

    it('it should display an error when password too long', (done) => {
      const longPassword = Array(500).join('a');
      chai.request(server)
        .post('/api/users')
        .send({
          username: 'username',
          password: longPassword,
          email: 'username@host.com',
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

    it('it should display an error when email too long', (done) => {
      const longEmail = `${Array(500).join('a')}@host.com`;
      chai.request(server)
        .post('/api/users')
        .send({
          username: 'username',
          password: 'password',
          email: longEmail,
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('errors');
          res.body.errors.length.should.be.eql(2);

          done();
        });
    });

    it('it should add a new user', (done) => {
      chai.request(server)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('username');
          res.body.should.not.have.property('password');

          users[0] = res.body.id;

          done();
        });
    });

    it('it should not add a second user with the same username', (done) => {
      chai.request(server)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('errors');
          res.body.errors.length.should.be.eql(1);

          done();
        });
    });

    it('it should add a new user with a different name', (done) => {
      chai.request(server)
        .post('/api/users')
        .send(user1)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('username');
          res.body.should.not.have.property('password');

          users[1] = res.body.id;

          done();
        });
    });
  });

  describe('GET /api/users/:id', () => {
    it('it should display user information', (done) => {
      chai.request(server)
        .get(`/api/users/${users[0]}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('Roles');
          res.body.should.have.property('username');
          res.body.should.have.property('lastLogin');
          res.body.should.have.property('createdAt');
          res.body.should.have.property('updatedAt');
          res.body.should.not.have.property('password');

          done();
        });
    });
  });

  describe('POST /api/users/login', () => {
    it('it should display an error when username and password are missing', (done) => {
      chai.request(server)
        .post('/api/users/login')
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

    it('it should display an error when username is missing', (done) => {
      chai.request(server)
        .post('/api/users/login')
        .send({
          password: 'password',
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

    it('it should display an error when password is missing', (done) => {
      chai.request(server)
        .post('/api/users/login')
        .send({
          username: 'user',
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

    it('it should display an error when username or password are wrong', (done) => {
      chai.request(server)
        .post('/api/users/login')
        .send({
          username: 'unknown',
          password: 'unknown',
        })
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a('object');
          res.body.should.have.property('error');

          done();
        });
    });

    it('it should login a user with valid credentials', (done) => {
      chai.request(server)
        .post('/api/users/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('username');

          done();
        });
    });
  });

  describe('PATCH /api/users/:id', () => {
    it('it should display an error when editing a user while logged out', (done) => {
      chai.request(server)
        .patch(`/api/users/${users[0]}`)
        .send({
          password: 'newPassword',
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');

          done();
        });
    });

    it('it should not allow to change password of another user', (done) => {
      agent
        .post('/api/users/login')
        .send(user)
        .end(() => {
          agent
            .patch(`/api/users/${users[1]}`)
            .send({
              password: 'newPassword',
            })
            .end((err, res) => {
              res.should.have.status(403);
              res.body.should.be.a('object');
              res.body.should.have.property('error');

              done();
            });
        });
    });

    it('it should allow to change own password when logged in', (done) => {
      agent
        .post('/api/users/login')
        .send(user)
        .end(() => {
          agent
            .patch(`/api/users/${users[0]}`)
            .send({
              password: 'newPassword',
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('username');

              done();
            });
        });
    });

    it('it should not log in a user after password change', (done) => {
      chai.request(server)
        .post('/api/users/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a('object');
          res.body.should.have.property('error');

          done();
        });
    });

    it('it should allow an empty patch', (done) => {
      agent
        .post('/api/users/login')
        .send(user1)
        .end(() => {
          agent
            .patch(`/api/users/${users[1]}`)
            .send({})
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('username');

              done();
            });
        });
    });
    it('it should not allow a user without the proper permissions to edit another user', (done) => {
      agent
        .post('/api/users/login')
        .send(user1)
        .end(() => {
          agent
            .patch(`/api/users/${users[0]}`)
            .send({})
            .end((err, res) => {
              res.should.have.status(403);
              res.body.should.be.a('object');

              done();
            });
        });
    });

    it('it should allow a user with the proper permissions to edit another user', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .patch(`/api/users/${users[0]}`)
            .send({})
            .end((err, res) => {
              agent
                .get('/api/users/logout')
                .end(() => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('username');

                  done();
                });
            });
        });
    });
  });

  describe('POST /api/users/:id/role', () => {
    it('it should not be possible to add a role by a guest user', (done) => {
      chai.request(server)
        .post(`/api/users/${users[0]}/role`)
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

    it('it should not be possible to add a role by a user without proper permissions', (done) => {
      agent
        .post('/api/users/login')
        .send(user1)
        .end(() => {
          agent
            .post(`/api/users/${users[0]}/role`)
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

    it('it should show an error when adding a role by a user with proper permissions but without required fields', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .post(`/api/users/${users[0]}/role`)
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
    });

    it('it should show an error when adding a non existing role by an admin user without required fields', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .post(`/api/users/${users[0]}/role`)
            .send({
              id: 999999,
            })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('error');

              done();
            });
        });
    });

    it('it should be possible to add a role by an admin user', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .post(`/api/users/${users[0]}/role`)
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

  describe('DELETE /api/users/:id/role/:role', () => {
    it('it should not be possible to remove a role by a guest user', (done) => {
      chai.request(server)
        .delete(`/api/users/${users[0]}/role/1`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');

          done();
        });
    });

    it('it should not be possible to remove a role without proper capabilities', (done) => {
      agent
        .post('/api/users/login')
        .send(user1)
        .end(() => {
          agent
            .delete(`/api/users/${users[0]}/role/${1}`)
            .end((err, res) => {
              res.should.have.status(403);
              res.body.should.be.a('object');

              done();
            });
        });
    });

    it('it should be possible to remove a role with proper capabilities', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .delete(`/api/users/${users[0]}/role/${1}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');

              done();
            });
        });
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('it should not be possible to delete a user without being logged in', (done) => {
      chai.request(server)
        .delete(`/api/users/${users[0]}`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');

          done();
        });
    });

    it('it should not be possible to delete a user without proper capability', (done) => {
      agent
        .post('/api/users/login')
        .send(user1)
        .end(() => {
          agent
            .delete(`/api/users/${users[0]}`)
            .end((err, res) => {
              res.should.have.status(403);
              res.body.should.be.a('object');
              res.body.should.have.property('error');

              done();
            });
        });
    });

    it('it should be possible to delete a user having the proper capability', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .delete(`/api/users/${users[0]}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('deleted');

              done();
            });
        });
    });

    it('it should not be possible to delete the last admin user', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .delete('/api/users/1')
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');

              done();
            });
        });
    });
  });
});
