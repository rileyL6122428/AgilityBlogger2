import angular from 'angular';
import uiRouter from 'angular-ui-router';

import AuthenticationStore from './services/authenticationStore.js'
import SignUpFormFieldsDirective from './directives/signUpFormFields.js';
import CredentialsSubmissionCBs from './services/credentialsSubmissionCBs.js'
import SignUpRequestApi from './services/signUpRequestApi.js';
import SignUpController from './controllers/signUpController.js';
import SignUpFormFactory from './services/signUpFormFactory.js'

const authenticationModule = angular.module('authenticationModule', [uiRouter])
    .directive('signUpFormFields', SignUpFormFieldsDirective)
    .service('credentialsSubmissionCBs', CredentialsSubmissionCBs)
    .service('SignUpRequestApi', SignUpRequestApi)
    .service('signUpFormFactory', SignUpFormFactory)
    .service('authenticationStore', AuthenticationStore)
    .controller('signUpController', SignUpController);

export default authenticationModule.name;
