class Form {
  constructor(dependencies) {
    this.fieldsList = [];
    this.author = new dependencies.FormAuthor(this);
    this.submitter = new dependencies.FormSubmission(this);
    this.validator = new dependencies.FormValidation(this);
  }

  addField(formField) {
    this.author.writeField(formField);
  }

  addFieldWithCheck(formField) {
    this.author.writeFieldWithCheck(formField);
  }

  submissionReport() {
    return this.submitter.submissionReport();
  }

  containsValidationErrors() {
    return this.validator.errorsArePresent();
  }
}

export default Form;
