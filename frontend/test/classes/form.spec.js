import Form from '../../src/submodules/authentication/classes/form.js';
import FormField from '../../src/submodules/authentication/classes/formField.js';
import MatchingFormField from '../../src/submodules/authentication/classes/matchingFormField.js';
import ErrorCheck from '../../src/submodules/authentication/classes/errorCheck.js';

describe("Form", () => {
  let form, formField, errorCheck;

  beforeEach(() => {
    form = new Form()

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

  describe("#constructor", () => {
    xit("should require Author, Submission, and Validation obj dependencies");
    xit("should instantiate properly when dependent classes are injected");
    xit("should instantitate with an empty fields list");
  });

  describe("#addField", () => {
    xit("should call author's #writeField");
  });

  describe("#addFieldWithCheck", () => {
    xit("should call author's #writeFieldWithCheck");
  });

  describe("#submissionReport", () => {
    xit("should call submitters #submission report");
  });

  describe("#containsValidationErrors", () => {
    xit("should call validator's errors are present")
  });
});
