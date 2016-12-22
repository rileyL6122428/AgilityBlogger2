import FormField from './formField'

class MatchingFormField extends FormField {
  constructor(options) {
    super({
      name: options.name,
      type: options.dependantField.type,
      icon: options.dependantField.icon
    });

    this.dependantField = options.dependantField;
  }

  updateErrors() {
    this.errors = [];
    if(this.value !== this.dependantField.value) {
      this.errors.push("Does not match " + this.dependantField.name)
    }
  }
}

export default MatchingFormField;
