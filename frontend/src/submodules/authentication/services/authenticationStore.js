import User from '../classes/User.js';

function AuthenticationStore() {
  var currentUser = null;

  return({
    getCurrentUser: () => { return currentUser; },

    setCurrentUser: (userData) => { currentUser = new User(userData); },

    userIsLoggedIn: () => { return currentUser !== null; },

    logOut: () => { currentUser = null; }
  });
}

export default AuthenticationStore;
