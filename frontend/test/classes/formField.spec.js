import FormField from '../../src/classes/formField.js';
import ErrorCheck from '../../src/classes/errorCheck.js'

describe("FormField", () => {
  let sampleErrorCheck = new ErrorCheck(
    (value) => { return value.length === 0; },
    "Too short (value length must not be empty)"
  );

  let sampleFormField;

  beforeEach(() => {
    sampleFormField = new FormField("field name", [sampleErrorCheck]);
  });

  it("should instantiate with an empty field value and no pending errors", () => {
    expect(sampleFormField.value).toEqual("");
    expect(sampleFormField.errors).toEqual([]);
  });


  describe("#updateErrors", () => {
    it("should set errors when errors are present", () => {
      sampleFormField.updateErrors();
      expect(sampleFormField.errors).toEqual(["Too short (value length must not be empty)"]);
    });

    it("should clear errors when all errorChecks pass", () => {
      sampleFormField.value = "value"
      sampleFormField.updateErrors();
      expect(sampleFormField.errors).toEqual([]);
    });
  });

  describe("#errorsPresent", () => {
    it("should return true when errors are present", () => {
      sampleFormField.updateErrors();
      expect(sampleFormField.errorsPresent()).toBe(true);
    });

    it("should return false when errors are not present", () => {
      sampleFormField.value = "value"
      sampleFormField.updateErrors();
      expect(sampleFormField.errorsPresent()).toBe(false);
    });
  });

  describe("#getError", () => {
    it("should return an error message when errors are present", () => {
      sampleFormField.updateErrors();
      expect(sampleFormField.getError()).toEqual(sampleErrorCheck.msg);
    });

    it("should return undefined when errors are not present", () => {
      sampleFormField.value = "value"
      sampleFormField.updateErrors();
      expect(sampleFormField.getError()).toBe(undefined);
    });
  });
});
