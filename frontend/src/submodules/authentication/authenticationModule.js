import angular from 'angular';

import SignUpFormFieldDirective from './directives/formField.js';
import CredentialsSubmissionCBs from './services/credentialsSubmissionCBs.js'
import SignUpRequestApi from './services/signUpRequestApi.js';
import AuthenticationStore from './services/authenticationStore.js'
import SignUpController from './controllers/signUpController.js';
import SignUpForm from './services/signUpFormFields.js'

const authenticationModule = angular.module('authenticationModule', [])
    .directive('signUpFormField', SignUpFormFieldDirective)
    .service('credentialsSubmissionCBs', CredentialsSubmissionCBs)
    .service('SignUpRequestApi', SignUpRequestApi)
    .service('signUpForm', SignUpForm)
    .service('authenticationStore', AuthenticationStore)
    .controller('signUpController', SignUpController);

export default authenticationModule.name;
