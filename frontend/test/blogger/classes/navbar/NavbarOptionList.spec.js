import NavbarOption from '../../../../src/submodules/blogger/classes/navbar/NavbarOption.js';
import NavbarOptionList from '../../../../src/submodules/blogger/classes/navbar/NavbarOptionList.js';

describe("NavbarOptionList", () => {
  let navbarOptionList, option1, option2;

  beforeEach(() => {
    navbarOptionList = new NavbarOptionList();

    option1 = new NavbarOption({
      text: "SAMPLE TEXT 1",
      address: "ADDRESS 1"
    });

    option2 = new NavbarOption({
      text: "SAMPLE TEXT 2",
      address: "ADDRESS 2"
    });
  });

  it("should instantiate with a list of options", () => {
    expect(navbarOptionList.options).toEqual([]);
  });

  describe("#addOption", () => {
    it("should add an option to the option list", () => {
      navbarOptionList.addOption(option1);
      expect(navbarOptionList.options).toEqual([option1]);

      navbarOptionList.addOption(option2);
      expect(navbarOptionList.options).toEqual([option1, option2]);
    });
  });
});
