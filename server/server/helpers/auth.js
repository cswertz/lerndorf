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

const checkCapability = (user, allowed) => {
  const { capabilities } = user;
  const permit = allowed.filter((item) => capabilities.indexOf(item) > -1);

  if (permit.length > 0) {
    return true;
  }

  return false;
};

const return401 = (res) => res.status(401).send({
  error: 'Not logged in.',
  errors: [
    {
      msg: 'You do not have the capability to do this',
    },
  ],
});

const return403 = (res) => res.status(403).send({
  error: 'You do not have the capability to do this',
  errors: [
    {
      msg: 'You do not have the capability to do this',
    },
  ],
});

const hasCapability = (...allowed) => (req, res, next) => {
  if (req.user) {
    if (checkCapability(req.user, allowed)) {
      return next();
    }

    return return403(res);
  }

  return return401(res);
};

const hasCapabilityOrOwnsKnowledgeUnit = (...allowed) => async (req, res, next) => {
  if (req.user) {
    if (checkCapability(req.user, allowed)) {
      return next();
    }

    const item = await models.KnowledgeUnit.findOne({
      where: {
        UserId: req.user.id,
        Id: req.params.id,
      },
    });

    if (item) {
      return next();
    }

    return return403(res);
  }

  return return401(res);
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

const isAdmin = async (id) => {
  const user = await models.User.findByPk(id);
  const roles = await user.getRoles();
  const adminRoles = roles.filter((role) => role.dataValues.slug === 'admin');
  return adminRoles.length > 0;
};

const isUser = async (id) => {
  const user = await models.User.findByPk(id);
  const roles = await user.getRoles();
  const adminRoles = roles.filter((role) => role.dataValues.slug === 'user');
  return adminRoles.length > 0;
};

const isLastAdmin = async (id) => {
  if (isAdmin(id)) {
    const adminUsers = await models.User.findAll({
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
    });
    const adminIds = adminUsers.map((user) => user.id, 10);

    return (adminIds.length === 1 && adminIds.includes(parseInt(id, 10)));
  }

  return false;
};

const isCreatorOrInCourse = (models) => async (req, res, next) => {
  if (req.user) {
    const entityItem = await models.Thread.findByPk(req.params.id);
    if (entityItem === null) {
      return res.status(403).send({
        error: 'You do not have permission to this thread.',
      });
    }

    if (entityItem.courseId === null || isAdmin(req.user.id) === true) {
      return next();
    }

    const courseUsersWithId = await models.CourseUser.findAll({
      where: {
        userId: req.user.id,
        courseId: entityItem.courseId,
      },
    });

    if (courseUsersWithId.length === 0) {
      return res.status(403).send({
        error: 'You do not have permission to this course related thread.',
      });
    }

    return res.status(403).send({
      error: { thread: courseUsersWithId, entityItem },
    });
  }

  return res.status(401).send({
    error: 'Not logged in.',
  });
};

const isThreadCreatorOrAdmin = (models) => async (req, res, next) => {
  if (req.user) {
    const entityItem = await models.Thread.findByPk(req.params.id);
    if (entityItem === null) {
      return res.status(403).send({
        error: 'You do not have permission to this thread.',
      });
    }

    if (await isAdmin(req.user.id) === true || entityItem.userId === req.user.id) {
      return next();
    }

    return res.status(403).send({
      error: 'You do not have permission to this course related thread.',
    });
  }

  return res.status(401).send({
    error: 'Not logged in.',
  });
};

export {
  hasCapabilityOrOwnsKnowledgeUnit,
  isSelfOrHasCapability,
  hasCapability,
  isLastAdmin,
  isAdmin,
  isUser,
  isLoggedIn,
  hasRole,
  isSelf,
  isCreatorOrInCourse,
  isThreadCreatorOrAdmin,
};
