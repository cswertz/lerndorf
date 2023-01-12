import chaiHttp from 'chai-http';
import chai from 'chai';

import models from '../server/config/sequelize';
import server from '../server';

chai.should();
chai.use(chaiHttp);
const agent = chai.request.agent(server);

describe('Navigation', () => {

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

  describe('GET /api/navigations/knowledge', () => {
    it('it should GET a navgation tree for the knowledge units', (done) => {
      chai.request(server).keepOpen()
        .get('/api/navigations/knowledge')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  // TODO: Write more tests
});
