import angular from 'angular';

import SignUpFormFieldDirective from './directives/formField.js';
import SignUpRequestApi from './services/signUpRequestApi.js';
import AuthenticationStore from './services/authenticationStore.js'
import SignUpController from './controllers/signUpController.js';

const authenticationModule = angular.module('authenticationModule', [])
    .directive('signUpFormField', SignUpFormFieldDirective)
    .service('SignUpRequestApi', SignUpRequestApi)
    .service('authenticationStore', AuthenticationStore)
    .controller('signUpController', SignUpController);

export default authenticationModule.name;
