import models from '../config/sequelize';

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.status(401).send({
    error: 'Not logged in.',
  });
};

const isSelf = (req, res, next) => {
  if (req.user) {
    if (parseInt(req.params.id, 10) === parseInt(req.user.id, 10)) {
      return next();
    }

    return res.status(403).send({
      error: 'You can not do this to another user',
    });
  }

  return res.status(401).send({
    error: 'Not logged in.',
  });
};

const checkRole = (allowed, roles) => {
  const permit = allowed.filter((item) => roles.indexOf(item) > -1);

  if (permit.length > 0) {
    return true;
  }

  return false;
};

const hasRole = (...allowed) => (req, res, next) => {
  if (req.user) {
    const { roles } = req.user;
    if (checkRole(allowed, roles)) {
      return next;
    }

    return res.status(403).send({
      error: 'You do not have the role to do this',
    });
  }

  return res.status(401).send({
    error: 'Not logged in.',
  });
};

const hasCapability = (...allowed) => (req, res, next) => {
  if (req.user) {
    const { capabilities } = req.user;
    const permit = allowed.filter((item) => capabilities.indexOf(item) > -1);

    if (permit.length > 0) {
      return next();
    }

    return res.status(403).send({
      error: 'You do not have the capability to do this',
      errors: [
        {
          msg: 'You do not have the capability to do this',
        },
      ],
    });
  }

  return res.status(401).send({
    error: 'Not logged in.',
    errors: [
      {
        msg: 'You do not have the capability to do this',
      },
    ],
  });
};

const isSelfOrHasCapability = (...allowed) => (req, res, next) => {
  if (req.user) {
    if (parseInt(req.params.id, 10) === parseInt(req.user.id, 10)) {
      return next();
    }

    const { capabilities } = req.user;
    const permit = allowed.filter((item) => capabilities.indexOf(item) > -1);

    if (permit.length > 0) {
      return next();
    }

    return res.status(403).send({
      error: 'You do not have the capability to do this',
    });
  }

  return res.status(401).send({
    error: 'Not logged in.',
  });
};

const isLastAdmin = (id, next) => {
  models.User.findByPk(id)
    .then((result) => {
      result.getRoles()
        .then((roles) => {
          const userRoles = roles.map((role) => role.dataValues.slug);
          const isAdmin = checkRole(['admin'], userRoles);

          if (isAdmin) {
            return models.User.findAll({
              attributes: ['id'],
              include: [
                {
                  model: models.Role,
                  attributes: ['id', 'slug'],
                  where: {
                    slug: 'admin',
                  },
                },
              ],
            })
              .then((results) => {
                if (results.length > 1) {
                  return next(false);
                }

                return next(true);
              });
          }

          return next(false);
        });
    });
};

export {
  isSelfOrHasCapability,
  hasCapability,
  isLastAdmin,
  isLoggedIn,
  hasRole,
  isSelf,
};
