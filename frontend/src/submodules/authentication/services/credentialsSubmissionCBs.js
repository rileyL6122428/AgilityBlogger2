function CredentialsSubmissionCBs (authenticationStore, $state) {

  return ({
    successCB: (response) => {
      authenticationStore.setCurrentUser(response.data.user);
      $state.go('dashboard');
    },

    failureCB: (response) => {
      alert("A login error Occurred");
    },
  });
}

export default CredentialsSubmissionCBs;
