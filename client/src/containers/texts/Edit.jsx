import { withRouter } from 'react-router-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';

import EditForm from '@components/texts/EditForm';

class TextsEdit extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateBody = this.updateBody.bind(this);

    this.state = {
      body: '',
    };
  }

  componentDidMount() {
    const { match, items, languages, itemFetch, languagesFetch } = this.props;

    const { id } = match.params;

    if (!languages.fetched && !languages.fetching) {
      languagesFetch();
    }

    if (!items.fetching && !items.id[id]) {
      itemFetch(id);
    }
  }

  updateBody(body) {
    this.setState({
      body,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { body } = this.state;
    const { history, handleSubmit, match } = this.props;
    const { id } = match.params;
    const data = {
      LanguageId: e.target.language.value,
      content: body,
    };

    handleSubmit(id, data, history);
  }

  render() {
    const { languages, errors, match, items } = this.props;

    const { id } = match.params;
    const item = items.id[id];
    if (!item) return null;

    return (
      <EditForm
        handleSubmit={this.handleSubmit}
        updateBody={this.updateBody}
        languages={languages.languages}
        initialValues={{
          language: item.Language.id,
          text: item.content,
        }}
        errors={errors.add}
      />
    );
  }
}

TextsEdit.propTypes = {
  items: PropTypes.shape({}).isRequired,
  itemFetch: PropTypes.func.isRequired,
  languagesFetch: PropTypes.func.isRequired,
  languages: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const TextsEditWithRouter = withRouter(TextsEdit);

export default TextsEditWithRouter;
