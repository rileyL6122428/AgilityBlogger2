function SignUpRequestApi($http, authenticationStore, credentialsSubmissionCBs) {
  'ngInject';

  function signUp(newUser) {
    $http({
      url: "/api/createAccount",
      method: "POST",
      data: { newUser: newUser },
    }).then(
      credentialsSubmissionCBs.successCB,
      credentialsSubmissionCBs.failureCB
    );
  }

  return ({ signUp });
}

export default SignUpRequestApi;
