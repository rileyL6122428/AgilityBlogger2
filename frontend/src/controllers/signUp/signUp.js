import FormField from '../../classes/formField.js';
import MatchingFormField from '../../classes/matchingFormField.js';
import signUpErrorChecks from './_errorChecks.js';

function SignUpController(authenticationBackendRequests, $state) {
  'ngInject';

  var vm = this;

  vm.username = new FormField (
    "username", [
    signUpErrorChecks.tooShort,
    signUpErrorChecks.tooLong,
    signUpErrorChecks.dashesPresent,
    signUpErrorChecks.spacesPresent
  ]);

  vm.password = new FormField (
    "password",
    [signUpErrorChecks.tooShort, signUpErrorChecks.tooLong]
  );

  vm.passwordConfirm = new MatchingFormField (
    "passwordConfirm",
    [signUpErrorChecks.valueNotMatching],
    vm.password
  );

  vm.credentialsSubmittable = false;
  vm.updateSubmittableStatus = () => {
    [vm.username, vm.password, vm.passwordConfirm].forEach((field) => { field.updateErrors(); });
    vm.credentialsSubmittable = !_formFieldsContainValidationErrors();
  }

  function _formFieldsContainValidationErrors() {
    return (
      vm.username.errors.length > 0 ||
      vm.password.errors.length > 0 ||
      vm.passwordConfirm.errors.length > 0
    );
  }

  vm.backendErrors = [];
  vm.submitCredentials = () => {
    let newUser = {
      username: vm.username.value,
      password: vm.password.value,
      passwordConfirm: vm.passwordConfirm.value
    }

    authenticationBackendRequests.signUp(
      newUser,
      vm.submitCredentialsSuccessCB,
      vm.submitCredentialsFailureCB
    );
  }
  
  vm.submitCredentialsSuccessCB = () => { $state.go("dashboard"); };
  vm.submitCredentialsFailureCB = (errors) => { vm.backendErrors = errors; }
}

export default SignUpController;
