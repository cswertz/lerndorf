import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditForm from '../../components/users/EditForm';

class Edit extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageUpdate = this.handleImageUpdate.bind(this);

    this.submitLogDeletion = this.submitLogDeletion.bind(this);
    this.openLogDeletionDialog = this.openLogDeletionDialog.bind(this);
    this.closeLogDeletionDialog = this.closeLogDeletionDialog.bind(this);

    this.submitAccountDeletion = this.submitAccountDeletion.bind(this);
    this.openAccountDeletionDialog = this.openAccountDeletionDialog.bind(this);
    this.closeAccountDeletionDialog = this.closeAccountDeletionDialog.bind(this);

    this.state = {
      logDeletionOpen: false,
      accountDeletionOpen: false,
    };
  }

  openAccountDeletionDialog() {
    this.setState({
      accountDeletionOpen: true,
    });
  }

  closeAccountDeletionDialog() {
    this.setState({
      accountDeletionOpen: false,
    });
  }

  submitAccountDeletion() {
    this.closeAccountDeletionDialog();
    console.log('Confirmed Account Deletion dialog');
  }

  openLogDeletionDialog() {
    this.setState({
      logDeletionOpen: true,
    });
  }

  closeLogDeletionDialog() {
    this.setState({
      logDeletionOpen: false,
    });
  }

  submitLogDeletion() {
    this.closeLogDeletionDialog();
    console.log('Confirmed Log Deletion dialog');
  }

  handleImageUpdate(file) {
    const {
      handleSubmit,
      history,
      user,
    } = this.props;

    const { id } = user;
    const data = {
      picture: file,
    };

    handleSubmit(id, data, history);
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

    const {
      logDeletionOpen,
      accountDeletionOpen,
    } = this.state;

    return (
      <div>
        <Typography variant="h5">
          {user.username}
        </Typography>
        <EditForm
          user={user}
          initialValues={user}
          errors={errors.edit}
          handleSubmit={this.handleSubmit}
          handleImageUpdate={this.handleImageUpdate}

          openLogDeletionDialog={this.openLogDeletionDialog}
          closeLogDeletionDialog={this.closeLogDeletionDialog}
          submitLogDeletion={this.submitLogDeletion}
          logDeletionDialogOpen={logDeletionOpen}

          openAccountDeletionDialog={this.openAccountDeletionDialog}
          closeAccountDeletionDialog={this.closeAccountDeletionDialog}
          submitAccountDeletion={this.submitAccountDeletion}
          accountDeletionDialogOpen={accountDeletionOpen}
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
