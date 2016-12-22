import MatchingFormField from './matchingFormField.js';

class Form {
  constructor() {
    this.fieldsList = [];
  }

  addField(formField) {
    this.fieldsList.push(formField);
  }

  addFieldWithCheck(formField) {
    this.addField(formField);
    this.addField(new MatchingFormField({
      name: formField.name + "Confirm",
      dependantField: formField
    }));
  }

  submissionReport() {
    let report = {};

    this.fieldsList.forEach((field) => {
      if(!(field instanceof MatchingFormField)) {
        report[field.name] = field.value;
      }
    });

    return report;
  }

  containsValidationErrors() {
    this.fieldsList.forEach((field) => { field.updateErrors(); });

    for(var idx = 0; idx < this.fieldsList.length; idx++) {
      let field = this.fieldsList[idx];
      if(field.errors.length > 0) return true;
    }

    return false;
  }
}

export default Form;
