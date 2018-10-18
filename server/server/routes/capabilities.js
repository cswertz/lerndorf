import express from 'express';

import models from '../config/sequelize';

const router = express.Router();

router.get('/', (req, res) => {
  models.Capability.findAll({
    attributes: [
      'id',
      'slug',
      'name',
    ],
  })
    .then(results => res.json(results));
});

/*
router.post('/', (req, res) => {
  req.checkBody('slug', 'slug is required')
    .isLength({ max: 255 })
    .notEmpty();
  req.checkBody('name', 'name is required')
    .isLength({ max: 255 })
    .notEmpty();

  req.getValidationResult().then((errors) => {
    if (!errors.isEmpty()) {
      return res.status(400).send({
        error: 'There have been validation errors.',
        errors: errors.array(),
      });
    }

    return models.Capability.create(req.body)
      .then(result => res.json(result))
      .catch(err => res.status(422).send({
        error: 'There have been database errors.',
        errors: err.errors.map(error => ({
          message: error.message,
          type: error.type,
        })),
      }));
  });
});

router.get('/:id', (req, res) => {
  models.Capability.findById(req.params.id, {
    attributes: ['id', 'createdAt', 'updatedAt'],
  })
    .then(result => res.json(result));
});

router.patch('/:id', (req, res) => {
  delete (req.body.createdAt);
  delete (req.body.updatedAt);
  delete (req.body.id);

  models.Capability.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      models.Capability.findById(req.params.id, {
        attributes: ['id', 'createdAt', 'updatedAt'],
      })
        .then(result => res.json(result));
    });
});

router.delete('/:id', (req, res) => {
  models.Capability.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      res.json({ deleted: result });
    });
});
*/

export default router;
