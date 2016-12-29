export default function AuthRequestApi($http, credentialsSubmissionCBs) {
  'ngInject';


  return ({
    signUp: (newUser) => {
      _credentialsSubmissionRequest({
        url: "/api/createAccount",
        data: newUser
      });
    },

    login: (returningUser) => {
      _credentialsSubmissionRequest({
        url: "/api/login",
        data: returningUser
      });
    }
  });
  
  function _credentialsSubmissionRequest(params) {
    $http({
      url: params.url,
      method: "POST",
      data: params.data,
    }).then(
      credentialsSubmissionCBs.successCB,
      credentialsSubmissionCBs.failureCB
    );
  }
}
