import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Single from './Single';

const styles = (theme) => ({
  button: {
    marginTop: theme.spacing(),
  },
});
const TextsShow = ({ classes, item }) => (
  <div>
    <Single text={item} />
    {!item.nextId && (
      <Button
        className={classes.button}
        variant="contained"
        component={Link}
        to={`/texts/edit/${item.id}`}
      >
        Add new version
      </Button>
    )}
  </div>
);

TextsShow.propTypes = {
  item: PropTypes.shape({
    nextId: PropTypes.number,
    id: PropTypes.number.isRequired,
  }).isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(TextsShow);
