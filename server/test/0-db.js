import models from '../server/config/sequelize';

describe('DB Setup', () => {
  before((done) => {
    models.sequelize
      .sync()
      .then(() => {
        done();
      });
  });

  it('it should sync DB', () => {});
});
