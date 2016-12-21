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
  }));

  it('should be registered', () => { expect(vm).toBeDefined(); });

  it("should initially set form values to empty strings", () => {
    expect(vm.username.value).toEqual("");
    expect(vm.password.value).toEqual("");
    expect(vm.passwordConfirm.value).toEqual("");
  });

  it("should intially set backendErrors to empty", () => {
    expect(vm.backendErrors.length).toEqual(0);
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

    it("should set credentialsSubmittable to true when no errors are present in any of the form fields", () => {
      vm.username.value = "username";
      vm.password.value = "password";
      vm.passwordConfirm.value = "password";
      vm.updateSubmittableStatus();
      expect(vm.credentialsSubmittable).toBe(true);
    });
  });

  it("#submit credentials should make a call to authenticationBackendRequests", () => {
    spyOn(authenticationBackendRequests, 'signUp');
    vm.submitCredentials();
    expect(authenticationBackendRequests.signUp).toHaveBeenCalled();
  });

  it("#submitCredentialsSuccessCB should navigate to the dashboard", () => {
    spyOn($state, 'go');
    vm.submitCredentialsSuccessCB();
    expect($state.go).toHaveBeenCalledWith('dashboard');
  });

  describe("#submitCredentialsFailureCB", () => {
    it("should set backend errors when errors are returned", () => {
      vm.submitCredentialsFailureCB(["Username is already taken"]);
      expect(vm.backendErrors).toContain("Username is already taken");
    });

    xit("should set a modal when backend errors are present")
  });
});
