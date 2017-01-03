import angular from 'angular';
import uiRouter from 'angular-ui-router';

import CredentialsSubmissionCBs from './services/credentialsSubmissionCBs.js';
import AuthRequestApi from './services/authRequestApi.js';
import FormFactory from './services/formFactory.js';

import AuthFormFieldsDirective from './directives/signUpFormFields.js';

import LoginController from './controllers/loginController.js';
import SignUpController from './controllers/signUpController.js';

const authenticationModule = angular.module('authenticationModule', [uiRouter])

    .service('credentialsSubmissionCBs', CredentialsSubmissionCBs)
    .service('authRequestApi', AuthRequestApi)
    .service('formFactory', FormFactory)

    .directive('authFormFields', AuthFormFieldsDirective)

    .controller('loginController', LoginController)
    .controller('signUpController', SignUpController);

export default authenticationModule.name;
