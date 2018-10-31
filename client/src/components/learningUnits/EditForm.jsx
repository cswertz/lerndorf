import PropTypes from 'prop-types';
import React from 'react';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import TagForm from './TagForm';

const styles = () => ({});

const LearningUnitsEdit = ({
  addTag,
}) => (
  <TagForm
    handleSubmit={addTag}
  />
);

LearningUnitsEdit.propTypes = {
  addRelation: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
};

/*
const LearningUnitsEditForm = reduxForm({
  form: 'LearningUnitsEdit',
  validate,
})(LearningUnitsEdit);
*/

export default withStyles(styles)(LearningUnitsEdit);
