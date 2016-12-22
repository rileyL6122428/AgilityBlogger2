function AuthenticationStore() {
  var currentUser = null;

  return({
    getCurrentUser: () => { return currentUser; },

    setCurrentUser: (user) => { currentUser = user; },

    userIsLoggedIn: () => { return currentUser !== null; },

    logOut: () => { currentUser = null; }
  });
}

export default AuthenticationStore;
