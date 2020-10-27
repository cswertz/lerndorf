import models from '../config/sequelize';

async function getTree(source) {
  async function getChildren(parentId, level) {
    const prefix = `${'-'.repeat(level)} `;
    const children = await models.Taxonomy.findAll({
      where: {
        parent: parentId,
      },
      attributes: [
        'id',
        'type',
      ],
    });

    const terms = [];
    const promises = [];
    for (let i = 0; i < children.length; i += 1) {
      const current = children[i];
      const term = {
        id: current.id,
        type: prefix + current.type,
      };

      promises.push(getChildren(current.id, level + 1));
      terms.push(term);
    }

    const results = await Promise.all(promises);
    for (let i = 0; i < results.length; i += 1) {
      terms[i].children = results[i];
    }

    return terms;
  }

  const taxonomies = {};
  const promises = [];
  for (let i = 0; i < source.length; i += 1) {
    const current = source[i];
    promises.push(getChildren(current.id, 1));
  }

  const results = await Promise.all(promises);
  for (let i = 0; i < source.length; i += 1) {
    const current = source[i];
    const parent = current.Parent.type;
    if (!taxonomies[parent]) {
      taxonomies[parent] = [];
    }

    taxonomies[parent].push({
      id: current.id,
      type: current.type,
      children: results[i],
    });
  }

  const flatten = (terms) => {
    let flat = [];
    for (let i = 0; i < terms.length; i += 1) {
      const current = terms[i];
      flat.push(current);
      if (terms[i].children.length > 0) {
        flat = flat.concat(flatten(terms[i].children));
      }

      delete current.children;
    }

    return flat;
  };

  const keys = Object.keys(taxonomies);
  const flattened = {};
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    flattened[key] = flatten(taxonomies[key]);
  }

  return flattened;
}

export {
  getTree,
};
