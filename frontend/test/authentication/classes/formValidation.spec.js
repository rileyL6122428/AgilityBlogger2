import Form from '../../../src/submodules/authentication/classes/form.js';
import FormField from '../../../src/submodules/authentication/classes/formField.js';
import ErrorCheck from '../../../src/submodules/authentication/classes/errorCheck.js';

import FormSubmission from '../../../src/submodules/authentication/classes/formSubmission.js';
import FormValidation from '../../../src/submodules/authentication/classes/formValidation.js';
import FormAuthor from '../../../src/submodules/authentication/classes/formAuthor.js';

describe("FormValidation", () => {
  let form, formField, sampleErrorCheck, formValidator;

  beforeEach(() => {
    sampleErrorCheck = new ErrorCheck(
      (value) => { return value.length === 0; },
      "Too short (value length must not be empty)"
    );

    form = new Form({
      FormAuthor: FormAuthor,
      FormSubmission: FormSubmission,
      FormValidation: FormValidation
    });

    formField = new FormField({
      name: "fieldName",
      errorChecks: [sampleErrorCheck],
      type: "type",
      icon: "icon"
    });

    form.addField(formField);

    formValidator = form.validator;
  });

  describe("#constructor", () => {
    it("should construct with a form", () => {
      expect(formValidator.form).toEqual(jasmine.any(Form));
    })
  });

  describe("#errorsArePresent", () => {
    it("it should return true when a form field does not pass it's error checks", () => {
      expect(formValidator.errorsArePresent()).toBe(true);
    });

    it("it should return false when all forms pass their error checks", () => {
      formField.value = "sampleValue";
      expect(formValidator.errorsArePresent()).toBe(false);
    });
  });
});
