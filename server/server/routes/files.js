import { check, validationResult } from 'express-validator';
import express from 'express';

import { hasCapability } from '../helpers/auth';
import models from '../config/sequelize';

const router = express.Router();

router.get('/', (req, res) => {
  models.File.findAll({
    attributes: ['id', 'createdAt', 'updatedAt'],
  })
    .then((results) => res.json(results));
});

router.post('/', [
  check('name', 'name is required').exists(),
  check('name').isLength({ max: 255 }),
  check('name').notEmpty(),
], (req, res) => {
  // TODO: Calculate those values
  req.body.path = `path${req.body.name}`;
  req.body.mime = 'image/png';
  req.body.size = 1234;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      error: 'There have been validation errors.',
      errors: errors.array(),
    });
  }

  return models.File.create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.status(422).send({
      error: 'There have been database errors.',
      errors: err.errors.map((error) => ({
        message: error.message,
        type: error.type,
      })),
    }));
});

router.get('/:id', (req, res) => {
  models.File.findByPk(req.params.id, {
    attributes: ['id', 'createdAt', 'updatedAt'],
  })
    .then((result) => res.json(result));
});

router.patch('/:id', (req, res) => {
  delete (req.body.createdAt);
  delete (req.body.updatedAt);
  delete (req.body.id);

  models.File.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      models.File.findByPk(req.params.id, {
        attributes: ['id', 'createdAt', 'updatedAt'],
      })
        .then((result) => res.json(result));
    });
});

router.post('/editor-upload', hasCapability('add_role_to_user'), (req, res) => {
  if (!req.files.upload) {
    return res.status(400).send({
      error: 'There have been validation errors.',
      errors: [
        {
          msg: 'File is required',
        },
      ],
    });
  }

  const { upload } = req.files;

  const fileName = upload.md5 + upload.name;
  const path = `./server/public/uploads/${fileName}`;
  return upload.mv(path, (err) => {
    if (err) {
      return res.status(400).send({
        error: 'There have been validation errors.',
        errors: [
          {
            msg: 'File is required',
          },
        ],
      });
    }
    /*
    req.body.path = path;
    req.body.name = fileName;
    req.body.mime = upload.mimetype;
    req.body.size = upload.size;
    */
    return res.json({
      url: `/uploads/${fileName}`,
    });

    /*
    return models.File.create(req.body)
      .then(() => res.json({
        url: `/static/uploads/${fileName}`,
      }))
      .catch(err1 => res.status(422).send({
        error: 'There have been database errors.',
        errors: err1.errors.map(error => ({
          message: error.message,
          type: error.type,
        })),
      }));
      */
  });
});

router.delete('/:id', (req, res) => {
  models.File.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      res.json({ deleted: result });
    });
});

export default router;
