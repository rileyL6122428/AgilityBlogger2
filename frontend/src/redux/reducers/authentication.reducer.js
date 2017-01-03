import { AUTHENTICATION } from '../constants/authentication.js';

const initialState = null;

export function AuthReducer(state = intialState, action) {
  switch(action.type) {
    case AUTHENTICATION.ADD_CURRENT_USER:
      return _addCurrentUser(action.payload);
    default:
      return state;
  }

  function _addCurrentUser(userData) {
    return ({
      username: userData.username,
      id: userData.id
    });
  }
}
