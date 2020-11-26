import api from '../../utils/api';
import { AUTHENTICATE } from '../types';

export const saveUserDetails = (res) => async (dispatch) => {
  const user = {
    profile: res.profileObj,
    token: res.tokenObj,
  };
  api.defaults.headers.common.id = res.profileObj.googleId;
  const userFromServer = await getUserById(res.profileObj.googleId);

  if (userFromServer) {
    user.data = userFromServer.data;
  }

  dispatch({ type: AUTHENTICATE, user });
};

export const getUserById = async (id) => {
  return await api.get(`/users/${id}`);
};
