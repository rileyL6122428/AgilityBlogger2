import angular from 'angular';
import 'angular-mocks';
import authenticationModule from '../../src/submodules/authentication/agilityBloggerApp.js';

const {inject, module} = angular.mock;

describe("authenticationStore", () => {
  let authenticationStore;

  beforeEach(module(authenticationModule));

  beforeEach(inject((_authenticationStore_) => {
    authenticationStore = _authenticationStore_;
  }));


  it("should be defined", () => {
    expect(authenticationStore).toBeDefined();
  });

  describe("#getCurrentUser", function() {
    it("should return null when a user is not logged in", function() {
      var currentUser = authenticationStore.getCurrentUser();
      expect(currentUser).toEqual(null);
    });

    it("should return the current set when a user has been set", function() {
      authenticationStore.setCurrentUser({ username: "username", id: 1 });
      var currentUser = authenticationStore.getCurrentUser();
      expect(currentUser.username).toEqual("username");
      expect(currentUser.id).toEqual(1);
    });
  });


  describe("#setCurrentUser", function() {
    it("should set the currentUser", function() {
      authenticationStore.setCurrentUser({ username: "username", id: 1 });
      var setUser = authenticationStore.getCurrentUser();
      expect(setUser.username).toEqual("username");
      expect(setUser.id).toEqual(1);
    });
  });

  describe("#userIsLoggedIn", function() {
    it("should return true when a user is logged in", function() {
      authenticationStore.setCurrentUser({username: "username", id: 1});
      expect(authenticationStore.userIsLoggedIn()).toEqual(true);
    });
    it("should return false when a user is not logged in",function (){
      expect(authenticationStore.userIsLoggedIn()).toEqual(false);
    });
  });

  describe("#logOut", function() {
    it("should set the current user to null when a user is logged in", function() {
      authenticationStore.setCurrentUser({ username: "username", id: 1 });
      authenticationStore.logOut()
      expect(authenticationStore.getCurrentUser()).toEqual(null);
    });
  });
});
