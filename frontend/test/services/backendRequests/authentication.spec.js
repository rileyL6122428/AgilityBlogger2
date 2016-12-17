import angular from 'angular';
import 'angular-mocks';
import agilityBloggerApp from '../../../src/agility-blogger-app.js';

const {inject, module} = angular.mock;

describe("authenticationBackendRequests", () => {
  let $httpBackend,
      authenticationBackendRequests,
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

  beforeEach(module(agilityBloggerApp));

  beforeEach(inject((_$httpBackend_, _authenticationBackendRequests_, _authenticationStore_) => {
    $httpBackend = _$httpBackend_;
    authenticationBackendRequests = _authenticationBackendRequests_;
    authenticationStore = _authenticationStore_;

    successHandler = jasmine.createSpy('successHandler');
    errorHandler = jasmine.createSpy('errorHandler');
  }));

  it("should be wired into the app", () => {
    expect(authenticationBackendRequests).toBeDefined();
  });

  describe("#signUp", () => {
    afterEach(() => {
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.verifyNoOutstandingExpectation();
    })

    it("should send an http post request to '/api/createAccount'", () => {
      $httpBackend.expectPOST('/api/createAccount').respond(200, SAVED_SAMPLE_USER);
      authenticationBackendRequests.signUp(NEW_SAMPLE_USER);
      $httpBackend.flush();
    });

    describe("request is successful", () => {
      beforeEach(() => {
        $httpBackend.expectPOST('/api/createAccount').respond(200, { user: SAVED_SAMPLE_USER });
        authenticationBackendRequests.signUp(NEW_SAMPLE_USER, successHandler);
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
      authenticationBackendRequests.signUp(NEW_SAMPLE_USER, successHandler, errorHandler);
      $httpBackend.flush();

      expect(errorHandler).toHaveBeenCalledWith(errorMessages);
    });
  });
});
