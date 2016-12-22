import angular from 'angular';
import 'angular-mocks';
import agilityBloggerApp from '../../src/agility-blogger-app.js';

const {inject, module} = angular.mock;

describe("SignUpController", () => {
  let vm;
  let $state;
  let $httpBackend;
  let authenticationBackendRequests;

  beforeEach(module(agilityBloggerApp));

  beforeEach(inject((_$httpBackend_, $controller, _$state_, _authenticationBackendRequests_) => {
    vm = $controller('signUp', {});
    $state = _$state_;
    authenticationBackendRequests = _authenticationBackendRequests_;
    $httpBackend = _$httpBackend_;
  }));

  it('should be registered', () => expect(vm).toBeDefined());

  it("should initially set form values to empty strings", () => {
    vm.formFields.forEach((field) =>  expect(field.value).toEqual(""));
  });

  it("should intially set backendErrors to empty", () => {
    expect(vm.backendErrors).toEqual([]);
  });

  it("should intially set credentialsSubmittable to false", () => {
    expect(vm.credentialsSubmittable).toBe(false);
  });

  describe("#updateSubmittableStatus", () => {
    it("should set credentialsSubmittable to false when errors are present in any of the form fields", () => {
      vm.credentialsSubmittable = true;
      vm.updateSubmittableStatus();
      expect(vm.credentialsSubmittable).toBe(false);
    });

    it("should set credentialsSubmittable to true when errors are not present in any form fields", () => {
      vm.formFields.forEach((field) => { field.value = "SAMPLE_VALUE"; });
      vm.updateSubmittableStatus();
      expect(vm.credentialsSubmittable).toBe(true);
    });
  });

  describe("#sumbitCredentials", () => {
    xit("should make a call to authenticationBackendRequests", () => {
      spyOn(authenticationBackendRequests, 'signUp');
      vm.submitCredentials();
      expect(authenticationBackendRequests.signUp)
          .toHaveBeenCalled();// NOTE CHANGE THIS TO HAVE BEEN CALLED WITH SPECIFIC SERVICE
    });

    it("should navigate to the dashboard when submission is successful", () => {
      spyOn($state, 'go');
      vm.submitCredentials();
      expect($state.go).toHaveBeenCalledWith('dashboard');
    });

    xit("should set backend errors when errors are returned", () => {
      vm.submitCredentialsFailureCB(["Username is already taken"]);
      expect(vm.backendErrors).toContain("Username is already taken");
    });

    xit("should set a modal when backend errors are present")
  });




});
