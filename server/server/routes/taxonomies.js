import express from 'express';

import { hasCapability } from '../helpers/auth';
import models from '../config/sequelize';

const router = express.Router();

// Get the latest version of all top Level Taxonomies
router.get('/', (req, res) => {
  models.Taxonomy.findAll({
    where: {
      parent: 1,
    },
    attributes: [
      'id',
      'createdAt',
      'active',
      'type',
    ],
  })
    .then(results => res.json(results));
});

router.post('/', hasCapability('add_taxonomy'), (req, res) => {
  req.checkBody('type', 'type is required')
    .isLength({ max: 255 })
    .notEmpty();

  if (!req.body.parent) {
    req.body.parent = 1;
  }

  req.getValidationResult().then((errors) => {
    if (!errors.isEmpty()) {
      return res.status(400).send({
        error: 'There have been validation errors.',
        errors: errors.array(),
      });
    }

    return models.Taxonomy.create(req.body)
      .then(result => res.json(result))
      .catch(err => res.status(422).send({
        error: 'There have been database errors.',
        errors: err.errors.map(error => ({
          param: error.path,
          msg: error.message,
        })),
      }));
  });
});

// Get a specific taxonomy with its direct children
router.get('/:id', (req, res) => {
  models.Taxonomy.findByPk(req.params.id, {
    attributes: [
      'id',
      'createdAt',
      'active',
      'type',
    ],
  })
    .then((result) => {
      models.Taxonomy.findAll({
        where: {
          parent: req.params.id,
        },
        attributes: [
          'id',
          'createdAt',
          'active',
          'type',
        ],
      })
        .then((children) => {
          res.json({
            item: result,
            children,
          });
        });
    });
});

router.patch('/:id', hasCapability('edit_taxonomy'), (req, res) => {
  delete (req.body.createdAt);
  delete (req.body.updatedAt);
  delete (req.body.id);

  models.Taxonomy.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      models.Taxonomy.findByPk(req.params.id, {
        attributes: ['id', 'createdAt'],
      })
        .then(result => res.json(result));
    });
});

router.delete('/:id', hasCapability('delete_taxonomy'), (req, res) => {
  models.Taxonomy.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      res.json({ deleted: result });
    });
});

export default router;
