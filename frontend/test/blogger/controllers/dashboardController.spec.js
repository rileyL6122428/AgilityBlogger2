import angular from 'angular';
import 'angular-mocks';
import bloggerModule from '../../../src/submodules/blogger/bloggerModule.js';
import FilterableBlogList from '../../../src/submodules/blogger/classes/blog/FilterableBlogList.js';
import User from '../../../src/submodules/authentication/classes/User.js'

const {inject, module} = angular.mock;

describe("dashboard controller", () => {

  let vm;

  beforeEach(module(bloggerModule));

  beforeEach(() => {
    module(($provide) => {
      $provide.service('authenticationStore', function() {
        this.getCurrentUser = jasmine.createSpy().and.callFake(() => {
          return new User({ id: 1, username: 'test' })
        });
      });
    });
  });

  beforeEach(inject(($controller) => {
    vm = $controller('dashboardController', {});
  }));

  it("should instantiate with a filterable blog list", () => {
    expect(vm.userBlogs instanceof FilterableBlogList).toBe(true);
  })
});
