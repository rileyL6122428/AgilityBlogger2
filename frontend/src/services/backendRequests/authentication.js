function AuthenticationBackendRequests($http, authenticationStore) {
  'ngInject';

  const EMPTY_CB = () => {};

  function signUp(newUser, successCB = EMPTY_CB, failureCB = EMPTY_CB) {
    $http({
      url: "/api/createAccount",
      method: "POST",
      data: { newUser: newUser },
    }).then(function success(response) {
      authenticationStore.setCurrentUser(response.data.user);
      successCB();
    }, function failure(response) {
      failureCB(response.data);
    });
  }

  return ({
    signUp
  });
}

export default AuthenticationBackendRequests;
