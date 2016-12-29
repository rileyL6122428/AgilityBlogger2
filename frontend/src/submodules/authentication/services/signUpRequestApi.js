function SignUpRequestApi($http, credentialsSubmissionCBs) {
  'ngInject';

  function signUp(newUser) {
    $http({
      url: "/api/createAccount",
      method: "POST",
      data: newUser,
    }).then(
      credentialsSubmissionCBs.successCB,
      credentialsSubmissionCBs.failureCB
    );
  }

  return ({ signUp });
}

export default SignUpRequestApi;
