import chaiHttp from 'chai-http';
import chai from 'chai';

import models from '../server/config/sequelize';
import server from '../server';
import { admin } from '../server/helpers/testhelper';

chai.should();
chai.use(chaiHttp);
const agent = chai.request.agent(server);

describe('Navigation', () => {
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

  describe('GET /api/navigations/courses', () => {
    it('it should GET a navgation tree for the courses', (done) => {
      const session = chai.request.agent(server);
      session
        .post('/api/users/login')
        .send(admin)
        .end((err, res) => {
          res.should.have.status(200);
          session
            .get('/api/navigations/courses')
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
        });
    });
  });

  // TODO: Write more tests
});
