import Form from '../../../src/submodules/authentication/classes/form.js';
import FormField from '../../../src/submodules/authentication/classes/formField.js';
import MatchingFormField from '../../../src/submodules/authentication/classes/matchingFormField.js';

import FormSubmission from '../../../src/submodules/authentication/classes/formSubmission.js';
import FormValidation from '../../../src/submodules/authentication/classes/formValidation.js';
import FormAuthor from '../../../src/submodules/authentication/classes/formAuthor.js';

describe("FormSubmission", () => {
  let form, formField, formSubmitter;

  beforeEach(() => {
    form = new Form({
      FormAuthor: FormAuthor,
      FormSubmission: FormSubmission,
      FormValidation: FormValidation
    });

    formField = new FormField({
      name: "fieldName",
      errorChecks: [],
      type: "type",
      icon: "icon"
    });

    formSubmitter = form.submitter;
  });

  describe("#constructor", () => {
    it("should instantiate with an instance of a form", () => {
      expect(formSubmitter.form).toEqual(jasmine.any(Form));
    })
  });

  describe("#submissionReport", () => {
    it("should return an obj containing field names pointing to field values", () => {
      formField.value = "sampleValue"
      form.addField(formField);

      let submissionReport = form.submissionReport();
      expect(submissionReport.fieldName).toEqual("sampleValue");
      expect(Object.keys(submissionReport).length).toEqual(1);
    });
  });
});
