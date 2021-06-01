import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import TaxonomiesAddChild from '../taxonomies/AddChild';
import TaxonomyChildren from '../taxonomies/Children';
import TaxonomiesEdit from '../taxonomies/Edit';
import TaxonomiesAdd from '../taxonomies/Add';
import Taxonomies from '../taxonomies/List';

const Router = ({ taxonomies, actions }) => (
  <>
    <Route
      exact
      path="/taxonomies"
      render={() => (
        <Taxonomies
          itemsDelete={actions.taxonomiesDelete}
          itemsDisable={actions.taxonomiesDisable}
          itemsEnable={actions.taxonomiesEnable}
          itemsFetch={actions.taxonomiesFetch}
          items={taxonomies}
        />
      )}
    />

    <Route
      exact
      path="/taxonomies/show/:id"
      render={() => (
        <TaxonomyChildren
          itemFetch={actions.taxonomiesItemFetch}
          itemsDelete={actions.taxonomiesDelete}
          itemsDisable={actions.taxonomiesDisable}
          itemsEnable={actions.taxonomiesEnable}
          items={taxonomies}
        />
      )}
    />

    <Route
      exact
      path="/taxonomies/add"
      render={() => (
        <TaxonomiesAdd handleSubmit={actions.taxonomiesAdd} errors={taxonomies.errors} />
      )}
    />

    <Route
      exact
      path="/taxonomies/:id/add"
      render={() => (
        <TaxonomiesAddChild handleSubmit={actions.taxonomiesAdd} errors={taxonomies.errors} />
      )}
    />

    <Route
      exact
      path="/taxonomies/edit/:id"
      render={() => (
        <TaxonomiesEdit
          itemFetch={actions.taxonomiesItemFetch}
          handleSubmit={actions.taxonomiesEdit}
          errors={taxonomies.errors}
          items={taxonomies}
        />
      )}
    />
  </>
);

Router.propTypes = {
  taxonomies: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    errors: PropTypes.shape().isRequired,
    id: PropTypes.shape({}).isRequired,
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    taxonomiesItemFetch: PropTypes.func.isRequired,
    taxonomiesDelete: PropTypes.func.isRequired,
    taxonomiesDisable: PropTypes.func.isRequired,
    taxonomiesEnable: PropTypes.func.isRequired,
    taxonomiesFetch: PropTypes.func.isRequired,
    taxonomiesEdit: PropTypes.func.isRequired,
    taxonomiesAdd: PropTypes.func.isRequired,
    userLogout: PropTypes.func.isRequired,
  }).isRequired,
};

export default Router;
