const term = (taxonomy, languageId) => {
  let vocable = taxonomy.type;
  const translation = taxonomy.TaxonomyLanguages.filter((item) => item.LanguageId === languageId);
  if (translation.length > 0) {
    vocable = translation[0].vocable;
  }

  return vocable;
};

export {
  term,
};
