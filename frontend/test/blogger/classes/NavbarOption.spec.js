import NavbarOption from '../../../src/submodules/blogger/classes/NavbarOption.js';

describe("NavbarOption", () => {
  it("should construct with text and an address", () => {
    let navbarOption = new NavbarOption({
      text: "sample text",
      address: "sample-address"
    });

    expect(navbarOption.getText()).toEqual("sample text");
    expect(navbarOption.getAddress()).toEqual("sample-address");
  });
});
