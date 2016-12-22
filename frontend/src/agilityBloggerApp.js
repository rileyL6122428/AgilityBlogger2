import angular from 'angular';
import uiRouter from 'angular-ui-router';

import authenticationModule from './submodules/authentication/authenticationModule.js';
import routesConfig from './routerConfig.js';

const agilityBloggerApp = angular.module('agilityBloggerApp',
  [
    authenticationModule,
    uiRouter
  ]
)
  .config(routesConfig);

export default agilityBloggerApp.name;
