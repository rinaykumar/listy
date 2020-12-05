import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import NavigationHeader  from "../components/NavigationHeader";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  setUsername,
  setIsLoggedIn,
  setPassword,
  fetchUsers,
  signupUser
} from "../redux/actions/userActions";

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        SFSU CSC 667. Team Listy. .
        <Link color="blue" href="https://github.com/CSC-648-SFSU/csc648-02-fa20-team02">
          Fork us on Github.
        </Link>
        {' '}
      </Typography>
    );
  }

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  mainContainer: {
      marginTop: '10em',
  }
}));

const Signup = ({ userData }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // extract values from the global redux store
  const username = useSelector((state) => state.userReducer.username);
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);

  return (
      <div className={classes.mainContainer}>
          <NavigationHeader/>
          <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
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
            autoComplete="current-password"
            value={userData.password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
          />
              <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Confirm Password"
            type="password"
            id="password"
            autoComplete="confirm-password"
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              // console.log(listing.listingID);
              dispatch(
                signupUser(userData.username, userData.password)
              );
            }}
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>

            <Grid item>
              <Link href="#" variant="body2">
                {"Already have an account? Login"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
      </div>
      
    
  );
}

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);