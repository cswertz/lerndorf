import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List from '../../components/languages/List';

class Languages extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const {
      languages,
      languagesFetch,
    } = this.props;

    if (!languages.fetched && !languages.fetching) {
      languagesFetch();
    }
  }

  componentDidUpdate() {
    const {
      languages,
      languagesFetch,
    } = this.props;

    if (!languages.fetched && !languages.fetching) {
      languagesFetch();
    }
  }

  handleDelete(id) {
    const {
      languagesDelete,
    } = this.props;

    languagesDelete(id);
  }

  render() {
    const {
      languages,
      history,
    } = this.props;

    return (
      <div>
        <List
          languagesDelete={this.handleDelete}
          languages={languages.languages}
          history={history}
        />
        <Grid>
          <Button
            onClick={() => history.push('/languages/add')}
            variant="contained"
          >
            Add new language
          </Button>
        </Grid>
      </div>
    );
  }
}

Languages.propTypes = {
  languagesDelete: PropTypes.func.isRequired,
  languagesFetch: PropTypes.func.isRequired,
  languages: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const LanguagesWithRouter = withRouter(Languages);

export default LanguagesWithRouter;
