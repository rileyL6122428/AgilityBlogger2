import angular from 'angular';
import uiRouter from 'angular-ui-router';

import authenticationModule from './submodules/authentication/authenticationModule.js';
import storesModule from './submodules/storage/storesModule.js'
import routesConfig from './routerConfig.js';

const agilityBloggerApp = angular.module('agilityBloggerApp',
  [
    storesModule,
    authenticationModule,
    uiRouter
  ]
)
  .config(routesConfig);

export default agilityBloggerApp.name;
