import chaiHttp from 'chai-http';
import chai from 'chai';

import models from '../server/config/sequelize';
import server from '../server';

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

  // TODO: Write more tests
});
