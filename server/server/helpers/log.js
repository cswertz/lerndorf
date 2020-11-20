import models from '../config/sequelize';

const logView = (component) => async (req, res, next) => {
  if (req.user) {
    await models.LogUser.create({
      UserId: req.user.id,
      KnowledgeUnitId: (component === 'KnowledgeUnit') ? req.params.id : null,
      LearningUnitId: (component === 'LearningUnit') ? req.params.id : null,
      CourseId: (component === 'Course') ? req.params.id : null,
    });
  }

  return next();
};

export {
  logView,
};
