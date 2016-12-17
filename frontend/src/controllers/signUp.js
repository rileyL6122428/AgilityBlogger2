function SignUpController(authenticationBackendRequests) {
  'ngInject';

  debugger
  authenticationBackendRequests.signUp({});

  var vm = this;

  vm.username = "";
  vm.password = "";
  vm.passwordConfirm = "";

  vm.usernameErrors = [];
  vm.passwordErrors = [];
  vm.passwordConfirmErrors = [];

  vm.setUsernameErrors = setUsernameErrors
  vm.setPasswordErrors = setPasswordErrors
  vm.setPasswordConfirmErrors = setPasswordConfirmErrors

  vm.usernameStatus = "";
  vm.passwordStatus = "";
  vm.passwordConfirmStatus = "";

  vm.updateUsernameStatus = updateUsernameStatus;
  vm.updatePasswordStatus = updatePasswordStatus;
  vm.updatePasswordConfirmStatus = updatePasswordConfirmStatus;

  function setUsernameErrors() {
    var username = vm.username
    loadErrorMessages("usernameErrors", [
      { shouldLoadError: username.length < 5, msge: "Too short (at least 5 characters long)" },
      { shouldLoadError: username.length > 35, msge: "Too long (must be less than 36 characters long)" },
      { shouldLoadError: username.indexOf("-") != -1, msge: "Illegal chars (dashes are not allowed)" },
      { shouldLoadError: username.indexOf(" ") != -1, msge: "Illegal chars (spaces are not allowed)"}
    ]);
  }

  function setPasswordErrors() {
    var password = vm.password
    loadErrorMessages("passwordErrors", [
      { shouldLoadError: password.length < 5, msge: "Too short (at least 5 characters long)" },
      { shouldLoadError: password.length > 35, msge: "Too long (must be less than 36 characters long)" },
    ]);
  }

  function setPasswordConfirmErrors() {
    loadErrorMessages("passwordConfirmErrors", [
      { shouldLoadError: vm.passwordConfirm !== vm.password, msge: "does not match password" }
    ]);
  }

  function loadErrorMessages(errorsType, errorChecks) {
    vm[errorsType] = [];
    errorChecks.forEach(function(errorCheck){
      if(errorCheck.shouldLoadError) { vm[errorsType].push(errorCheck.msge); }
    });
  }

  function updateUsernameStatus() {
    updateStatus("username", setUsernameErrors);
  }

  function updatePasswordStatus() {
    updateStatus("password", setPasswordErrors);
  }

  function updatePasswordConfirmStatus() {
    updateStatus("passwordConfirm", setPasswordConfirmErrors);
  }

  function updateStatus(formField, errorSetter) {
    errorSetter();

    var statusToUpdate = formField + "Status";
    var errorContainerName = formField + "Errors";
    var errors = vm[errorContainerName];

    vm[statusToUpdate] = (errors.length > 0) ? "errors-present" : "validations-passed";
  }
}

export default SignUpController
