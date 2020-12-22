import models from '../server/config/sequelize';

const roleCapabilities = [
  {
    role: 'admin',
    capabilities: [
      'edit_user',
      'delete_user',
      'add_admin_role_to_user',
      'add_editor_role_to_user',
      'add_lector_role_to_user',
      'delete_admin_role_from_user',
      'delete_editor_role_from_user',
      'delete_lector_role_from_user',
      'add_role',
      'edit_role',
      'delete_role',
      'add_capability_to_role',
      'remove_capability_from_role',
      'add_file',
      'delete_any_file',
      'add_taxonomy',
      'edit_taxonomy',
      'delete_taxonomy',
      'add_language',
      'edit_language',
      'delete_language',
      'add_knowledge_unit',
      'edit_any_knowledge_unit',
      'delete_any_knowledge_unit',
      'add_knowledge_unit_version',
      'set_knowledge_unit_reviewed',
      'set_knowledge_unit_lectored',
      'view_non_public_knowledge_unit',
      'add_learning_unit',
      'edit_any_learning_unit',
      'delete_any_learning_unit',
      'add_role_to_user',
      'delete_role_from_user',
      'delete_self',
      'view_user_logs',
    ],
  },
  {
    role: 'guest',
    capabilities: [],
  },
  {
    role: 'user',
    capabilities: [
      'add_file',
      'add_knowledge_unit',
      'add_knowledge_unit_version',
      'add_learning_unit',
      'delete_self',
    ],
  },
  {
    role: 'editor',
    capabilities: [
      'set_knowledge_unit_lectored',
      'delete_editor_role_from_user',
    ],
  },
  {
    role: 'lector',
    capabilities: [
      'delete_lector_role_from_user',
      'set_knowledge_unit_lectored',
      'set_knowledge_unit_reviewed',
    ],
  },
];

export default {
  up: async () => {
    const promises = [];
    for (let i = 0; i < roleCapabilities.length; i += 1) {
      const { role, capabilities } = roleCapabilities[i];

      const query = models.Role.findAll({
        where: {
          slug: role,
        },
      })
        .then((results) => {
          const promises1 = results.map(currentRole => models.Capability.findAll({
            where: {
              slug: {
                [models.Sequelize.Op.in]: capabilities,
              },
            },
          })
            .then((results1) => {
              const ids = results1.map(capability => capability.id);
              return currentRole.addCapabilities(ids);
            }));
          return Promise.all(promises1);
        });
      promises.push(query);
    }

    await Promise.all(promises);
  },
  down: async () => {
    const promises = [];
    for (let i = 0; i < roleCapabilities.length; i += 1) {
      const { role, capabilities } = roleCapabilities[i];

      const query = models.Role.findAll({
        where: {
          slug: role,
        },
      })
        .then((results) => {
          const promises1 = results.map(currentRole => models.Capability.findAll({
            where: {
              slug: {
                [models.Sequelize.Op.in]: capabilities,
              },
            },
          })
            .then((results1) => {
              const ids = results1.map(capability => capability.id);
              return currentRole.removeCapabilities(ids);
            }));
          return Promise.all(promises1);
        });
      promises.push(query);
    }

    await Promise.all(promises);
  },
};
