import angular from 'angular';
import uiRouter from 'angular-ui-router';

import DashboardControllerHelper from './services/dashboardControllerHelper.js';
import BlogRequestCBs from './services/blogRequestCBs.js'
import BlogRequestApi from './services/blogRequestApi.js';
import DashboardController from './controllers/dashboardController.js';

const bloggerModule = angular.module('bloggerModule', [uiRouter])
  .service('blogRequestCBs', BlogRequestCBs)
  .service('blogRequestApi', BlogRequestApi)
  
  .service('dashboardControllerHelper', DashboardControllerHelper)
  .controller('dashboardController', DashboardController);

export default bloggerModule.name;
