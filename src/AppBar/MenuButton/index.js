import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { toggle as toggleNavigationDrawer } from '../../NavigationDrawer/reducer';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(0.5),
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(1.5),
    },
  },
}));

function MenuButton() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleNavigationDrawerToggle = () => {
    dispatch(toggleNavigationDrawer());
  };

  return (
    <IconButton
      edge="start"
      className={classes.menuButton}
      color="inherit"
      aria-label="open drawer"
      onClick={handleNavigationDrawerToggle}
    >
      <MenuIcon />
    </IconButton>
  );
}

export default MenuButton;
