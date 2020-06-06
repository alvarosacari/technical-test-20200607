import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
// import {
//   login as authLogin,
// } from '../../auth/reducer';
import { withRouter } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import moment from 'moment';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { update as updateMovie } from '../../Movies/reducer';

class EditMovieForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      publicationDate: null,
      publicationDateFormatted: '',
      state: '',
      nameValid: false,
      publicationDateValid: false,
      stateValid: false,
      formValid: false,
      errors: {},
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePublicationDateChange = this.handlePublicationDateChange.bind(
      this
    );
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  componentDidMount() {
    const { movie } = this.props;
    const { id, name, publicationDateFormatted, state } = movie;
    const [dd, mm, yyyy] = publicationDateFormatted.split('/');
    const publicationDate = new Date(`${mm}/${dd}/${yyyy}`);
    this.setState({ id, name }, this.validateName);
    this.setState(
      { publicationDate, publicationDateFormatted },
      this.validatePublicationDate
    );
    this.setState({ state }, this.validateState);
  }

  validateForm = () => {
    const { nameValid, publicationDateValid, stateValid } = this.state;

    this.setState({
      formValid: nameValid && publicationDateValid && stateValid,
    });
  };

  validateName = () => {
    let { name } = this.state;
    let errors = { ...this.state.errors };
    let nameValid = true;

    if (errors.hasOwnProperty('name')) {
      delete errors.name;
    }

    if (!name) {
      nameValid = false;
      errors.name = 'El nombre de la película es requerido';
    }

    this.setState({ nameValid, errors }, this.validateForm);
  };

  validatePublicationDate = () => {
    let { publicationDate } = this.state;
    let errors = { ...this.state.errors };
    let publicationDateValid = true;

    if (errors.hasOwnProperty('publicationDate')) {
      delete errors.publicationDate;
    }

    if (!publicationDate) {
      errors.publicationDate = 'La fecha de publicación es requerida';
    }

    this.setState({ publicationDateValid, errors }, this.validateForm);
  };

  validateState = () => {
    let { state } = this.state;
    let errors = { ...this.state.errors };
    let stateValid = true;

    if (errors.hasOwnProperty('state')) {
      delete errors.state;
    }

    if (state === '') {
      stateValid = false;
      errors.state = 'El estado es requerido';
    }

    this.setState({ stateValid, errors }, this.validateForm);
  };

  handleNameChange(event) {
    const name = event.target.value;
    this.setState({ name }, this.validateName);
  }

  handlePublicationDateChange(date) {
    const publicationDate = date;
    const publicationDateFormatted = moment(date).format('DD/MM/YYYY');
    this.setState(
      { publicationDate, publicationDateFormatted },
      this.validatePublicationDate
    );
  }

  handleStateChange(event) {
    const state = event.target.value;
    this.setState({ state }, this.validateState);
  }

  handleSubmitForm(event) {
    event.preventDefault();
    const { id, name, publicationDateFormatted, state } = this.state;
    const movie = { id, name, publicationDateFormatted, state };
    this.props.updateMovie({ movie });
    this.props.launchCloseModal();
  }

  render() {
    const { classes } = this.props;
    const { name, publicationDate, state } = this.state;
    const nameValid = !this.state.errors.hasOwnProperty('name');
    const stateValid = !this.state.errors.hasOwnProperty('state');

    return (
      <form
        className={classes.form}
        noValidate
        onSubmit={this.handleSubmitForm}
        autoComplete="off"
      >
        <Grid container>
          <Grid item xs={12} sm={4}>
            <Box className={classes.label}>Nombre de película</Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              name="name"
              id="name"
              error={!nameValid}
              helperText={!nameValid ? this.state.errors.name : ''}
              value={name}
              onChange={this.handleNameChange}
              onBlur={this.handleNameChange}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box className={classes.label}>Fecha de Publicación</Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                fullWidth
                disableToolbar
                autoOk
                inputVariant="outlined"
                variant="inline"
                margin="dense"
                id="publication-date-picker"
                format="dd/MM/yyyy"
                value={publicationDate}
                onChange={this.handlePublicationDateChange}
                invalidDateMessage="La fecha de publicación no es válida"
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box className={classes.label}>Estado</Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <FormControl
              className={classes.formControl}
              fullWidth
              error={!stateValid}
            >
              <Select
                className={classes.marginTop}
                variant="outlined"
                margin="dense"
                displayEmpty
                labelId="select-state"
                id="select-state"
                value={state}
                onChange={this.handleStateChange}
              >
                <MenuItem value="">
                  <em>Seleccione Estado</em>
                </MenuItem>
                <MenuItem value={'Activo'}>Activo</MenuItem>
                <MenuItem value={'Inactivo'}>Inactivo</MenuItem>
              </Select>
              {!stateValid && (
                <FormHelperText className={classes.marginLeft}>
                  {this.state.errors.state}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} className={classes.submit}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!this.state.formValid}
            >
              Guardar
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

const useStyles = (theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    textAlign: 'center',
    padding: theme.spacing(3, 0, 0),
  },
  label: {
    paddingTop: theme.spacing(2.25),
  },
  marginTop: {
    marginTop: theme.spacing(1),
  },
  marginLeft: {
    marginLeft: theme.spacing(2),
  },
});

const mapDispatchToProps = {
  updateMovie,
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(withStyles(useStyles)(EditMovieForm)));
