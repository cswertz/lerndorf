const term = (taxonomy, languageId) => {
  let vocable = taxonomy.type;
  const translation = taxonomy.TaxonomyLanguages.filter((item) => item.LanguageId === languageId);
  if (translation.length > 0) {
    vocable = translation[0].vocable;
  }

  return vocable;
};

const getOptions = (taxonomy, languageId) => {
  const options = taxonomy.map((taxonomyTerm) => {
    let vocable = taxonomyTerm.prefix || '';
    let translated = taxonomyTerm.type;

    const translations = taxonomyTerm.TaxonomyLanguages
      .filter((item) => item.LanguageId === languageId);
    if (translations.length > 0) {
      translated = translations[0].vocable;
    }

    vocable += translated;

    return {
      id: taxonomyTerm.id,
      type: vocable,
    };
  });

  return options;
};

export {
  term,
  getOptions,
};
