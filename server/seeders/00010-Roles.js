import models from '../server/config/sequelize';

const roles = [
  {
    slug: 'admin',
    name: 'Admin',
  },
  {
    slug: 'guest',
    name: 'Guest',
  },
  {
    slug: 'user',
    name: 'User',
  },
  {
    slug: 'editor',
    name: 'Editor',
  },
  {
    slug: 'lector',
    name: 'Lector',
  },
  {
    slug: 'researcher',
    name: 'Researcher',
  },
  {
    slug: 'trainer',
    name: 'Trainer',
  },
  {
    slug: 'tutor',
    name: 'Tutor',
  },
  {
    slug: 'learner',
    name: 'Learner',
  },
];

export default {
  up: async () => {
    await models.Role.bulkCreate(roles);
  },

  down: async () => {
    const slugs = roles.map(item => item.slug);
    await models.Role.destroy({
      where: {
        slug: {
          [models.Sequelize.Op.in]: slugs,
        },
      },
    });
  },
};
