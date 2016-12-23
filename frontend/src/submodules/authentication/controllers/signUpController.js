function SignUpController(SignUpRequestApi, signUpFormFactory, $state) {
  'ngInject';

  let vm = this;

  vm.form = signUpFormFactory.newForm();
  vm.readyToSubmit = false;
  vm.updateSubmittableStatus = () => { vm.readyToSubmit = !vm.form.containsValidationErrors(); };
  vm.submitCredentials = () => { SignUpRequestApi.signUp(vm.form.submissionReport()); };
}

export default SignUpController;
