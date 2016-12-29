export default function SignUpController(authRequestApi, formFactory) {
  'ngInject';

  let vm = this;

  vm.form = formFactory.newSignUpForm();
  vm.updateSubmittableStatus = () => { vm.readyToSubmit = !vm.form.containsValidationErrors(); };
  vm.submitCredentials = () => { authRequestApi.signUp(vm.form.submissionReport()); };
}
