import React from 'react';
import { GoogleLogin } from 'react-google-login';
import './Login.css';
import { saveUserdDetails } from '../../store/actions/auth';
import { connect } from 'react-redux';

const Login = ({ saveUserdDetails }) => {
  const responseGoogle = async (res) => {
    await saveUserdDetails(res);
  };
  const onFail = (res) => {
    return;
  };
  return (
    <div className='login'>
      <GoogleLogin
        clientId='607326949972-maprpiod3v3tbevk0os17rrhso12hvar.apps.googleusercontent.com'
        buttonText='Sign in with Google'
        onSuccess={responseGoogle}
        onFailure={onFail}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default connect(null, { saveUserdDetails })(Login);
