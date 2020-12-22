import chaiHttp from 'chai-http';
import chai from 'chai';

import models from '../server/config/sequelize';
import server from '../server/';

chai.should();
chai.use(chaiHttp);
const agent = chai.request.agent(server);

describe('Taxonomy', () => {
  const taxonomy = {
    type: 'type',
  };
  const taxonomy1 = {
    type: 'type1',
  };
  const taxonomies = [];

  const userTaxonomy = {
    username: 'user_taxonomy',
    password: 'password',
    email: 'user@taxonomy.com',
  };
  const admin = {
    username: 'admin',
    password: 'admin',
  };

  before((done) => {
    chai.request(server).keepOpen()
      .post('/api/users')
      .send(userTaxonomy)
      .end((err, res) => {
        res.should.have.status(200);

        models.User.update({
          active: true,
        }, {
          where: {
            username: userTaxonomy.username,
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

  describe('GET /api/taxonomies', () => {
    it('it should GET all the taxonomies', (done) => {
      chai.request(server).keepOpen()
        .get('/api/taxonomies')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');

          done();
        });
    });
  });

  describe('POST /api/taxonomies', () => {
    it('it should not be possible to add a Taxonomy when not logged in', (done) => {
      chai.request(server).keepOpen()
        .post('/api/taxonomies')
        .send({})
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');

          done();
        });
    });

    it('it should display an error when adding a taxonomy without required fields', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .post('/api/taxonomies')
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


    it('it should not allow a user without the proper permissions to add a taxonomy', (done) => {
      agent
        .post('/api/users/login')
        .send(userTaxonomy)
        .end(() => {
          agent
            .post('/api/taxonomies')
            .end((err, res) => {
              res.should.have.status(403);
              res.body.should.be.a('object');
              res.body.should.have.property('error');

              done();
            });
        });
    });

    it('it should allow a user with the proper permissions to add a taxonomy', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .post('/api/taxonomies')
            .send(taxonomy)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('id');
              res.body.should.have.property('createdAt');

              taxonomies[0] = res.body.id;

              done();
            });
        });
    });

    it('it should allow a user with the proper permissions to add a different taxonomy', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .post('/api/taxonomies')
            .send(taxonomy1)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('id');
              res.body.should.have.property('createdAt');

              taxonomies[0] = res.body.id;

              done();
            });
        });
    });
  });

  describe('PATCH /api/taxonomies/:id', () => {
    it('it should not be possible to edit a Taxonomy when not logged in', (done) => {
      chai.request(server).keepOpen()
        .patch(`/api/taxonomies/${taxonomies[0]}`)
        .send({
          type: 'edited',
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');

          done();
        });
    });

    it('it should not allow a user without the proper permissions to edit a taxonomy', (done) => {
      agent
        .post('/api/users/login')
        .send(userTaxonomy)
        .end(() => {
          agent
            .patch(`/api/taxonomies/${taxonomies[0]}`)
            .send({
              type: 'edited',
            })
            .end((err, res) => {
              res.should.have.status(403);
              res.body.should.be.a('object');
              res.body.should.have.property('error');

              done();
            });
        });
    });

    it('it should allow a user with the proper permissions to edit a taxonomy', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .patch(`/api/taxonomies/${taxonomies[0]}`)
            .send({
              type: 'edited',
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('id');
              res.body.should.have.property('createdAt');

              done();
            });
        });
    });
  });

  describe('GET /api/taxonomies/:id', () => {
    it('it should display Taxonomy information', (done) => {
      chai.request(server).keepOpen()
        .get(`/api/taxonomies/${taxonomies[0]}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('item');
          res.body.item.should.have.property('id');
          res.body.item.should.have.property('createdAt');
          res.body.should.have.property('children');

          done();
        });
    });
  });

  describe('DELETE /api/taxonomies/:id', () => {
    it('it should not be possible to delete a Taxonomy when not logged in', (done) => {
      chai.request(server).keepOpen()
        .delete(`/api/taxonomies/${taxonomies[0]}`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');

          done();
        });
    });

    it('it should not allow a user without the proper permissions to delete a taxonomy', (done) => {
      agent
        .post('/api/users/login')
        .send(userTaxonomy)
        .end(() => {
          agent
            .delete(`/api/taxonomies/${taxonomies[0]}`)
            .end((err, res) => {
              res.should.have.status(403);
              res.body.should.be.a('object');

              done();
            });
        });
    });

    it('it should allow a user with the proper permissions to delete a taxonomy', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .delete(`/api/taxonomies/${taxonomies[0]}`)
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
