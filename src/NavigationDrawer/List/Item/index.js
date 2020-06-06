import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { hide as hideNavigationDrawer } from '../../reducer';
import { connect } from 'react-redux';
import { VARIANT_PERSISTENT as NAVIGATION_DRAWER_VARIANT_PERSISTENT } from '../../constants';
import Divider from '@material-ui/core/Divider';

class NavigationDrawerListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClickOnListItem = this.handleClickOnListItem.bind(this);
  }

  handleClickOnListItem = () => {
    const { navigationDrawerVariant: variant } = this.props;

    if (variant === NAVIGATION_DRAWER_VARIANT_PERSISTENT) {
      return;
    }

    this.props.hideNavigationDrawer();
  };

  render() {
    const {
      navigationDrawerVariant,
      hideNavigationDrawer,
      text,
      ...otherProps
    } = this.props;

    return (
      <>
        <ListItem button onClick={this.handleClickOnListItem} {...otherProps}>
          <ListItemText primary={text} />
        </ListItem>
        <Divider />
      </>
    );
  }
}

NavigationDrawerListItem.propTypes = {
  text: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return { navigationDrawerVariant: state.navigationDrawer.variant };
};

const mapDispatchToProps = {
  hideNavigationDrawer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationDrawerListItem);
