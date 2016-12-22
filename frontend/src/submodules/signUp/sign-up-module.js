import angular from 'angular';

import SignUpFormFieldDirective from './directives/form-field.js';
import SubmitCredentialsApi from './services/signUpCredentialsApi.js';
import SignUpController from './signUpRootController.js';

const SignUpModule = angular.module('SignUpModule', [])
    .directive('signUpFormField', SignUpFormFieldDirective)
    .service('SubmitCredentialsApi', SubmitCredentialsApi)
    .controller('signUpController', SignUpController);

export default SignUpModule.name;
