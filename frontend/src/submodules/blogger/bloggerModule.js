import angular from 'angular';
import uiRouter from 'angular-ui-router';

import DashboardController from './controllers/dashboardController.js';

const bloggerModule = angular.module('bloggerModule', [uiRouter])
  .controller('dashboardController', DashboardController);

export default bloggerModule.name;
