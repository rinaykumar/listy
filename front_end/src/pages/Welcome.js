import React from 'react';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
// import { useSelector } from 'react-redux';

const Welcome = ({ isAdmin, classes, username }) => {
  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <AccountCircle />
      </Avatar>
      <Typography component="h1" variant="h5">
        Welcome back {username}
      </Typography>
      <Typography component="h1" variant="subtitle1">
        Buy and Sell Items Locally
      </Typography>

      {isAdmin && (
        <Button
          fullWidth
          variant="contained"
          color="primary"
          href="/admin"
          className={classes.submit}
        >
          Continue Shopping
        </Button>
      )}
      {!isAdmin && (
        <Button
          fullWidth
          variant="contained"
          color="primary"
          href="/user"
          className={classes.submit}
        >
          Continue Shopping
        </Button>
      )}
    </div>
  );
};

export default Welcome;
