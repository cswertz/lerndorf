import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LanguageElement from '../../components/users/Language';

class Language extends Component {
  constructor(props) {
    super(props);

    this.handleLanguageDelete = this.handleLanguageDelete.bind(this);
    this.handleLanguageAdd = this.handleLanguageAdd.bind(this);
    this.handlePreferred = this.handlePreferred.bind(this);
  }

  componentDidMount() {
    const {
      languages,
      languagesFetch,
    } = this.props;

    if ((!languages.fetching) && !languages.fetching) {
      languagesFetch();
    }
  }

  handleLanguageDelete(languageId) {
    const {
      languageDelete,
      history,
      user,
    } = this.props;

    const { id } = user;

    languageDelete(id, languageId, history);
  }

  handleLanguageAdd(e) {
    e.preventDefault();

    const {
      languageAdd,
      history,
      user,
    } = this.props;

    const { id } = user;

    const data = {
      id: e.target.language.value,
      level: e.target.level.value,
    };

    e.target.level.value = '';

    languageAdd(id, data, history);
  }

  handlePreferred(userLanguageId) {
    const {
      languagePreferred,
      history,
      user,
    } = this.props;

    const { id } = user;
    const data = {
      id: userLanguageId,
    };

    console.log("Set", data, "as favorite");
    languagePreferred(id, data, history);
  }

  render() {
    const {
      user,
      languages,
    } = this.props;

    return (
      <div>
        <Typography variant="h5">
          {user.username}
        </Typography>
        <LanguageElement
          user={user}
          handleDelete={this.handleLanguageDelete}
          handleSubmit={this.handleLanguageAdd}
          handlePreferred={this.handlePreferred}
          languages={languages.languages}
        />
      </div>
    );
  }
}

Language.propTypes = {
  languageDelete: PropTypes.func.isRequired,
  languageAdd: PropTypes.func.isRequired,
  languagePreferred: PropTypes.func.isRequired,
  languages: PropTypes.shape({
    languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
  languagesFetch: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const LanguageWithRouter = withRouter(Language);

export default LanguageWithRouter;
