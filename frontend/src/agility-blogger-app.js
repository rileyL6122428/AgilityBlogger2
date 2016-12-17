import angular from 'angular';
import uiRouter from 'angular-ui-router';

import AuthenticationStore from './services/stores/authentication.js';
import AuthenticationBackendRequests from './services/backendRequests/authentication.js';
import SignUpController from './controllers/signUp.js';
import routesConfig from './router-config.js';

const agilityBloggerApp = angular.module('agilityBloggerApp', [uiRouter])
  .service('authenticationStore', AuthenticationStore)
  .service('authenticationBackendRequests', AuthenticationBackendRequests)
  .controller('signUp', SignUpController)
  .config(routesConfig);

export default agilityBloggerApp.name;
