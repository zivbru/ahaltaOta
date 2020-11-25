import api from '../../utils/api';
import { AUTHENTICATE } from '../types';

export const saveUserDetails = (res) => async (dispatch) => {
  const user = {
    profile: res.profileObj,
    token: res.tokenObj,
  };
  const userFromServer = await api.get(`/users/${res.profileObj.googleId}`);

  if (userFromServer) {
    user.data = userFromServer.data;
  }

  dispatch({ type: AUTHENTICATE, user });
};
