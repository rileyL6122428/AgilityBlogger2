import angular from 'angular';
import 'angular-mocks';
import SignUpModule from '../../../src/submodules/signUp/sign-up-module.js';

const {inject, module} = angular.mock;

describe("SubmitCredentialsApi", () => {
  let $httpBackend,
      SubmitCredentialsApi,
      authenticationStore,
      successHandler,
      errorHandler;

  const NEW_SAMPLE_USER = {
    username: "TEST_USER",
    password: "PASSWORD"
  };
  const SAVED_SAMPLE_USER = {
    username: "TEST_USER",
    id: 1
  };

  beforeEach(module(SignUpModule));

  beforeEach(inject((_$httpBackend_, _SubmitCredentialsApi_, _authenticationStore_) => {
    $httpBackend = _$httpBackend_;
    SubmitCredentialsApi = _SubmitCredentialsApi_;
    authenticationStore = _authenticationStore_;

    successHandler = jasmine.createSpy('successHandler');
    errorHandler = jasmine.createSpy('errorHandler');
  }));

  it("should be wired into the app", () => {
    expect(SubmitCredentialsApi).toBeDefined();
  });

  describe("#signUp", () => {
    afterEach(() => {
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.verifyNoOutstandingExpectation();
    })

    it("should send an http post request to '/api/createAccount'", () => {
      $httpBackend.expectPOST('/api/createAccount').respond(200, SAVED_SAMPLE_USER);
      SubmitCredentialsApi.signUp({newUser: NEW_SAMPLE_USER});
      $httpBackend.flush();
    });

    describe("request is successful", () => {
      beforeEach(() => {
        $httpBackend.expectPOST('/api/createAccount').respond(200, { user: SAVED_SAMPLE_USER });
        SubmitCredentialsApi.signUp({
          newUser: NEW_SAMPLE_USER,
          successCB: successHandler
        });
        $httpBackend.flush();
      })

      it("should store a user into the authentication store when the request is successful", () => {
        expect(authenticationStore.getCurrentUser()).toEqual(SAVED_SAMPLE_USER);
      });

      it("should call a success callback input by the method caller when the request is successful", () => {
        expect(successHandler).toHaveBeenCalled();
      });
    });

    it("should call a failure callback input by the method caller when the request fails", () => {
      var errorMessages = { errorMessages: [] }
      $httpBackend.expectPOST('/api/createAccount').respond(409, errorMessages);

      SubmitCredentialsApi.signUp({
        newUser: NEW_SAMPLE_USER,
        successCB: successHandler,
        failureCB: errorHandler
      });

      $httpBackend.flush();

      expect(errorHandler).toHaveBeenCalledWith(errorMessages);
    });
  });
});
