import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AdminEditForm from '../../components/users/EditForm';
import Roles from '../../components/users/Roles';

class Edit extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.rolesFetch = this.rolesFetch.bind(this);
    this.userFetch = this.userFetch.bind(this);
    this.removeRole = this.removeRole.bind(this);
    this.addRole = this.addRole.bind(this);
  }

  componentDidMount() {
    this.userFetch();
    this.rolesFetch();
  }

  componentDidUpdate() {
    this.userFetch();
    this.rolesFetch();
  }

  rolesFetch() {
    const {
      roles,
      rolesFetch,
    } = this.props;

    if (!roles.fetching && !roles.fetched) {
      rolesFetch();
    }
  }

  userFetch() {
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
      lastName: e.target.lastName.value,
      studyId: e.target.studyId.value,
      country: e.target.country.value,
      website: e.target.website.value,
      picture: e.target.picture.value,
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

  addRole(e, role) {
    e.preventDefault();

    const {
      match,
      add,
    } = this.props;
    const { id } = match.params;

    add(id, role);
  }

  removeRole(e, role) {
    e.preventDefault();

    const {
      match,
      remove,
    } = this.props;
    const { id } = match.params;

    remove(id, role);
  }

  render() {
    const {
      items,
      match,
      roles,
      errors,
    } = this.props;
    const { id } = match.params;
    const user = items.id[id];

    if (!items.id[id] || !roles.fetched) return null;

    const availableIds = user.Roles.map(role => role.id);

    const owned = roles.items.filter(role => availableIds.indexOf(role.id) > -1);
    const available = roles.items
      .filter(role => availableIds.indexOf(role.id) < 0);

    return (
      <div>
        <Typography variant="headline">
          {user.username}
        </Typography>
        <AdminEditForm
          user={user}
          initialValues={user}
          errors={errors.edit}
          handleSubmit={this.handleSubmit}
        />
        <Roles
          remove={this.removeRole}
          add={this.addRole}
          available={available}
          owned={owned}
        />
      </div>
    );
  }
}

Edit.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  rolesFetch: PropTypes.func.isRequired,
  roles: PropTypes.shape({}).isRequired,
  items: PropTypes.shape({}).isRequired,
  itemFetch: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
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

export default EditWithRouter;
