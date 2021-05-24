import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import { colors } from '@theme/index';

const StyledBadge = withStyles((theme) => ({
  badge: {
    background: colors.accent,
    border: `2px solid ${theme.palette.common.white}`,
    color: theme.palette.common.white,
    padding: '0 4px',
    right: 2,
    top: 3,
  },
}))(Badge);

export default StyledBadge;
