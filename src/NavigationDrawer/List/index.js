import React from 'react';
import NavigationDrawerListItem from './Item';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

class NavigationDrawerList extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <>
        <List className={classes.list}>
          <NavigationDrawerListItem
            text="Dashboard"
            component={RouterLink}
            to="/"
          />
          <NavigationDrawerListItem
            text="Películas"
            component={RouterLink}
            to="/movies"
          />
          <NavigationDrawerListItem text="Turnos" />
          <NavigationDrawerListItem text="Administradores" />
          <NavigationDrawerListItem text="Perfil" />
          <NavigationDrawerListItem text="Cerrar sesión" />
        </List>
      </>
    );
  }
}

const useStyles = (theme) => ({
  list: {
    paddingTop: theme.spacing(0),
  },
});

export default withStyles(useStyles)(NavigationDrawerList);
