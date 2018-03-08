import chaiHttp from 'chai-http';
import chai from 'chai';

import server from '../server/';

chai.should();
chai.use(chaiHttp);

describe('Root', () => {
  after((done) => {
    server.close();

    done();
  });

  describe('GET /', () => {
    it('it should GET the root of the app', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');

          done();
        });
    });
  });
});
