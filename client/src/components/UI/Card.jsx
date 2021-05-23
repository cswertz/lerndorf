import { createElement } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '@theme';

const useStyles = makeStyles((theme) => ({
  card: {
    background: colors.primary.light,
    borderRadius: 4,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4),
    transition: '.2s background, .2s box-shadow ease-out',

    [theme.breakpoints.up('lg')]: {
      height: 200,
      width: 220,
    },

    '&:hover': {
      background: colors.primary.main,
      boxShadow: '2px 4px 6px rgba(0,0,0,0.25)',

      '& $icon': {
        color: colors.grey[50],
      },

      '& $count': {
        color: colors.grey[50],
      },

      '& $title': {
        color: colors.grey[50],
      },
    },
  },
  icon: {
    color: '#56657F',

    '& svg': {
      height: 60,
      width: 60,
    },
  },
  count: {
    color: '#8997B1',
    fontSize: '1.4rem',
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(2),
  },
  title: {
    color: '#56657F',
    marginBottom: theme.spacing(),
  },
}));

const Card = ({ icon, count, title, onClick, component, ...rest }) => {
  const classes = useStyles();
  const Wrapper = (props) => createElement(component ?? 'div', props);

  return (
    <Wrapper className={classes.card} onClick={onClick} {...rest}>
      <div className={classes.icon}>{icon}</div>
      {count && <div className={classes.count}>{count}</div>}
      <div className={classes.title}>{title}</div>
    </Wrapper>
  );
};

Card.propTypes = {
  icon: PropTypes.element.isRequired,
  count: PropTypes.number,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  component: PropTypes.object,
};

Card.defaultProps = {
  count: null,
  component: null,
  onClick: () => {},
};

export default Card;
