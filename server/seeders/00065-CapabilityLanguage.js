const TaxonomyLanguages = [
  {
    type: 'edit_user',
    language: 'en',
    vocable: 'edit accounts'
  },
  {
    type: 'edit_user',
    language: 'de',
    vocable: 'BenutzerInnenkonten bearbeiten'
  },
  {
    type: 'delete_user',
    language: 'en',
    vocable: 'Delete Users'
  },
  {
    type: 'delete_user',
    language: 'de',
    vocable: 'BenuterInnenkonten löschen'
  },
  {
    type: 'delete_self',
    language: 'en',
    vocable: 'delete own account'
  },
  {
    type: 'delete_self',
    language: 'de',
    vocable: 'Eigenes Konto löschen'
  },
  {
    type: 'add_admin_role_to_user',
    language: 'en',
    vocable: 'grant admin rights'
  },
  {
    type: 'add_admin_role_to_user',
    language: 'de',
    vocable: 'Administrationsrechte vergeben'
  },
  {
    type: 'add_editor_role_to_user',
    language: 'en',
    vocable: 'grant author rights'
  },
  {
    type: 'add_editor_role_to_user',
    language: 'de',
    vocable: 'AutorInnenrechte vergeben'
  },
  {
    type: 'add_lector_role_to_user',
    language: 'en',
    vocable: 'grant reviewer rights'
  },
  {
    type: 'add_lector_role_to_user',
    language: 'de',
    vocable: 'GutachterInnenrechte vergeben'
  },{
    type: 'delete_admin_role_from_user',
    language: 'en',
    vocable: 'delete admin rights'
  },
  {
    type: 'delete_admin_role_from_user',
    language: 'de',
    vocable: 'Administrationsrechte löschen'
  },{
    type: 'delete_editor_role_from_user',
    language: 'en',
    vocable: 'delete author rights'
  },
  {
    type: 'delete_editor_role_from_user',
    language: 'de',
    vocable: 'AutorInnerechte löschen'
  },{
    type: 'delete_lector_role_from_user',
    language: 'en',
    vocable: 'delete reviewer rights'
  },
  {
    type: 'delete_lector_role_from_user',
    language: 'de',
    vocable: 'GutachterInnenrechte löschen'
  },{
    type: 'add_role_to_user',
    language: 'en',
    vocable: 'add role to own account'
  },
  {
    type: 'add_role_to_user',
    language: 'de',
    vocable: 'Rolle einem Konto hinzufügen'
  },{
    type: 'delete_role_from_user',
    language: 'en',
    vocable: 'delete role from own account'
  },
  {
    type: 'delete_role_from_user',
    language: 'de',
    vocable: 'Rolle aus eigenem Konto löschen'
  },{
    type: 'add_role',
    language: 'en',
    vocable: 'add role to accounts'
  },
  {
    type: 'add_role',
    language: 'de',
    vocable: 'Rolle zu Konto hinzufügen'
  },{
    type: 'edit_role',
    language: 'en',
    vocable: 'edit roles of accounts'
  },
  {
    type: 'edit_role',
    language: 'de',
    vocable: 'Rollen eines Kontos bearbeiten'
  },{
    type: 'delete_role',
    language: 'en',
    vocable: 'delete roles of accounts'
  },
  {
    type: 'delete_role',
    language: 'de',
    vocable: 'Rollen eines Kontos löschen'
  },{
    type: 'add_capability_to_role',
    language: 'en',
    vocable: 'add capability to role'
  },
  {
    type: 'add_capability_to_role',
    language: 'de',
    vocable: 'Fähigkeit zu Rollen hinzufügen'
  },{
    type: 'remove_capability_from_role',
    language: 'en',
    vocable: 'delete capability from role'
  },
  {
    type: 'remove_capability_from_role',
    language: 'de',
    vocable: 'Fähigkeiten von Rollen entfernen'
  },{
    type: 'add_file',
    language: 'en',
    vocable: 'add file'
  },
  {
    type: 'add_file',
    language: 'de',
    vocable: 'Datei hinzufügen'
  },{
    type: 'delete_any_file',
    language: 'en',
    vocable: 'delete any file'
  },
  {
    type: 'delete_any_file',
    language: 'de',
    vocable: 'jede Datei löschen'
  },{
    type: 'add_taxonomy',
    language: 'en',
    vocable: 'add taxonomy entry'
  },
  {
    type: 'add_taxonomy',
    language: 'de',
    vocable: 'Taxonomieeintrag hinzufügen'
  },{
    type: 'edit_taxonomy',
    language: 'en',
    vocable: 'edit taxonomy'
  },
  {
    type: 'edit_taxonomy',
    language: 'de',
    vocable: 'Taxonomie bearbeiten'
  },{
    type: 'delete_taxonomy',
    language: 'en',
    vocable: 'delete taxonomy entry'
  },
  {
    type: 'delete_taxonomy',
    language: 'de',
    vocable: 'Taxonomieentrag löschen'
  },{
    type: 'add_knowledge_unit',
    language: 'en',
    vocable: 'add knwoledge unit'
  },
  {
    type: 'add_knowledge_unit',
    language: 'de',
    vocable: 'Wissenseinheit hinzufügen'
  },{
    type: 'edit_any_knowledge_unit',
    language: 'en',
    vocable: 'edit any knowledge unit'
  },
  {
    type: 'edit_any_knowledge_unit',
    language: 'de',
    vocable: 'alle Wissenseinheite bearbeiten'
  },{
    type: 'add_knowledge_unit_version',
    language: 'en',
    vocable: 'add knowledge unit version'
  },
  {
    type: 'add_knowledge_unit_version',
    language: 'de',
    vocable: 'neue Version einer Wissenseinheit hinzufügen'
  },{
    type: 'set_knowledge_unit_reviewed',
    language: 'en',
    vocable: 'set knowledge unit to reviewed'
  },
  {
    type: 'set_knowledge_unit_reviewed',
    language: 'de',
    vocable: 'Wisseneinheit als begutachter markieren'
  },{
    type: 'set_knowledge_unit_lectored',
    language: 'en',
    vocable: 'set knowledge unit to copy edited'
  },
  {
    type: 'set_knowledge_unit_lectored',
    language: 'de',
    vocable: 'Wissenseinheit als lektoriert markieren'
  },{
    type: 'set_knowledge_unit_reviewed',
    language: 'en',
    vocable: 'set knowledge unit to reviewed'
  },{
    type: 'view_non_public_knowledge_unit',
    language: 'en',
    vocable: 'view non public knowledge unit'
  },
  {
    type: 'view_non_public_knowledge_unit',
    language: 'de',
    vocable: 'nicht öffentliche Wissenseinheit anzeigen'
  },{
    type: 'add_learning_unit',
    language: 'en',
    vocable: 'add learning unit'
  },
  {
    type: 'add_learning_unit',
    language: 'de',
    vocable: 'Lerneinheit hinzufügen'
  },
  {
    type: 'edit_any_learning_unit',
    language: 'en',
    vocable: 'edit any learning unit'
  },
  {
    type: 'edit_any_learning_unit',
    language: 'de',
    vocable: 'jede Lerneinheit beabeiten'
  },  
]


module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.rawSelect('Capabilities', {
    where: {
      slug: 'edit_user',
    },
  }, ['id'])
    .then((result) => {
      const capability = result;
      return queryInterface.rawSelect('Languages', {
        where: {
          code: 'en',
        },
      }, ['id'])
        .then(language => queryInterface.bulkInsert('CapabilityLanguage', [
          {
            CapabilityId: capability,
            LanguageId: language,
            vocable: 'Edit User',
            createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
            updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
        ], {}));
    }),

  down: queryInterface => queryInterface.rawSelect('Capabilities', {
    where: {
      id: 1,
    },
  }, ['id'])
    .then(taxonomy => queryInterface.bulkDelete('CapabilityLanguage', {
      TaxonomyId: taxonomy,
    })),
};
