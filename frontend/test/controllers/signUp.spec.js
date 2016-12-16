import angular from 'angular';
import 'angular-mocks';
import agilityBloggerApp from '../../src/agility-blogger-app.js';

const {inject, module} = angular.mock;

describe("SignUpController", () => {
  let vm;

  beforeEach(module(agilityBloggerApp));

  beforeEach(inject(($controller) => {
    vm = $controller('signUp', {});
  }));

  it('should be registered', () => {
    expect(vm).toBeDefined();
  });

  describe("initial state", () => {
    it("should initially set form values to empty strings", () => {
      expect(vm.username).toEqual("");
      expect(vm.password).toEqual("");
      expect(vm.passwordConfirm).toEqual("");
    });
  })

  describe("#setUsernameErrors", () => {
    it("should clear the username error messages and then set new error messages when called", () => {
      vm.usernameErrors = ["a random error"]
      vm.username = "acceptableUsername"
      vm.setUsernameErrors();
      expect(vm.usernameErrors.length).toEqual(0)
    });

    it("should add an error message when the username is too short", () => {
      vm.username = "shrt"
      vm.setUsernameErrors();
      expect(vm.usernameErrors).toContain("Too short (at least 5 characters long)");
    });

    it("should add an error message when the username is too long", () => {
      vm.username = ""
      for(var idx = 1; idx <= 36; idx++){ vm.username += "a"; }
      vm.setUsernameErrors();
      expect(vm.usernameErrors).toContain("Too long (must be less than 36 characters long)");
    });

    it("should add an error message when the username contains illegal chars", () => {
      vm.username = "user-name"
      vm.setUsernameErrors();
      expect(vm.usernameErrors).toContain("Illegal chars (dashes are not allowed)");

      vm.username = "user name"
      vm.setUsernameErrors();
      expect(vm.usernameErrors).toContain("Illegal chars (spaces are not allowed)");
    });
  });

  describe("#setPasswordErrors", function() {
    it("should clear the password error messages and set new error messages when called", () => {
      vm.passwordErrors = ["a random error"]
      vm.password = "acceptablePassword"
      vm.setPasswordErrors();
      expect(vm.passwordErrors.length).toEqual(0);
    });

    it("should add an error message when the password is too short", () => {
      vm.password = "shrt"
      vm.setPasswordErrors();
      expect(vm.passwordErrors).toContain("Too short (at least 5 characters long)");
    });

    it("should add an error message when the password is too long", () => {
      vm.password = ""
      for(var idx = 1; idx <= 36; idx++){ vm.password += "a"; }
      vm.setPasswordErrors();
      expect(vm.passwordErrors).toContain("Too long (must be less than 36 characters long)");
    });
  });

  describe("#setPasswordConfirmErrors", () => {
    it("should clear the password error messages and set new error messages when called", () => {
      vm.passwordConfirmErrors = ["a random error"]
      vm.password = "acceptablePassword"
      vm.passwordConfirm = "acceptablePassword"
      vm.setPasswordConfirmErrors();
      expect(vm.passwordConfirmErrors.length).toEqual(0);
    });

    it("should add an error message when passwordConfirm does not match password", () => {
      vm.password = "acceptablePassword"
      vm.passwordConfirm = "differenetPassword"
      vm.setPasswordConfirmErrors();
      expect(vm.passwordConfirmErrors).toContain("does not match password");
    });
  });

  describe("#updateUsernameStatus", () => {
    it("should set .usernameStatus to 'validations-passed' when there are no username errors present", () => {
      vm.username = "acceptableUsername"
      vm.updateUsernameStatus()
      expect(vm.usernameStatus).toEqual("validations-passed");
    });

    it("should set .usernameStatus to 'errors-present' when there are username errors", () => {
      vm.username = "shrt"
      vm.updateUsernameStatus()
      expect(vm.usernameStatus).toEqual("errors-present");
    });
  });

  describe("#updatePasswordStatus", () => {
    it("should set .passwordStatus to 'validations-passed' when there are no password errors present", () => {
      vm.password = "acceptablePassword"
      vm.updatePasswordStatus()
      expect(vm.passwordStatus).toEqual("validations-passed");
    });

    it("should set .passwordStatus to 'errors-present' when there are password errors", () => {
      vm.password = "shrt"
      vm.updatePasswordStatus()
      expect(vm.passwordStatus).toEqual("errors-present");
    });
  });

  describe("#updatePasswordConfirmStatus", () => {
    it("should set .passwordConfirmStatus to 'validations-passed' when there are no password confirmation errors present", () => {
      vm.password = "password"
      vm.passwordConfirm = "password"
      vm.updatePasswordConfirmStatus()
      expect(vm.passwordConfirmStatus).toEqual("validations-passed");
    });

    it("should set .passwordConfirmStatus to 'errors-present' when there are password confirmation errors", () => {
      vm.password = "password1"
      vm.passwordConfirm = "password2"
      vm.updatePasswordConfirmStatus()
      expect(vm.passwordConfirmStatus).toEqual("errors-present");
    });
  });

  describe("#submitCredentialsCB", () => {
    xit("should set new confirmation errors when errors are returned")
    xit("should navigate to the dashboard when credentials are successfully submitted")
  });
});
