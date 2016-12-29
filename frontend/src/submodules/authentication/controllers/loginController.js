export default function LoginController(formFactory) {
  'ngInject';

  let vm = this;
  
  vm.form = formFactory.newLoginForm();

  vm.testMsg = "HELLO WORLD";
}
