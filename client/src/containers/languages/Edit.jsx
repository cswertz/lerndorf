import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditForm from '../../components/languages/EditForm';

const styles = () => ({
  container: {
    maxWidth: 960,
    margin: 'auto',
  },
});

class LanguagesEdit extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {
      match,
      languages,
      languagesFetch,
    } = this.props;

    const { id } = match.params;

    if ((!languages.fetched && !languages.fetching) && !languages.id[id]) {
      languagesFetch();
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      match,
      history,
      handleSubmit,
    } = this.props;

    const { id } = match.params;

    const data = {
      name: e.target.name.value,
    };

    handleSubmit(id, data, history);
  }

  render() {
    const {
      languages,
      classes,
      errors,
      match,
    } = this.props;

    const { id } = match.params;
    const language = languages.id[id];

    return (
      <div className={classes.container}>
        <EditForm
          handleSubmit={this.handleSubmit}
          initialValues={language}
          errors={errors.edit}
        />
      </div>
    );
  }
}

LanguagesEdit.propTypes = {
  languagesFetch: PropTypes.func.isRequired,
  languages: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
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

const LanguagesEditWithRouter = withRouter(LanguagesEdit);

export default withStyles(styles)(LanguagesEditWithRouter);
