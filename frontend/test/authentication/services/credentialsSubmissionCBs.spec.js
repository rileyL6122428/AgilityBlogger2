import angular from 'angular';
import 'angular-mocks';
import authenticationModule from '../../../src/submodules/authentication/authenticationModule.js';

const {inject, module} = angular.mock;

describe("CredentialsSubmisionCBs", () => {
  let credentialsSubmissionCBs, authenticationStore, $state;

  const SAMPLE_USER = { username: "username", id: "1" };
  const SUCCESS_RESPONSE = {
    data: { user: SAMPLE_USER }
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
      let storedUser = authenticationStore.getCurrentUser();

      expect(storedUser.getUsername()).toEqual(SAMPLE_USER.username);
      expect(storedUser.getId()).toEqual(SAMPLE_USER.id);
    });

    it("should send the user to the dashboard", () => {
      spyOn($state, "go");
      credentialsSubmissionCBs.successCB(SUCCESS_RESPONSE);
      expect($state.go).toHaveBeenCalledWith("dashboard");
    });
  });
});
