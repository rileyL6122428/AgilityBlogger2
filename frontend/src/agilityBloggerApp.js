import angular from 'angular';
import uiRouter from 'angular-ui-router';

import authenticationModule from './submodules/authentication/authenticationModule.js';
import bloggerModule from './submodules/blogger/bloggerModule.js';

import routesConfig from './routerConfig.js';

const agilityBloggerApp = angular.module('agilityBloggerApp',
  [
    bloggerModule,
    authenticationModule,
    uiRouter
  ]
)
  .config(routesConfig);

export default agilityBloggerApp.name;
