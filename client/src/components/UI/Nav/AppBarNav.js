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
    marginLeft: theme.spacing(1),
    direction: 'rtl',
  },
  title: {
    flexGrow: 1,
    direction: 'ltr',
  },
}));

const AppBarNav = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);

  return (
    <AppBar position='static' className='direction'>
      <Toolbar>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='smile'
        >
          <EmojiEmotionsOutlinedIcon />
        </IconButton>
        <Typography variant='h6'>אכלת אותה</Typography>
        {user && (
          <Typography variant='h6' className={classes.title}>
            היי {user.profile.name}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppBarNav;
