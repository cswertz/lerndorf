import { withRouter } from 'react-router-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';

import AddForm from '@components/texts/AddForm';

class TextsAdd extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateBody = this.updateBody.bind(this);

    this.state = {
      body: '',
    };
  }

  componentDidMount() {
    const { languages, languagesFetch } = this.props;

    if (!languages.fetched && !languages.fetching) {
      languagesFetch();
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
    const { KnowledgeUnitId } = match.params;
    const data = {
      LanguageId: e.target.language.value,
      KnowledgeUnitId,
      content: body,
    };

    handleSubmit(data, history);
  }

  render() {
    const { languages, errors } = this.props;

    return (
      <AddForm
        handleSubmit={this.handleSubmit}
        updateBody={this.updateBody}
        languages={languages.languages}
        initialValues={{
          language: 1,
        }}
        errors={errors.add}
      />
    );
  }
}

TextsAdd.propTypes = {
  languagesFetch: PropTypes.func.isRequired,
  languages: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      KnowledgeUnitId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const TextsAddWithRouter = withRouter(TextsAdd);

export default TextsAddWithRouter;
