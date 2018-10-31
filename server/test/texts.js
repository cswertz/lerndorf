import chaiHttp from 'chai-http';
import chai from 'chai';

import models from '../server/config/sequelize';
import server from '../server/';

chai.should();
chai.use(chaiHttp);
const agent = chai.request.agent(server);

describe('Text', () => {
  const text = {
    content: 'Content comes here',
    KnowledgeUnitId: 1,
    LanguageId: 1,
  };
  const text1 = {
    content: 'Content comes here',
    KnowledgeUnitId: 1,
    LanguageId: 1,
  };
  const texts = [];
  const knowledgeUnitIds = [];
  const languageIds = [];
  const users = [];
  const userText = {
    username: 'user_text',
    password: 'password',
    email: 'user@text.com',
  };
  const admin = {
    username: 'admin',
    password: 'admin',
  };

  before((done) => {
    models.Text.truncate({
      restartIdentity: true,
      cascade: true,
    });

    models.LearningUnit.truncate({
      restartIdentity: true,
      cascade: true,
    });

    models.KnowledgeUnit.truncate({
      restartIdentity: true,
      cascade: true,
    });

    models.Language.truncate({
      restartIdentity: true,
      cascade: true,
    });

    models.LearningUnit.create({})
      .then((result) => {
        chai.request(server)
          .post('/api/users')
          .send(userText)
          .end((err, res) => {
            res.should.have.status(200);
            users.push(res.body);

            models.KnowledgeUnit.create({
              LearningUnitId: result.get().id,
              UserId: users[0].id,
            })
              .then((result1) => {
                knowledgeUnitIds.push(result1.get().id);

                models.Language.create({
                  code: 'en',
                  name: 'English',
                })
                  .then((result2) => {
                    languageIds.push(result2.get().id);

                    done();
                  });
              });
          });
      });
  });

  after((done) => {
    server.close();

    done();
  });

  describe('GET /api/texts', () => {
    it('it should GET all the texts', (done) => {
      chai.request(server)
        .get('/api/texts')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);

          done();
        });
    });
  });

  describe('POST /api/texts', () => {
    it('it should not be possible to add a Text when not logged in', (done) => {
      chai.request(server)
        .post('/api/texts')
        .send({
          content: text.content,
          KnowledgeUnitId: knowledgeUnitIds[0],
          LanguageId: languageIds[0],
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');

          done();
        });
    });

    it('it should not allow a user without the proper permissions to add a Text', (done) => {
      agent
        .post('/api/users/login')
        .send(userText)
        .end(() => {
          agent
            .post('/api/texts')
            .send({
              content: text.content,
              KnowledgeUnitId: knowledgeUnitIds[0],
            })
            .end((err, res) => {
              res.should.have.status(403);
              res.body.should.be.a('object');
              res.body.should.have.property('error');

              done();
            });
        });
    });

    it('it should display an error when adding a Text without required fields', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .post('/api/texts')
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

    it('it should allow a user with the proper permissions to add a Text', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .post('/api/texts')
            .send({
              content: text.content,
              KnowledgeUnitId: knowledgeUnitIds[0],
              LanguageId: languageIds[0],
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('id');

              texts[0] = res.body.id;

              done();
            });
        });
    });

    it('it should allow a user with the proper permissions to add a different Text', (done) => {
      agent
        .post('/api/users/login')
        .send(admin)
        .end(() => {
          agent
            .post('/api/texts')
            .send({
              content: text1.content,
              KnowledgeUnitId: knowledgeUnitIds[0],
              LanguageId: languageIds[0],
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('id');

              texts[1] = res.body.id;

              done();
            });
        });
    });
  });

  describe('GET /api/texts/:id', () => {
    it('it should display Text information', (done) => {
      chai.request(server)
        .get(`/api/texts/${texts[0]}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('content');
          res.body.should.have.property('Language');

          done();
        });
    });
  });

  describe('DELETE /api/texts/:id', () => {
    it('it should be possible to delete a Text', (done) => {
      chai.request(server)
        .delete(`/api/texts/${texts[0]}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('deleted');

          done();
        });
    });
  });
});
