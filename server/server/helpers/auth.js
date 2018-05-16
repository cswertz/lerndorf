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

    return res.status(401).send({
      error: 'You can not do this to another user',
    });
  }

  return res.status(401).send({
    error: 'Not logged in.',
  });
};

const hasRole = (...allowed) => (req, res, next) => {
  if (req.user) {
    const { roles } = req.user;
    const permit = allowed.filter(item => roles.indexOf(item) > -1);

    if (permit.length > 0) {
      return next();
    }

    return res.status(401).send({
      error: 'You do not have the role to do this',
    });
  }

  return res.status(401).send({
    error: 'Not logged in.',
  });
};

export {
  isLoggedIn,
  hasRole,
  isSelf,
};
