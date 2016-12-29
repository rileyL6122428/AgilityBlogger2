export default function SignUpController(SignUpRequestApi, formFactory) {
  'ngInject';

  let vm = this;
  vm.form = formFactory.newSignUpForm();
  vm.readyToSubmit = false;
  vm.updateSubmittableStatus = () => { vm.readyToSubmit = !vm.form.containsValidationErrors(); };
  vm.submitCredentials = () => { SignUpRequestApi.signUp(vm.form.submissionReport()); };
}
