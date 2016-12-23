import Form from './form.js';

class FormValidation {
  constructor(form) {
    this.form = form;
  }

  errorsArePresent() {
    this.form.fieldsList.forEach((field) => { field.updateErrors(); });

    for(var idx = 0; idx < this.form.fieldsList.length; idx++) {
      let field = this.form.fieldsList[idx];
      if(field.errors.length > 0) return true;
    }

    return false;
  }
}

export default FormValidation;
