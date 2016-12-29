export default function LoginController(formFactory, authRequestApi) {
  'ngInject';

  let vm = this;

  vm.form = formFactory.newLoginForm();
  vm.updateSubmittableStatus = () => { vm.readyToSubmit = !vm.form.containsValidationErrors(); };
  vm.submitCredentials = () => { authRequestApi.login(vm.form.submissionReport()); };
}
