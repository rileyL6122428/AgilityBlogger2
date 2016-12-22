class FormField {

  constructor(options) {
    let defaults = {
      name: "",
      errorChecks: [],
      type: "text",
      icon: ""
    }
    
    let params = Object.assign(defaults, options);

    this.value = "";
    this.name = params.name
    this.errors = [];
    this.errorChecks = params.errorChecks;
    this.type = params.type
    this.icon = params.icon
  }

  updateErrors() {
    this.errors = [];

    var that = this;
    this.errorChecks.forEach((check) => {
      if(check.shouldLoadError(that.value)) { that.errors.push(check.msg); }
    });
  }

  errorsPresent() { return this.errors.length !== 0; }

  getError() { return this.errors[0]; }
}

export default FormField;
