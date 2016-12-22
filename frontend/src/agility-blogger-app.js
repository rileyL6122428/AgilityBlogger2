import angular from 'angular';
import uiRouter from 'angular-ui-router';

import AuthenticationStore from './dataStores/authenticationStore.js'

import SignUpModule from './submodules/signUp/sign-up-module.js';
import routesConfig from './router-config.js';

const agilityBloggerApp = angular.module('agilityBloggerApp',
  [
    SignUpModule,
    uiRouter
  ]
)
  .service('authenticationStore', AuthenticationStore)
  .config(routesConfig);

export default agilityBloggerApp.name;
