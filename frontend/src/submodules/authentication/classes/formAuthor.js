import MatchingFormField from './matchingFormField.js';

class FormAuthor {
  constructor(form) {
    this.form = form;
  }

  writeField(formField) {
    this.form.fieldsList.push(formField);
  }

  writeFieldWithCheck(formField) {
    this.writeField(formField);
    let test = formField;
    this.writeField(new MatchingFormField({
      name: formField.name + "Confirm",
      dependantField: formField
    }));
  }
}

export default FormAuthor;
