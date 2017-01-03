import { AUTHENTICATION } from '../constants/authentication.js';

function addCurrentUser(userData) {
  return ({
    type: AUTHENTICATION.ADD_CURRENT_USER,
    payload: userData
  });
}

export { addCurrentUser };
