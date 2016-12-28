class NavbarOptionList {
  constructor() {
    this.options = [];
  }

  addOption(option) {
    this.options.push(option);
  }

  getOptions() {
    return this.options;
  }
}

export default NavbarOptionList;
