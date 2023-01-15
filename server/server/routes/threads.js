import { check, validationResult, buildCheckFunction } from 'express-validator';
import express from 'express';
import models from '../config/sequelize';
import {
  hasCapability, isCreatorOrInCourse, isCourseUser, isSelfOrHasCapability, isThreadCreatorOrAdmin, isAdmin,
} from '../helpers/auth';
import ThreadPost from '../models/ThreadPost';

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
        include: [
          {
            model: models.User,
            as: 'lastPostUser',
          },
        ],
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

  return res.status(200).send(thread);
});

router.post('/', [
  hasCapability('create_threads'),
  check('text', 'text is required')
    .isLength({ min: 1 })
    .notEmpty(),
  check('summary', 'summary is required')
    .isLength({ min: 1 })
    .notEmpty(),
], async (req, res) => {
  // Check if the user added a course id
  if (req.body.courseId && await isCourseUser(req.user.id, req.body.courseId) === false) {
    return res.status(403).send({
      error: 'You cannot create a thread for this course.',
    });
  }
  models.Thread.create({
    userId: req.user.id,
    summary: req.body.summary,
    courseId: req.body.courseId || null,
    lastPostAt: new Date(),
    lastPostFrom: req.user.id,
    posts: [
      {
        userId: req.user.id,
        text: req.body.text,
      },
    ],
  }, {
    include: [
      {
        model: models.ThreadPost,
        as: 'posts',
      },
    ],
  })
    .then((result) => res.json(result))
    .catch((err) => res.status(422).send({
      error: 'There have been database errors.',
      errors: err.errors.map((error) => ({
        param: error.path,
        msg: error.message,
      })),
    }));

  return res.status(200);
});

router.patch('/:id', [
  isThreadCreatorOrAdmin(models),
  check('text', 'text is required')
    .isLength({ min: 1 })
    .notEmpty(),
  check('summary', 'summary is required')
    .isLength({ min: 1 })
    .notEmpty(),
], async (req, res) => {
  // Find the first entry
  const thread = await models.Thread.findByPk(req.params.id, {
    attributes: [
      'id',
      'summary',
      'userId',
    ],
    include: [
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

  // Get the first posting
  // const firstPost = thread.posts[0];

  // Update the related thread
  models.Thread.update({
    summary: req.body.summary,
  }, {
    where: {
      id: req.params.id,
    },
  }, req.params.id);

  // Update the related first entry
  models.ThreadPost.update({
    text: req.body.text,
  }, {
    where: {
      id: thread.posts[0].id,
    },
  }, thread.posts[0].id);

  res.status(200).send({ status: 'OK' });
});

router.delete('/:id', [
  isThreadCreatorOrAdmin(models),
  check('text', 'text is required')
    .isLength({ min: 1 })
    .notEmpty(),
  check('summary', 'summary is required')
    .isLength({ min: 1 })
    .notEmpty(),
], async (req, res) => {
  // Find the first entry
  const thread = await models.Thread.findByPk(req.params.id, {
    attributes: [
      'id',
      'summary',
      'userId',
    ],
    include: [
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

  // Delete the related thread
  models.Thread.destroy({
    where: {
      id: req.params.id,
    },
  }, req.params.id);

  // Delete the related posts
  models.ThreadPost.destroy({
    where: {
      threadId: req.params.id,
    },
  }, req.params.id);

  res.status(200).send({ status: 'OK' });
});

router.post('/:id/answers', [
  check('text', 'text is required')
    .isLength({ min: 1 })
    .notEmpty(),
], async (req, res) => {
  const currentThread = await models.Thread.findByPk(req.params.id);

  if (currentThread.courseId !== null && (await isCourseUser(req.user.id, currentThread.courseId) === false && currentThread.userId !== req.user.id) && await isAdmin(req.user.id) === false) {
    return res.status(403).send({
      error: 'You cannot create an answer for this thread.',
    });
  }

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

  const thread = await models.Thread.findByPk(req.params.id, {
    attributes: [
      'id',
      'summary',
      'userId',
    ],
    include: [
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
  return res.status(200).send(thread);
});

export default router;
