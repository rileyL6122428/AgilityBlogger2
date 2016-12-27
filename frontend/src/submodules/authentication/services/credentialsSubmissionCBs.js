function CredentialsSubmissionCBs (authenticationStore, $state) {

  return ({
    successCB: (response) => {
      debugger
      authenticationStore.setCurrentUser(response.data.user);
      $state.go('dashboard');
    },

    failureCB: (response) => {
      debugger
      alert("A login error Occurred");
    },
  });
}

export default CredentialsSubmissionCBs;
