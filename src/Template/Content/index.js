import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  WIDTH as NAVIGATION_DRAWER_WIDTH,
  VARIANT_PERSISTENT as NAVIGATION_DRAWER_VARIANT_PERSISTENT,
} from '../../NavigationDrawer/constants';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

class Content extends React.Component {
  render() {
    const { classes } = this.props;
    const { showNavigationDrawer, navigationDrawerVariant } = this.props;

    return (
      <Container
        component="main"
        className={clsx({
          [classes.content]: true,
          [classes.contentShift]:
            showNavigationDrawer &&
            navigationDrawerVariant === NAVIGATION_DRAWER_VARIANT_PERSISTENT,
        })}
      >
        <Box my={2}>{this.props.children}</Box>
      </Container>
    );
  }
}

const useStyles = (theme) => {
  return {
    content: {
      width: '100%',
      marginLeft: 0,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    contentShift: {
      width: `calc(100% - ${NAVIGATION_DRAWER_WIDTH}px)`,
      marginLeft: NAVIGATION_DRAWER_WIDTH,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  };
};

const mapStateToProps = (state) => {
  return {
    showNavigationDrawer: state.navigationDrawer.show,
    navigationDrawerVariant: state.navigationDrawer.variant,
  };
};

export default connect(mapStateToProps, null)(withStyles(useStyles)(Content));
