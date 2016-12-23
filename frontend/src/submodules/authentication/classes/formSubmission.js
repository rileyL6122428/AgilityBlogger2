import MatchingFormField from './matchingFormField.js';

class FormSubmission {
  constructor(form) {
    this.form = form;
  }

  submissionReport() {
    let report = {};

    this.form.fieldsList.forEach((field) => {
      if(!(field instanceof MatchingFormField)) {
        report[field.name] = field.value;
      }
    });

    return report;
  }
}

export default FormSubmission;
