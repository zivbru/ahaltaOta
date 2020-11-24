import { AUTHENTICATE } from '../types';

export const saveUserdDetails = (res) => (dispatch) => {
  const user = {
    profile: res.profileObj,
    token: res.tokenObj,
  };
  localStorage.setItem('user', user);

  dispatch({ type: AUTHENTICATE, user });
};
