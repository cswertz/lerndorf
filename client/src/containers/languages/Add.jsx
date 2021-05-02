import { withRouter } from 'react-router-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';

import AddForm from '@components/languages/AddForm';

class LanguagesAdd extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { history, handleSubmit } = this.props;
    const data = {
      name: e.target.name.value,
      code: e.target.code.value,
    };

    handleSubmit(data, history);
  }

  render() {
    const { errors } = this.props;

    return <AddForm handleSubmit={this.handleSubmit} errors={errors.add} />;
  }
}

LanguagesAdd.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const LanguagesAddWithRouter = withRouter(LanguagesAdd);

export default LanguagesAddWithRouter;
