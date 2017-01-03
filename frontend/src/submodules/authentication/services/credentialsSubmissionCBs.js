import { addCurrentUser } from '../../../redux/actions/user.actions.js';

function CredentialsSubmissionCBs ($ngRedux, $state) {

  return ({
    successCB: (response) => {
      $ngRedux.dispatch(addCurrentUser(response.data.user));
      $state.go('dashboard');
    },

    failureCB: (response) => {
      alert("A login error Occurred");
    },
  });
}

export default CredentialsSubmissionCBs;
