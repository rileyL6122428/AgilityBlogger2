import FormSubmission from './formSubmission.js';
import FormValidation from './FormValidation.js';
import FormAuthor from './formAuthor.js';

class Form {
  constructor() {
    this.fieldsList = [];
    this.author = new FormAuthor(this);
    this.submitter = new FormSubmission(this);
    this.validator = new FormValidation(this);
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
