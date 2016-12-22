import angular from 'angular';
import 'angular-mocks';
import agilityBloggerApp from '../../src/agility-blogger-app.js';
// import { _setup, _teardown } from './setup-teardown-helper.js';
import _ from 'lodash';
import template from '../../src/directives/sign-up/form-field.html';

const {inject, module} = angular.mock;

describe("form-field directive", () => {
  let element, parentScope, scope;
  const defaults = { template, vm: {} };

  beforeEach(module(agilityBloggerApp));
  debugger
  beforeEach(() => { _setup();});
  afterEach(() => { _teardown(); });

  xit('should compile properly', () => {
    expect(element).toBeDefined();
    expect(scope).toBeDefined();
  });


  //NOTE HELPERS

  function _setup(options = {}) {
    const config = _.assign({}, defaults, options);

    inject(($compile, $rootScope) => {
      parentScope = $rootScope.$new();
      parentScope.vm = config.vm;
      debugger
      element = $compile(config.template)(parentScope);
      parentScope.$digest();

      scope = element.isolateScope();

      scope.$apply();

      angular.element(document.body).append(element);
    });
  }

  function _teardown() {
    if (element) element.remove();
  }
});
