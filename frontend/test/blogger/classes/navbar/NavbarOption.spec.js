import NavbarOption from '../../../../src/submodules/blogger/classes/navbar/NavbarOption.js';

describe("NavbarOption", () => {
  it("should construct with text and an address", () => {
    let navbarOption = new NavbarOption({
      text: "sample text",
      address: "sample-address"
    });

    expect(navbarOption.text).toEqual("sample text");
    expect(navbarOption.address).toEqual("sample-address");
  });
});
