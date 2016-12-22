import FormField from '../classes/formField.js';
import MatchingFormField from '../classes/matchingFormField.js';
import signUpErrorChecks from '../constants/authErrorChecks.js';

function SignUpController(SignUpRequestApi, signUpForm, $state) {
  'ngInject';

  let vm = this;

  vm.form = signUpForm.newForm();

  vm.credentialsSubmittable = false;
  vm.updateSubmittableStatus = () => {
    vm.credentialsSubmittable = !vm.form.containsValidationErrors();
  };

  vm.submitCredentials = () => {
    SignUpRequestApi.signUp(form.submissionReport());
  }
}

export default SignUpController;
