import angular from 'angular';
import 'angular-mocks';
import authenticationModule from '../../../src/submodules/authentication/authenticationModule.js';

const {inject, module} = angular.mock;

describe("CredentialsSubmisionCBs", () => {
  let credentialsSubmissionCBs, $ngRedux, $state;

  const SAMPLE_USER = { username: "username", id: "1" };
  const SUCCESS_RESPONSE = {
    data: { user: SAMPLE_USER }
  }

  beforeEach(module(authenticationModule));

  beforeEach(() => {
    $state = { go: (value) => {} };

    module(function ($provide) {
      $provide.value('$ngRedux', { dispatch: (action) => {} });
      $provide.value('$state', $state);
    });
  });

  beforeEach(inject((_credentialsSubmissionCBs_, _$ngRedux_, _$state_) => {
    credentialsSubmissionCBs = _credentialsSubmissionCBs_;
    $ngRedux = _$ngRedux_;
    $state = _$state_;
  }));

  describe("#successCB", () => {
    it("should store a user", () => {
      spyOn($ngRedux, "dispatch");
      credentialsSubmissionCBs.successCB(SUCCESS_RESPONSE);
      expect($ngRedux.dispatch).toHaveBeenCalledWith({
        type: "ADD_CURRENT_USER",
        payload: SAMPLE_USER
      });
    });

    it("should send the user to the dashboard", () => {
      spyOn($state, "go");
      credentialsSubmissionCBs.successCB(SUCCESS_RESPONSE);
      expect($state.go).toHaveBeenCalledWith("dashboard");
    });
  });
});
