function CredentialsSubmissionCBs (authenticationStore, $state) {

  return ({
    successCB: (response) => {
      authenticationStore.setCurrentUser(response.data.user);
      $state.go('dashboard');
    },

    failureCB: (response) => { alert("A login error occured"); },
  });
}

export default CredentialsSubmissionCBs;
