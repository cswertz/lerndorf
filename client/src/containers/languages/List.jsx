import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List from '../../components/languages/List';

const styles = () => ({
  container: {
    maxWidth: 960,
    margin: 'auto',
  },
});

class Languages extends Component {
  componentDidMount() {
    const {
      languages,
      languagesFetch,
    } = this.props;

    if (!languages.fetched && !languages.fetching) {
      languagesFetch();
    }
  }

  render() {
    const {
      // errors,
      classes,
      languages,
      history,
    } = this.props;

    return (
      <div className={classes.container}>
        <List
          languages={languages.languages}
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
  languagesFetch: PropTypes.func.isRequired,
  languages: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
  // errors: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const LanguagesWithRouter = withRouter(Languages);

export default withStyles(styles)(LanguagesWithRouter);
