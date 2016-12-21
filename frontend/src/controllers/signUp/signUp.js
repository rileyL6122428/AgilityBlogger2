import FormField from '../../classes/formField.js';
import MatchingFormField from '../../classes/matchingFormField.js';
import signUpErrorChecks from './_errorChecks.js';

function SignUpController(authenticationBackendRequests, $state) {
  'ngInject';

  let vm = this;
  let username, password, passwordConfirm;

  username = new FormField ({
    name: "username",
    errorChecks: [
      signUpErrorChecks.tooShort,
      signUpErrorChecks.tooLong,
      signUpErrorChecks.dashesPresent,
      signUpErrorChecks.spacesPresent
    ],
    type: "text",
    icon: "glyphicon glyphicon-credit-card"
  })

  password = new FormField ({
    name: "password",
    errorChecks: [signUpErrorChecks.tooShort, signUpErrorChecks.tooLong],
    type: "password",
    icon: "glyphicon glyphicon-lock"
  });

  passwordConfirm = new MatchingFormField({
      name: "passwordConfirm",
      dependantField: password
  });

  vm.formFields = [username, password, passwordConfirm];

  vm.credentialsSubmittable = false;
  vm.updateSubmittableStatus = () => {
    vm.formFields.forEach((field) => { field.updateErrors(); });
    vm.credentialsSubmittable = !_formFieldsContainValidationErrors();
  };

  function _formFieldsContainValidationErrors() {
    for (var idx = 0; idx < vm.formFields.length; idx++) {
      let field = vm.formFields[idx];
      if(field.errors.length > 0) return true;
    }

    return false;
  }

  vm.backendErrors = [];
  vm.submitCredentials = () => {
    authenticationBackendRequests.signUp({
      newUser: {
        username: username.value,
        password: password.value,
      },

      successCB: () => { $state.go("dashboard"); },
      failuerCB: (errors) => { vm.backendErrors = errors; }
    });
  }
}

export default SignUpController;
