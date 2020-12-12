import React from 'react';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';
import clsx from 'clsx';

const drawerWidth = 240;

export const HomeButton = styled.div`
  :focus {
    outline: none;
  }
  :hover {
    cursor: pointer;
  }
`;

const useStyles = makeStyles((theme) => ({
  grow: {
    width: '100%',
    zIndex: 99999,
  },
  hide: {
    display: 'none',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    zIndex: 99999,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    zIndex: 99999,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 99999,
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 99999,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    zIndex: 99999,
    backgroundImage: 'url(https://t3.ftcdn.net/jpg/03/46/19/62/360_F_346196235_cq70soRs48KN3u5dQUpIU1Wm9NYbRjxu.jpg)',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    minWidth: '5em',
    display: 'none',
    fontFamily: 'Open Sans',
    fontSize: 24,
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const NavigationHeader = () => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  return (
    <div className={classes.grow}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <HomeButton onClick={() => history.push('/user')}>
            <Typography style={{ marginLeft: "30px" }} className={classes.title} variant="h6" noWrap>
              Listy
            </Typography>
          </HomeButton>
        </Toolbar>
      </AppBar>
      
    </div>
  );
};

export default NavigationHeader;
