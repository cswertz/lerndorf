import models from '../server/config/sequelize';

const capabilityLanguages = [
  {
    slug: 'edit_user',
    language: 'en',
    vocable: 'edit accounts',
  },
  {
    slug: 'edit_user',
    language: 'de',
    vocable: 'BenutzerInnenkonten bearbeiten',
  },
  {
    slug: 'delete_user',
    language: 'en',
    vocable: 'Delete Users',
  },
  {
    slug: 'delete_user',
    language: 'de',
    vocable: 'BenuterInnenkonten löschen',
  },
  {
    slug: 'delete_self',
    language: 'en',
    vocable: 'delete own account',
  },
  {
    slug: 'delete_self',
    language: 'de',
    vocable: 'Eigenes Konto löschen',
  },
  {
    slug: 'add_admin_role_to_user',
    language: 'en',
    vocable: 'grant admin rights',
  },
  {
    slug: 'add_admin_role_to_user',
    language: 'de',
    vocable: 'Administrationsrechte vergeben',
  },
  {
    slug: 'add_editor_role_to_user',
    language: 'en',
    vocable: 'grant author rights',
  },
  {
    slug: 'add_editor_role_to_user',
    language: 'de',
    vocable: 'AutorInnenrechte vergeben',
  },
  {
    slug: 'add_lector_role_to_user',
    language: 'en',
    vocable: 'grant reviewer rights',
  },
  {
    slug: 'add_lector_role_to_user',
    language: 'de',
    vocable: 'GutachterInnenrechte vergeben',
  },
  {
    slug: 'delete_admin_role_from_user',
    language: 'en',
    vocable: 'delete admin rights',
  },
  {
    slug: 'delete_admin_role_from_user',
    language: 'de',
    vocable: 'Administrationsrechte löschen',
  },
  {
    slug: 'delete_editor_role_from_user',
    language: 'en',
    vocable: 'delete author rights',
  },
  {
    slug: 'delete_editor_role_from_user',
    language: 'de',
    vocable: 'AutorInnerechte löschen',
  },
  {
    slug: 'delete_lector_role_from_user',
    language: 'en',
    vocable: 'delete reviewer rights',
  },
  {
    slug: 'delete_lector_role_from_user',
    language: 'de',
    vocable: 'GutachterInnenrechte löschen',
  },
  {
    slug: 'add_role_to_user',
    language: 'en',
    vocable: 'add role to own account',
  },
  {
    slug: 'add_role_to_user',
    language: 'de',
    vocable: 'Rolle einem Konto hinzufügen',
  },
  {
    slug: 'delete_role_from_user',
    language: 'en',
    vocable: 'delete role from own account',
  },
  {
    slug: 'delete_role_from_user',
    language: 'de',
    vocable: 'Rolle aus eigenem Konto löschen',
  },
  {
    slug: 'add_role',
    language: 'en',
    vocable: 'add role to accounts',
  },
  {
    slug: 'add_role',
    language: 'de',
    vocable: 'Rolle zu Konto hinzufügen',
  },
  {
    slug: 'edit_role',
    language: 'en',
    vocable: 'edit roles of accounts',
  },
  {
    slug: 'edit_role',
    language: 'de',
    vocable: 'Rollen eines Kontos bearbeiten',
  },
  {
    slug: 'delete_role',
    language: 'en',
    vocable: 'delete roles of accounts',
  },
  {
    slug: 'delete_role',
    language: 'de',
    vocable: 'Rollen eines Kontos löschen',
  },
  {
    slug: 'add_capability_to_role',
    language: 'en',
    vocable: 'add capability to role',
  },
  {
    slug: 'add_capability_to_role',
    language: 'de',
    vocable: 'Fähigkeit zu Rollen hinzufügen',
  },
  {
    slug: 'remove_capability_from_role',
    language: 'en',
    vocable: 'delete capability from role',
  },
  {
    slug: 'remove_capability_from_role',
    language: 'de',
    vocable: 'Fähigkeiten von Rollen entfernen',
  },
  {
    slug: 'add_file',
    language: 'en',
    vocable: 'add file',
  },
  {
    slug: 'add_file',
    language: 'de',
    vocable: 'Datei hinzufügen',
  },
  {
    slug: 'delete_any_file',
    language: 'en',
    vocable: 'delete any file',
  },
  {
    slug: 'delete_any_file',
    language: 'de',
    vocable: 'jede Datei löschen',
  },
  {
    slug: 'add_taxonomy',
    language: 'en',
    vocable: 'add taxonomy entry',
  },
  {
    slug: 'add_taxonomy',
    language: 'de',
    vocable: 'Taxonomieeintrag hinzufügen',
  },
  {
    slug: 'edit_taxonomy',
    language: 'en',
    vocable: 'edit taxonomy',
  },
  {
    slug: 'edit_taxonomy',
    language: 'de',
    vocable: 'Taxonomie bearbeiten',
  },
  {
    slug: 'delete_taxonomy',
    language: 'en',
    vocable: 'delete taxonomy entry',
  },
  {
    slug: 'delete_taxonomy',
    language: 'de',
    vocable: 'Taxonomieentrag löschen',
  },
  {
    slug: 'add_knowledge_unit',
    language: 'en',
    vocable: 'add knwoledge unit',
  },
  {
    slug: 'add_knowledge_unit',
    language: 'de',
    vocable: 'Wissenseinheit hinzufügen',
  },
  {
    slug: 'edit_any_knowledge_unit',
    language: 'en',
    vocable: 'edit any knowledge unit',
  },
  {
    slug: 'edit_any_knowledge_unit',
    language: 'de',
    vocable: 'alle Wissenseinheite bearbeiten',
  },
  {
    slug: 'add_knowledge_unit_version',
    language: 'en',
    vocable: 'add knowledge unit version',
  },
  {
    slug: 'add_knowledge_unit_version',
    language: 'de',
    vocable: 'neue Version einer Wissenseinheit hinzufügen',
  },
  {
    slug: 'set_knowledge_unit_reviewed',
    language: 'en',
    vocable: 'set knowledge unit to reviewed',
  },
  {
    slug: 'set_knowledge_unit_reviewed',
    language: 'de',
    vocable: 'Wisseneinheit als begutachter markieren',
  },
  {
    slug: 'set_knowledge_unit_lectored',
    language: 'en',
    vocable: 'set knowledge unit to copy edited',
  },
  {
    slug: 'set_knowledge_unit_lectored',
    language: 'de',
    vocable: 'Wissenseinheit als lektoriert markieren',
  },
  {
    slug: 'set_knowledge_unit_reviewed',
    language: 'en',
    vocable: 'set knowledge unit to reviewed',
  },
  {
    slug: 'view_non_public_knowledge_unit',
    language: 'en',
    vocable: 'view non public knowledge unit',
  },
  {
    slug: 'view_non_public_knowledge_unit',
    language: 'de',
    vocable: 'nicht öffentliche Wissenseinheit anzeigen',
  },
  {
    slug: 'add_learning_unit',
    language: 'en',
    vocable: 'add learning unit',
  },
  {
    slug: 'add_learning_unit',
    language: 'de',
    vocable: 'Lerneinheit hinzufügen',
  },
  {
    slug: 'edit_any_learning_unit',
    language: 'en',
    vocable: 'edit any learning unit',
  },
  {
    slug: 'edit_any_learning_unit',
    language: 'de',
    vocable: 'jede Lerneinheit beabeiten',
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const translations = [];

    for (let i = 0; i < capabilityLanguages.length; i += 1) {
      const { slug, language, vocable } = capabilityLanguages[i];
      const resultLanguage = await models.Language.findOne({
        where: {
          code: language,
        },
        attributes: ['id'],
      });
      const languageId = resultLanguage.id;

      const resultCapability = await models.Capability.findOne({
        where: {
          slug,
        },
        attributes: ['id']
      });
      const capabilityId = resultCapability.id;

      translations.push({
        RoleId: capabilityId,
        LanguageId: languageId,
        vocable,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      });
    }

    queryInterface.bulkInsert('CapabilityLanguage', translations);
  },

  down: (queryInterface) => queryInterface.rawSelect('Capabilities', {
    where: {
      id: 1,
    },
  }, ['id'])
    .then((taxonomy) => queryInterface.bulkDelete('CapabilityLanguage', {
      TaxonomyId: taxonomy,
    })),
};
