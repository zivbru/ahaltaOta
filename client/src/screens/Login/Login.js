import React from 'react';
import { GoogleLogin } from 'react-google-login';
import useStyles from './LoginStyles';
import { saveUserDetails } from '../../store/actions/auth';
import { connect } from 'react-redux';

const Login = ({ saveUserDetails }) => {
  const classes = useStyles();
  const responseGoogle = async (res) => {
    await saveUserDetails(res);
  };
  const onFail = (res) => {
    return;
  };
  return (
    <div className={classes.login}>
      <GoogleLogin
        clientId='607326949972-maprpiod3v3tbevk0os17rrhso12hvar.apps.googleusercontent.com'
        buttonText='Sign in with Google'
        onSuccess={responseGoogle}
        onFailure={onFail}
        isSignedIn={true}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default connect(null, { saveUserDetails })(Login);
