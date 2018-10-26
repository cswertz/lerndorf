import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import Wrapper from '../../components/routes/wrapper';

import TaxonomiesAddChild from '../taxonomies/AddChild';
import TaxonomyChildren from '../taxonomies/Children';
import TaxonomiesEdit from '../taxonomies/Edit';
import TaxonomiesAdd from '../taxonomies/Add';
import Taxonomies from '../taxonomies/List';

const Router = ({
  taxonomies,
  actions,
  user,
}) => (
  <React.Fragment>
    <Route
      exact
      path="/taxonomies"
      render={() => (
        <Wrapper
          fetchRoles={actions.userFetchRoles}
          className="TaxonomiesWrapper"
          logout={actions.userLogout}
          active="taxonomies"
          title="Taxonomies"
          user={user}
          element={(
            <Taxonomies
              itemsDelete={actions.taxonomiesDelete}
              itemsFetch={actions.taxonomiesFetch}
              items={taxonomies}
            />
          )}
        />
      )}
    />

    <Route
      exact
      path="/taxonomies/show/:id"
      render={() => (
        <Wrapper
          fetchRoles={actions.userFetchRoles}
          className="TaxonomiesWrapper"
          logout={actions.userLogout}
          active="taxonomies"
          title="Taxonomies"
          user={user}
          element={(
            <TaxonomyChildren
              itemFetch={actions.taxonomiesItemFetch}
              itemsDelete={actions.taxonomiesDelete}
              items={taxonomies}
            />
          )}
        />
      )}
    />

    <Route
      exact
      path="/taxonomies/add"
      render={() => (
        <Wrapper
          fetchRoles={actions.userFetchRoles}
          className="TaxonomiesWrapper"
          logout={actions.userLogout}
          active="taxonomies"
          title="Add Taxonomy"
          user={user}
          element={(
            <TaxonomiesAdd
              handleSubmit={actions.taxonomiesAdd}
              errors={taxonomies.errors}
            />
          )}
        />
      )}
    />

    <Route
      exact
      path="/taxonomies/:id/add"
      render={() => (
        <Wrapper
          fetchRoles={actions.userFetchRoles}
          className="TaxonomiesWrapper"
          logout={actions.userLogout}
          active="taxonomies"
          title="Add Taxonomy"
          user={user}
          element={(
            <TaxonomiesAddChild
              handleSubmit={actions.taxonomiesAdd}
              errors={taxonomies.errors}
            />
          )}
        />
      )}
    />

    <Route
      exact
      path="/taxonomies/edit/:id"
      render={() => (
        <Wrapper
          fetchRoles={actions.userFetchRoles}
          className="TaxonomiesWrapper"
          logout={actions.userLogout}
          active="taxonomies"
          title="Edit Taxonomy Term"
          user={user}
          element={(
            <TaxonomiesEdit
              itemFetch={actions.taxonomiesItemFetch}
              handleSubmit={actions.taxonomiesEdit}
              errors={taxonomies.errors}
              items={taxonomies}
            />
          )}
        />
      )}
    />
  </React.Fragment>
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
    taxonomiesFetch: PropTypes.func.isRequired,
    taxonomiesEdit: PropTypes.func.isRequired,
    taxonomiesAdd: PropTypes.func.isRequired,
    userLogout: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
    errors: PropTypes.shape({
      registration: PropTypes.shape({}).isRequired,
      login: PropTypes.shape({}).isRequired,
      edit: PropTypes.shape({}).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Router;
