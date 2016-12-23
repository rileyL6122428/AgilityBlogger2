import angular from 'angular';
import 'angular-mocks';
import agilityBloggerApp from '../../src/agilityBloggerApp.js';
import Form from '../../src/submodules/authentication/classes/form.js';

const {inject, module} = angular.mock;

describe("SignUpController", () => {
  let vm;
  let $state;
  let $httpBackend;
  let SignUpRequestApi;

  beforeEach(module(agilityBloggerApp));

  beforeEach(inject((_$httpBackend_, $controller, _$state_, _SignUpRequestApi_) => {
    vm = $controller('signUpController', {});
    $state = _$state_;
    SignUpRequestApi = _SignUpRequestApi_;
    $httpBackend = _$httpBackend_;
  }));

  it('should be registered', () => expect(vm).toBeDefined());

  it("should intialize with a form object", () => {
    expect(vm.form).toBeDefined();
    expect(vm.form instanceof Form).toBe(true);
  });

  it("should intially set readyToSubmit to false", () => {
    expect(vm.readyToSubmit).toBe(false);
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

  it("#sumbitCredentials should make a call to SignUpRequestApi", () => {
    spyOn(SignUpRequestApi, 'signUp');
    
    vm.form.fieldsList.forEach((field) => { field.value = "SAMPLE_VALUE"; });
    vm.submitCredentials();

    expect(SignUpRequestApi.signUp).toHaveBeenCalledWith({
      username: "SAMPLE_VALUE",
      password: "SAMPLE_VALUE"
    });
  });


});
