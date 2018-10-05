import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditForm from '../../components/users/EditForm';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  container: {
    maxWidth: 960,
    margin: 'auto',
  },
});

class Edit extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      handleSubmit,
      history,
      user,
    } = this.props;

    const { id } = user;

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
      user,
      errors,
      classes,
    } = this.props;

    return (
      <div className={classes.container}>
        <EditForm
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
  user: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const EditWithRouter = withRouter(Edit);

export default withStyles(styles)(EditWithRouter);