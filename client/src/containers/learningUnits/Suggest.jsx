import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import NoSsr from '@material-ui/core/NoSsr';
import Paper from '@material-ui/core/Paper';
import { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const styles = (theme) => ({
  root: {
    // flexGrow: 1,
    // height: 250,
  },
  input: {
    display: 'flex',
    // padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  noOptionsMessage: {
    padding: `${theme.spacing()}px ${theme.spacing() * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(),
    left: 0,
    right: 0,
  },
});

function SingleValue(props) {
  const { innerProps, selectProps, children } = props;

  return (
    <Typography className={selectProps.classes.singleValue} {...innerProps}>
      {children}
    </Typography>
  );
}

function NoOptionsMessage(props) {
  const { selectProps, innerProps, children } = props;
  return (
    <Typography
      color="textSecondary"
      className={selectProps.classes.noOptionsMessage}
      {...innerProps}
    >
      {children}
    </Typography>
  );
}

function Placeholder(props) {
  const { selectProps, innerProps, children } = props;
  return (
    <Typography color="textSecondary" className={selectProps.classes.placeholder} {...innerProps}>
      {children}
    </Typography>
  );
}

function Option(props) {
  const { innerProps, isSelected, isFocused, children, innerRef } = props;
  return (
    <MenuItem
      buttonRef={innerRef}
      selected={isFocused}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
      {...innerProps}
    >
      {children}
    </MenuItem>
  );
}

function Menu(props) {
  const { selectProps, innerProps, children } = props;
  return (
    <Paper square className={selectProps.classes.paper} {...innerProps}>
      {children}
    </Paper>
  );
}

function ValueContainer(props) {
  const { selectProps, children } = props;

  return <div className={selectProps.classes.valueContainer}>{children}</div>;
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  const { selectProps, innerRef, innerProps, children } = props;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        onKeyUp: selectProps.onKeyUp,
        inputProps: {
          className: selectProps.classes.input,
          inputRef: innerRef,
          children,
          ...innerProps,
        },
      }}
      {...selectProps.textFieldProps}
    />
  );
}

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class Suggest extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);

    this.state = {
      term: {
        id: null,
        value: null,
      },
    };
  }

  componentDidMount() {
    // this.fetchSuggestions('');
  }

  onKeyUp(e) {
    const { term } = this.state;
    const { value } = e.target;
    if (term !== value) {
      this.fetchSuggestions(value);
    }
  }

  handleChange(value) {
    const { setTarget } = this.props;
    if (value) {
      this.setState({
        term: value,
      });

      setTarget(value.id);
    } else {
      this.setState({
        term: {
          id: null,
          value: null,
        },
      });

      setTarget(null);
    }

    // this.fetchSuggestions(term);
  }

  fetchSuggestions(term) {
    const { fetchSuggestions } = this.props;

    fetchSuggestions(term);
  }

  render() {
    const { suggestions, classes, theme } = this.props;

    const { term } = this.state;

    const selectStyles = {
      input: (base) => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };

    return (
      <div className={classes.root}>
        <NoSsr>
          <Select
            classes={classes}
            options={suggestions}
            onChange={this.handleChange}
            onKeyUp={(e) => this.onKeyUp(e)}
            placeholder="Search for a Learning unit"
            styles={selectStyles}
            value={term.value}
            components={components}
            isClearable
          />
        </NoSsr>
      </div>
    );
  }
}

Suggest.propTypes = {
  setTarget: PropTypes.func.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fetchSuggestions: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  theme: PropTypes.shape({}).isRequired,
};

export default withStyles(styles, { withTheme: true })(Suggest);
