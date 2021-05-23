import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

const StyledBadge = withStyles((theme) => ({
  badge: {
    border: `2px solid ${theme.palette.common.white}`,
    padding: '0 4px',
    right: 2,
    top: 3,
  },
}))(Badge);

export default StyledBadge;
