function CredentialsSubmissionCBs ($state, authenticationStore) {

  var errorReceiver = null;

  return ({
    successCB: (response) => {
      authenticationStore.setCurrentUser(response.data.user);
      $state.go('dashboard');
    },

    failureCB: (response) => { alert("A login error occured"); },
  });
}

export default CredentialsSubmissionCBs;
