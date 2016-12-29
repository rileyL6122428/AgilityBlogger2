import angular from 'angular';
import 'angular-mocks';
import agilityBloggerApp from '../../../src/agilityBloggerApp.js';
import Form from '../../../src/submodules/authentication/classes/form.js';

const {inject, module} = angular.mock;

describe("SignUpController", () => {
  let vm;
  let $state;
  let $httpBackend;
  let authRequestApi;

  beforeEach(module(agilityBloggerApp));

  beforeEach(inject(($controller, _authRequestApi_) => {
    vm = $controller('signUpController', {});
    authRequestApi = _authRequestApi_;
  }));

  it('should be registered', () => expect(vm).toBeDefined());

  it("should intialize with a form object", () => {
    expect(vm.form).toBeDefined();
    expect(vm.form instanceof Form).toBe(true);
  });

  describe("#updateSubmittableStatus", () => {
    it("should set readyToSubmit to false when errors are present in any of the form fields", () => {
      vm.readyToSubmit = true;
      vm.updateSubmittableStatus();
      expect(vm.readyToSubmit).toBe(false);
    });

    it("should set readyToSubmit to true when errors are not present in any form fields", () => {
      vm.form.fieldsList.forEach((field) => { field.value = "SAMPLE_VALUE"; });
      vm.updateSubmittableStatus();
      expect(vm.readyToSubmit).toBe(true);
    });
  });

  it("#sumbitCredentials should make a call to authRequestApi", () => {
    spyOn(authRequestApi, 'signUp');

    vm.form.fieldsList.forEach((field) => { field.value = "SAMPLE_VALUE"; });
    vm.submitCredentials();

    expect(authRequestApi.signUp).toHaveBeenCalledWith({
      username: "SAMPLE_VALUE",
      password: "SAMPLE_VALUE"
    });
  });

});
