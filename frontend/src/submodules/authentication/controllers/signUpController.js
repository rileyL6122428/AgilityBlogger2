function SignUpController(SignUpRequestApi, signUpForm, $state) {
  'ngInject';

  let vm = this;

  vm.form = signUpForm.newForm();
  vm.readyToSubmit = false;
  vm.updateSubmittableStatus = () => { vm.readyToSubmit = !vm.form.containsValidationErrors(); };
  vm.submitCredentials = () => { SignUpRequestApi.signUp(form.submissionReport()); };
}

export default SignUpController;
