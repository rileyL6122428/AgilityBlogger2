import angular from 'angular';
import 'angular-mocks';
import authenticationModule from '../../../src/submodules/authentication/authenticationModule.js';

const {inject, module} = angular.mock;

describe("CredentialsSubmisionCBs", () => {
  let credentialsSubmissionCBs, authenticationStore, $state;

  const SUCCESS_RESPONSE = {
    data: {
      user: { username: "username", id: "1" }
    }
  }

  beforeEach(module(authenticationModule));

  beforeEach(() => {
    $state = { go: (value) => {} };

    module(function ($provide) {
      $provide.value('$state', $state);
    });
  });

  beforeEach(inject((_credentialsSubmissionCBs_, _authenticationStore_, _$state_) => {
    credentialsSubmissionCBs = _credentialsSubmissionCBs_;
    authenticationStore = _authenticationStore_;
    $state = _$state_;
  }));

  describe("#successCB", () => {
    it("should store a user in the authenticationStore", () => {
      credentialsSubmissionCBs.successCB(SUCCESS_RESPONSE);
      expect(authenticationStore.getCurrentUser()).toEqual(SUCCESS_RESPONSE.data.user);
    });

    it("should send the user to the dashboard", () => {
      spyOn($state, "go");
      credentialsSubmissionCBs.successCB(SUCCESS_RESPONSE);
      expect($state.go).toHaveBeenCalledWith("dashboard");
    });
  });
});
