import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import TaxonomiesAddChild from '../taxonomies/AddChild';
import TaxonomyChildren from '../taxonomies/Children';
import TaxonomiesEdit from '../taxonomies/Edit';
import TaxonomiesAdd from '../taxonomies/Add';
import Taxonomies from '../taxonomies/List';

import Appbar from '../Appbar';

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
        <div className="TaxonomiesWrapper">
          <Appbar
            title="Taxonomies"
            active="taxonomies"
            user={user}
            logout={actions.userLogout}
          />
          <Taxonomies
            itemsDelete={actions.taxonomiesDelete}
            itemsFetch={actions.taxonomiesFetch}
            items={taxonomies}
          />
        </div>
      )}
    />

    <Route
      exact
      path="/taxonomies/show/:id"
      render={() => (
        <div className="TaxonomiesWrapper">
          <Appbar
            title="Taxonomies"
            active="taxonomies"
            user={user}
            logout={actions.userLogout}
          />
          <TaxonomyChildren
            itemFetch={actions.taxonomiesItemFetch}
            itemsDelete={actions.taxonomiesDelete}
            items={taxonomies}
          />
        </div>
      )}
    />

    <Route
      exact
      path="/taxonomies/add"
      render={() => (
        <div className="TaxonomiesWrapper">
          <Appbar
            title="Add Taxonomy"
            active="taxonomies"
            user={user}
            logout={actions.userLogout}
          />
          <TaxonomiesAdd
            handleSubmit={actions.taxonomiesAdd}
            errors={taxonomies.errors}
          />
        </div>
      )}
    />

    <Route
      exact
      path="/taxonomies/:id/add"
      render={() => (
        <div className="TaxonomiesWrapper">
          <Appbar
            title="Add Taxonomy"
            active="taxonomies"
            user={user}
            logout={actions.userLogout}
          />
          <TaxonomiesAddChild
            handleSubmit={actions.taxonomiesAdd}
            errors={taxonomies.errors}
          />
        </div>
      )}
    />

    <Route
      exact
      path="/taxonomies/edit/:id"
      render={() => (
        <div className="TaxonomiesWrapper">
          <Appbar
            title="Edit Taxonomy Term"
            active="taxonomies"
            user={user}
            logout={actions.userLogout}
          />
          <TaxonomiesEdit
            itemFetch={actions.taxonomiesItemFetch}
            handleSubmit={actions.taxonomiesEdit}
            errors={taxonomies.errors}
            items={taxonomies}
          />
        </div>
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
    languagesFetch: PropTypes.func.isRequired,
    languagesAdd: PropTypes.func.isRequired,
    userRegister: PropTypes.func.isRequired,
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
