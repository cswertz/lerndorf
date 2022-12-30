import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import models from '../server/config/sequelize';
import server from '../server';

chai.should();
chai.use(chaiHttp);
const agent = chai.request.agent(server);

describe('Threads', () => {
  const user = {
    username: 'username',
    password: 'password',
    email: 'username@host.com',
  };
  const admin = {
    username: 'admin',
    password: 'admin',
  };
  const users = [];
  const languages = [];

  before((done) => {
    chai.request(server).keepOpen()
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        models.User.update({
          active: true,
        }, {
          where: {
            username: user.username,
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

  describe('GET /api/threads', () => {
    it('it should return a list of thread which are public available (no courseId)', (done) => {
      chai.request(server).keepOpen()
        .get('/api/threads')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');

          expect(res.body[0].summary).to.equal('Demo');
          expect(res.body.length).to.equal(1);

          done();
        });
    });
  });
});
