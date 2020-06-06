import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import RightSection from './RightSection';
import Hidden from '@material-ui/core/Hidden';
import MenuButton from './MenuButton';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

class AppBar extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <>
        <ElevationScroll {...this.props}>
          <MuiAppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <MenuButton />

              <Hidden xsDown>
                <Typography className={classes.title} variant="h6" noWrap>
                  technical-test-20200607
                </Typography>
              </Hidden>

              <div className={classes.grow} />

              <RightSection />
            </Toolbar>
          </MuiAppBar>
        </ElevationScroll>
        {/* necessary for content to be below app bar */}
        <Toolbar />
        {/* end: necessary for content to be below app bar */}
      </>
    );
  }
}

const useStyles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  grow: {
    flexGrow: 1,
  },
});

export default withStyles(useStyles)(AppBar);
