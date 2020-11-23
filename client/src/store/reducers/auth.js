import { AUTHENTICATE } from '../types';

const initialState = {
  user: null,
  isLoggedIn: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
      };

    default:
      return state;
  }
};

export default auth;
