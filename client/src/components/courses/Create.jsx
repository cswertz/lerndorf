import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'E-Mail', width: 150 },
  { field: 'role', headerName: 'Role', width: 110 },
  {
    field: 'lastAccess',
    headerName: 'Last Access',
    width: 160,
    // valueGetter: (params) => `${params.getValue(params.id, 'lastAccess') || ''}`,
  },
  {
    field: 'status',
    headerName: 'Status',
    type: 'boolean',
    width: 150,
  },
  // {
  //   field: 'delete',
  //   headerName: '',
  //   width: 110,
  // },
];

const rows = [
  {
    id: 1,
    name: 'Snow',
    email: 'email@provider.at',
    role: 'Teacher',
    lastAccess: '2021-10-10 01:15:00',
    status: true,
  },
  {
    id: 2,
    name: 'Lannister',
    email: 'email@provider.at',
    role: 'Teacher',
    lastAccess: '2021-10-10 01:15:00',
    status: true,
  },
  {
    id: 3,
    name: 'Lannister',
    email: 'email@provider.at',
    role: 'Teacher',
    lastAccess: '2021-10-10 01:15:00',
    status: true,
  },
  {
    id: 4,
    name: 'Stark',
    email: 'email@provider.at',
    role: 'Teacher',
    lastAccess: '2021-10-10 01:15:00',
    status: true,
  },
  {
    id: 5,
    name: 'Targaryen',
    email: 'email@provider.at',
    role: 'Teacher',
    lastAccess: '2021-10-10 01:15:00',
    status: true,
  },
  {
    id: 6,
    name: 'Melisandre',
    email: 'email@provider.at',
    role: 'Teacher',
    lastAccess: '2021-10-10 01:15:00',
    status: true,
  },
  {
    id: 7,
    name: 'Clifford',
    email: 'email@provider.at',
    role: 'Teacher',
    lastAccess: '2021-10-10 01:15:00',
    status: true,
  },
];

const useStyles = makeStyles((theme) => ({
  wrapper: {},
  sectionTitle: {
    marginBottom: theme.spacing(4),
  },
  sectionButton: {
    marginTop: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),

    [theme.breakpoints.up('lg')]: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
    },
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',

    [theme.breakpoints.up('lg')]: {
      width: 650,
    },
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {},

  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    minWidth: 120,
  },
  formControl: {
    marginRight: theme.spacing(1),

    [theme.breakpoints.down('xs')]: {
      minWidth: '100%',
      marginRight: theme.spacing(0),
      marginBottom: theme.spacing(1),
    },
  },
}));

const Create = () => {
  const classes = useStyles();

  // const save = useCallback(async () => {
  //   // TODO: POST content to API
  //   const response = await Promise.resolve('test');
  //   console.log('response', response);
  // }, []);

  return (
    <div className={classes.wrapper}>
      <Typography className={classes.subtitle} variant="subtitle1">
        Create Course
      </Typography>

      <Typography className={classes.sectionTitle} variant="h4">
        Course Information
      </Typography>

      <form className={classes.form} noValidate>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={1} alignItems="center">
            <Grid item xs={12} lg={4}>
              <FormControl className={classes.formControl} fullWidth>
                <Typography variant="body1" className={classes.type}>
                  Course Title:
                </Typography>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={8}>
              <FormControl className={classes.formControl} fullWidth>
                <TextField
                  id="datetime-local"
                  defaultValue=""
                  className={classes.textField}
                  variant="outlined"
                  size="small"
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container item xs={12} spacing={1} alignItems="center">
            <Grid item xs={12} lg={4}>
              <FormControl className={classes.formControl} fullWidth>
                <Typography variant="body1" className={classes.type}>
                  Short Title:
                </Typography>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={8}>
              <FormControl className={classes.formControl} fullWidth>
                <TextField
                  id="datetime-local"
                  defaultValue=""
                  className={classes.textField}
                  variant="outlined"
                  size="small"
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container item xs={12} spacing={1}>
            <Grid item xs={12} lg={4}>
              <FormControl className={classes.formControl} fullWidth>
                <Typography variant="body1" className={classes.type}>
                  Course Description:
                </Typography>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={8}>
              <FormControl className={classes.formControl} fullWidth>
                <TextField
                  id="datetime-local"
                  defaultValue=""
                  className={classes.textField}
                  variant="outlined"
                  size="small"
                  multiline
                  rows={6}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </form>

      <Divider className={classes.divider} />

      <Typography className={classes.sectionTitle} variant="h4">
        Enrollment
      </Typography>

      <form className={classes.form} noValidate>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={1} alignItems="center">
            <Grid item xs={12} lg={4}>
              <FormControl className={classes.formControl}>
                <Typography variant="body1" className={classes.type}>
                  Enrollment Starts:
                </Typography>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={8}>
              <FormControl className={classes.formControl}>
                <TextField
                  id="datetime-local"
                  type="datetime-local"
                  defaultValue="2021-05-24T10:30"
                  className={classes.textField}
                  variant="outlined"
                  size="small"
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container item xs={12} spacing={1} alignItems="center">
            <Grid item xs={12} lg={4}>
              <FormControl className={classes.formControl}>
                <Typography variant="body1" className={classes.type}>
                  Enrollment Ends:
                </Typography>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={8}>
              <FormControl className={classes.formControl}>
                <TextField
                  id="datetime-local"
                  type="datetime-local"
                  defaultValue="2021-05-24T10:30"
                  className={classes.textField}
                  variant="outlined"
                  size="small"
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container item xs={12} spacing={1} alignItems="center">
            <Grid item xs={12} lg={4}>
              <FormControl className={classes.formControl}>
                <Typography variant="body1" className={classes.type}>
                  Confirmation for Enrollment:
                </Typography>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={8}>
              <FormControl className={classes.formControl}>
                <Switch color="primary" />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container item xs={12} spacing={1} alignItems="center">
            <Grid item xs={12} lg={4}>
              <FormControl className={classes.formControl}>
                <Typography variant="body1" className={classes.type}>
                  Confirmation by Tutor:
                </Typography>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={8}>
              <FormControl className={classes.formControl}>
                <FormControl className={classes.formControl}>
                  <Switch color="primary" />
                </FormControl>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container item xs={12} spacing={1} alignItems="center">
            <Grid item xs={12} lg={4}>
              <FormControl className={classes.formControl}>
                <Typography variant="body1" className={classes.type}>
                  Enrollment Starts:
                </Typography>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={8}>
              <FormControl className={classes.formControl}>
                <TextField
                  id="datetime-local"
                  type="datetime-local"
                  defaultValue="2021-05-24T10:30"
                  className={classes.textField}
                  variant="outlined"
                  size="small"
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container item xs={12} spacing={1} alignItems="center">
            <Grid item xs={12} lg={4}>
              <FormControl className={classes.formControl}>
                <Typography variant="body1" className={classes.type}>
                  Enrollment Starts:
                </Typography>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={8}>
              <FormControl className={classes.formControl}>
                <TextField
                  id="datetime-local"
                  type="datetime-local"
                  defaultValue="2021-05-24T10:30"
                  className={classes.textField}
                  variant="outlined"
                  size="small"
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </form>

      <Divider className={classes.divider} />

      <Typography className={classes.sectionTitle} variant="h4">
        Participants
      </Typography>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} checkboxSelection />
      </div>

      <Grid className={classes.sectionButton} container justify="flex-end" alignItems="center">
        <Button color="primary" variant="contained" onClick={() => console.log('test')}>
          Add Participant
        </Button>
      </Grid>

      <Divider className={classes.divider} />

      <Typography className={classes.sectionTitle} variant="h4">
        Content
      </Typography>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} checkboxSelection />
      </div>

      <Grid className={classes.sectionButton} container justify="flex-end" alignItems="center">
        <Button color="primary" variant="contained" onClick={() => console.log('test')}>
          Add Content
        </Button>
      </Grid>

      <Divider className={classes.divider} />

      <Typography className={classes.sectionTitle} variant="h4">
        Sequencing
      </Typography>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} checkboxSelection />
      </div>

      <Grid className={classes.sectionButton} container justify="flex-end" alignItems="center">
        <Button color="primary" variant="contained" onClick={() => console.log('test')}>
          Add Sequence
        </Button>
      </Grid>

      <Divider className={classes.divider} />

      <Button color="primary" variant="contained">
        Save Courses
      </Button>
    </div>
  );
};

export default Create;
