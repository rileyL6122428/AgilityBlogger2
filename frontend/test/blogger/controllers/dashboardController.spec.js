import angular from 'angular';
import 'angular-mocks';
import ngRedux from 'ng-redux';

import agilityBloggerApp from '../../../src/agilityBloggerApp.js';

const {inject, module} = angular.mock;

describe("dashboard controller", () => {

  let vm, controllerHelper;

  const SAMPLE_USER = { username: "username", id: 1 };

  beforeEach(module(agilityBloggerApp));

  beforeEach(() => {
    module(($provide) => {
      $provide.value('$scope', { "$on": (lifecycleEvent, cb) => {} });
      $provide.value('dashboardControllerHelper', {
        setState: (state) => { return ({ currentUser: SAMPLE_USER }); }
      });
    });
  });

  beforeEach(inject(($controller) => vm = $controller('dashboardController', {})));

  it("should be defined", () => expect(vm).toBeDefined());
});
