const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.status(401).send({
    error: 'Not logged in.',
  });
};

const isSelf = (req, res, next) => {
  if (parseInt(req.params.id, 10) === parseInt(req.user.id, 10)) {
    return next();
  }

  return res.status(401).send({
    error: 'You can not do this to another user',
  });
};

const hasRole = (...allowed) => (req, res, next) => {
  req.user.getRoles()
    .then((results) => {
      const roles = results.map(item => item.get().slug);
      const permit = allowed.filter(item => roles.indexOf(item) > -1);

      if (permit.length > 0) {
        next();
      } else {
        res.status(401).send({
          error: 'You do not have the permission to do this',
        });
      }
    });
};

export {
  isLoggedIn,
  hasRole,
  isSelf,
};
