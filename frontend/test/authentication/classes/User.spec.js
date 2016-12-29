import User from '../../../src/submodules/authentication/classes/User.js'

describe("User", () => {
  it("should instantiate with a username and id", () => {
    let testUser = new User({id: 1, username: "username"});
    expect(testUser.getId()).toEqual(1);
    expect(testUser.getUsername()).toEqual("username");
  });
});
