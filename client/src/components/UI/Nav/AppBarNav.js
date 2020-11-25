import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import { useSelector } from 'react-redux';
import useStyles from './AppBarNavStyles';

const AppBarNav = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);

  return (
    <AppBar position='static' className={classes.direction}>
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
