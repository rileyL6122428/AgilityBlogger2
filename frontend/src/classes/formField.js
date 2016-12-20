class FormField {
  constructor(fieldName, errorChecks = []) {
    this.value = "";
    this.name = fieldName
    this.errors = [];
    this.errorChecks = errorChecks;
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
