import { check, validationResult, buildCheckFunction } from 'express-validator';
import express from 'express';
import models from '../config/sequelize';
import { isSelfOrHasCapability } from '../helpers/auth';

const router = express.Router();

const checkBody = buildCheckFunction(['body']);

router.get('/', (req, res) => {
  models.Thread.findAll({
    where: {
      courseId: null,
    },
  })
    .then((results) => res.json(results));
});

router.get('/:id', isSelfOrHasCapability('view_threads'), async (req, res) => {
  const thread = await models.Thread.findByPk(req.params.id, {
    attributes: [
      'id',
      'summary',
      'userId',
    ],
    include: [
      {
        model: models.User,
        as: 'user',
      },
      {
        model: models.ThreadPost,
        as: 'posts',
        include: [
          {
            model: models.User,
            as: 'user',
          },
        ],
      },
    ],
  });

  if (!thread) {
    return res.status(400).send({
      error: 'There is no forum thread with this id.',
    });
  }

  res.json(thread);
});

export default router;
