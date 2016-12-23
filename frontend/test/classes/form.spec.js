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

  it("should instantiate with and empty field List", () => {
    expect(form.fieldsList).toEqual([]);
  });

  describe("#addField", () => {
    it("should add a form field to the fieldsList", () => {
      form.addField(formField);
      expect(form.fieldsList).toContain(formField);
    });
  });

  describe("#addFieldWithCheck", () => {
    it("should add a field with a matching field", () => {
      form.addFieldWithCheck(formField);
      let matchingFormField = form.fieldsList[1];

      expect(form.fieldsList.length).toEqual(2);
      expect(matchingFormField.name).toEqual("fieldNameConfirm");
      expect(matchingFormField instanceof MatchingFormField).toBe(true);
    });
  });

  describe("#submissionReport", () => {
    it("should return an object containing field names pointing to their values", () => {
      form.addField(formField);

      let submissionReport = form.submissionReport();

      expect(Object.keys(submissionReport).length).toEqual(1);
      expect(submissionReport.fieldName).toEqual("");
    });
  });
});
