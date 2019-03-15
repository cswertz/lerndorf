import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditForm from '../../components/users/EditForm';

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
      showProfileStudents: e.target.showProfileStudents.checked,
      showProfileTeachers: e.target.showProfileTeachers.checked,
      showProfilePublic: e.target.showProfilePublic.checked,
      allowLogResearch: e.target.allowLogResearch.checked,
      allowLogSharing: e.target.allowLogSharing.checked,
      allowLogReports: e.target.allowLogReports.checked,
      allowBasicLog: e.target.allowBasicLog.checked,
      titlePrefix: e.target.titlePrefix.value,
      titleSuffix: e.target.titleSuffix.value,
      description: e.target.description.value,
      firstName: e.target.firstName.value,
      birthdate: e.target.birthdate.value,
      picture: e.target.picture.files[0],
      lastName: e.target.lastName.value,
      studyId: e.target.studyId.value,
      country: e.target.country.value,
      website: e.target.website.value,
      street: e.target.street.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      state: e.target.state.value,
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
    } = this.props;

    return (
      <div>
        <Typography variant="headline">
          {user.username}
        </Typography>
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
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const EditWithRouter = withRouter(Edit);

export default EditWithRouter;
