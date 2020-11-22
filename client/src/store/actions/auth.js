import { AUTHENTICATE } from '../types';

export const saveUserdDetails = (res) => (dispatch) => {
  const user = {
    profile: res.profileObj,
    token: res.tokenObj,
  };

  dispatch({ type: AUTHENTICATE, user });
};
