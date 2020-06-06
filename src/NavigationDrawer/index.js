import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import {
  show as showNavigationDrawer,
  hide as hideNavigationDrawer,
  updateVariant as updateNavigationDrawerVariant,
} from '../NavigationDrawer/reducer';
import { WIDTH as NAVIGATION_DRAWER_WIDTH } from './constants';
import NavigationDrawerList from './List';
import NavigationDrawerHeader from './Header';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { VARIANT_TEMPORARY, VARIANT_PERSISTENT } from './constants';

const navigationDrawerWidth = NAVIGATION_DRAWER_WIDTH;

class NavigationDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.closeNavigationDrawer = this.closeNavigationDrawer.bind(this);
  }

  async componentDidMount() {
    const variant = this.getVariant();
    this.props.updateNavigationDrawerVariant({ variant });
    this.updateNavigationDrawerIsOpen(variant);
  }

  componentDidUpdate() {
    const { navigationDrawerVariant: prevVariant } = this.props;
    const variant = this.getVariant();

    if (variant === prevVariant) {
      return;
    }

    this.props.updateNavigationDrawerVariant({ variant });
    this.updateNavigationDrawerIsOpen(variant);
  }

  getVariant() {
    const { width } = this.props;
    return isWidthUp('md', width) ? VARIANT_PERSISTENT : VARIANT_TEMPORARY;
  }

  updateNavigationDrawerIsOpen(variant) {
    if (variant === VARIANT_PERSISTENT) {
      this.props.showNavigationDrawer();
    } else if (variant === VARIANT_TEMPORARY) {
      this.props.hideNavigationDrawer();
    }
  }

  closeNavigationDrawer = () => {
    this.props.hideNavigationDrawer();
  };

  render() {
    const { classes } = this.props;
    const { navigationDrawerIsOpen, navigationDrawerVariant } = this.props;

    return (
      <Drawer
        anchor="left"
        className={classes.drawer}
        variant={navigationDrawerVariant}
        open={navigationDrawerIsOpen}
        classes={{ paper: classes.drawerPaper }}
        onClose={this.closeNavigationDrawer}
      >
        <NavigationDrawerHeader />
        <Divider />
        <NavigationDrawerList />
      </Drawer>
    );
  }
}

const useStyles = (theme) => ({
  drawer: {
    width: navigationDrawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: navigationDrawerWidth,
  },
});

const mapStateToProps = (state) => {
  return {
    navigationDrawerIsOpen: state.navigationDrawer.show,
    navigationDrawerVariant: state.navigationDrawer.variant,
  };
};

const mapDispatchToProps = {
  showNavigationDrawer,
  hideNavigationDrawer,
  updateNavigationDrawerVariant,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(withWidth()(NavigationDrawer)));
