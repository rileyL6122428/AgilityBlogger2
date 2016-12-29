import angular from 'angular';
import uiRouter from 'angular-ui-router';

import BlogStore from './services/blogStore.js';
import DashboardController from './controllers/dashboardController.js';

const bloggerModule = angular.module('bloggerModule', [uiRouter])
  .service('blogStore', BlogStore)
  .controller('dashboardController', DashboardController);

export default bloggerModule.name;
