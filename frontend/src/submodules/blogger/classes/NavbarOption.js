class NavbarOption {
  constructor(params) {
    this.text = params.text;
    this.address = params.address;
  }

  getText() {
    return this.text;
  }

  getAddress() {
    return this.address;
  }
}

export default NavbarOption;
