import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import NavigationHeader from '../components/NavigationHeader';
import React, { useEffect, useState } from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Welcome from './Welcome';

import { connect, useSelector, useDispatch } from 'react-redux';
import {
  setUsername,
  setIsLoggedIn,
  setIsAdmin,
  setPassword,
  fetchUsers,
} from '../redux/actions/userActions';

function Copyright() {
  const fork = ' Fork us on Github.';
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      SFSU CSC 667. Team Listy.
      <Link
        color="blue"
        href="https://github.com/sfsu-csc-667-fall-2020/final-project-listy"
      >
        {fork}
      </Link>{' '}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage:
      'url(https://t3.ftcdn.net/jpg/03/46/19/62/360_F_346196235_cq70soRs48KN3u5dQUpIU1Wm9NYbRjxu.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    marginTop: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = ({ userData }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // extract values from the global redux store
  const username = useSelector((state) => state.userReducer.username);
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  const isAdmin = useSelector((state) => state.userReducer.isAdmin);

  return (
    <Grid>
      <NavigationHeader />

      <Grid container component="main" className={classes.root}>
        <CssBaseline />

        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            {isLoggedIn && (
              <Welcome
                isAdmin={isAdmin}
                classes={classes}
                username={username}
              />
            )}
            {!isLoggedIn && (
              <div>
                <Typography component="h1" variant="h5">
                  Sign In
                </Typography>
                <form className={classes.form} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={userData.username}
                    onChange={(e) => dispatch(setUsername(e.target.value))}
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={userData.password}
                    onChange={(e) => dispatch(setPassword(e.target.value))}
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      // console.log(listing.listingID);
                      dispatch(setIsLoggedIn(true));
                      dispatch(
                        fetchUsers(userData.username, userData.password)
                      );
                    }}
                    className={classes.submit}
                  >
                    Sign In
                  </Button>

                  <Grid container>
                    <Grid item>
                      <Link href="/signup" variant="body2">
                        Don't have an account? Sign Up
                      </Link>
                    </Grid>
                  </Grid>
                  <Box mt={5}>
                    <Copyright />
                  </Box>
                </form>
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.userReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setUsername: () => dispatch(setUsername()),
    setPassword: () => dispatch(setPassword()),
    fetchUsers: () => dispatch(fetchUsers()),
    setIsLoggedIn: () => dispatch(setIsLoggedIn()),
    setIsAdmin: () => dispatch(setIsAdmin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
