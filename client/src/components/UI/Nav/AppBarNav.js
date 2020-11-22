import React from 'react';
import './AppNavBar.css';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const AppBarNav = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          {user && (
            <Typography variant='h6' className={classes.title}>
              היי {user.profile.name}
            </Typography>
          )}
          <Typography variant='h6'>אכלת אותה</Typography>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='smile'
          >
            <EmojiEmotionsOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppBarNav;
