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
  const user = await models.User.findByPk(req.params.id, {
    attributes: [
      'id',
      'username',
    ],
    include: [
      {
        model: models.Role,
        attributes: ['id', 'slug', 'name'],
        through: { attributes: [] },
        include: [
          {
            model: models.Capability,
            attributes: ['id', 'slug', 'name'],
          },
        ],
      },
      {
        model: models.Language,
      },
    ],
  });

  res.json(user);
});

export default router;
