import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import LogsFilterForm from './Filter';

const styles = () => ({
  buttonWrapper: {
    textAlign: 'right',
    marginTop: '10px',
  },
});

const LogsList = ({
  handleFilterUpdate,
  handleDownload,
  languages,
  fetchSuggestions,
  suggestions,
  classes,
  history,
  logs,
}) => {
  let logItems = null;
  if (logs.length > 0) {
    logItems = logs.map((item) => (
      <TableRow key={item.id}>
        <TableCell>{item.createdAt}</TableCell>
        <TableCell>{item.userId}</TableCell>
        <TableCell>{item.KnowlegeUnitId}</TableCell>
        <TableCell>{item.title}</TableCell>
        <TableCell>{item.CourseId}</TableCell>
        <TableCell>{item.mode}</TableCell>
        <TableCell>{item.navigation}</TableCell>
      </TableRow>
    ));
  }

  const defaultFilter = {
    language: -1,
  };

  return (
    <div>
      <Typography variant="h5" className={classes.title}>
        Filtered Log Messages
      </Typography>
      <LogsFilterForm
        languages={languages.languages}
        initialValues={defaultFilter}
        handleFilterUpdate={handleFilterUpdate}
        fetchSuggestions={fetchSuggestions}
        suggestions={suggestions}
      />
      <Table>
        <TableHead>
          <TableCell>Date</TableCell>
          <TableCell>User Id</TableCell>
          <TableCell>KU Id</TableCell>
          <TableCell>LU Title</TableCell>
          <TableCell>Course Id</TableCell>
          <TableCell>Mode</TableCell>
          <TableCell>Navigation</TableCell>
        </TableHead>
        <TableBody>{logItems}</TableBody>
      </Table>

      <div className={classes.buttonWrapper}>
        <Button type="submit" variant="contained" onClick={handleDownload}>
          Download CSV
        </Button>
      </div>
    </div>
  );
};

LogsList.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fetchSuggestions: PropTypes.func.isRequired,
  logs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleFilterUpdate: PropTypes.func.isRequired,
  handleDownload: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withStyles(styles)(LogsList);
