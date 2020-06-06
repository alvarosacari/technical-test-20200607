import React from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { connect } from 'react-redux';
import { hide as hideNavigationDrawer } from '../reducer';

class NavigationDrawerHeader extends React.Component {
  constructor(props) {
    super(props);

    this.hideNavigationDrawer = this.hideNavigationDrawer.bind(this);
  }

  hideNavigationDrawer() {
    this.props.hideNavigationDrawer();
  }

  render() {
    const { theme, classes } = this.props;

    return (
      <div className={classes.drawerHeader}>
        <IconButton onClick={this.hideNavigationDrawer}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
    );
  }
}

const useStyles = (theme) => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
});

const mapDispatchToProps = {
  hideNavigationDrawer,
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(useStyles)(withTheme(NavigationDrawerHeader)));
