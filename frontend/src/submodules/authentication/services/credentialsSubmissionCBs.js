function CredentialsSubmissionCBs (authenticationStore, $state) {
// function CredentialsSubmissionCBs (authenticationStore) {

  return ({
    successCB: (response) => {
      debugger
      authenticationStore.setCurrentUser(response.data.user);
      $state.go('dashboard');
    },

    failureCB: (response) => { alert("A login error occured"); },
  });
}

export default CredentialsSubmissionCBs;
