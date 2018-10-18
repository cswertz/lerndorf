import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AdminEditForm from '../../components/users/EditForm';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  container: {
    maxWidth: 960,
    margin: 'auto',
    marginTop: '10px',
  },
});

class Edit extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
  }

  componentDidUpdate() {
    this.fetchUser();
  }

  fetchUser() {
    const {
      match,
      items,
      itemFetch,
    } = this.props;
    const { id } = match.params;

    if ((!items.fetching) && !items.id[id]) {
      itemFetch(id);
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      handleSubmit,
      history,
      match,
    } = this.props;
    const { id } = match.params;

    const data = {
      titlePrefix: e.target.titlePrefix.value,
      titleSuffix: e.target.titleSuffix.value,
      description: e.target.description.value,
      firstName: e.target.firstName.value,
      birthdate: e.target.birthdate.value,
      lastName: e.target.lastName.value,
      studyId: e.target.studyId.value,
      country: e.target.country.value,
      website: e.target.website.value,
      picture: e.target.picture.value,
      street: e.target.street.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      city: e.target.city.value,
      zip: e.target.zip.value,
    };

    if (e.target.password.value !== '') {
      data.password = e.target.password.value;
    }

    handleSubmit(id, data, history);
  }

  render() {
    const {
      items,
      match,
      errors,
      classes,
    } = this.props;
    const { id } = match.params;
    if (!items.id[id]) return null;

    const user = items.id[id];
    return (
      <div className={classes.container}>
        <Typography variant="title" className={classes.title}>
          {user.username}
        </Typography>
        <AdminEditForm
          user={user}
          initialValues={user}
          errors={errors.edit}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

Edit.propTypes = {
  classes: PropTypes.shape({}).isRequired,
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

const EditWithRouter = withRouter(Edit);

export default withStyles(styles)(EditWithRouter);
