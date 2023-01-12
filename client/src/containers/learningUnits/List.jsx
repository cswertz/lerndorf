import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Component } from 'react';
import PropTypes from 'prop-types';

import List from '@components/learningUnits/List';
import { hasCapability } from '@utils/user';

class LearningUnits extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { learningUnits, learningUnitsFetch } = this.props;

    if (!learningUnits.fetched && !learningUnits.fetching) {
      learningUnitsFetch();
    }
  }

  componentDidUpdate() {
    const { learningUnits, learningUnitsFetch } = this.props;

    if (!learningUnits.fetched && !learningUnits.fetching) {
      learningUnitsFetch();
    }
  }

  handleDelete(id) {
    const { learningUnitsDelete } = this.props;

    learningUnitsDelete(id);
  }

  render() {
    const { learningUnits, history, user } = this.props;

    return (
      <>
        <List
          learningUnitsDelete={this.handleDelete}
          learningUnits={learningUnits.items}
          history={history}
          user={user}
          disablePadding
        />

        {hasCapability(user.capabilities, ['add_learning_unit']) && (
          <Grid container justify="flex-end" alignItems="center">
            <Button
              color="primary"
              variant="contained"
              onClick={() => history.push('/learning-units/add')}
            >
              Add new Learning Unit
            </Button>
          </Grid>
        )}
      </>
    );
  }
}

LearningUnits.propTypes = {
  learningUnitsDelete: PropTypes.func.isRequired,
  learningUnitsFetch: PropTypes.func.isRequired,
  learningUnits: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const LearningUnitsWithRouter = withRouter(LearningUnits);

export default LearningUnitsWithRouter;
