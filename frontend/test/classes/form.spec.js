import Form from '../../src/submodules/authentication/classes/form.js';
import FormField from '../../src/submodules/authentication/classes/formField.js';
import MatchingFormField from '../../src/submodules/authentication/classes/matchingFormField.js';
import ErrorCheck from '../../src/submodules/authentication/classes/errorCheck.js';

import FormSubmission from '../../src/submodules/authentication/classes/formSubmission.js';
import FormValidation from '../../src/submodules/authentication/classes/formValidation.js';
import FormAuthor from '../../src/submodules/authentication/classes/formAuthor.js';

describe("Form", () => {
  let form, formField, errorCheck;

  beforeEach(() => {
    form = new Form({
      FormAuthor: FormAuthor,
      FormSubmission: FormSubmission,
      FormValidation: FormValidation
    });

    errorCheck = new ErrorCheck(
      (value) => { return value.length === 0; },
      "Too short (value length must not be empty)"
    );

    formField = new FormField({
      name: "fieldName",
      errorChecks: [errorCheck],
      type: "type",
      icon: "icon"
    });
  });


  it("should instantitate with an empty fields list", () => {
    expect(form.fieldsList).toEqual([]);
  });


  describe("#addField", () => {
    it("should call author's #writeField", () => {
      spyOn(form.author, "writeField")
      form.addField(formField);
      expect(form.author.writeField).toHaveBeenCalledWith(formField);
    });
  });

  describe("#addFieldWithCheck", () => {
    it("should call author's #writeFieldWithCheck", () => {
      spyOn(form.author, "writeFieldWithCheck")
      form.addFieldWithCheck(formField);
      expect(form.author.writeFieldWithCheck).toHaveBeenCalledWith(formField);
    });
  });

  describe("#submissionReport", () => {
    it("should call submitters #submissionReport", () => {
      spyOn(form.submitter, 'submissionReport')
      form.submissionReport();
      expect(form.submitter.submissionReport).toHaveBeenCalled();
    });
  });

  describe("#containsValidationErrors", () => {
    it("should call validator's errors are present", () => {
      spyOn(form.validator, 'errorsArePresent')
      form.containsValidationErrors();
      expect(form.validator.errorsArePresent).toHaveBeenCalled();
    })
  });
});
