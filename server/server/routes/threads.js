import { check, validationResult, buildCheckFunction } from 'express-validator';
import express from 'express';
import models from '../config/sequelize';
import { isCreatorOrInCourse, isSelfOrHasCapability } from '../helpers/auth';

const router = express.Router();

const checkBody = buildCheckFunction(['body']);

router.get('/', (req, res) => {
  models.Thread.findAll({
    where: {
      courseId: null,
    },
    include: [
      {
        model: models.User,
        as: 'lastPostUser',
      },
    ],
    order: [
      ['updatedAt', 'DESC'],
    ],
  })
    .then((results) => res.json(results));
});

router.get('/:id', isCreatorOrInCourse(models), async (req, res) => {
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
        model: models.User,
        as: 'lastPostUser',
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

router.post('/:id/answers', [
  check('text', 'text is required')
    .isLength({ min: 1 })
    .notEmpty(),
], (req, res) => {
  const item = models.ThreadPost.create({
    userId: req.user.id,
    text: req.body.text,
    threadId: req.params.id,
  }, {})
    .then((result) => res.json(result))
    .catch((err) => res.status(422).send({
      error: 'There have been database errors.',
      errors: err.errors.map((error) => ({
        param: error.path,
        msg: error.message,
      })),
    }));

  // Update the related thread
  models.Thread.update({
    lastPostFrom: req.user.id,
    lastPostAt: new Date(),
  }, {
    where: {
      id: req.params.id,
    },
  }, req.params.id);

  res.status(200).send(item);
});

export default router;
