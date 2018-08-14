import models from '../server/config/sequelize';

const TaxonomyLanguages = [
  {
    type: 'taxonomies',
    language: 'en',
    vocable: 'Taxonomies'
  },
  {
    type: 'taxonomies',
    language: 'de',
    vocable: 'Taxonomien'
  },
  {
    type: 'mediaType',
    language: 'en',
    vocable: 'MediaType'
  },
  {
    type: 'mediaType',
    language: 'de',
    vocable: 'Medientyp'
  },
  {
    type: 'presentation',
    language: 'en',
    vocable: 'Presentation'
  },
  {
    type: 'presentation',
    language: 'de',
    vocable: 'Darstellung'
  },
  {
    type: 'animation',
    language: 'en',
    vocable: 'Animation'
  },
  {
    type: 'animation',
    language: 'de',
    vocable: 'Animation'
  },
  {
    type: 'audio',
    language: 'en',
    vocable: 'audio'
  },
  {
    type: 'audio',
    language: 'de',
    vocable: 'Audio'
  },
  {
    type: 'photo',
    language: 'en',
    vocable: 'Photo'
  },
  {
    type: 'photo',
    language: 'de',
    vocable: 'Foto'
  },
  {
    type: 'drawing',
    language: 'en',
    vocable: 'Drawing'
  },
  {
    type: 'drawing',
    language: 'de',
    vocable: 'Zeichnung'
  },
  {
    type: 'table',
    language: 'en',
    vocable: 'Table'
  },
  {
    type: 'table',
    language: 'de',
    vocable: 'Tabelle'
  },
  {
    type: 'text',
    language: 'en',
    vocable: 'Text'
  },
  {
    type: 'text',
    language: 'de',
    vocable: 'Text'
  },
  {
    type: 'video',
    language: 'en',
    vocable: 'Video'
  },
  {
    type: 'video',
    language: 'de',
    vocable: 'Video'
  },
  {
    type: 'communication',
    language: 'en',
    vocable: 'Communication'
  },
  {
    type: 'communication',
    language: 'de',
    vocable: 'Kommunikation'
  },
  {
    type: 'asynchronous',
    language: 'en',
    vocable: 'Asynchronous Communication'
  },
  {
    type: 'asynchronous',
    language: 'de',
    vocable: 'Asynchrone Kommunikation'
  },
  {
    type: 'forum',
    language: 'en',
    vocable: 'Forum'
  },
  {
    type: 'forum',
    language: 'de',
    vocable: 'Forum'
  },
  {
    type: 'interaction',
    language: 'en',
    vocable: 'Interaction'
  },
  {
    type: 'interaction',
    language: 'de',
    vocable: 'Interaktion'
  },
  {
    type: 'form',
    language: 'en',
    vocable: 'Form'
  },
  {
    type: 'form',
    language: 'de',
    vocable: 'Formular'
  },
  {
    type: 'interactiveVideo',
    language: 'en',
    vocable: 'Interactive Video'
  },
  {
    type: 'interactiveVideo',
    language: 'de',
    vocable: 'Interaktives Video'
  },
  {
    type: 'knowledgeType',
    language: 'en',
    vocable: 'Knowledge Type'
  },
  {
    type: 'knowledgeType',
    language: 'de',
    vocable: 'Wissensart'
  },
  {
    type: 'receptive',
    language: 'en',
    vocable: 'Receptive Knowledge Types'
  },
  {
    type: 'receptive',
    language: 'de',
    vocable: 'Rezeptive Wissensarten'
  },
  {
    type: 'orientation',
    language: 'en',
    vocable: 'Orientation'
  },
  {
    type: 'orientation',
    language: 'de',
    vocable: 'Orientierung'
  },
  {
    type: 'facts',
    language: 'en',
    vocable: 'Facts'
  },
  {
    type: 'facts',
    language: 'de',
    vocable: 'Fakten'
  },
  {
    type: 'history',
    language: 'en',
    vocable: 'Historical Event'
  },
  {
    type: 'history',
    language: 'de',
    vocable: 'Geschichtliches Ereignis'
  },
  {
    type: 'overview',
    language: 'en',
    vocable: 'Overview'
  },
  {
    type: 'overview',
    language: 'de',
    vocable: 'Überblick'
  },
  {
    type: 'knowledgeMap',
    language: 'en',
    vocable: 'Knowledge Map'
  },
  {
    type: 'knowledgeMap',
    language: 'de',
    vocable: 'Wissenslandkarte'
  },
  {
    type: 'abstract',
    language: 'en',
    vocable: 'Abstract'
  },
  {
    type: 'abstract',
    language: 'de',
    vocable: 'Kurzfassung'
  },
  {
    type: 'scenario',
    language: 'en',
    vocable: 'Scenario'
  },
  {
    type: 'scenario',
    language: 'de',
    vocable: 'Szenario'
  },
  {
    type: 'story',
    language: 'en',
    vocable: 'Story'
  },
  {
    type: 'story',
    language: 'de',
    vocable: 'Geschichte'
  },
  {
    type: 'virtualWorld',
    language: 'en',
    vocable: 'Virtual World'
  },
  {
    type: 'virtualWorld',
    language: 'de',
    vocable: 'Virtuelle Welt'
  },
  {
    type: 'explanation',
    language: 'en',
    vocable: 'Explanation'
  },
  {
    type: 'explanation',
    language: 'de',
    vocable: 'Erklärung'
  },
  {
    type: 'argument',
    language: 'en',
    vocable: 'Argument'
  },
  {
    type: 'argument',
    language: 'de',
    vocable: 'Argument'
  },
  {
    type: 'example',
    language: 'en',
    vocable: 'Example'
  },
  {
    type: 'example',
    language: 'de',
    vocable: 'Beispiel'
  },
  {
    type: 'description',
    language: 'en',
    vocable: 'Description'
  },
  {
    type: 'description',
    language: 'de',
    vocable: 'Beschreibung'
  },
  {
    type: 'interview',
    language: 'en',
    vocable: 'Interview'
  },
  {
    type: 'interview',
    language: 'de',
    vocable: 'Interview'
  },
  {
    type: 'definition',
    language: 'en',
    vocable: 'Definition'
  },
  {
    type: 'definition',
    language: 'de',
    vocable: 'Definition'
  },
  {
    type: 'action',
    language: 'en',
    vocable: 'Action Knowledge'
  },
  {
    type: 'action',
    language: 'de',
    vocable: 'Handlungswissen'
  },
  {
    type: 'instructions',
    language: 'en',
    vocable: 'Instructions'
  },
  {
    type: 'instructions',
    language: 'de',
    vocable: 'Anleitung'
  },
  {
    type: 'checklist',
    language: 'en',
    vocable: 'Checklist'
  },
  {
    type: 'checklist',
    language: 'de',
    vocable: 'Checkliste'
  },
  {
    type: 'rule',
    language: 'en',
    vocable: 'Rule'
  },
  {
    type: 'rule',
    language: 'de',
    vocable: 'Regel'
  },
  {
    type: 'strategy',
    language: 'en',
    vocable: 'Strategy'
  },
  {
    type: 'strategy',
    language: 'de',
    vocable: 'Strategie'
  },
  {
    type: 'source',
    language: 'en',
    vocable: 'Source Knowledge'
  },
  {
    type: 'source',
    language: 'de',
    vocable: 'Quellenwissen'
  },
  {
    type: 'links',
    language: 'en',
    vocable: 'Website'
  },
  {
    type: 'links',
    language: 'de',
    vocable: 'Webseite'
  },

  {
    type: 'literature',
    language: 'en',
    vocable: 'Literature'
  },
  {
    type: 'literature',
    language: 'de',
    vocable: 'Literatur'
  },
  {
    type: 'downloads',
    language: 'en',
    vocable: 'Downloads'
  },
  {
    type: 'downloads',
    language: 'de',
    vocable: 'Downloads'
  },
  {
    type: 'interactive',
    language: 'en',
    vocable: 'Interactive Knowledge'
  },
  {
    type: 'interactive',
    language: 'de',
    vocable: 'Interaktives Wissen'
  },
  {
    type: 'multipleChoice',
    language: 'en',
    vocable: 'Multiple Choice Question'
  },
  {
    type: 'multipleChoice',
    language: 'de',
    vocable: 'Multiple Choice Frage'
  },{
    type: 'simulation',
    language: 'en',
    vocable: 'Simulation'
  },
  {
    type: 'simulation',
    language: 'de',
    vocable: 'Simulation'
  },
  {
    type: 'cooperation',
    language: 'en',
    vocable: 'Cooperation'
  },
  {
    type: 'cooperation',
    language: 'de',
    vocable: 'Kooperation'
  },
  {
    type: 'plannedCooperation',
    language: 'en',
    vocable: 'Planned Cooperation'
  },
  {
    type: 'plannedCooperation',
    language: 'de',
    vocable: 'Geplante Kooperation'
  },{
    type: 'discussion',
    language: 'en',
    vocable: 'Siscussion'
  },
  {
    type: 'discussion',
    language: 'de',
    vocable: 'Diskussion'
  },
  {
    type: 'brainstorming',
    language: 'en',
    vocable: 'Brainstorming'
  },
  {
    type: 'brainstorming',
    language: 'de',
    vocable: 'Brainstorming'
  },
  {
    type: 'problemsolving',
    language: 'en',
    vocable: 'Problem Solving Task'
  },
  {
    type: 'problemsolving',
    language: 'de',
    vocable: 'Problemlösungsaufgabe'
  },
  {
    type: 'consultationHour',
    language: 'en',
    vocable: 'Consultation Hour'
  },
  {
    type: 'consultationHour',
    language: 'de',
    vocable: 'Sprechstunde'
  },
  {
    type: 'spontanouesCooperation',
    language: 'en',
    vocable: 'Spontanoues Cooperation'
  },
  {
    type: 'spontanouesCooperation',
    language: 'de',
    vocable: 'Spontante Kooperation'
  },
  {
    type: 'communityCommunication',
    language: 'en',
    vocable: 'Community Communication'
  },
  {
    type: 'communityCommunication',
    language: 'de',
    vocable: 'Gruppenkommunikation'
  },
  {
    type: 'questionToTeacher',
    language: 'en',
    vocable: 'Question to Teacher'
  },
  {
    type: 'questionToTeacher',
    language: 'de',
    vocable: 'Frage an Lehrende'
  },
  {
    type: 'relationType',
    language: 'en',
    vocable: 'Relation Type'
  },
  {
    type: 'relationType',
    language: 'de',
    vocable: 'Relationstyp'
  },
  {
    type: 'hierarchical',
    language: 'en',
    vocable: 'hierarchical'
  },
  {
    type: 'hierarchical',
    language: 'de',
    vocable: 'hierarchisch'
  },
  {
    type: 'genericize',
    language: 'en',
    vocable: 'genericize'
  },
  {
    type: 'genericize',
    language: 'de',
    vocable: 'allgemeiner'
  },
  {
    type: 'consistsOf',
    language: 'en',
    vocable: 'consists of'
  },
  {
    type: 'consistsOf',
    language: 'de',
    vocable: 'ist Teil von'
  },
  {
    type: 'associative',
    language: 'en',
    vocable: 'is associated with'
  },
  {
    type: 'associative',
    language: 'de',
    vocable: 'is assoziiert mit'
  },
  {
    type: 'beside',
    language: 'en',
    vocable: 'is beside of'
  },
  {
    type: 'beside',
    language: 'de',
    vocable: 'ist neben'
  },
  {
    type: 'oppositeOf',
    language: 'en',
    vocable: 'is the opposite of'
  },
  {
    type: 'oppositeOf',
    language: 'de',
    vocable: 'ist das Gegenteil von'
  },
  {
    type: 'chronologicalBefore',
    language: 'en',
    vocable: 'is chronological before'
  },
  {
    type: 'chronologicalBefore',
    language: 'de',
    vocable: 'ist zeitlich vor'
  },
  {
    type: 'chronologicalAfter',
    language: 'en',
    vocable: 'is chronological after'
  },
  {
    type: 'chronologicalAfter',
    language: 'de',
    vocable: 'ist zeitlich nach'
  },
  {
    type: 'licences',
    language: 'en',
    vocable: 'Licences'
  },
  {
    type: 'licences',
    language: 'de',
    vocable: 'Lizenzen'
  },
  {
    type: 'cc',
    language: 'en',
    vocable: 'Creative Commons Licenses'
  },
  {
    type: 'cc',
    language: 'de',
    vocable: 'Creative Commons Lizenzen'
  },
  {
    type: 'cc-by',
    language: 'en',
    vocable: 'cc-by'
  },
  {
    type: 'cc-by',
    language: 'de',
    vocable: 'cc-by'
  },
  {
    type: 'cc-by-sa',
    language: 'en',
    vocable: 'cc-by-sa'
  },
  {
    type: 'cc-by-sa',
    language: 'de',
    vocable: 'cc-by-sa'
  },
  {
    type: 'cc-by-nd',
    language: 'en',
    vocable: 'cc-by-nd'
  },
  {
    type: 'cc-by-nd',
    language: 'de',
    vocable: 'cc-by-nd'
  },
  {
    type: 'cc-by-nc',
    language: 'en',
    vocable: 'cc-by-nc'
  },
  {
    type: 'cc-by-nc',
    language: 'de',
    vocable: 'cc-by-nc'
  },
  {
    type: 'cc-by-sa-nc',
    language: 'en',
    vocable: 'cc-by-sa-nc'
  },
  {
    type: 'cc-by-sa-nc',
    language: 'de',
    vocable: 'cc-by-sa-nc'
  },
  {
    type: 'gnu',
    language: 'en',
    vocable: 'GNU Licenses'
  },
  {
    type: 'gnu',
    language: 'de',
    vocable: 'GNU Lizenzen'
  },
  {
    type: 'gnu-gpl',
    language: 'en',
    vocable: 'gnu-gpl'
  },
  {
    type: 'gnu-gpl',
    language: 'de',
    vocable: 'gnu-gpl'
  },
  {
    type: 'gnu-lgpl',
    language: 'en',
    vocable: 'gnu-lgpl'
  },
  {
    type: 'gnu-lgpl',
    language: 'de',
    vocable: 'gnu-lgpl'
  },
  {
    type: 'gnu-agpl',
    language: 'en',
    vocable: 'gnu-agpl'
  },
  {
    type: 'gnu-agpl',
    language: 'de',
    vocable: 'gnu-agpl'
  },
  {
    type: 'gnu-fdl',
    language: 'en',
    vocable: 'gnu-fdl'
  },
  {
    type: 'gnu-fdl',
    language: 'de',
    vocable: 'gnu-fdl'
  },
  {
    type: 'pd',
    language: 'en',
    vocable: 'Public Domain'
  },
  {
    type: 'pd',
    language: 'de',
    vocable: 'Gemeinfrei'
  },
  {
    type: 'c',
    language: 'en',
    vocable: 'Copyright'
  },
  {
    type: 'c',
    language: 'de',
    vocable: 'Urheberrechtlich geschützt'
  },
  {
    type: 'courseLevel',
    language: 'en',
    vocable: 'Difficulty Level'
  },
  {
    type: 'courseLevel',
    language: 'de',
    vocable: 'Schwierigkeitsgrad'
  },
  {
    type: 'beginner',
    language: 'en',
    vocable: 'low'
  },
  {
    type: 'beginner',
    language: 'de',
    vocable: 'niedrig'
  },{
    type: 'intermediate',
    language: 'en',
    vocable: 'normal'
  },
  {
    type: 'intermediate',
    language: 'de',
    vocable: 'mittel'
  },
  {
    type: 'advanced',
    language: 'en',
    vocable: 'high'
  },
  {
    type: 'advanced',
    language: 'de',
    vocable: 'schwierig'
  },
  {
    type: 'minimumScreenResolution',
    language: 'en',
    vocable: 'Minimum Screen Resolution'
  },
  {
    type: 'minimumScreenResolution',
    language: 'de',
    vocable: 'Minimale Bildschirmauflösung'
  },
  {
    type: '16-9-M',
    language: 'en',
    vocable: '16-9-M'
  },
  {
    type: '16-9-M',
    language: 'de',
    vocable: '16-9-M'
  },
  {
    type: '16-9-L',
    language: 'en',
    vocable: '16-9-L'
  },
  {
    type: '16-9-L',
    language: 'de',
    vocable: '16-9-L'
  },
  {
    type: '16-9-XL',
    language: 'en',
    vocable: '16-9-XL'
  },
  {
    type: '16-9-XL',
    language: 'de',
    vocable: '16-9-XL'
  },
  {
    type: '4-3-XS',
    language: 'en',
    vocable: '4-3-XS'
  },
  {
    type: '4-3-XS',
    language: 'de',
    vocable: '4-3-XS'
  },
  {
    type: '4-3-S',
    language: 'en',
    vocable: '4-3-S'
  },
  {
    type: '4-3-S',
    language: 'de',
    vocable: '4-3-S'
  },
  {
    type: '4-3-M',
    language: 'en',
    vocable: '4-3-M'
  },
  {
    type: '4-3-M',
    language: 'de',
    vocable: '4-3-M'
  },
  {
    type: '4-3-L',
    language: 'en',
    vocable: '4-3-L'
  },
  {
    type: '4-3-L',
    language: 'de',
    vocable: '4-3-L'
  },
  {
    type: '4-3-XL',
    language: 'en',
    vocable: '4-3-XL'
  },
  {
    type: '4-3-XL',
    language: 'de',
    vocable: '4-3-XL'
  },
]

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.rawSelect('Taxonomies', {
    where: {
      id: 1,
    },
  }, ['id'])
    .then((result) => {
      const taxonomy = result;
      return queryInterface.rawSelect('Languages', {
        where: {
          code: 'en',
        },
      }, ['id'])
        .then(language => queryInterface.bulkInsert('TaxonomyLanguage', [
          {
            TaxonomyId: taxonomy,
            LanguageId: language,
            vocable: 'Taxonomies',
            createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
            updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
        ], {}));
    }),

  down: queryInterface => queryInterface.rawSelect('Taxonomies', {
    where: {
      id: 1,
    },
  }, ['id'])
    .then(taxonomy => queryInterface.bulkDelete('TaxonomyLanguage', {
      TaxonomyId: taxonomy,
    })),
};
