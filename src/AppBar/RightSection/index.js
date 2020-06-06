import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginRight: theme.spacing(1),
  },
}));

function RightSection() {
  const classes = useStyles();

  return (
    <>
      <Avatar
        className={classes.avatar}
        alt="Admin"
        src="https://material-ui.com/static/images/avatar/1.jpg"
      />
      <span>Admin</span>
    </>
  );
}

export default RightSection;
