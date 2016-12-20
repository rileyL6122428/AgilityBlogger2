import FormField from './formField'

class MatchingFormField extends FormField {
  constructor(fieldName, dependantField) {
    super(fieldName);
    this.dependantField = dependantField;
  }

  updateErrors() {
    this.errors = [];
    if(this.value !== this.dependantField.value) {
      this.errors.push("Does not match " + this.dependantField.name)
    }
  }
}

export default MatchingFormField;
