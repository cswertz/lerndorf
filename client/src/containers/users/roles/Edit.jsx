import { withRouter } from 'react-router-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';

import Capabilities from '../../../components/users/roles/Capabilities';
import EditForm from '../../../components/users/roles/EditForm';

class RolesEdit extends Component {
  constructor(props) {
    super(props);

    this.removeCapability = this.removeCapability.bind(this);
    this.fetchLanguages = this.fetchLanguages.bind(this);
    this.addCapability = this.addCapability.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { match, capabilities, capabilitiesFetch, items, itemFetch } = this.props;
    const { id } = match.params;

    if (!items.fetching && !items.id[id]) {
      itemFetch(id);
    }

    if (!capabilities.fetching && !capabilities.fetched) {
      capabilitiesFetch();
    }

    this.fetchLanguages();
  }

  componentDidUpdate() {
    const { match, items, itemFetch } = this.props;
    const { id } = match.params;

    if (!items.fetching && !items.id[id]) {
      itemFetch(id);
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const { match, history, languages, handleSubmit } = this.props;

    const { id } = match.params;

    const data = {
      name: e.target.name.value,
      translations: [],
    };

    for (const language of languages.languages) {
      const { id: languageId, code } = language;

      if (e.target[code]) {
        const vocable = e.target[code].value;
        const translation = {
          id: languageId,
          vocable,
        };

        data.translations.push(translation);
      }
    }

    handleSubmit(id, data, history);
  }

  fetchLanguages() {
    const { languages, languagesFetch } = this.props;

    if (!languages.fetched && !languages.fetching) {
      languagesFetch();
    }
  }

  addCapability(e, capability) {
    e.preventDefault();

    const { match, addCapability } = this.props;
    const { id } = match.params;

    addCapability(id, capability);
  }

  removeCapability(e, capability) {
    e.preventDefault();

    const { match, removeCapability } = this.props;
    const { id } = match.params;

    removeCapability(id, capability);
  }

  render() {
    const { capabilities, languages, errors, items, match } = this.props;

    const { id } = match.params;
    const item = items.id[id];
    if (!item || !capabilities.fetched) return null;

    const availableIds = item.Capabilities.map((capability) => capability.id);

    const owned = capabilities.items.filter(
      (capability) => availableIds.indexOf(capability.id) > -1,
    );
    const available = capabilities.items.filter(
      (capability) => availableIds.indexOf(capability.id) < 0,
    );

    return (
      <div>
        <EditForm
          handleSubmit={this.handleSubmit}
          languages={languages.languages}
          initialValues={item}
          errors={errors.edit}
        />
        <Capabilities
          remove={this.removeCapability}
          add={this.addCapability}
          available={available}
          owned={owned}
        />
      </div>
    );
  }
}

RolesEdit.propTypes = {
  languages: PropTypes.shape({}).isRequired,
  languagesFetch: PropTypes.func.isRequired,
  capabilitiesFetch: PropTypes.func.isRequired,
  capabilities: PropTypes.shape({}).isRequired,
  removeCapability: PropTypes.func.isRequired,
  addCapability: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  items: PropTypes.shape({}).isRequired,
  itemFetch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const RolesEditWithRouter = withRouter(RolesEdit);

export default RolesEditWithRouter;
