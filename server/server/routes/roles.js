import express from 'express';

import models from '../config/sequelize';

import { hasCapability } from '../helpers/auth';

const router = express.Router();

router.get('/', (req, res) => {
  models.Role.findAll({
    attributes: [
      'id',
      'name',
      'slug',
      'createdAt',
      'updatedAt',
    ],
  })
    .then(results => res.json(results));
});

router.post('/', hasCapability('add_role'), (req, res) => {
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

    if (!req.body.slug) {
      req.body.slug = req.body.name.toLowerCase();
    }

    return models.Role.create(req.body)
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
  models.Role.findById(req.params.id, {
    attributes: [
      'id',
      'slug',
      'name',
      'createdAt',
      'updatedAt',
    ],
    include: [
      {
        model: models.Capability,
        attributes: [
          'id',
          'slug',
          'name',
        ],
      },
    ],
  })
    .then(result => res.json(result));
});

router.patch('/:id', hasCapability('edit_role'), (req, res) => {
  delete (req.body.createdAt);
  delete (req.body.updatedAt);
  delete (req.body.id);

  models.Role.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      models.Role.findById(req.params.id, {
        attributes: ['id', 'slug', 'name', 'createdAt', 'updatedAt'],
      })
        .then(result => res.json(result));
    });
});

router.delete('/:id', hasCapability('delete_role'), (req, res) => {
  models.Role.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      res.json({ deleted: result });
    });
});

router.post('/:id/capability', hasCapability('add_capability_to_role'), (req, res) => {
  req.checkBody('id', 'id is required').notEmpty();

  req.getValidationResult().then((errors) => {
    if (!errors.isEmpty()) {
      res.status(400).send({
        error: 'There have been validation errors.',
        errors: errors.array(),
      });
      return;
    }

    models.Capability.findById(req.body.id)
      .then((capability) => {
        if (capability) {
          models.Role.findById(req.params.id)
            .then((result) => {
              if (result) {
                result.addCapability(capability.id);

                return res.json(result);
              }

              return res.status(400).send({
                error: 'Role does not exist.',
              });
            });
        } else {
          res.status(400).send({
            error: 'Capability does not exist.',
          });
        }
      });
  });
});

router.delete('/:id/capability/:capability', hasCapability('remove_capability_from_role'), (req, res) => {
  models.Role.findById(req.params.id)
    .then((result) => {
      result.removeCapability(req.params.capability);
      res.status(200).send({});
    });
});

export default router;
